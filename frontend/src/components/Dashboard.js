import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";
import backgroundImage from '../images/DashboardBackground.png';

export default function Dashboard() {
  const [fertilizers, setFertilizers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);
  const [filters, setFilters] = useState({
    name: false,
    type: false,
    manufacturer: false,
    quantity: false,
    manufacturedDate: false,
    expiredDate: false
  });
  const chartRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:8070/fertilizer")
      .then(response => {
        setFertilizers(response.data);
        setFilteredFertilizers(response.data);
      })
      .catch(error => {
        console.error("Error fetching fertilizers:", error);
      });
  }, []);

  // Function to handle search
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = fertilizers.filter(fertilizer => {
      return (
        (filters.name && fertilizer.fertilizerName.toLowerCase().includes(term)) ||
        (filters.type && fertilizer.fertilizerType.toLowerCase().includes(term)) ||
        (filters.manufacturer && fertilizer.manufacturer.toLowerCase().includes(term)) ||
        (filters.quantity && String(fertilizer.quantity).includes(term)) ||
        (filters.manufacturedDate && fertilizer.manufacturedDate.toLowerCase().includes(term)) ||
        (filters.expiredDate && fertilizer.expiredDate.toLowerCase().includes(term))
      );
    });
    setFilteredFertilizers(filtered);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevState => ({ ...prevState, [name]: checked }));
  };

  // Function to get the list of columns to display based on selected checkboxes
  const getColumns = () => {
    const columns = [];
    if (filters.name) columns.push("Name");
    if (filters.type) columns.push("Type");
    if (filters.manufacturer) columns.push("Manufacturer");
    if (filters.quantity) columns.push("Quantity (kg)");
    if (filters.manufacturedDate) columns.push("Manufactured Date");
    if (filters.expiredDate) columns.push("Expired Date");
    return columns;
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById("myChart");
    const organicAmount = fertilizers.reduce((total, fertilizer) => {
      if (fertilizer.fertilizerType.toLowerCase() === "organic") {
        return total + fertilizer.quantity;
      }
      return total;
    }, 0);
    const mineralAmount = fertilizers.reduce((total, fertilizer) => {
      if (fertilizer.fertilizerType.toLowerCase() === "mineral") {
        return total + fertilizer.quantity;
      }
      return total;
    }, 0);
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Organic', 'Mineral'],
        datasets: [{
          label: 'Fertilizer Amount',
          data: [organicAmount, mineralAmount],
          backgroundColor: ['#1E421D', '#1E421D'],
          borderColor: ['#1E421D', '#1E421D'],
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
  }, [fertilizers]);

  return (
    <div className="transparent-box" style={{ marginLeft: "270px", paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px"}}>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px", paddingTop: "0", color: "white", 
          backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '40px 60px' }}>Welcome to Dashboard</h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search for available fertilizers..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginRight: "10px", padding: "8px", width: "calc(100% - 200px)" }}
          />
          <p style={{ fontSize: "0.9rem", marginTop: "5px", color: "#666" }}>
            Enter your query in the search box above. You can filter by selecting the checkboxes for the specific fields you want to include in the search.
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "20px" }}>
              <input
                type="checkbox"
                name="name"
                checked={filters.name}
                onChange={handleCheckboxChange}
              />
              Fertilizers
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="checkbox"
                name="type"
                checked={filters.type}
                onChange={handleCheckboxChange}
              />
              Type
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="checkbox"
                name="manufacturer"
                checked={filters.manufacturer}
                onChange={handleCheckboxChange}
              />
              Manufacturer
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="checkbox"
                name="quantity"
                checked={filters.quantity}
                onChange={handleCheckboxChange}
              />
              Quantity
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="checkbox"
                name="manufacturedDate"
                checked={filters.manufacturedDate}
                onChange={handleCheckboxChange}
              />
              Manufactured Date
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="checkbox"
                name="expiredDate"
                checked={filters.expiredDate}
                onChange={handleCheckboxChange}
              />
              Expired Date
            </label>
          </div>
        </div>
        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {getColumns().map(column => (
                <th key={column} style={{ border: "1px solid #dddddd", padding: "8px" }}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFertilizers.map(fertilizer => (
              <tr key={fertilizer._id}>
                {getColumns().map(column => (
                  <td key={column} style={{ border: "1px solid #dddddd", padding: "8px" }}>
                    {column === "Name" && fertilizer.fertilizerName}
                    {column === "Type" && fertilizer.fertilizerType}
                    {column === "Manufacturer" && fertilizer.manufacturer}
                    {column === "Quantity (kg)" && fertilizer.quantity}
                    {column === "Manufactured Date" && fertilizer.manufacturedDate}
                    {column === "Expired Date" && fertilizer.expiredDate}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      <div style={{ width: "300px", height: "150px" }}>
  <canvas id="myChart" style={{ width: "100%", height: "100%" }}></canvas>
</div>

      </div>
    </div>
  );
}
