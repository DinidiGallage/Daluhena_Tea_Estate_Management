import React from "react";
import { NavLink } from "react-router-dom";
import logoicon from '../images/logo.png';
import DashboardIcon from '../icons/dashboard.png';
import HomeIcon from '../icons/home1.png';
import AddNewIcon from '../icons/add.png';


function Header() {
    return (
        <nav className="side-nav">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                <img src={logoicon} alt="logoIcon" style={{ width: '100px', height: '100px' }} /> 
            </div>
            <div className="brand" style={{ color: "#1E421D", fontWeight: "bold", textAlign: "center", fontSize: "18px", marginBottom: "0px" }}>
                Employee & Attendance Management
            </div>
            <div className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" exact to="/">
                            <img src={HomeIcon} alt="Home" className="nav-icon home-icon" />
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/Dashboard">
                            <img src={DashboardIcon} alt="Dashboard" className="nav-icon" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/employee/add">
                            <img src={AddNewIcon} alt="add" className="nav-icon add-icon" />
                            Employee
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/EmployeeLeave/add">
                            <img src={AddNewIcon} alt="add" className="nav-icon add-icon" />
                            New Leave
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/EmployeeAttendance/add">
                            <img src={AddNewIcon} alt="add" className="nav-icon add-icon" />
                            Attendance
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
