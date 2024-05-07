import React from "react";
import { NavLink, Link } from "react-router-dom";
import './Header.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faTools, faEye, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../HIImages/logo.png'; // Path to your logo

function Header() {
  return (
    <div className="HI-sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3">
      <Link to="/" className="HI-navbar-brand mb-3">
        <img src={logo} alt="Logo" className="HI-logo" />
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="HI-nav-item">
          <NavLink to="/DashboardSupervisor" className="HI-nav-link" activeClassName="active" aria-current="page">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="HI-nav-item">
          <NavLink to="/AddHarvestData" className="HI-nav-link" activeClassName="active">
            <FontAwesomeIcon icon={faTools} className="me-2" /> Add Harvest Data
          </NavLink>
        </li>
        <li className="HI-nav-item">
          <NavLink to="/ViewHarvest" className="HI-nav-link" activeClassName="active">
            <FontAwesomeIcon icon={faEye} className="me-2" /> View Harvest Data
          </NavLink>
        </li>
        
       
      </ul>
      <div className="logout-item">
        <Link to="/HIWelcomePage" className="HI-nav-link logout-link">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Log Out
        </Link>
      </div>
    </div>
  );
}

export default Header;
