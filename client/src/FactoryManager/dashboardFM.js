import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './dashboardFM.css';

const Dashboard = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tea Type Delivery Percentages',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8070/delivery/deliveriesByDate');
        const events = response.data.map(delivery => ({
          title: 'Delivery',
          start: delivery._id,
          color: '#58d68d',
          textColor: 'white',
        }));
        setCalendarEvents(events);
      } catch (error) {
        console.error('Failed to fetch calendar events:', error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/delivery/deliveryQuantityPercentagePerTeaType');
        const chartResponse = response.data;
        if (chartResponse.data) {
          const labels = chartResponse.data.map(item => item.tea_type);
          const percentages = chartResponse.data.map(item => item.percentage);

          // Assign colors dynamically based on tea type
          const backgroundColors = labels.map(type => {
            switch (type) {
              case 'Black Tea': return 'rgba(0, 0, 0, 0.7)';
              case 'Chinese Tea': return 'rgba(193, 66, 66, 0.7)';
              case 'Green Tea': return 'rgba(120, 177, 89, 0.7)';
              case 'Sri Lankan Tea': return 'rgba(249, 166, 2, 0.7)';
              default: return 'rgba(0, 0, 0, 0.7)';
            }
          });

          const borderColors = backgroundColors.map(color => color.replace('0.7', '1'));

          setChartData({
            labels,
            datasets: [{
              data: percentages,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            }],
          });
        }
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };

    fetchEvents();
    fetchChartData();
  }, []);

  // Dynamic tea types based on the chart data
  const teaTypes = chartData.labels;

  // Render rows for the tea types table
  const teaTypeRows = teaTypes.map((type, index) => (
    <tr key={index}>
      <td>{type}</td>
    </tr>
  ));

  return (
    <div className="pm-dashboard">
      <div className="pm-dashboard-sections">
        <div className="pm-section pm-calendar-section">
          <div className="pm-section management-calendar-section">
            <DeliveryManagementAndCalendar />
          </div>
        </div>
        <div className="pm-section pm-chart-section">
          <h2>Delivery Quantity Percentage by Tea Type</h2>
          <div className="pm-pie-container">
            <Pie data={chartData} />
          </div>
        </div>
        <div className="pm-section pm-tea-types-section">
          <h2>Available Tea Types</h2>
          <table className="pm-tea-types-table">
            <thead>
              <tr>
                <th>Tea Type</th>
              </tr>
            </thead>
            <tbody>
              {teaTypeRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DeliveryManagementAndCalendar = () => {
  return (
    <div className="pm-pageContainer">
      <div className="pm-fullCalendarContainer">
        <DeliveryCalendar />
      </div>
      <div className="pm-managementSections">
        {/* Placeholder components for DeliveryStatusSummaryChart and DeliveryManagement */}
      </div>
    </div>
  );
};

const DeliveryCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const fetchDeliveryDates = async () => {
      try {
        const response = await axios.get('http://localhost:8070/delivery/deliveriesByDate');
        const events = response.data.map(item => ({
          title: 'Delivery',
          start: item._id, // Assuming _id is the date. Adjust according to your actual data structure
          allDay: true,
        }));
        setCalendarEvents(events);
      } catch (error) {
        console.error('Failed to fetch delivery dates:', error);
      }
    };

    fetchDeliveryDates();
  }, []);

  return (
    <div className="pm-fullCalendarContainer">
      <h2 className="pm-sectionHeader">Delivery Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventColor="#378006"
      />
    </div>
  );
};

const DeliveryStatusSummaryChart = () => {
  return <div>Delivery Status Summary Chart</div>;
};

const DeliveryManagement = () => {
  return <div>Delivery Management</div>;
};

export default Dashboard;
