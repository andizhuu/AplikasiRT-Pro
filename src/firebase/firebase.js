import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsir7Qav4YxBzHerCVgJtziMVJ6kCbTLA",
  authDomain: "apprt-cf323.firebaseapp.com",
  projectId: "apprt-cf323",
  storageBucket: "apprt-cf323.firebasestorage.app",
  messagingSenderId: "508718778674",
  appId: "1:508718778674:web:0611ebe5222bf2ad296f2b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
