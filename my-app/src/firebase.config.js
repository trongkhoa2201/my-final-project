import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA-7Tsd6ypot9MW9Y1vqksxXM4akEDQ-eg",
  authDomain: "my-app-5c270.firebaseapp.com",
  projectId: "my-app-5c270",
  storageBucket: "my-app-5c270.appspot.com",
  messagingSenderId: "971886803770",
  appId: "1:971886803770:web:0a8b0aa988c8d8ad3eee03"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app