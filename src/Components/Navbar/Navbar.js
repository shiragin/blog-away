import { Outlet, Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import Home from '../../pages/Home';
import User from '../../pages/User';

function Navbar({ to, title }) {
  return (
    <>
      <ul className="navbar d-flex justify-content-start gap-5">
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
            to="/user"
            style={({ isActive }) => ({
              color: isActive ? 'var(--white)' : 'var(--offwhite)',
            })}
          >
            User
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Navbar;
