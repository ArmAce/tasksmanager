import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

import Navbar from "../components/Navbar";

const AuthLayout = () => {
  
  return (
    <div>
      <Navbar/>
      
      <main className="container p-5">
        <Outlet />
      </main>
        
    </div>
  )
}

export default AuthLayout;
