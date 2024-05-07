import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import Clock from 'react-live-clock';
import './dashboard.css'; // Import CSS file

// Register Chart.js components
ChartJS.register(...registerables);

const EmployeeCountTable = () => {
    const [employeeCount, setEmployeeCount] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch employee count
                const employeeCountResponse = await axios.get('http://localhost:8070/cultivation/nic-count');
                setEmployeeCount(employeeCountResponse.data.totalNICs);

                // Fetch weather data
                const weatherResponse = await axios.get('http://localhost:8070/Weatherforcast/fetch-onlypart-of-weather');
                setWeatherData(weatherResponse.data);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            <div className="sections-container">
                <div className="dashboard-section calendar-container">
                    <h2 className="section-heading">Calendar</h2>
                    <div className="section-content">
                        <div className="calendar">
                            <Calendar />
                        </div>
                    </div>
                </div>

                <div className="dashboard-section time-container">
                    <h2 className="section-heading">Current Time</h2>
                    <div className="section-content">
                        <div className="time">
                            <Clock format={'HH:mm:ss'} ticking={true} timezone={'UTC'} />
                        </div>
                    </div>
                </div>

                <div className="dashboard-section weather-container">
                    <h2 className="section-heading">Weather</h2>
                    <div className="section-content">
                        {weatherData && (
                            <div className="weather-data">
                                <p>Date: {weatherData.date}</p>
                                <p>Main: {weatherData.main}</p>
                                <p>Description: {weatherData.description}</p>
                                <p>Temperature: {weatherData.temp}</p>
                                <p>Min Temperature: {weatherData.temp_min}</p>
                                <p>Max Temperature: {weatherData.temp_max}</p>
                                <p>Pressure: {weatherData.pressure}</p>
                                <p>Humidity: {weatherData.humidity}</p>
                                <p>Sunrise: {weatherData.sunrise}</p>
                                <p>Sunset: {weatherData.sunset}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add more sections here if needed */}
            </div>
        </div>
    );
};

export default EmployeeCountTable;

