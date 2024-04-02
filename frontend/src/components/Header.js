import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <nav className="side-nav">
            <div className="brand" style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>
                    Employee & Attendance Management</div>
            <div className="navbar" >
                <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                        <NavLink  className="nav-link" activeClassName="active" to="/" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/Dashboard" >DashBoard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/employee/add" >Add Employee</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/EmployeeLeave/add" >Add Employee Leave</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/EmployeeAttendance/add" >Add Employee Attendance</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/all-employees" >All Employees</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
