import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ManagerDashboard.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ManagerDashboard = () => {

  const [maintenanceReportData, setMaintenanceData] = useState([]);
  const [repairReportData, setRepairData] = useState([]);

  const [maintenanceCounts, setMaintenanceCounts] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [repairCounts, setRepairCounts] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const maintenanceResponse = await axios.get(
          'http://localhost:8070/manager/maintenance'
        );
        const repairResponse = await axios.get(
          'http://localhost:8070/manager/repair'
        );

        setMaintenanceCounts({
          pending: maintenanceResponse.data.filter(
            (req) => req.status === 'Pending'
          ).length,
          inProgress: maintenanceResponse.data.filter(
            (req) => req.status === 'In Progress'
          ).length,
          completed: maintenanceResponse.data.filter(
            (req) => req.status === 'Completed'
          ).length,
        });

        setRepairCounts({
          pending: repairResponse.data.filter(
            (req) => req.status === 'Pending'
          ).length,
          inProgress: repairResponse.data.filter(
            (req) => req.status === 'In Progress'
          ).length,
          completed: repairResponse.data.filter(
            (req) => req.status === 'Completed'
          ).length,
        });
      } catch (err) {
        console.error('Error fetching counts:', err);
      }

    };
    
    const fetchData = async () => {
      const [maintenanceResponse, repairResponse] = await Promise.all([
          axios.get('http://localhost:8070/maintenance/'),
          axios.get('http://localhost:8070/repair/')
      ]);
      setMaintenanceData(maintenanceResponse.data);
      setRepairData(repairResponse.data);
    };

    fetchData();
    fetchCounts();
  }, []);

  const maintenanceData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          maintenanceCounts.pending,
          maintenanceCounts.inProgress,
          maintenanceCounts.completed,
        ],
        backgroundColor: ['#0066ff', '#fff347', '#0d9600'],
        hoverBackgroundColor: ['#0066ff', '#fff347', '#0d9600'],
      },
    ],
  };

  const repairData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          repairCounts.pending,
          repairCounts.inProgress,
          repairCounts.completed,
        ],
        backgroundColor: ['#0066ff', '#fff347', '#0d9600'],
        hoverBackgroundColor: ['#0066ff', '#fff347', '#0d9600'],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
    },
  };

  const downloadPDF = (endpoint, filename) => {
    var link = document.createElement("a");
    link.setAttribute("href", endpoint);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const handleDownloadMaintenancePDF = () => {
    downloadPDF('http://localhost:8070/maintenance/generatePDF', "maintenance_report.pdf");
};

const handleDownloadRepairPDF = () => {
    downloadPDF('http://localhost:8070/repair/generatePDF', "repair_report.pdf");
};

  return (
    <div className="mr-manager-dashboard">
      <h1>Manager Dashboard</h1>

        <div class="row">
            <div class="col-sm-6 ">
                <div class="d-flex justify-content-around mb-3">
                    <div class="p-2">
                        <Link to="/MRManager/maintenancerequests">
                            <div className="mr-button-card total-maintenance">
                                <p className="title">View Maintenance Requests</p>
                                <p className="count ">
                                {maintenanceCounts.pending}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div class="p-2">
                        <Link to="/MRManager/repairrequests">
                            <div className="mr-button-card total-repair">
                                <p className="title">View Repair Requests</p>
                                <p className="count">
                                {repairCounts.pending}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                
                {/* Status Button */}
                <div class="d-flex justify-content-around mb-3">
                    <div class="p-2">
                        <Link to="/MRManager/maintenancestatus">
                            <div className="mr-button-card total-maintenance-status">
                                <p className="title">Maintenance Status</p>
                            </div>
                        </Link>
                    </div>

                    <div class="p-2">
                        <Link to="/MRManager/repairstatus">
                            <div className="mr-button-card total-repair-status">
                                <p className="title">Repair Status</p>
                            </div>
                        </Link>
                    </div>
                </div>


                {/* 3 types of status buttons*/}
                <div class="d-flex justify-content-around mb-3">
                    <div class="p-2">
                        <Link to="/MRManager/maintenancepending">
                            <div className="button-status part-status" style={{border :'3px solid #1b32b4f1'}}>
                                <p className="title text-primary" >Pending Requests</p>
                            </div>
                        </Link>

                        <Link to="/MRManager/maintenanceinprogress">
                            <div className="button-status part-status mt-4" style={{border :'3px solid #999903' , }}>
                                <p className="title text-warning">In Progress Requests</p>
                            </div>
                        </Link>

                        <Link to="/MRManager/maintenancecompleted">
                            <div className="button-status part-status mt-4" style={{border :'3px solid #039915' , }}>
                                <p className="title text-success">Completed Requests</p>
                            </div>
                        </Link>
                    </div>

                    <div class="p-2">
                        <Link to="/MRManager/repairpending">
                            <div className="button-status part-status" style={{border :'3px solid #1b32b4f1'}}>
                                <p className="title text-primary" >Pending Requests</p>
                            </div>
                        </Link>

                        <Link to="/MRManager/repairinprogress">
                            <div className="button-status part-status mt-4" style={{border :'3px solid #999903' , }}>
                                <p className="title text-warning">In Progress Requests</p>
                            </div>
                        </Link>

                        <Link to="/MRManager/repaircompleted">
                            <div className="button-status part-status mt-4" style={{border :'3px solid #039915' , }}>
                                <p className="title text-success">Completed Requests</p>
                            </div>
                        </Link>
                    </div>                   
                </div>

                {/* Genarate Report Button */}
                <div class="d-flex justify-content-around mb-3">
                    <div class="p-2">
                        <button className="mr-button-card mr-genarate-report" onClick={handleDownloadMaintenancePDF}>
                            <p className="title">Maintenance Report</p>
                        </button>
                        
                    </div>

                    <div class="p-2">   
                        <button className="mr-button-card mr-genarate-report" onClick={handleDownloadRepairPDF}>
                            <p className="title">Repair Report</p>
                        </button>
                    </div>
                </div>

                
            </div>


            <div class="col-sm-6">
                <div class="d-flex justify-content-around mb-3">
                    <div class="p-2 w-100 status-overview">
                        <div className="card maintenance-overview">
                            <p className="title">Maintenance Request Counts</p>
                            <p className="status">Pending: {maintenanceCounts.pending}</p>
                            <p className="status">
                                In Progress: {maintenanceCounts.inProgress}
                            </p>
                            <p className="status">Completed: {maintenanceCounts.completed}</p>
                        </div>
                    </div>

                    <div class="p-2">
                        <div className="card maintenance-status">
                            <Pie data={maintenanceData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-around mb-3">
                    <div class="p-2 w-100 status-overview">
                        <div className="card repair-overview ">
                            <p className="title">Repair Request Counts</p>
                            <p className="status">Pending: {repairCounts.pending}</p>
                            <p className="status">In Progress: {repairCounts.inProgress}</p>
                            <p className="status">Completed: {repairCounts.completed}</p>
                        </div>
                    </div>

                    <div class="p-2">
                        <div className="card repair-status">
                            <Pie data={repairData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ManagerDashboard;

