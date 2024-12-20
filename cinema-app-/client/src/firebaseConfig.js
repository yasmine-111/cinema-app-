import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB8dTqjfScs8W-Bte6tAqDUCisCJ1Zumto",
  authDomain: "web4-9594e.firebaseapp.com",
  projectId: "web4-9594e",
  storageBucket: "web4-9594e.appspot.com",
  messagingSenderId: "698707516712",
  appId: "1:698707516712:web:9f1ea90d9b730d7d4b041d",
  measurementId: "G-B7RSCMMKTN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

