import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePage.css'; // Import the CSS file

const WelcomePage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Weather Forecast and Cultivation Management System</h1>
      <button className="welcome-btn" onClick={() => navigate('/dasboard')}>
        Weatherforcast and Cultivation Manager
      </button>
      <button className="welcome-btn" onClick={() => navigate('/EmployeeCountTable')}>
        Supervisor
      </button>
      <button className="welcome-btn" onClick={() => navigate('/Home')}>
      Home
      </button>
    </div>
  );
};

export default WelcomePage;
