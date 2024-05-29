import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA95-wNVRP-z8QGGO1OLl7YfuaQisM0jEY",
  authDomain: "escape-room-9695e.firebaseapp.com",
  projectId: "escape-room-9695e",
  storageBucket: "escape-room-9695e.appspot.com",
  messagingSenderId: "384552554266",
  appId: "1:384552554266:web:499b00bd678e9123c7a6a3",
  measurementId: "G-1CT2NQQQMQ"
}

const app = initializeApp(firebaseConfig);
const auth: Auth =  getAuth(app);
const db: Firestore = getFirestore(app);

export {auth, db};