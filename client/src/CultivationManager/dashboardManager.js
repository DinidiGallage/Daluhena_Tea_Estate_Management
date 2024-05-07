import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import Clock from 'react-live-clock';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './dashboard.css'; // Import CSS file

// Register Chart.js components
ChartJS.register(...registerables);

const EmployeeCountTable = () => {
    const [employeeCount, setEmployeeCount] = useState(null);
    const [taskCompletionCounts, setTaskCompletionCounts] = useState({});
    const [scheduleCounts, setScheduleCounts] = useState({});
    const [employeeStatusCounts, setEmployeeStatusCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [taskCompletionData, setTaskCompletionData] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);
    const [employeeStatusData, setEmployeeStatusData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [scheduleTypes, setScheduleTypes] = useState([]);
    const [ScheduleType, setScheduleType] = useState('');
    const [deleteScheduleType, setDeleteScheduleType] = useState('');
    const [calendarDate, setCalendarDate] = useState(new Date()); // State to manage calendar date

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch employee count
                const employeeCountResponse = await axios.get('http://localhost:8070/cultivation/nic-count');
                setEmployeeCount(employeeCountResponse.data.totalNICs);

                // Fetch task completion counts
                const taskCompletionResponse = await axios.get('http://localhost:8070/cultivation/task-completion-count');
                setTaskCompletionCounts(taskCompletionResponse.data);

                // Fetch schedule counts
                const scheduleResponse = await axios.get('http://localhost:8070/cultivation/schedule-count');
                setScheduleCounts(scheduleResponse.data);

                // Fetch employee status counts
                const employeeStatusResponse = await axios.get('http://localhost:8070/cultivation/employee-status-count');
                setEmployeeStatusCounts(employeeStatusResponse.data);

                // Fetch weather data
                const weatherResponse = await axios.get('http://localhost:8070/Weatherforcast/fetch-onlypart-of-weather');
                setWeatherData(weatherResponse.data);

                const response = await fetch('http://localhost:8070/cultivation/scheduleType');
                const data = await response.json();
                setScheduleTypes(data.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
        fetchTaskCompletionData();
        fetchScheduleData();
        fetchEmployeeStatusData();
    }, []);

    const fetchTaskCompletionData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/cultivation/task-completion-count-percentage');
            setTaskCompletionData(response.data.percentages);
        } catch (error) {
            console.error('Error fetching task completion data:', error);
        }
    };

    const fetchScheduleData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/cultivation/schedule-count-percentage');
            setScheduleData(response.data.percentages);
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };

    const fetchEmployeeStatusData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/cultivation/employee-status-count-percentage');
            setEmployeeStatusData(response.data.percentages);
        } catch (error) {
            console.error('Error fetching employee status data:', error);
        }
    };
    const handleAddScheduleType = async () => {
        try {
            await axios.post('http://localhost:8070/cultivation/scheduleType', { type: ScheduleType });
            
            // After successful addition, fetch the schedule types again to update the UI
            fetchScheduleTypes();
            
            // Clear the input field
            setScheduleType('');
        } catch (error) {
            console.error('Error adding schedule type:', error);
        }
    };
    
    const handleDeleteScheduleType = async () => {
        try {
            await axios.delete(`http://localhost:8070/cultivation/scheduleType/${deleteScheduleType}`);
            // After successful deletion, you might want to fetch the schedule types again to update the UI
            fetchScheduleTypes();
            setDeleteScheduleType('');
        } catch (error) {
            console.error('Error deleting schedule type:', error);
        }
    };

    const fetchScheduleTypes = async () => {
        try {
            const response = await fetch('http://localhost:8070/cultivation/scheduleType');
            const data = await response.json();
            setScheduleTypes(data.data);
        } catch (error) {
            console.error('Error fetching schedule types:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                </div>
                <div className="dashboard-sections">
                    <div className="dashboard-section weather-container">
                        <h2 className="section-heading">Weather</h2>
                        <div className="section-content">
                            {weatherData && (
                                <table className="weather-table">
                                    <tbody>
                                        <tr>
                                            <td><strong>Date:</strong></td>
                                            <td>{weatherData.date}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Main:</strong></td>
                                            <td>{weatherData.main}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description:</strong></td>
                                            <td>{weatherData.description}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Temperature:</strong></td>
                                            <td>{weatherData.temp}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Min Temperature:</strong></td>
                                            <td>{weatherData.temp_min}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Max Temperature:</strong></td>
                                            <td>{weatherData.temp_max}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pressure:</strong></td>
                                            <td>{weatherData.pressure}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Humidity:</strong></td>
                                            <td>{weatherData.humidity}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Sunrise:</strong></td>
                                            <td>{weatherData.sunrise}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Sunset:</strong></td>
                                            <td>{weatherData.sunset}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    <div className="dashboard-section time-calendar-container">
                        <div className="dashboard-section time-container">
                            <h2 className="section-heading">Current Time</h2>
                            <div className="section-content">
                                <div className="time">
                                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'UTC'} />
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-section calendar-container">
                            <h2 className="section-heading">Calendar</h2>
                            <div className="section-content">
                                <div className="calendar">
                                    <Calendar
                                        onChange={setCalendarDate}
                                        value={calendarDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-section employee-count">
                        <h2 className="section-heading">Employee Count</h2>
                        <div className="section-content">
                            <table className="employee-count-table">
                                <tbody>
                                    <tr>
                                        <td><strong>Total Employees:</strong></td>
                                        <td>{employeeCount}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <div className="button-container">
                                                <Link to="/AddEmployeeModal" className="button green">Add Employee</Link>
                                                <Link to="/NICList" className="button green">View Employees</Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-section data-tables">
                <h2 className="section-heading">Data Tables</h2>
                <div className="section-content">
                    {Object.keys(taskCompletionCounts).length > 0 && (
                        <div className="table-container">
                            <div className="table-box">
                                <h3 className="table-heading">Task Completion Count</h3>
                                <table className="employee-table">
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(taskCompletionCounts).map(([status, count]) => (
                                            <tr key={status}>
                                                <td>{status}</td>
                                                <td>{count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {Object.keys(scheduleCounts).length > 0 && (
                        <div className="table-container">
                            <div className="table-box">
                                <h3 className="table-heading">Schedule Count</h3>
                                <table className="employee-table">
                                    <thead>
                                        <tr>
                                            <th>Schedule Type</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(scheduleCounts).map(([scheduleType, count]) => (
                                            <tr key={scheduleType}>
                                                <td>{scheduleType}</td>
                                                <td>{count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {Object.keys(employeeStatusCounts).length > 0 && (
                        <div className="table-container">
                            <div className="table-box">
                                <h3 className="table-heading">Employee Status Count</h3>
                                <table className="employee-table">
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(employeeStatusCounts).map(([status, count]) => (
                                            <tr key={status}>
                                                <td>{status}</td>
                                                <td>{count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {/* Display schedule types in a table */}
                    <div className="table-container">
                        <div className="table-box">
                            <h3 className="table-heading">Schedule Types</h3>
                            <table className="employee-table">
                                <thead>
                                    <tr>
                                        <th>Schedule Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scheduleTypes.map((type, index) => (
                                        <tr key={index}>
                                            <td>{type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-section data-visualization">
                <h2 className="section-heading">Data Visualization</h2>
                <div className="section-content">
                    {taskCompletionData && (
                        <div className="chart-container">
                            <div className="chart-box">
                                <h3 className="chart-title">Task Completion Status</h3>
                                <Pie data={{ labels: Object.keys(taskCompletionData), datasets: [{ data: Object.values(taskCompletionData) }] }} />
                            </div>
                        </div>
                    )}
                    {scheduleData && (
                        <div className="chart-container">
                            <div className="chart-box">
                                <h3 className="chart-title">Schedule Type</h3>
                                <Bar data={{ labels: Object.keys(scheduleData), datasets: [{ data: Object.values(scheduleData) }] }} />
                            </div>
                        </div>
                    )}
                    {employeeStatusData && (
                        <div className="chart-container">
                            <div className="chart-box">
                                <h3 className="chart-title">Employee Status</h3>
                                <Bar data={{ labels: Object.keys(employeeStatusData), datasets: [{ data: Object.values(employeeStatusData) }] }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeCountTable;
