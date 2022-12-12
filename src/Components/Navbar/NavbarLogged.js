import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/Firebase';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useTweetContext } from '../../lib/TweetContext';
import { useUserContext } from '../../lib/UserContext';

function NavbarLogged() {
  const { filterTweets, setFilterTweets } = useTweetContext();

  const { savedName, setSavedName, setUser, setUserName, setUserImg } =
    useUserContext();

  return (
    <ul
      className="navbar d-flex justify-content-between gap-5"
      style={{
        background: filterTweets ? 'var(--grey-blue)' : 'var(--grey)',
      }}
    >
      <div className="d-flex justify-content-start align-items-center gap-5">
        <li className="navbar-link navbar-title">BLOG AWAY</li>
        <li className="navbar-link">
          <NavLink
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
            to="/profile"
            style={({ isActive }) => ({
              color: isActive ? 'var(--white)' : 'var(--offwhite)',
            })}
          >
            Profile
          </NavLink>
        </li>
      </div>
      <div>{/* <Input.Group></Input.Group> */}</div>
      <div className="navbar-right d-flex justify-content-start gap-5">
        <NavDropdown title="Options ">
          <NavDropdown.Item className="navbar-link name" disabled>
            Logged in as
            <span className="navbar-name">
              {savedName ? ' ' + savedName : ' Anon'}
            </span>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as="li" className="navbar-link">
            <NavLink onClick={() => setFilterTweets(!filterTweets)}>
              {filterTweets ? 'Show all tweets' : 'Show my tweets'}
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item as="li">
            <NavLink to="/profile">Profile</NavLink>
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
    </ul>
  );
}
export default NavbarLogged;
