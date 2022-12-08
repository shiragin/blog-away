import React, { useState, useContext, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { MainContext } from '../../lib/MainContext';
import { auth, db } from '../../lib/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const { userName, setUserName, user } = useContext(MainContext);
  const [loggedIn, setLoggedIn] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
    getSavedName();
  }, []);

  async function getSavedName() {
    const userRef = doc(db, 'users', user);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      setSavedName(docSnap.data().userName);
    } else {
      console.log('No such document!');
    }
  }

  console.log(user, savedName);

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
        <div className="d-flex justify-content-start gap-5">
          <li className="navbar-link">Logged in as {userName}</li>
          <li className="navbar-link">
            <NavLink to="/" onClick={() => signOut(auth)}>
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
