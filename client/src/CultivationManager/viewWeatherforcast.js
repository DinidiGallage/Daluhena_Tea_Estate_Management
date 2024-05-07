import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // Import the CSS file
import './Backgroundimage.css';

function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:8070/Weatherforcast/fetch-onlypart-of-weather');
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    if (!weather) {
        return <p>Loading weather data...</p>;
    }

    return (
        <div className="weather-container">
            <table className="weather-table">
                <tbody>
                    <tr>
                        <th>Date</th>
                        <td>{weather.date}</td>
                    </tr>
                    <tr>
                        <th>Weather Condition</th>
                        <td>{weather.main}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{weather.description}</td>
                    </tr>
                    <tr>
                        <th>Temperature (K)</th>
                        <td>{weather.temp.toFixed(1)}</td> {/* Display temperature with 1 decimal place */}
                    </tr>
                    <tr>
                        <th>Lowest Temperature (K)</th>
                        <td>{weather.temp_min.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <th>Highest Temperature (K)</th>
                        <td>{weather.temp_max.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <th>Pressure (hPa)</th>
                        <td>{weather.pressure}</td>
                    </tr>
                    <tr>
                        <th>Humidity (%)</th>
                        <td>{weather.humidity}</td>
                    </tr>
                    <tr>
                        <th>Sunrise</th>
                        <td>{new Date(weather.sunrise * 1000).toLocaleTimeString()}</td>
                    </tr>
                    <tr>
                        <th>Sunset</th>
                        <td>{new Date(weather.sunset * 1000).toLocaleTimeString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Weather;
