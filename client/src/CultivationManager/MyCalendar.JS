import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const ChartComponent = ({ dataUrl, title }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(dataUrl);
        const percentages = response.data.percentages;

        const labels = Object.keys(percentages);
        const values = Object.values(percentages);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dataUrl]);

  return (
    <div>
      <h2>{title}</h2>
      <Pie data={chartData} />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ChartComponent
        dataUrl="http://localhost:8070/cultivation/task-completion-count-percentage"
        title="Task Completion Status"
      />
      <ChartComponent
        dataUrl="http://localhost:8070/cultivation/schedule-count-percentage"
        title="Schedule Type"
      />
      <ChartComponent
        dataUrl="http://localhost:8070/cultivation/employee-status-count-percentage"
        title="Employee Status"
      />
    </div>
  );
};

export default App;
