import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  const [toggledSidebar, setToggledSidebar] = useState('');

  return (
    <main>
      <Outlet />
    </main>
  )
}

export default PublicLayout;
