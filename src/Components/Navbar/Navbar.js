import React, { useState, useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { MainContext } from '../../lib/MainContext';
import { auth } from '../../lib/Firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import './Navbar.css';

function Navbar() {
  const { loggedIn } = useContext(MainContext);
  // const [loggedIn, setLoggedIn] = useState('');

  // onAuthStateChanged(auth, (user) => {
  //   console.log(user);
  //   user ? setLoggedIn(true) : setLoggedIn(false);
  // });
  // console.log(loggedIn);

  return (
    <>
      <ul className="navbar d-flex justify-content-between gap-5">
        <div className="d-flex justify-content-start gap-5">
          <li className="navbar-link">
            <NavLink
              onClick={(e) => !loggedIn && e.preventDefault()}
              to="/home"
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
