import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Daluhena Tea Estate</h1>
      <div className="tiles-container">
        <Tile title="Fertilizer and Supplier Management" to="/login" />
        <Tile title="Employee and Attendance Management" />
        <Tile title="Harvest and Inventory Management" />
        <Tile title="Maintenance and Repairs Management" />
        <Tile title="Pickup Schedule and Delivery Management" />
        <Tile title="Buyer and Sales Management" />
        <Tile title="Financial Management" />
        <Tile title="Weather and Cultivation Advisory" />
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
