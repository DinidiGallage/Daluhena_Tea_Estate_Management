import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faMoneyBillWave, faFileInvoiceDollar,
  faPlusSquare, faListAlt, faSignOutAlt, faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { faSalesforce } from '@fortawesome/free-brands-svg-icons'; // Corrected import for Salesforce icon
import logo from "./images/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState({
    salaryPackages: false,
    expenses: false,
    sales: false,
    employeeDetails: false
  });

  const toggleDropdown = (dropdown) => {
    setIsOpen(prevState => ({
      ...prevState,
      [dropdown]: !prevState[dropdown]
    }));
  };

  return (
    <div className="sidebar-container bg-light d-flex flex-column flex-shrink-0 p-3">
      <Link to="/dashboard" className="navbar-brand mb-3">
      <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => toggleDropdown('salaryPackages')}>
            <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" /> Salary Packages
            <FontAwesomeIcon icon={faCaretDown} className="ms-auto" />
          </a>
          {isOpen.salaryPackages && (
            <ul className="submenu">
              <li><Link to="/AddSalaryPackage" className="nav-link">Add Salary Package</Link></li>
              <li><Link to="/ViewSalaryPackages" className="nav-link">View Salary Packages</Link></li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => toggleDropdown('expenses')}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" /> Expenses
            <FontAwesomeIcon icon={faCaretDown} className="ms-auto" />
          </a>
          {isOpen.expenses && (
            <ul className="submenu">
              <li><Link to="/AddExpense" className="nav-link">Add Expense</Link></li>
              <li><Link to="/ViewExpenses" className="nav-link">View Expenses</Link></li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => toggleDropdown('sales')}>
            <FontAwesomeIcon icon={faSalesforce} className="me-2" /> Sales
            <FontAwesomeIcon icon={faCaretDown} className="ms-auto" />
          </a>
          {isOpen.sales && (
            <ul className="submenu">
              <li><Link to="/AddSales" className="nav-link">Add Sale</Link></li>
              <li><Link to="/ViewSales" className="nav-link">View Sales</Link></li>
            </ul>
          )}
       
        </li>
        
        <li className="nav-item">
          <Link to="/final_reports" className="nav-link">
            <FontAwesomeIcon icon={faListAlt} className="me-2" /> Final Reports
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <button className="nav-link logout-link" onClick={() => { console.log("Logging out..."); }}>
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Log Out
        </button>
      </div>
    </div>
  );
}

export default Header;
