import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyFnChiVhll6D9jDZfEzHY4r328DrCBHw",
  authDomain: "tastytreat-react.firebaseapp.com",
  projectId: "tastytreat-react",
  storageBucket: "tastytreat-react.appspot.com",
  messagingSenderId: "309579872425",
  appId: "1:309579872425:web:d084cb6213dba58656d1b8"

};

const app = initializeApp(firebaseConfig);

// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// const auth = getAuth(app); 

// const database = getDatabase(app); // Firebase Realtime Database
const storage = getStorage(app); // Firebase Storage
const db = getFirestore();


export { firebaseConfig, app, auth, getApp, storage, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, };

