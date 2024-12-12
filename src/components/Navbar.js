import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/daily-tracker" className="nav-link" activeClassName="active">
            Daily Tracker
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/skincare" className="nav-link" activeClassName="active">
            Skincare
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/face-scan" className="nav-link" activeClassName="active">
            Face Scan
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
