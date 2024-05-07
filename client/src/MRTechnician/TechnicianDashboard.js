import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TechnicianDashboard.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function TechnicianDashboard() {
    const [repairCount, setRepairCount] = useState(0);
    const [maintenanceCount, setMaintenanceCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            const repairResponse = await axios.get('http://localhost:8070/repair');
            const maintenanceResponse = await axios.get('http://localhost:8070/maintenance');
            setRepairCount(repairResponse.data.filter((req) => req.status === 'In Progress').length);
            setMaintenanceCount(maintenanceResponse.data.filter((req) => req.status === 'In Progress').length);
        };
        fetchCounts();
    }, []);

    const data = {
        labels: ['Repairs', 'Maintenance'],
        datasets: [
            {
                label: '# of Requests',
                data: [repairCount, maintenanceCount],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                ],
                borderColor: [
                    'rgba(255, 255, 255)',
                    'rgba(255, 255, 255)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 20,
                    padding: 15,
                }
            }
        },
        cutout: '65%',
    };

    return (
        <div className="technician-dashboard">
            <h1>Technician Dashboard</h1>
            
            <div class="row">
                <div class="col-sm-6">
                    <div class="d-flex justify-content-around mb-3">
                        <div class="p-2 buttons">
                            <Link to="/technician/maintenancerequest">
                                <div className="button-card total-maintenance">
                                    <p className="title text-white">View Maintenance Requests</p>
                                    <p className="count text-white">
                                    {maintenanceCount}
                                    </p>
                                </div>
                            </Link>
                        </div>

                        <div class="p-2 buttons">
                            <Link to="/technician/repairrequest">
                                <div className="button-card total-repair">
                                    <p className="title text-white">View Repair Requests</p>
                                    <p className="count text-white">
                                    {repairCount}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>

            <div>
                <h3>Request Chat</h3>
            </div>
            

            <div className="chart-container">
                <Doughnut data={data} options={options} />
            </div>

            
        </div>
        
    );
}

export default TechnicianDashboard;
