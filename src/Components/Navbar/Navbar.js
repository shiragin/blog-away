import { Outlet, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
            to="/profile"
            style={({ isActive }) => ({
              color: isActive ? 'var(--white)' : 'var(--offwhite)',
            })}
          >
            Profile
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Navbar;
