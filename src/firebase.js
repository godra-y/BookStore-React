import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCd-Is260-bMXdfKCbyjSxCaPiHuWcGhcc",
  authDomain: "bookstore-b91c3.firebaseapp.com",
  projectId: "bookstore-b91c3",
  storageBucket: "bookstore-b91c3.firebasestorage.app",
  messagingSenderId: "1075271640753",
  appId: "1:1075271640753:web:6659cbb38622b82975e490",
  measurementId: "G-QPW4MDD7YP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;