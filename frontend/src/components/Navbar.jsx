// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <div className="wrapper">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/generos">Géneros</Link>
          </li>
          <li>
            <Link to="/directores">Directores</Link>
          </li>
          <li>
            <Link to="/productoras">Productoras</Link>
          </li>
          <li>
            <Link to="/tipos">Tipos</Link>
          </li>
          <li>
            <Link to="/media">Media</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
