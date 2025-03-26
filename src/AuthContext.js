import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from './firebase';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const token = await user.getIdToken();
        setAuthToken(token);
        localStorage.setItem('authToken', token);
      } else {
        setAuthToken(null);
        localStorage.removeItem('authToken');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (provider) => {
    return auth.signInWithPopup(provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  const getAuthHeader = () => {
    return { Authorization: `Bearer ${authToken}` };
  };

  const verifyAuthentication = async () => {
    if (!authToken) return false;
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/verify-auth`, {
        headers: getAuthHeader()
      });
      return response.data.authenticated;
    } catch (error) {
      console.error("Auth verification failed:", error);
      return false;
    }
  };

  const value = {
    currentUser,
    authToken,
    loading,
    login,
    logout,
    getAuthHeader,
    verifyAuthentication
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};