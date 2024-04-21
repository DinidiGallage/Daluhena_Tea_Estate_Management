import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './dashboard.css'; // Import the CSS file

class Dashboard extends React.Component {
  render() {
    return (
      
      <div className="container2">
        <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4"><center>Welcome to Daluhena !!</center></h1>
    
  </div>
</div>
        
        <br></br><br></br><br></br><br></br>
        <div className="dashboard-content">
          <div className="card green-box">
            {/* Use Link to navigate to Salary page */}
            <Link to="/AddSalaryPackage" className="button-salary">Salary</Link>
          </div>
          <div className="card green-box">
            {/* Use Link to navigate to Reports page */}
            <Link to="/final-reports" className="button-reports">Final Reports</Link>
          </div>

          <div className="card green-box">
            {/* Use Link to navigate to Reports page */}
            <Link to="/Addexpenses" className="button-expense">Expenses</Link>
          </div>

          
          <div className="card green-box">
            {/* Use Link to navigate to Reports page */}
            <Link to="/AddSales" className="button-sales">Sales</Link>
          </div>

        
        </div>
      </div>
    );
  }
}

export default Dashboard;
