import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faTools, faEye, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function MRHeader() {
  return (
    <div className="sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3">
      <Link to="/" className="navbar-brand mb-3">
        <strong>Daluhena</strong>
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/MREmployee" className="nav-link" aria-current="page">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Home
          </Link>
        </li>
        <li>
          <Link to="/MREmployee/addmaintenance" className="nav-link">
            <FontAwesomeIcon icon={faWrench} className="me-2" /> Add Maintenance
          </Link>
        </li>
        <li>
          <Link to="/MREmployee/addrepair" className="nav-link">
            <FontAwesomeIcon icon={faTools} className="me-2" /> Add Repair
          </Link>
        </li>
        <li>
          <Link to="/MREmployee/viewstatus" className="nav-link">
            <FontAwesomeIcon icon={faEye} className="me-2" /> View Status
          </Link>
        </li>
        <li>
          <Link to="/MREmployee/edit" className="nav-link">
            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        {/* Assuming logout might require more logic (e.g., clearing user session),
            keeping it as a button or a link without navigation. Implement logout functionality here. */}
        <button className="nav-link logout-link">
        <Link to="/WelcomePageMR" className="nav-link">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Log Out
          </Link>
        </button>
      </div>
    </div>
  );
}

export default MRHeader;




