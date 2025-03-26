// components/AdminRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

export const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // Get the ID token result which includes claims
          const idTokenResult = await user.getIdTokenResult();
          setIsAdmin(!!idTokenResult.claims.admin);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      });
      
      return () => unsubscribe();
    };
    
    checkAdminStatus();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};