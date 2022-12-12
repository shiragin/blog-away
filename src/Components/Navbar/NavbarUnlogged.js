import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/Firebase';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useTweetContext } from '../../lib/TweetContext';
import { useUserContext } from '../../lib/UserContext';

function NavbarUnlogged() {
  const { filterTweets, setFilterTweets } = useTweetContext();

  const {
    savedName,
    setSavedName,
    setUser,
    setUserName,
    setUserImg,
    logType,
    setLogType,
  } = useUserContext();

  return (
    <ul
      className="navbar d-flex align-items-center justify-content-between gap-5"
      style={{
        background: filterTweets ? 'var(--grey-blue)' : 'var(--grey)',
      }}
    >
      <li className="navbar-link navbar-title">BLOG AWAY</li>
      <div className="d-flex justify-content-end align-items-center gap-5">
        <li className="navbar-link">
          <NavLink
            onClick={() => setLogType('signup')}
            to="/login"
            style={({ isActive }) => ({
              color: isActive ? 'var(--white)' : 'var(--offwhite)',
            })}
          >
            Sign Up
          </NavLink>
        </li>
        <li className="navbar-link">
          <NavLink
            onClick={() => setLogType('login')}
            to="/login"
            style={({ isActive }) => ({
              color: isActive ? 'var(--white)' : 'var(--offwhite)',
            })}
          >
            Log In
          </NavLink>
        </li>
      </div>
    </ul>
  );
}

export default NavbarUnlogged;
