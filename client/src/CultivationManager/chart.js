import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(...registerables);

const Dashboard = () => {
  const [taskCompletionData, setTaskCompletionData] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [employeeStatusData, setEmployeeStatusData] = useState(null);

  useEffect(() => {
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

  return (
    <div className="dashboard">
      <div className="chart-container">
        <h3 className="chart-title">Task Completion Status</h3>
        {taskCompletionData && <Pie data={{ labels: Object.keys(taskCompletionData), datasets: [{ data: Object.values(taskCompletionData) }] }} />}
      </div>
      <div className="chart-container">
        <h3 className="chart-title">Schedule Type</h3>
        {scheduleData && <Bar data={{ labels: Object.keys(scheduleData), datasets: [{ data: Object.values(scheduleData) }] }} />}
      </div>
      <div className="chart-container">
        <h3 className="chart-title">Employee Status</h3>
        {employeeStatusData && <Bar data={{ labels: Object.keys(employeeStatusData), datasets: [{ data: Object.values(employeeStatusData) }] }} />}
      </div>
    </div>
  );
};

export default Dashboard;
