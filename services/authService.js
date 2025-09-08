import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set, get, child } from 'firebase/database';
import { app, realtimeDb } from '../config/firebase';

// Initialize auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Export the auth instance and onAuthStateChanged function
export { auth };
export const onAuthStateChanged = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

// Check if username is available
export const checkUsernameAvailability = async (username) => {
  try {
    if (!realtimeDb) {
      console.error('Database not initialized');
      return false;
    }
    const dbRef = ref(realtimeDb);
    const snapshot = await get(child(dbRef, `usernames/${username}`));
    return !snapshot.exists(); // Returns true if username is available
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
};

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (!hasNumber.test(password)) {
    errors.push('Password must contain at least 1 number');
  }

  if (!hasSymbol.test(password)) {
    errors.push('Password must contain at least 1 symbol');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Check if Firebase is initialized
const isFirebaseReady = () => {
  return auth && realtimeDb;
};

// Register new user
export const registerUser = async (email, password, firstName, lastName, username) => {
  try {
    if (!isFirebaseReady()) {
      return { success: false, error: 'Firebase services are not ready. Please try again.' };
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors.join('\n') };
    }

    // Check if username is available
    const isUsernameAvailable = await checkUsernameAvailability(username);
    if (!isUsernameAvailable) {
      return { success: false, error: 'Username is already taken' };
    }

    // Create user with email and password in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile in Auth
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Store user data in Realtime Database
    const userRef = ref(realtimeDb, `users/${user.uid}`);
    await set(userRef, {
      firstName,
      lastName,
      username,
      email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      isActive: true,
      lastLogin: new Date().toISOString()
    });

    // Reserve the username
    const usernameRef = ref(realtimeDb, `usernames/${username}`);
    await set(usernameRef, {
      uid: user.uid,
      createdAt: new Date().toISOString()
    });
    
    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    if (!isFirebaseReady()) {
      return { success: false, error: 'Firebase services are not ready. Please try again.' };
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login time in Realtime Database
    const userRef = ref(realtimeDb, `users/${user.uid}/lastLogin`);
    await set(userRef, new Date().toISOString());

    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    if (!auth) {
      return { success: false, error: 'Auth not initialized' };
    }
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

// Get user data from Realtime Database
export const getUserData = async (uid) => {
  try {
    const dbRef = ref(realtimeDb);
    const snapshot = await get(child(dbRef, `users/${uid}`));
    
    if (snapshot.exists()) {
      return { success: true, userData: snapshot.val() };
    } else {
      return { success: false, error: 'No user data found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user by username
export const getUserByUsername = async (username) => {
  try {
    const dbRef = ref(realtimeDb);
    const usernameSnapshot = await get(child(dbRef, `usernames/${username}`));
    
    if (usernameSnapshot.exists()) {
      const uid = usernameSnapshot.val().uid;
      const userSnapshot = await get(child(dbRef, `users/${uid}`));
      
      if (userSnapshot.exists()) {
        return { success: true, userData: userSnapshot.val() };
      }
    }
    
    return { success: false, error: 'User not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
