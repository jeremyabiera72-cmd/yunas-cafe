import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { 
  subscribeToProducts, 
  subscribeToOrders, 
  addProduct, 
  deleteProduct, 
  placeOrder,
  uploadImage,
  logout,
  subscribeToMessages,
  sendContactMessage,
  deleteMessage,
  updateOrderStatus,
  deleteOrder as deleteOrderService,
  clearOrders as clearOrdersService
} from "../services/firebaseService";
import { Product, Order, ContactMessage } from "../types";

export function useFirebase() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const clearOrders = async () => {
    console.log("useFirebase: clearOrders called, isAdmin:", isAdmin);
    if (!isAdmin) return;
    try {
      await clearOrdersService(orders);
      console.log("useFirebase: clearOrders successful");
    } catch (error) {
      console.error("Clear orders error:", error);
      throw error;
    }
  };

  const deleteOrder = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteOrderService(id);
    } catch (error) {
      console.error("Delete order error:", error);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      const adminStatus = user?.email === "jeremyabiera72@gmail.com";
      setIsAdmin(adminStatus);
      setLoading(false);
    });

    const unsubscribeProducts = subscribeToProducts(setProducts);
    
    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
    };
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const unsubscribeOrders = subscribeToOrders(setOrders);
      const unsubscribeMessages = subscribeToMessages(setMessages);
      return () => {
        unsubscribeOrders();
        unsubscribeMessages();
      };
    } else {
      setOrders([]);
      setMessages([]);
    }
  }, [isAdmin]);

  return {
    user,
    isAdmin,
    products,
    orders,
    messages,
    loading,
    addProduct,
    deleteProduct,
    placeOrder,
    uploadImage,
    logout,
    sendContactMessage,
    deleteMessage,
    updateOrderStatus,
    clearOrders,
    deleteOrder
  };
}
