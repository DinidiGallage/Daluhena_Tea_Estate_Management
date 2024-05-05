import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Logo from '../../images/logo.png'; // Import your logo here

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <img src={Logo} alt="Daluhena Tea Estate Logo" className="home-logo" />
        <div className="home-title-container">
          <h1 className="home-title">Welcome to Daluhena Tea Estate</h1>
        </div>
      </div>
      <div className="home-tiles-container">
        <Tile title="Fertilizer and Supplier Management" />
        <Tile title="Employee and Attendance Management" to="/login"  />
        <Tile title="Harvest and Inventory Management" />
        <Tile title="Maintenance and Repairs Management" />
        <Tile title="Pickup and Delivery Management" />
        <Tile title="Buyer and Sales Management" />
        <Tile title="Financial Management" />
        <Tile title="Weather and Cultivation Advisory" />
      </div>
    </div>
  );
}

function Tile({ title, to }) {
  return (
    <div className="home-tile">
      <Link to={to}>
        <span>{title}</span>
      </Link>
    </div>
  );
}