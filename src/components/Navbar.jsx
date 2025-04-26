import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">CGPA Calculator</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/semester-form" className="nav-link">
              Semester GPA
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aggregate-cgpa" className="nav-link">
              Aggregate CGPA
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
