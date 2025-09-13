import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFcmgcJwOVcDClFUCYWXT9iNLvD8TGakM",
  authDomain: "admin-76567.firebaseapp.com",
  databaseURL: "https://admin-76567-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-76567",
  storageBucket: "admin-76567.firebasestorage.app",
  messagingSenderId: "189749622351",
  appId: "1:189749622351:android:4859108affcfff96985c3a", // Using Android app ID
  measurementId: "G-W2QYG5YG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const realtimeDb = getDatabase(app);

// Test database connection
console.log('Firebase initialized successfully');
console.log('Auth:', auth ? 'initialized' : 'not initialized');
console.log('Database:', realtimeDb ? 'initialized' : 'not initialized');

// Auth helper functions
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Export the Firebase services
export { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };

export default app;