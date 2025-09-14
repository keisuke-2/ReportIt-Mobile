// Django Backend Auth Service
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

// Django backend URL - Update this to your Django server URL
const DJANGO_BASE_URL = 'http://localhost:8000/api'; // Change this to your Django server

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

// Check if username is available (simplified - just check if not empty)
export const checkUsernameAvailability = async (username) => {
  // Since we removed the usernames collection, just validate username format
  console.log('Username validation for:', username);
  return username && username.length >= 3;
};

// Register user with Django backend
export const registerUserWithDjango = async (email, password, firstName, lastName, username, role = "User", barangay = "") => {
  try {
    console.log('Starting Django user registration...');
    
    // Step 1: Create Firebase Auth account first
    console.log('Creating Firebase Auth account...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Update Firebase profile
    await updateProfile(firebaseUser, {
      displayName: `${firstName} ${lastName}`
    });
    
    console.log('Firebase account created, now sending to Django...');
    
    // Step 2: Send user data to Django backend
    const userData = {
      UserID: firebaseUser.uid,
      Name: `${firstName} ${lastName}`,
      Email: email,
      Password: password, // Django will hash this
      Role: role,
      Barangay: barangay,
      firebase_uid: firebaseUser.uid,
      first_name: firstName,
      last_name: lastName,
      username: username
    };
    
    const response = await fetch(`${DJANGO_BASE_URL}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      console.log('User successfully registered with Django backend');
      return { 
        success: true, 
        user: firebaseUser,
        djangoUser: responseData 
      };
    } else {
      console.error('Django registration failed:', responseData);
      // If Django fails, we might want to delete the Firebase user
      // await firebaseUser.delete();
      return { 
        success: false, 
        error: responseData.message || 'Registration failed on server' 
      };
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code) {
      // Firebase error
      switch (error.code) {
        case 'auth/email-already-in-use':
          return { success: false, error: 'Email is already registered' };
        case 'auth/weak-password':
          return { success: false, error: 'Password is too weak' };
        case 'auth/invalid-email':
          return { success: false, error: 'Invalid email address' };
        default:
          return { success: false, error: error.message };
      }
    } else {
      // Network or Django error
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  }
};

// Login user (Firebase only, Django can verify on backend)
export const loginUserWithDjango = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Optionally verify with Django backend
    const response = await fetch(`${DJANGO_BASE_URL}/users/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firebase_uid: user.uid,
        email: user.email
      }),
    });
    
    if (response.ok) {
      const userData = await response.json();
      return { success: true, user, userData };
    } else {
      return { success: true, user }; // Firebase login successful even if Django check fails
    }
    
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Get user data from Django backend
export const getUserFromDjango = async (firebaseUid) => {
  try {
    const response = await fetch(`${DJANGO_BASE_URL}/users/${firebaseUid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const userData = await response.json();
      return { success: true, userData };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { success: false, error: 'Network error' };
  }
};

export default {
  registerUserWithDjango,
  loginUserWithDjango,
  getUserFromDjango
};
