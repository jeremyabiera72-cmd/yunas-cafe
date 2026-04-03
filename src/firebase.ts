import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import firebaseConfig from "../firebase-applet-config.json";

// Ensure storageBucket is present and correctly formatted
const config = {
  ...firebaseConfig,
  storageBucket: firebaseConfig.storageBucket || `${firebaseConfig.projectId}.firebasestorage.app`
};

const app = initializeApp(config);

// Log configuration for debugging (will show in browser console)
console.log("Firebase initialized with project:", config.projectId);
console.log("Storage Bucket:", config.storageBucket);

export const db = getFirestore(app, config.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);
