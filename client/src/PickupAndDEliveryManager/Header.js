import React from "react";
import { NavLink, Link } from "react-router-dom";
import '../Header.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faTools, faEye, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../PDimages/logo.png'; // Path to your logo

function Header() {
  return (
    <div className="sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3">
      <Link to="/" className="navbar-brand mb-3">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/DashboardPage" className="nav-link" activeClassName="active" aria-current="page">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/addDeliveryRequest" className="nav-link" activeClassName="active">
            <FontAwesomeIcon icon={faTools} className="me-2" /> Add Delivery Request
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ViewDeliveryRequestHistory" className="nav-link" activeClassName="active">
            <FontAwesomeIcon icon={faEye} className="me-2" /> View Delivery History
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/FullDeliveryReport" className="nav-link" activeClassName="active">
            <FontAwesomeIcon icon={faWrench} className="me-2" /> Reports
          </NavLink>
        </li>
      </ul>
      <div className="logout-item">
        <Link to="/WelcomePagePD" className="nav-link logout-link">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Log Out
        </Link>
      </div>
    </div>
  );
}

export default Header;
