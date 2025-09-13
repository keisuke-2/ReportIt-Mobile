import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';
import { auth, realtimeDb } from '../config/firebase';

// Check if username is available (simplified - just check if not empty)
export const checkUsernameAvailability = async (username) => {
  // Since we removed the usernames collection, just validate username format
  console.log('Username validation for:', username);
  return username && username.length >= 3;
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
  const authReady = auth !== null && auth !== undefined;
  const dbReady = realtimeDb !== null && realtimeDb !== undefined;
  
  console.log('Firebase readiness check:');
  console.log('Auth ready:', authReady);
  console.log('Database ready:', dbReady);
  
  return authReady && dbReady;
};

// Register new user
export const registerUser = async (email, password, firstName, lastName, username, role = "User", barangay = "") => {
  try {
    console.log('Starting user registration process...');
    
    if (!isFirebaseReady()) {
      console.error('Firebase not ready - attempting to proceed anyway');
      // Don't block registration, but log the issue
      if (!auth) {
        return { success: false, error: 'Authentication service is not available. Please check your internet connection.' };
      }
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors.join('\n') };
    }

    // Check if username is available (with timeout for better UX)
    try {
      console.log('Checking username availability during registration...');
      const isUsernameAvailable = await Promise.race([
        checkUsernameAvailability(username),
        new Promise((resolve) => {
          setTimeout(() => {
            console.log('Username check timed out, assuming available for first account');
            resolve(true); // Assume available if check times out
          }, 3000);
        })
      ]);
      
      if (!isUsernameAvailable) {
        return { success: false, error: 'Username is already taken. Please choose a different username.' };
      }
    } catch (error) {
      console.log('Username availability check failed, proceeding with registration:', error.message);
      // Continue with registration even if username check fails
    }

    // Create user with email and password in Firebase Auth
    console.log('Creating user account...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile in Auth
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Store user data in Realtime Database (if available)
    if (realtimeDb) {
      try {
        console.log('Storing user data in database...');
        const userRef = ref(realtimeDb, `users/${user.uid}`);
        await set(userRef, {
          UserID: user.uid,
          Name: `${firstName} ${lastName}`,
          Email: email,
          Password: "***", // Don't store actual password
          Role: role,
          Barangay: barangay
        });
        
        console.log('User data stored successfully in database');
      } catch (dbError) {
        console.error('Failed to store user data in database:', dbError);
        // Don't fail the registration if database storage fails
        console.log('User account created successfully but some data may not be stored in database');
      }
    } else {
      console.warn('Database not available - user created but additional data not stored');
    }
    
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

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
