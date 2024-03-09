import React from 'react';
import './Navbar.css';

const Navbar = ({loggedIn, onLogout}) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="path_to_your_logo.png" alt="Logo" className="logoImg" />
      </div>
      <div className="links">
        <a href="/messages" className="link">Messages</a>
      </div>
      <div className="logout">
        <button className="logoutButton" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;