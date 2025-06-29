// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import RedAlert from './pages/RedAlert';
import SmartBasket from './pages/SmartBasket';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/redalert" 
            element={
              <ProtectedRoute requiredRole="Staff">
                <RedAlert />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/smartbasket" 
            element={
              <ProtectedRoute requiredRole="Customer">
                <SmartBasket />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;