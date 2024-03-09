// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import Navbar from './Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
    ])
    try {
      const data = {
        username,
        password,
      }
      console.log(data)
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      const { token } = response.data;
      onLogin(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <Navbar loggedIn={false} />

      <div className="login__content">
        <img src="/images/bg-login.png" className="login__img"></img>

        <form onSubmit={handleLogin} className="login__form">
          <div>
            <h1 className="login__title">
              <span>Welcome</span> Back
            </h1>
            <p className="login__description">
              {/* <!-- Login desc. --> */}

            </p>
          </div>

          <div>
            <div className="login__inputs">
              <div>
                <label htmlFor="input-email" className="login__label">Email</label>
                <input required
                  type="text"
                  placeholder="Enter your email address"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="login__input" id="input-email"></input>
              </div>

              <div>
                <label htmlFor="input-pass" className="login__label">Password</label>

                <div className="login__box">
                  <input required
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login__input" id="input-pass"></input>
                  <i className="ri-eye-off-line login__eye" id="input-icon"></i>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="login__buttons">
              <button className="login__button" type='submit'>Log In</button>
              <button className="login__button login__button-ghost">Sign Up</button>
            </div>

            <a href="#" className="login__forgot">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
