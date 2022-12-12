import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { auth } from '../../lib/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import NavbarLogged from './NavbarLogged';
import NavbarUnlogged from './NavbarUnlogged';
import './Navbar.css';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  });

  return (
    <div>
      {loggedIn ? <NavbarLogged /> : <NavbarUnlogged />}
      <Outlet />
    </div>
  );
}
export default Navbar;
