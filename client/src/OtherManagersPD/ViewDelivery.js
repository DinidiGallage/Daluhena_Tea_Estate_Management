import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeliveryRequest.css'; // Import your CSS file

function DeliveriesView() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Fetch deliveries data from the backend
    axios.get('http://localhost:8070/delivery/deliveriesDataforView') // Adjust the port if your backend runs on a different one
      .then(res => {
        setDeliveries(res.data); // Set fetched deliveries to state
      })
      .catch(err => console.error("Error fetching deliveries:", err));
  }, []);

  return (
    <div className="pd-deliveries-container">
      <h2 className="pd-heading">Deliveries</h2>
      <table className="pd-deliveries-table">
        <thead>
          <tr>
            <th className="pd-table-header">Delivery Quantity</th>
            <th className="pd-table-header">Delivery Date</th>
            <th className="pd-table-header">Tea Type</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery, index) => (
            <tr key={index} className="pd-table-row">
              <td>{delivery.delivery_quantity}</td>
              <td>{new Date(delivery.delivery_date).toLocaleDateString()}</td>
              <td>{delivery.tea_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeliveriesView;
