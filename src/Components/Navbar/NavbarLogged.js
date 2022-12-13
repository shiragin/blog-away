import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/Firebase';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import Searchbar from './Searchbar';
import { useTweetContext } from '../../lib/TweetContext';
import { useUserContext } from '../../lib/UserContext';

function NavbarLogged() {
  const { filterTweets, setFilterTweets, search, setSearch, fetchData } =
    useTweetContext();

  const { savedName, userImg, setSavedName, setUser, setUserName, setUserImg } =
    useUserContext();

  const [ImgLoading, setImgLoading] = useState(true);

  return (
    <div
      className="navbar d-flex justify-content-between gap-4"
      style={{
        background: filterTweets ? 'var(--grey-blue)' : 'var(--grey)',
      }}
    >
      <div className="navbar-link d-flex align-items-center gap-5">
        <NavLink
          to="/"
          onClick={() => {
            setSearch({ type: search.type, input: search.input, on: false });
          }}
        >
          <div className="navbar-title">BLOG AWAY</div>
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            color: isActive ? 'var(--white)' : 'var(--offwhite)',
          })}
        >
          Profile
        </NavLink>
      </div>
      <div className="navbar-right d-flex align-items-center justify-content-between gap-4">
        <Searchbar />
        <div className="d-flex align-items-center justify-content-between">
          <NavLink className="navbar-link">
            <img
              src={userImg}
              style={{ display: ImgLoading ? 'none' : 'block' }}
              onLoad={() => setImgLoading(false)}
            />
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
