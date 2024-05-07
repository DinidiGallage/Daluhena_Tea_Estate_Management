import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../Header.css";  // Ensure you have this CSS file to style your components similarly to the examples given
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import logo from '../PDimages/logo.png';

function Header() {
  return (
    <div className="sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3" style={{width: '280px'}}>
      <Link to="/" className="navbar-brand mb-3" style={{marginBottom: '3rem'}}>
        <img src={logo} alt="Logo" className="logo img-fluid" />
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/DashboardPageFM" className="nav-link active" aria-current="page">
            <FontAwesomeIcon icon={faHome} className="me-2" />Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/NewDeliveryRequest" className="nav-link">
            <FontAwesomeIcon icon={faEdit} className="me-2" />Delivery Request
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/DeliveryHistory" className="nav-link">
            <FontAwesomeIcon icon={faEye} className="me-2" />View Delivery History
          </NavLink>
        </li>
        
      </ul>
      <div className="mt-auto">
        <Link to="/WelcomePagePD" className="logout-link">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Log Out
        </Link>
      </div>
    </div>
  );
}

export default Header;
