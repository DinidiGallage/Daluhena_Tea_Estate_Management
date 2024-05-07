import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeliveryRequest.css"; // Make sure to import your CSS file

export default function DeliveryRequest() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const getDeliveryRequests = async () => {
      try {
        const res = await axios.get("https://localhost:8070/delivery/");
        setDeliveries(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    getDeliveryRequests();
  }, []);

  return (
    <div className="pd-delivery-request-container">
      <table className="pd-delivery-table">
        <thead>
          <tr>
            <th className="pd-table-header">Delivery Date</th>
            <th className="pd-table-header">Tea Type</th>
            <th className="pd-table-header">Quantity</th> {/* Display delivery_quantity */}
            <th className="pd-table-header">Request Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery, index) => (
            <tr key={index} className="pd-table-row">
              <td>{delivery.delivery_date}</td>
              <td>{delivery.tea_type}</td>
              <td>{delivery.delivery_quantity}</td> {/* Display delivery_quantity */}
              <td>{delivery.request_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
