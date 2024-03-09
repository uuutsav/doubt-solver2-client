import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup'

function App() {
  const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token'))
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // if(token) {
    //   navigate('/home');
    // }
  }, []);

  const handleLogin = (token) => {
    setToken(token);
    // Store the token in localStorage
    localStorage.setItem('token', token);
    // Assuming you have a way to get the username from the token
    setUsername('username_from_token');
  };

  const handleLogout = () => {
    setToken('');
    // Clear the token from localStorage
    localStorage.removeItem('token');
    setUsername('');
  };

  const handleSignup = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    // Assuming you have a way to get the username from the token
    setUsername('username_from_token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login  />} />
        <Route path="/home" element={token ? <Home username={username} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/signup" element={token ? <Navigate to="/home" /> : <Signup onSignup={handleSignup} />} />
      </Routes>
    </Router>
  );
};


export default App
