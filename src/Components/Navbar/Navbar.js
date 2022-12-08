import React, { useState, useContext, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { MainContext } from '../../lib/MainContext';
import { auth } from '../../lib/Firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  return (
    <>
      <ul className="navbar d-flex justify-content-between gap-5">
        <div className="d-flex justify-content-start gap-5">
          <li className="navbar-link">
            <NavLink
              onClick={(e) => !loggedIn && e.preventDefault()}
              to="/"
              style={({ isActive }) => ({
                color: isActive ? 'var(--white)' : 'var(--offwhite)',
              })}
            >
              Home
            </NavLink>
          </li>
          <li className="navbar-link">
            <NavLink
              onClick={(e) => !loggedIn && e.preventDefault()}
              to="/profile"
              style={({ isActive }) => ({
                color: isActive ? 'var(--white)' : 'var(--offwhite)',
              })}
            >
              Profile
            </NavLink>
          </li>
        </div>
        <li className="navbar-link">
          <NavLink to="/" onClick={() => signOut(auth)}>
            Sign Out
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Navbar;
