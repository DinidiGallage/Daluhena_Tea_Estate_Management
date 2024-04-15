import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../images/Logo.png'; 
import homeIcon from '../images/Icons/home.png';
import fertilizerIcon from '../images/Icons/fertilizer.png';
import supplierIcon from '../images/Icons/supplier.png';
import purchaseIcon from '../images/Icons/purchase.png';
import dashboardIcon from '../images/Icons/dashboard.png';

function Header() {
    const location = useLocation();

    // Check if the current location is the home page
    const isHomePage = location.pathname === "/";

    return (
        <div>
            {!isHomePage && (
                <div className="side-nav">
                    <div className="brand" style={{ textAlign: "center", marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
                        <div style={{ color: "#1E421D", fontSize: "20px" }}>Fertilizer And Supplier</div>
                        <div style={{ color: "#1E421D", fontSize: "20px" }}>Management</div>
                    </div>
                    
                    <nav className="navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link exact className="nav-link" to="/">
                                    <img src={homeIcon} alt="Home" style={{ width: "20px", height: "20px", marginRight: "10px", marginLeft: "-30px" }} />
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    <img src={dashboardIcon} alt="Dashboard" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/fertilizers">
                                    <img src={fertilizerIcon} alt="Fertilizers" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Fertilizers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/suppliers">
                                    <img src={supplierIcon} alt="Suppliers" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Suppliers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/purchases">
                                    <img src={purchaseIcon} alt="Add Purchases" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                                    Purchases
                                </Link>
                            </li>
                            <li className="nav-item"> {/* Logout Button */}
                                <button className="logout-btn" onClick={() => { window.location.href = "/" }}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default Header;
