import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';

function Dashboard() {
    const [rejectCount, setRejectCount] = useState(0);
    const [acceptCount, setAcceptCount] = useState(0);
    const [percentageAddAcceptData, setPercentageAddAcceptData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const rejectResponse = await axios.get('http://localhost:8070/harvestAndinventory/rejectCount');
            const acceptResponse = await axios.get('http://localhost:8070/harvestAndinventory/acceptCount');
            const percentageAddAcceptResponse = await axios.get('http://localhost:8070/harvestAndinventory/percentageAddAccept');

            setRejectCount(rejectResponse.data.count);
            setAcceptCount(acceptResponse.data.count);
            setPercentageAddAcceptData(percentageAddAcceptResponse.data);

            renderCharts(percentageAddAcceptResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderCharts = (data) => {
        const labels = data.map(item => item.tea_type);
        const percentages = data.map(item => item.percentage);

        const ctx = document.getElementById('percentageAddAcceptChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Percentage of Quantity (Add, Accept)',
                    data: percentages,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <div className="HI-dashboard-container">
            <div className="HI_count-box">
                <div className="HI-box">
                    <h3>Reject Count: {rejectCount}</h3>
                    <h3>Percentage of Quantity</h3>
                </div>
                <div className="box">
                    <h3>Accept Count: {acceptCount}</h3>
                    <h3>Calendar</h3>
                </div>
            </div>
            <div className="HI-chart-box">
                <canvas id="percentageAddAcceptChart" width="400" height="200"></canvas>
            </div>
            <div className="HI-calendar-box">
                <Calendar />
            </div>
        </div>
    );
}

export default Dashboard;
