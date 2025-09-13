// Test Firebase connection
import './config/firebase.js';
import { auth, realtimeDb } from './config/firebase.js';
import { checkUsernameAvailability } from './services/authService.js';

console.log('Testing Firebase connection...');
console.log('Auth object:', auth);
console.log('Database object:', realtimeDb);

// Test username availability function
const testUsername = async () => {
  try {
    const result = await checkUsernameAvailability('testuser123');
    console.log('Username check result:', result);
  } catch (error) {
    console.error('Username check error:', error);
  }
};

testUsername();
