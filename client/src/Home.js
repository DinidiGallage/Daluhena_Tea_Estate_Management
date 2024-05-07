import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Logo from './PDimages/logo.png'; // Import your logo here

export default function Home() {
  return (
    <div className="home-container">
      <div className="header">
        <img src={Logo} alt="Daluhena Tea Estate Logo" className="logo" />
        <div className="title-container">
          <h1 className="title">Welcome to Daluhena Tea Estate</h1>
        </div>
      </div>
      <div className="tiles-container">
        <Tile title="Fertilizer and Supplier Management" to="/login" />
        <Tile title="Employee and Attendance Management" to="/emplogin" />
        <Tile title="Harvest and Inventory Management" to="/HIWelcomePage"/>
        <Tile title="Maintenance and Repairs Management" to="/WelcomePageMR" />
        <Tile title="Pickup Schedule and Delivery Management" to="/WelcomePagePD" />
        <Tile title="Buyer and Sales Management" />
        <Tile title="Financial Management" />
        <Tile title="Weather and Cultivation Advisory" to="/WelcomePageCM"/>
      </div>
    </div>
  );
}

function Tile({ title, to }) {
  return (
    <div className="tile">
      <Link to={to}>
        <h2>{title}</h2>
      </Link>
    </div>
  );
}