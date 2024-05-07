import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Bar } from 'react-chartjs-2';
import './dashboard.css';

function DeliveryManagement() {
    const [drivers, setDrivers] = useState([]);
    const [lorryNumbers, setLorryNumbers] = useState([]);
    const [newDriverNIC, setNewDriverNIC] = useState('');
    const [newLorryNumber, setNewLorryNumber] = useState('');
    const [driverCount, setDriverCount] = useState(0);
    const [lorryNumberCount, setLorryNumberCount] = useState(0);

    useEffect(() => {
        fetchDrivers();
        fetchLorryNumbers();
        fetchDriverCount();
        fetchLorryNumberCount();
    }, []);

    function fetchDrivers() {
        axios.get('http://localhost:8070/delivery/viewDrivers')
            .then(response => setDrivers(response.data))
            .catch(error => console.error("There was an error fetching the drivers: ", error));
    }

    function fetchLorryNumbers() {
        axios.get('http://localhost:8070/delivery/viewLorryNumbers')
            .then(response => setLorryNumbers(response.data))
            .catch(error => console.error("There was an error fetching the lorry numbers: ", error));
    }

    function fetchDriverCount() {
        axios.get('http://localhost:8070/delivery/countDrivers')
            .then(response => setDriverCount(response.data.count))
            .catch(error => console.error("There was an error fetching the driver count: ", error));
    }

    function fetchLorryNumberCount() {
        axios.get('http://localhost:8070/delivery/countLorryNumbers')
            .then(response => setLorryNumberCount(response.data.count))
            .catch(error => console.error("There was an error fetching the lorry number count: ", error));
    }

    function addDriver() {
        axios.post('http://localhost:8070/delivery/addDriver', { driver_nic: newDriverNIC })
            .then(() => {
                setNewDriverNIC('');
                fetchDrivers();
            })
            .catch(error => console.error("There was an error adding the driver: ", error));
    }

    function addLorryNumber() {
        axios.post('http://localhost:8070/delivery/addLorryNumber', { lorry_number: newLorryNumber })
            .then(() => {
                setNewLorryNumber('');
                fetchLorryNumbers();
            })
            .catch(error => console.error("There was an error adding the lorry number: ", error));
    }

    function deleteDriver(driverNIC) {
        axios.delete(`http://localhost:8070/delivery/deleteDriver/${driverNIC}`)
            .then(() => fetchDrivers())
            .catch(error => console.error("There was an error deleting the driver: ", error));
    }

    function deleteLorryNumber(lorryNumber) {
        axios.delete(`http://localhost:8070/delivery/deleteLorryNumber/${lorryNumber}`)
            .then(() => fetchLorryNumbers())
            .catch(error => console.error("There was an error deleting the lorry number: ", error));
    }

    return (
        <div className="pm-sectionContainer">
            <h2 className="pm-sectionHeader">Delivery Management</h2>
            <div className="pm-managementSection">
                <h3>Available Drivers</h3>
                <p>Total Drivers: {driverCount}</p>
                <table className="pm-styled-table">
                    <thead>
                        <tr>
                            <th>Driver NIC</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver, index) => (
                            <tr key={index}>
                                <td>{driver}</td>
                                <td>
                                    <button className="pm-deleteButton" onClick={() => deleteDriver(driver)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pm-addForm">
                    <input
                        className="pm-addInput"
                        value={newDriverNIC}
                        onChange={(e) => setNewDriverNIC(e.target.value)}
                        placeholder="Add Driver NIC"
                    />
                    <button className="pm-addButton" onClick={addDriver}>Add</button>
                </div>
            </div>
            <div className="pm-managementSection">
                <h3>Available Lorry Numbers</h3>
                <p>Total Lorry Numbers: {lorryNumberCount}</p>
                <table className="pm-styled-table">
                    <thead>
                        <tr>
                            <th>Lorry Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lorryNumbers.map((number, index) => (
                            <tr key={index}>
                                <td>{number}</td>
                                <td>
                                    <button className="pm-deleteButton" onClick={() => deleteLorryNumber(number)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pm-addForm">
                    <input
                        className="pm-addInput"
                        value={newLorryNumber}
                        onChange={(e) => setNewLorryNumber(e.target.value)}
                        placeholder="Add Lorry Number"
                    />
                    <button className="pm-addButton" onClick={addLorryNumber}>Add</button>
                </div>
            </div>
        </div>
    );
}

function DeliveryCalendar() {
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
        <div className="fullCalendarContainer">
            <h2 className="sectionHeader">Delivery Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventColor="#378006"
            />
        </div>
    );
}

function DeliveryStatusSummaryChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Delivery Status Summary',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', // Darker red
                    'rgba(54, 162, 235, 0.8)', // Darker blue
                    'rgba(255, 206, 86, 0.8)', // Darker yellow
                    'rgba(75, 192, 192, 0.8)', // Darker green
                    'rgba(153, 102, 255, 0.8)', // Darker purple
                    'rgba(255, 159, 64, 0.8)'  // Darker orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Darker red border
                    'rgba(54, 162, 235, 1)', // Darker blue border
                    'rgba(255, 206, 86, 1)', // Darker yellow border
                    'rgba(75, 192, 192, 1)', // Darker green border
                    'rgba(153, 102, 255, 1)', // Darker purple border
                    'rgba(255, 159, 64, 1)'  // Darker orange border
                ],
                borderWidth: 1
            }
        ]
    });

    useEffect(() => {
        fetchDeliveryStatusSummary();
    }, []);

    const fetchDeliveryStatusSummary = async () => {
        try {
            const response = await axios.get('http://localhost:8070/delivery/deliveryStatusSummary');
            const statusLabels = Object.keys(response.data);
            const statusCounts = Object.values(response.data);
            setChartData(prevState => ({
                ...prevState,
                labels: statusLabels,
                datasets: [{ ...prevState.datasets[0], data: statusCounts }]
            }));
        } catch (error) {
            console.error('Error fetching delivery status summary:', error);
        }
    };

    return (
        <div>
            <h2>Delivery Status Summary</h2>
            <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
    );
}

function DeliveryManagementAndCalendar() {
    return (
      <div className="pageContainer">
        <div className="fullCalendarContainer">
          <DeliveryCalendar />
        </div>
        <div className="">
          <div className="managementSection">
            <DeliveryStatusSummaryChart />
          </div>
          <div className="managementSection">
            <DeliveryManagement />
          </div>
        </div>
      </div>
    );
  }
  
  
  export default DeliveryManagementAndCalendar;

