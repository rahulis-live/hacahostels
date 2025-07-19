/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import {logger} from "firebase-functions/v2";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHv5w4zkYQnKom2dK640AXL-Y5qumJM6Y",
  authDomain: "hostel-e6f6c.firebaseapp.com",
  projectId: "hostel-e6f6c",
  storageBucket: "hostel-e6f6c.appspot.com", // <-- FIXED
  messagingSenderId: "733195944481",
  appId: "1:733195944481:web:71e515dad1944588ffd960"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export const helloWorld = functions.https.onCall((data, context) => {
  logger.info("Hello logs!", {structuredData: true});
  return {message: "Hello from Firebase!"};
});