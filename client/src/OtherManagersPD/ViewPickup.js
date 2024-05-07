import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutForOutside from './LayoutForOutside'; // Import LayoutForOutside
import './DeliveriesView.css'; // Import your CSS file

function DeliveriesView() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8070/delivery/deliveriesDataforView')
      .then(res => {
        setDeliveries(res.data);
      })
      .catch(err => console.error("Error fetching deliveries:", err));
  }, []);

  return (
    <LayoutForOutside className="pd-layout"> {/* Use LayoutForOutside for consistent page structure including the Header */}
      <div className="pd-content"> {/* Apply padding to the main content area */}
        <h2 className="pd-heading">Pickups</h2>
        <table className="pd-table">
          <thead>
            <tr>
              <th className="pd-table-header">Pickup Quantity</th>
              <th className="pd-table-header">Pickup Date</th>
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
    </LayoutForOutside>
  );
}

export default DeliveriesView;
