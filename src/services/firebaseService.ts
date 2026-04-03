import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  increment, 
  getDoc, 
  setDoc,
  runTransaction
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { db, storage, auth } from "../firebase";
import { Product, Order, ContactMessage } from "../types";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";
const COUNTERS_COLLECTION = "counters";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas to Blob failed"));
            }
          },
          'image/jpeg',
          0.7 // Compression quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const uploadImage = async (file: File, onProgress?: (progress: number) => void) => {
  if (!auth.currentUser) {
    throw new Error("You must be logged in to upload images.");
  }

  try {
    // Compress image before upload
    const compressedBlob = await compressImage(file);
    const fileRef = ref(storage, `products/${Date.now()}_${file.name.replace(/\.[^/.]+$/, "")}.jpg`);
    
    const uploadTask = uploadBytesResumable(fileRef, compressedBlob, {
      contentType: 'image/jpeg'
    });

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          console.error("Storage upload error:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("Compression/Upload error:", error);
    throw error;
  }
};

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    callback(products);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, PRODUCTS_COLLECTION);
  });
};

export const subscribeToOrders = (callback: (orders: Order[]) => void) => {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    callback(orders);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, ORDERS_COLLECTION);
  });
};

export const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
  try {
    return await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, PRODUCTS_COLLECTION);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    return await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PRODUCTS_COLLECTION}/${id}`);
  }
};

export const placeOrder = async (orderData: Partial<Order>) => {
  try {
    return await runTransaction(db, async (transaction) => {
      const counterRef = doc(db, COUNTERS_COLLECTION, "order_counter");
      const counterDoc = await transaction.get(counterRef);
      
      let currentCount = 1;
      if (counterDoc.exists()) {
        currentCount = counterDoc.data().value + 1;
        if (currentCount > 50) currentCount = 1;
      }
      
      transaction.set(counterRef, { value: currentCount });
      
      const orderNumber = currentCount;
      const orderId = (10000 + currentCount).toString();
      
      const newOrderRef = doc(collection(db, ORDERS_COLLECTION));
      const defaultStatus = orderData.type === "Delivery" ? "Delivering" : "On Que";
      transaction.set(newOrderRef, {
        ...orderData,
        orderNumber,
        orderId,
        status: defaultStatus,
        createdAt: Date.now()
      });
      
      return { orderNumber, orderId };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, "transaction:placeOrder");
  }
};

export const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${ORDERS_COLLECTION}/${orderId}`);
  }
};

export const clearOrders = async (orders: Order[]) => {
  console.log("Attempting to clear orders:", orders.length);
  try {
    // 1. Reset the counter to 0
    const counterRef = doc(db, COUNTERS_COLLECTION, "order_counter");
    await setDoc(counterRef, { value: 0 });
    console.log("Counter reset to 0");

    // 2. Delete all orders
    if (orders.length > 0) {
      const deletePromises = orders.map(order => {
        console.log("Deleting order:", order.id);
        return deleteDoc(doc(db, ORDERS_COLLECTION, order.id));
      });
      await Promise.all(deletePromises);
      console.log("All orders deleted");
    }
    
    return true;
  } catch (error) {
    console.error("Error in clearOrders:", error);
    handleFirestoreError(error, OperationType.WRITE, "clearOrders");
  }
};

export const deleteOrder = async (id: string) => {
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${ORDERS_COLLECTION}/${id}`);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const subscribeToMessages = (callback: (messages: ContactMessage[]) => void) => {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContactMessage[];
    callback(messages);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, "messages");
  });
};

export const sendContactMessage = async (message: Omit<ContactMessage, "id" | "createdAt">) => {
  try {
    await addDoc(collection(db, "messages"), {
      ...message,
      createdAt: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, "messages");
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await deleteDoc(doc(db, "messages", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
  }
};
