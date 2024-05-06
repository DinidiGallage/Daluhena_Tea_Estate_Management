import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { date } = this.state;
    const hour = date.getHours();
    let greeting;
    if (hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    return (
      <div className="background">
        <div className="container-dashboard">
          <div className="jumbotron jumbotron-fluid">
            <h1 className="display-4 text-center">Welcome to Daluhena !!</h1>
            <p className="lead text-center">{greeting}, it's {date.toLocaleTimeString()}.</p>
          </div>
          <br></br><br></br>
          <div className="dashboard-content">
            <div className="card-container">
              <div className="card green-box">
                <Link to="/AddSalaryPackage" className="button-salary"><b>Salary</b></Link>
              </div>
              <div className="card green-box">
                <Link to="/final-reports" className="button-reports"><b>Final Reports</b></Link>
              </div>
              <div className="card green-box">
                <Link to="/Addexpense" className="button-expense"><b>Expenses</b></Link>
              </div>
              <div className="card green-box">
                <Link to="/AddSales" className="button-sales"><b>Sales</b></Link>
              </div>
            </div>
            <div className="calendar-container">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
