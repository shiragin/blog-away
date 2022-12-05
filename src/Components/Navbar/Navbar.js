import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <ul className="navbar d-flex justify-content-start gap-5">
        <li className="navbar-link active">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-link">
          <Link to="/user">User</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Navbar;
