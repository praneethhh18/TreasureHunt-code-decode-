// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAinr84vpsRSuA6Nw4GpjaUo1nDaXO_moU',
  authDomain: 'treshunt-b393f.firebaseapp.com',
  databaseURL: 'https://treshunt-b393f-default-rtdb.firebaseio.com',
  projectId: 'treshunt-b393f',
  storageBucket: 'treshunt-b393f.firebasestorage.app',
  messagingSenderId: '1090319177922',
  appId: '1:1090319177922:web:fe38da85e711996e9d435b',
  measurementId: 'G-S842YLJLLM',
};

// Initialize Firebase and export the database
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
