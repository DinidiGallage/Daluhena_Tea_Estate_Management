import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import your background image from the images folder
import backgroundImage from '../images/daluhenabg.png'; // Adjust the path if necessary

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    // Fetch employee count from backend API
    axios.get('http://localhost:8070/employee/count')
      .then(response => {
        setEmployeeCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching employee count:', error);
      });
  }, []);

  return (
    <div className="dashboard-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',backgroundAttachment: 'fixed', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div align="center" className="container mt-5" style={{ marginLeft: "220px" }}>
        <div className="tile">
          <h2> Total Employee Count : {employeeCount} </h2> 
        </div>
        
        <div className="tile">
          {/* Use Link to navigate to AllAttendanceDetails.js */}
          <Link to="/all-attendance-details">
            {/*all-attendance-details*/}
            <button className="btn "><h2> View All Employee Attendance </h2></button>  
          </Link>
        </div>

        <div className="tile">
          <Link to="/all-leave-details">
            <button className="btn btn"><h2> View All Employee Leave Status </h2></button> 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
