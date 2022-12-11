import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useMainContext } from '../../lib/MainContext';
import { auth } from '../../lib/Firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const { savedName, setSavedName, filterTweets, setFilterTweets } =
    useMainContext();
  const [loggedIn, setLoggedIn] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  });

  return (
    <>
      <ul
        className="navbar d-flex justify-content-between gap-5"
        style={{
          background: filterTweets ? 'var(--grey-blue)' : 'var(--grey)',
        }}
      >
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
          {/* <li className="navbar-link">
            <NavLink onClick={() => setFilterTweets(!filterTweets)}>
              {filterTweets ? 'All tweets' : 'My tweets'}
            </NavLink>
          </li> */}
        </div>
        <div className="d-flex justify-content-start gap-5">
          {loggedIn && savedName && (
            <li className="navbar-link">
              Logged in as <span className="navbar-name">{savedName}</span>
            </li>
          )}
          <li className="navbar-link">
            <NavLink onClick={() => setFilterTweets(!filterTweets)}>
              {filterTweets ? 'Show all tweets' : 'Show my tweets'}
            </NavLink>
          </li>
          <li className="navbar-link">
            <NavLink
              to="/"
              onClick={() => {
                setSavedName('');
                signOut(auth);
              }}
            >
              Sign Out
            </NavLink>
          </li>
        </div>
      </ul>
      <Outlet />
    </>
  );
}
export default Navbar;
