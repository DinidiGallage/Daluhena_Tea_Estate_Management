import React from "react";
import { NavLink, Link } from "react-router-dom";
import './Header.css'; // Import CSS file
import logo from '../WCimages/logo.png'; // Path to your logo

function Header() {
  return (
    <div className="WC-sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3">
      <Link to="/" className="navbar-brand mb-3">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul className="WC-nav-pills flex-column mb-auto">
        <li className="WC-nav-item">
          <NavLink to="/dasboard" className="WC-nav-link" activeClassName="active" aria-current="page">
            Dashboard
          </NavLink>
        </li>
        <li className="WC-nav-item">
          <NavLink to="/ScheduleTable" className="WC-nav-link" activeClassName="active">
            View Shedules
          </NavLink>
        </li>
        <li className="WC-nav-item">
          <NavLink to="/CultivationData" className="WC-nav-link" activeClassName="active">
            View Plant Data
          </NavLink>
        </li>
        <li className="WC-nav-item">
          <NavLink to="/TaskList" className="WC-nav-link" activeClassName="active">
            View Tasks
          </NavLink>
        </li>
        <li className="WC-nav-item">
          <NavLink to="/Weather" className="WC-nav-link" activeClassName="active">
            View Weather Forcasts
          </NavLink>
        </li>
        <li className="WC-nav-item">
          <NavLink to="/ReportGenerate" className="WC-nav-link" activeClassName="active">
            Generate Reports
          </NavLink>
        </li>
      </ul>
      <div className="WC-logout-item">
        <Link to="/WelcomePageCM" className="WC-logout-link">
          Log Out
        </Link>
      </div>
    </div>
  );
}

export default Header;
