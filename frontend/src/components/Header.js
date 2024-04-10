import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../images/Logo.png'; 
import homeIcon from '../images/Icons/home.png';
import fertilizerIcon from '../images/Icons/fertilizer.png';
import supplierIcon from '../images/Icons/supplier.png';
import purchaseIcon from '../images/Icons/purchase.png';
import dashboardIcon from '../images/Icons/dashboard.png';

function Header() {
    return (
        <div className="side-nav">
            <div className="brand" style={{ textAlign: "center", marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
                <div style={{ color: "#1E421D", fontSize: "20px" }}>Fertilizer And Supplier</div>
                <div style={{ color: "#1E421D", fontSize: "20px" }}>Management</div>
            </div>
            
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/">
                            <img src={homeIcon} alt="Home" style={{ width: "20px", height: "20px", marginRight: "10px", marginLeft: "-30px" }} />
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/dashboard">
                            <img src={dashboardIcon} alt="Dashboard" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/fertilizer/add">
                            <img src={fertilizerIcon} alt="Add Fertilizers" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                            Fertilizers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/supplier/add">
                            <img src={supplierIcon} alt="Add Suppliers" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                            Suppliers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/purchase/add">
                            <img src={purchaseIcon} alt="Add Purchases" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                            Purchases
                        </NavLink>
                    </li>
                    <li className="nav-item"> {/* Logout Button */}
                        <button className="logout-btn">Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
