import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2uY0tIuHkFW3xznW6wpViKWwQFveN-Ao",
  authDomain: "evaluaciones-finales.firebaseapp.com",
  projectId: "evaluaciones-finales",
  storageBucket: "evaluaciones-finales.firebasestorage.app",
  messagingSenderId: "1044880178379",
  appId: "1:1044880178379:web:d345363938416a85f82f4e",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;