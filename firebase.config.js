import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD0TR58XSh1YqvM0VLRX0M3PT4zqQbeDtk",
    authDomain: "apple-webshop.firebaseapp.com",
    projectId: "apple-webshop",
    storageBucket: "apple-webshop.appspot.com",
    messagingSenderId: "308950325015",
    appId: "1:308950325015:web:0eeec334ae547811530952"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)
export const auth = getAuth();