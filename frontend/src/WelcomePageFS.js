import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePageFM.css'; // Import the CSS file

const WelcomePage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Finance Management System</h1>
      <button className="welcome-btn" onClick={() => navigate('/Dashboard')}>
        Finanace Manager
      </button>
     
    </div>
  );
};

export default WelcomePage;
