import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div>
        <Navbar loggedIn={true}/>
        <Outlet />
        
      
    </div>
  )
}

export default Layout
