// BarChart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './dashboard.css';
import { Link } from 'react-router-dom';

function BarChart() {
  const [differenceQuantityData, setDifferenceQuantityData] = useState([]);
  const [percentageAddAcceptData, setPercentageAddAcceptData] = useState([]);
  const [percentageMinusAcceptData, setPercentageMinusAcceptData] = useState([]);
  const [rejectCount, setRejectCount] = useState(0);
  const [acceptCount, setAcceptCount] = useState(0);
  const [pickerCount, setPickerCount] = useState(0);
  const [pickerId, setPickerId] = useState('');
  const [nic, setNic] = useState('');
  const [pickerData, setPickerData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teaType, setTeaType] = useState('');
  const [availableTeaTypes, setAvailableTeaTypes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const diffResponse = await axios.get('http://localhost:8070/harvestAndinventory/differenceQuantity');
      const addAcceptResponse = await axios.get('http://localhost:8070/harvestAndinventory/percentageAddAccept');
      const minusAcceptResponse = await axios.get('http://localhost:8070/harvestAndinventory/percentageMinusAccept');
      const rejectResponse = await axios.get('http://localhost:8070/harvestAndinventory/rejectCount');
      const acceptResponse = await axios.get('http://localhost:8070/harvestAndinventory/acceptCount');
      const pickerResponse = await axios.get('http://localhost:8070/harvestAndinventory/pickerCount');
      const teaTypesResponse = await axios.get('http://localhost:8070/harvestAndinventory/teaTypes');

      setDifferenceQuantityData(diffResponse.data);
      setPercentageAddAcceptData(addAcceptResponse.data);
      setPercentageMinusAcceptData(minusAcceptResponse.data);
      setRejectCount(rejectResponse.data.count);
      setAcceptCount(acceptResponse.data.count);
      setPickerCount(pickerResponse.data);
      setAvailableTeaTypes(teaTypesResponse.data);

      renderCharts(diffResponse.data, addAcceptResponse.data, minusAcceptResponse.data);
      fetchPickers();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPickers = async () => {
    try {
      const pickerResponse = await axios.get('http://localhost:8070/harvestAndinventory/viewAllPickers');
      setPickerData(pickerResponse.data);
    } catch (error) {
      console.error('Error fetching pickers:', error);
    }
  };

  const handleAddPicker = async () => {
    try {
      await axios.post('http://localhost:8070/harvestAndinventory/addpicker', {
        picker_id: pickerId,
        employee_nic: nic
      });
      setPickerId('');
      setNic('');
      fetchData();
    } catch (error) {
      console.error('Error adding picker:', error);
    }
  };

  const renderCharts = (diffData, addAcceptData, minusAcceptData) => {
    renderChart('differenceQuantityChart', diffData.map(item => item.tea_type), diffData.map(item => item.difference), 'Difference Quantity', 'rgba(54, 162, 235, 0.6)');
    renderChart('percentageAddAcceptChart', addAcceptData.map(item => item.tea_type), addAcceptData.map(item => item.percentage), 'Percentage of Quantity (Add)', 'rgba(255, 99, 132, 0.6)');
    renderChart('percentageMinusAcceptChart', minusAcceptData.map(item => item.tea_type), minusAcceptData.map(item => item.percentage), 'Percentage of Quantity (Minus)', 'rgba(75, 192, 192, 0.6)');
  };

  const renderChart = (chartId, labels, data, label, backgroundColor) => {
    const ctx = document.getElementById(chartId);

    if (ctx.chart) {
      ctx.chart.destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddTeaType = async () => {
    try {
      await axios.post('http://localhost:8070/harvestAndinventory/addTeaType', {
        type: teaType
      });
      setTeaType('');
      fetchData();
    } catch (error) {
      console.error('Error adding tea type:', error);
    }
  };
  return (
    <div className="dashboard-container">
      {/* Charts Section */}
      <div className="charts-section" style={{backgroundColor: "white"}}>
        <div className="chart-wrapper">
          <canvas id="differenceQuantityChart" width="400" height="200"></canvas>
        </div>
        <div className="chart-wrapper">
          <canvas id="percentageAddAcceptChart" width="400" height="200"></canvas>
        </div>
        <div className="chart-wrapper">
          <canvas id="percentageMinusAcceptChart" width="400" height="200"></canvas>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-section" style={{backgroundColor: "white"}}>
        <table className="HI-summary-table">
          <thead>
            <tr>
              <th>Reject Count</th>
              <th>Accept Count</th>
              <th>Picker Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{rejectCount}</td>
              <td>{acceptCount}</td>
              <td>{pickerCount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Forms Section */}
      <div className="forms-section" style={{backgroundColor: "white"}}>
        <div className="picker-form">
          <h3>Add Picker</h3>
          <input type="text" className="HI-input-field" placeholder="Picker ID" value={pickerId} onChange={(e) => setPickerId(e.target.value)} />
          <input type="text" className="HI-input-field" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} />
          <button className="btn" onClick={handleAddPicker}>Add Picker</button>
          <Link to="/PickersTable">
            <button className="btn">View Pickers</button>
          </Link>
        </div>

        <div className="tea-type-form">
          <table className="HI-tea-type-table">
            <thead>
              <tr>
                <th>Available Tea Types</th>
              </tr>
            </thead>
            <tbody>
              {availableTeaTypes.map((type, index) => (
                <tr key={index}>
                  <td>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Add Tea Type</h3>
          <input type="text" className="HI-input-field" placeholder="Tea Type" value={teaType} onChange={(e) => setTeaType(e.target.value)} />
          <button className="btn" onClick={handleAddTeaType}>Add Tea Type</button>
        </div>

        <div className="calendar-form">
          <h3>Calendar</h3>
          <Calendar className="HI-calendar" value={selectedDate} onChange={handleDateChange} />
        </div>
      </div>
    </div>
  );

}

export default BarChart;
