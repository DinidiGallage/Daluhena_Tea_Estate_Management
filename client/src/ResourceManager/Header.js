import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../Header.css"; // Make sure this path is correct to include your styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../PDimages/logo.png'; // Path to your logo

function Header() {
  return (
    <div className="sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3" style={{ width: '280px', height: '100vh' }}>
     <Link to="/" className="navbar-brand mb-3" style={{marginBottom: '3rem'}}>
        <img src={logo} alt="Logo" className="logo img-fluid" />
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/Dashboard" className="nav-link" activeClassName="active" aria-current="page">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/NewResourceRequest" className="nav-link" activeClassName="active">
            <FontAwesomeIcon icon={faHome} className="me-2" /> View New Resource Requests
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ViewResourceHistory" className="nav-link" activeClassName="active">
            <FontAwesomeIcon icon={faHistory} className="me-2" /> View Resource Request History
          </NavLink>
        </li>
      </ul>
      <div className="mt-auto">
        <Link to="/WelcomePagePD" className="nav-link logout-link">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Log Out
        </Link>
      </div>
    </div>
  );
}

export default Header;
