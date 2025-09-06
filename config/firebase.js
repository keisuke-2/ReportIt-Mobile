import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAOz81U2qnC2MEq-P1yMbUiQW8qAPTh9OU",
  authDomain: "admin-76567.firebaseapp.com",
  projectId: "admin-76567",
  storageBucket: "admin-76567.appspot.com",
  messagingSenderId: "189749622351",
  appId: "1:189749622351:android:4859108affcfff96985c3a",
  databaseURL: "https://admin-76567-default-rtdb.firebaseio.com/"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Only initialize Auth on first load; reuse existing instance otherwise
const auth = !getApps().length
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);

const realtimeDb = getDatabase(app);

export { auth, realtimeDb };
export default app;