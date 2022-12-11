import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTweetContext } from '../../lib/TweetContext';
import { useUserContext } from '../../lib/UserContext';
import { auth } from '../../lib/Firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';

function Navbar() {
  const { filterTweets, setFilterTweets } = useTweetContext();

  const { savedName, setSavedName, setUser, setUserName, setUserImg } =
    useUserContext();

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
        </div>
        {loggedIn && (
          <div className="navbar-right d-flex justify-content-start gap-5">
            {loggedIn && savedName && (
              <li className="navbar-link">
                Logged in as <span className="navbar-name">{savedName}</span>
              </li>
            )}
            <NavDropdown title="Options ">
              <NavDropdown.Item as="li" className="navbar-link">
                <NavLink onClick={() => setFilterTweets(!filterTweets)}>
                  {filterTweets ? 'Show all tweets' : 'Show my tweets'}
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item as="li">
                <NavLink
                  onClick={(e) => !loggedIn && e.preventDefault()}
                  to="/profile"
                >
                  Profile
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="li" className="navbar-link">
                <NavLink
                  to="/"
                  onClick={() => {
                    setUserImg('');
                    setUserName('');
                    setUser('');
                    setSavedName('');
                    setFilterTweets(false);
                    signOut(auth);
                  }}
                >
                  Sign Out
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        )}
      </ul>
      <Outlet />
    </>
  );
}
export default Navbar;
