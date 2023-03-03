import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDDppcU1Ti5WsKp195IhjmlgW7w0k6XAH0",
  authDomain: "my-app-64cab.firebaseapp.com",
  projectId: "my-app-64cab",
  storageBucket: "my-app-64cab.appspot.com",
  messagingSenderId: "927288587067",
  appId: "1:927288587067:web:f793324e6c127ea1187d1e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app