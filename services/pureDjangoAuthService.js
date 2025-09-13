// Pure Django Auth Service (No Firebase Auth)
// This service handles all authentication through Django backend only

// Django backend URL - Update this to your Django server URL
const DJANGO_BASE_URL = 'http://192.168.0.113:8000/api'; // Update to your computer's IP

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

// Check if username is available
export const checkUsernameAvailability = async (username) => {
  try {
    const response = await fetch(`${DJANGO_BASE_URL}/users/check-username/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    
    const data = await response.json();
    return data.available;
  } catch (error) {
    console.log('Username check failed, assuming available:', error);
    return true; // Assume available if check fails
  }
};

// Register user with PURE Django (no Firebase)
export const registerUser = async (email, password, firstName, lastName, username, role = "User", barangay = "") => {
  try {
    console.log('Starting Django-only user registration...');
    
    // Prepare user data for Django
    const userData = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      username: username,
      role: role,
      barangay: barangay
    };
    
    console.log('Sending registration request to Django...');
    
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
      console.log('User successfully registered with Django');
      return { 
        success: true, 
        user: responseData.user,
        message: responseData.message 
      };
    } else {
      console.error('Django registration failed:', responseData);
      return { 
        success: false, 
        error: responseData.message || 'Registration failed' 
      };
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    if (error.message.includes('Network request failed')) {
      return { 
        success: false, 
        error: 'Cannot connect to server. Please make sure Django server is running.' 
      };
    }
    return { success: false, error: 'Network error. Please check your connection.' };
  }
};

// Login user with Django
export const loginUser = async (email, password) => {
  try {
    console.log('Starting Django login...');
    
    const response = await fetch(`${DJANGO_BASE_URL}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      console.log('Login successful');
      return { 
        success: true, 
        user: responseData.user,
        token: responseData.token 
      };
    } else {
      return { 
        success: false, 
        error: responseData.message || 'Login failed' 
      };
    }
    
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error. Please check your connection.' };
  }
};

// Get user profile
export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${DJANGO_BASE_URL}/users/profile/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      return { success: true, user: responseData.user };
    } else {
      return { success: false, error: responseData.message };
    }
    
  } catch (error) {
    console.error('Get user error:', error);
    return { success: false, error: 'Network error' };
  }
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  validatePassword,
  checkUsernameAvailability
};
