import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Loader from './components/Loader/Loader.jsx'
import Login from './components/Login.jsx'
import {jwtDecode} from 'jwt-decode';
import Signup from './components/Signup.jsx';

let userID = "";

// Function to check if the JWT token is present
const isTokenValid = () => {
  console.log("Checking ")
  const token = localStorage.getItem('token');
  // Validate token - exist or not , expired or not
  if (!token) {
    // Token does not exist
    return false;
  }

  try {
    // Decode 
    const decodedToken = jwtDecode(token);
    console.log("Decoded JWT: ", decodedToken)
    userID = decodedToken.id.id;
    console.log(userID)
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // Token is expired
      return false;
    }

    // Hehe token good
    return true;
  } catch (error) {
    console.error('Error decoding or validating token:', error);
    return false;
  }

  // return !!token; // Returns true if token exists, false otherwise
};

// ProtectedRoute component for routes that require authentication
const ProtectedRoute = ({ element, ...rest }) => {
  return isTokenValid() ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute element={<Layout />} />}>
          <Route index element={<Home />} />
          {/* Use ProtectedRoute for protected routes */}
          <Route path="home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="test" element={<ProtectedRoute element={<Loader />} />} />
          {/* Add more protected routes as needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);