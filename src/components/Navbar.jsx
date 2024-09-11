import React from 'react';

const Navbar = ({ loggedIn, onLogout }) => {
  return (
    <nav className="h-[7vh] p-3 bg-gray-200 flex justify-between items-center lg:gap-52 ">
      <div id='left' className="left w-1/5 text-2xl cursor-pointer ">
        {/* <img src="path_to_your_logo.png" alt="Logo" className="logoImg" /> */}
        DoubtCom
      </div>
      <div id='middle' className="middle hidden w-3/5 md:flex justify-around ">
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300  ">Home</a>
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300">Feed</a>
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300">About</a>
        <a href="#" className="border-2 duration-150 hover:scale-110 hover:border-b-green-300">Contact</a>
      </div>
      <div id='right' className="right hidden w-1/3 md:flex gap-3 justify-end ">
        <button className="bg-green-300 px-5 py-3 rounded-full hover:scale-110 duration-150" onClick={onLogout}>Logout</button>
        <div id='nav-search' className='flex rounded-full overflow-hidden duration-150 hover:scale-105'  >
          <input type="text" placeholder='Search' className='p-3' />
        </div>
      </div>
      <div id="hamburger" className='md:hidden '>
        Hamburger
      </div>
    </nav>
  );
};

export default Navbar;