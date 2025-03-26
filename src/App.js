import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import AdminPortal from './AdminPortal';
import Results from './Results';
import Teams from './Teams';
import AdminProtectedRoute from './ProtectedRoute'; // our new component
import Apply from './ApplyPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route 
          path="/admin-portal" 
          element={
            <AdminProtectedRoute>
              <AdminPortal />
            </AdminProtectedRoute>
          } 
        />
        <Route path="/results" element={<Results />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/apply" element={<Apply />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;