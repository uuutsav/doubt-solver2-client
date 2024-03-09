// Home.jsx
import React from 'react';
import Navbar from './Navbar';

const Home = ({ username, onLogout }) => {
  return (
    <div>
        <Navbar loggedIn={true} onLogout={onLogout}/>
      <p>Welcome, {username}!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
