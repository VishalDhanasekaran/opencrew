import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Protected route component that ensures only authenticated admins can access the route
const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      // If no token exists, we know they're not authenticated
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Validate the token with your backend
        const response = await fetch('/admin-portal', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // If the backend rejects the token, clear it from localStorage
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="auth-loading-container">
        <div className="auth-loading-spinner"></div>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  // If not authenticated, redirect to home with the intended location stored
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location, adminRequired: true }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default AdminProtectedRoute;