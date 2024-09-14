import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup'
import { jwtDecode } from 'jwt-decode'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import Layout from './components/Layout'
import Loader from './components/Loader/Loader'
import ProtectedRoute from './routes/ProtectedRoute'
import { authAtom } from './recoil/atoms/authAtom'

function App() {
  const setAuthState = useSetRecoilState(authAtom);

  useEffect(() => {
    // Token expiry check
    isTokenValid ? "" : setAuthState({isTokenValid: false, user: null, token: null});
  })

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    console.log("Checking token ")
    if (!token) {
      console.warn("No auth token found")
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token is expired
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding or validating token:', error);
      return false;
    }
  };


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />} >
        <Route path='/home' element={<Home />} />

        {/* Wrong route  */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};


export default App
