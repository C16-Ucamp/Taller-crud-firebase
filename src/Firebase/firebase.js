import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAte7CSgAdYrm9_2Yq1qOMlZLRLhFYq35o",
  authDomain: "crud-firebase-b90b6.firebaseapp.com",
  projectId: "crud-firebase-b90b6",
  storageBucket: "crud-firebase-b90b6.appspot.com",
  messagingSenderId: "304047106815",
  appId: "1:304047106815:web:d7524fc0cbc8cb280fbaca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}