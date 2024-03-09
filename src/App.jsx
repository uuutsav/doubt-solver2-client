import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
// import { BrowserROuter } from 'react-router-dom'

function App() {
  const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token'))

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


  return (
    <div>
      
      {token ? (
        <Home username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};


export default App
