import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const Home = () => {

  const location = useLocation();

  return (
    <> 
      <div className="bg-light p-5 rounded">
        <h1>Tasks Manager</h1>
        <p className="lead">Benvenuto nel tuo tasks manager</p>
      </div>
    </>
  )
}

export default Home;
