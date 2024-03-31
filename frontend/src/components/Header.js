import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="side-nav" style={{ backgroundColor: "#E1E587", width: "250px" }}>
           <div className="brand" style={{ padding: "20px 0", textAlign: "center" }}>
                <NavLink className="navbar-brand" to="/" style={{ color: "black", display: "block" }}>
                    <span style={{ display: "block" }}>Fertilizer And Supplier</span>
                    <span style={{ display: "block" }}>Management</span>
                </NavLink>
            </div>

            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/" style={{ color: "#1E421D" }}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/dashboard" style={{ color: "#1E421D" }}>Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/fertilizer/add" style={{ color: "#1E421D" }}>Add Fertilizers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/supplier/add" style={{ color: "#1E421D" }}>Add Suppliers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/purchase/add" style={{ color: "#1E421D" }}>Add Purchases</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;



