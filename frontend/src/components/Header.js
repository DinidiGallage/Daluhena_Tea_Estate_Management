import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="side-nav" style={{ backgroundColor: "#E1E587" }}>
            <div className="brand">
                <NavLink className="navbar-brand" to="/" style={{ color: "black" }}>Fertilizer And Supplier Management</NavLink>
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
                        <NavLink className="nav-link" activeClassName="active" to="/fertilizer/add" style={{ color: "#1E421D" }}>Fertilizers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/supplier/add" style={{ color: "#1E421D" }}>Suppliers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/purchase/add" style={{ color: "#1E421D" }}>Purchases</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;



