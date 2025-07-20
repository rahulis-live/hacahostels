// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyAHv5w4zkYQnKom2dK640AXL-Y5qumJM6Y",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "hostel-e6f6c.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "hostel-e6f6c",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "hostel-e6f6c.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "733195944481",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:733195944481:web:71e515dad1944588ffd960"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);