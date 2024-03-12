// Home.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './Home.css'
import Ask from './Ask/Ask';

const Home = ({ username, onLogout }) => {
  const [showPopupAsk, setShowPopupAsk] = useState(false);
  const [showPopupFindPeer, setShowPopupFindPeer] = useState(false);
  const [showLoader, setShowLoader] = useState(false)


  const togglePopupAsk = () => {
    console.log("Toggled  togglePopupAsk")
    setShowPopupAsk(!showPopupAsk);
    // setShowLoader(!showLoader)
    
  };

  const togglePopupFindPeer = () => {
    console.log("Toggled ")
    setShowPopupAsk(!showPopupFindPeer)
  }

  const toggleLoader = () => {
    setShowLoader(!showLoader)
  }
  return (
    <div className='hero'>
      {/* <Navbar loggedIn={true} onLogout={onLogout} /> */}
      <div className='left-parent'>
        <div className='home-texts-box'>
          <h1 className='home-title-left'>Get your answers Instantly</h1>
          <h3>Get 24x7 hours help from our experts.Ask doubts anytime, anywhere</h3>
        </div>

      </div>
      <div className='right-parent'>
        <button className="button-divs-left"
        onClick={togglePopupAsk}
        >
          <h3>Ask</h3>
          <p>Some Desc.</p>
        </button>
        {showPopupAsk && <Ask togglePopupAsk={togglePopupAsk}/>}
        <button className="button-divs-left">
          <h3>Solve</h3>
          <p>Some Desc.</p>

        </button>
        <button className="button-divs-left">
          <h3>Dashboard</h3>
          <p>Some Desc.</p>

        </button>



        <div className=''>
          {/* <p>Welcome, {username}!</p> */}
          {/* <button onClick={onLogout}>Logout</button> */}

        </div>
      </div>




    </div>
  );
};

export default Home;
