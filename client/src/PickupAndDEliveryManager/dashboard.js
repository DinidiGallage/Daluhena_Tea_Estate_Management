import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [deliveryStatusCounts, setDeliveryStatusCounts] = useState({ labels: [], datasets: [{ data: [] }] });
  const [requestStatusCounts, setRequestStatusCounts] = useState({ labels: [], datasets: [{ data: [] }] });
  const [deliveryQuantityPercentage, setDeliveryQuantityPercentage] = useState({ labels: [], datasets: [{ data: [] }] });
  const [driverCount, setDriverCount] = useState(0);
  const [lorryCount, setLorryCount] = useState(0);
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [deliveringStatusCount, setDeliveringStatusCount] = useState(0);
  const [pendingDeliveryCount, setPendingDeliveryCount] = useState(0);
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    fetchDeliveryStatusCounts();
    fetchRequestStatusCounts();
    fetchDeliveryQuantityPercentage();
    fetchDriverCount();
    fetchLorryCount();
    fetchPendingRequestCount();
    fetchDeliveringStatusCount();
    fetchPendingDeliveryCount();
    fetchCalendarEvents();
  }, []);

  const fetchDeliveryStatusCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/deliveryStatusCounts');
      const labels = response.data.map(ds => ds._id);
      const data = response.data.map(ds => ds.count);
      setDeliveryStatusCounts({
        labels,
        datasets: [{
          label: 'Delivery Status Counts',
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      });
    } catch (error) {
      console.error('Error fetching delivery status counts:', error);
    }
  };

  const fetchRequestStatusCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/requestStatusCounts');
      const labels = response.data.map(rs => rs._id);
      const data = response.data.map(rs => rs.count);
      setRequestStatusCounts({
        labels,
        datasets: [{
          label: 'Request Status Counts',
          data,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        }]
      });
    } catch (error) {
      console.error('Error fetching request status counts:', error);
    }
  };

  const fetchDeliveryQuantityPercentage = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/deliveryQuantityPercentagePerTeaType');
      const labels = response.data.data.map(item => item.tea_type);
      const data = response.data.data.map(item => item.percentage);
      setDeliveryQuantityPercentage({
        labels,
        datasets: [{
          label: '% of Total Deliveries by Tea Type',
          data,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        }]
      });
    } catch (error) {
      console.error('Error fetching delivery quantity percentage:', error);
    }
  };

  const fetchDriverCount = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/countDrivers');
      setDriverCount(response.data.count);
    } catch (error) {
      console.error('Error fetching driver count:', error);
    }
  };

  const fetchLorryCount = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/countLorryNumbers');
      setLorryCount(response.data.count);
    } catch (error) {
      console.error('Error fetching lorry count:', error);
    }
  };

  const fetchPendingRequestCount = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/countPendingRequests');
      setPendingRequestCount(response.data.count);
    } catch (error) {
      console.error('Error fetching pending request count:', error);
    }
  };

  const fetchDeliveringStatusCount = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/countDeliveringStatus');
      setDeliveringStatusCount(response.data.count);
    } catch (error) {
      console.error('Error fetching delivering status count:', error);
    }
  };

  const fetchPendingDeliveryCount = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/countPendingDeliveries');
      setPendingDeliveryCount(response.data.count);
    } catch (error) {
      console.error('Error fetching pending delivery count:', error);
    }
  };

  const fetchCalendarEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8070/delivery/calendarEvents');
      const events = response.data.map(item => ({
        title: item.title,
        start: item.start_date,
        end: item.end_date,
      }));
      setCalendarEvents(events);
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
    }
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

  return (
    <div className="pm-dashboard">
      <div className="pm-dashboard-row">
        <div className="pm-chart-container">
          <h3 className="pm-chart-title">Delivery Status Counts</h3>
          <Doughnut data={deliveryStatusCounts} />
        </div>
        <div className="pm-chart-container">
          <h3 className="pm-chart-title">Request Status Counts</h3>
          <Bar data={requestStatusCounts} options={{ responsive: true }} />
        </div>
        <div className="pm-chart-container">
          <h3 className="pm-chart-title">Delivery Quantity Percentage Per Tea Type</h3>
          <Bar data={deliveryQuantityPercentage} options={{ responsive: true }} />
        </div>
      </div>
      <div className="pm-dashboard-row">
        <div className="pm-chart-container calendar-container">
          <DeliveryCalendar />
        </div>
       
          

      </div>
      <div className="pm-dashboard-row">
        <div className="pm-table-container">
          <h3 className="pm-table-title">"Pending" Request Count <br/>(Factory Manager)</h3>
          <table>
            <tbody>
              <tr>
                <th>Count</th>
              </tr>
              <tr>
                <td>{pendingRequestCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pm-table-container">
          <h3 className="pm-table-title">"Delivering" Status Count <br/>(Delivery Tracking)</h3>
          <table>
            <tbody>
              <tr>
                <th>Count</th>
              </tr>
              <tr>
                <td>{deliveringStatusCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pm-table-container">
          <h3 className="pm-table-title">"Pending" Delivery Count <br/>(Resource Manager)</h3>
          <table>
            <tbody>
              <tr>
                <th>Count</th>
              </tr>
              <tr>
                <td>{pendingDeliveryCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pm-table-container">
          <h3 className="pm-table-title">Drivers Count</h3>
          <table>
            <tbody>
              <tr>
                <th>Count</th>
              </tr>
              <tr>
                <td>{driverCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pm-table-container">
          <h3 className="pm-table-title">Lorries Count</h3>
          <table>
            <tbody>
              <tr>
                <th>Count</th>
              </tr>
              <tr>
                <td>{lorryCount}</td>
              </tr>
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
