import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBW-shgaIrEzSsAj19D3UITsKCaG7VSEUY",
    authDomain: "school-protal-1ed3e.firebaseapp.com",
    projectId: "school-protal-1ed3e",
    storageBucket: "school-protal-1ed3e.firebasestorage.app",
    messagingSenderId: "769429861316",
    appId: "1:769429861316:web:0dd1a56eda03aed79eea91",
    measurementId: "G-J4XYY143P2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);