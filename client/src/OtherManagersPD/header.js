import React from "react";
import { NavLink, Link } from "react-router-dom";
import '../Header.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from "../PDimages/logo.png"; // Path to your logo

function Header() {
    return (
        <div className="sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3"style={{width: '280px'}}>
            <Link to="/" className="navbar-brand mb-3">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/MonthlyDeliveries" className="nav-link" activeClassName="active" aria-current="page">
                        <FontAwesomeIcon icon={faEye} className="me-2" /> View Monthly Deliveries
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/PickupsView" className="nav-link" activeClassName="active">
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> View Deliveries
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
