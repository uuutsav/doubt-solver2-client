import React from 'react';
import HamburgerMenu from './Navbar/Hamburger';

const Navbar = ({ loggedIn, onLogout }) => {
  return (
    <nav className="h-[7vh] p-3 md:px-[8vw] lg:px-[15vw] bg-gray-200 flex justify-between items-center ">
      <div id='left' className="left w-1/5 text-3xl cursor-pointer ">
        {/* <img src="path_to_your_logo.png" alt="Logo" className="logoImg" /> */}
        DoubtComm
      </div>
      <div id='middle' className="middle hidden w-3/5 text-xl lg:flex justify-center md:gap-5 lg:gap-10 ">
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300  ">Home</a>
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300">Feed</a>
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300">About</a>
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300">Contact</a>
      </div>
      <div id='right' className="right hidden w-1/5 lg:flex gap-3 justify-end ">
        <button className="bg-green-300 px-5 py-3 rounded-full hover:scale-110 duration-150" onClick={onLogout}>Logout</button>
        <div id='nav-search' className='flex rounded-full overflow-hidden duration-150 hover:scale-105'  >
          <input type="text" placeholder='Search' className='p-3' />
        </div>
      </div>
      <div id="hamburger" className='lg:hidden '>
        <HamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;