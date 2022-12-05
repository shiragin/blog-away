import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar d-flex justify-content-start gap-5">
      <a href="#" className="navbar-link active">
        Home
      </a>
      <a href="#" className="navbar-link">
        Profile
      </a>
    </div>
  );
}

export default Navbar;
