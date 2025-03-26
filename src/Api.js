// services/api.js
import { auth } from './firebase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper to get the current user's token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  return await user.getIdToken();
};

// API client with auth
export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Example API functions
export const getUserProfile = () => fetchWithAuth('/api/user/profile');
export const getAdminDashboard = () => fetchWithAuth('/api/admin/dashboard');