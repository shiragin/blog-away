import { signOut } from 'firebase/auth';
import { auth } from '../../lib/Firebase';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import Searchbar from './Searchbar';
import { useTweetContext } from '../../lib/TweetContext';
import { useUserContext } from '../../lib/UserContext';

function NavbarLogged() {
  const { filterTweets, setFilterTweets } = useTweetContext();

  const { savedName, userImg, setSavedName, setUser, setUserName, setUserImg } =
    useUserContext();

  return (
    <div
      className="navbar d-flex justify-content-between gap-4"
      style={{
        background: filterTweets ? 'var(--grey-blue)' : 'var(--grey)',
      }}
    >
      <div className="navbar-link">
        <NavLink to="/">
          <div className="navbar-title">BLOG AWAY</div>
        </NavLink>
      </div>

      <div className="navbar-right d-flex align-items-center justify-content-between gap-4">
        <Searchbar />
        <div className="d-flex align-items-center justify-content-between">
          <NavLink className="navbar-link">
            <img src={userImg} />
          </NavLink>
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
      </div>
    </div>
  );
}
export default NavbarLogged;
