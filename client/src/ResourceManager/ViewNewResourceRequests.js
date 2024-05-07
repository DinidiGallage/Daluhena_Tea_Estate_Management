import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './acceptedDeliveries.css'; // Ensure the stylesheet is named correctly and located in the correct directory

function AcceptedDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [driverNICs, setDriverNICs] = useState([]);
  const [lorryNumbers, setLorryNumbers] = useState([]);

  useEffect(() => {
    // Fetch driver NICs from backend
    axios.get('http://localhost:8070/delivery/viewDrivers')
      .then(res => {
        setDriverNICs(res.data);
      })
      .catch(err => console.log(err));

    // Fetch lorry numbers from backend
    axios.get('http://localhost:8070/delivery/viewLorryNumbers')
      .then(res => {
        setLorryNumbers(res.data);
      })
      .catch(err => console.log(err));

    // Fetch accepted deliveries
    axios.get('http://localhost:8070/delivery/acceptedDeliveries')
      .then(res => {
        const dataWithFormattedDates = res.data.map(item => ({
          ...item,
          // Ensure delivery_date is converted correctly
          delivery_date: item.delivery_date ? new Date(item.delivery_date).toLocaleDateString() : 'No Date',
          editedFields: {
            driver_nic: item.driver_nic,
            lorry_number: item.lorry_number,
            delivery_status: item.delivery_status,
          }
        }));
        setDeliveries(dataWithFormattedDates);
      })
      .catch(err => console.log(err));
  }, []);

  const handleFieldChange = (id, fieldName, value) => {
    setDeliveries(currentDeliveries =>
      currentDeliveries.map(delivery =>
        delivery._id === id ? { ...delivery, editedFields: { ...delivery.editedFields, [fieldName]: value } } : delivery
      )
    );
  };

  const saveChanges = (id) => {
    const delivery = deliveries.find(delivery => delivery._id === id);
    axios.put(`http://localhost:8070/delivery/updateDeliveryResource/${id}`, delivery.editedFields)
      .then(() => {
        // Filter out the saved delivery
        setDeliveries(currentDeliveries => currentDeliveries.filter(delivery => delivery._id !== id));
      })
      .catch(err => {
        console.log(err);
        alert('Failed to update delivery.');
      });
  };
  if (!deliveries.length) return (
    <div className="pd-no-deliveries-container">
      <p className="pd-no-deliveries">There are no new deliveries.</p>
    </div>
  );
  
  return (
    <div>
      <table className="pm-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Date</th>
            <th>Driver NIC</th>
            <th>Lorry Number</th>
            <th>Delivery Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.delivery_quantity}</td>
              <td>{delivery.delivery_date}</td>
              <td>
                <select
                  className="pm-form-select"
                  value={delivery.editedFields.driver_nic}
                  onChange={(e) => handleFieldChange(delivery._id, 'driver_nic', e.target.value)}
                >
                  <option value="">Select Driver NIC</option>
                  {driverNICs.map(nic => (
                    <option key={nic} value={nic}>{nic}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="pm-form-select"
                  value={delivery.editedFields.lorry_number}
                  onChange={(e) => handleFieldChange(delivery._id, 'lorry_number', e.target.value)}
                >
                  <option value="">Select Lorry Number</option>
                  {lorryNumbers.map(number => (
                    <option key={number} value={number}>{number}</option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="pm-form-select"
                  value={delivery.editedFields.delivery_status}
                  onChange={(e) => handleFieldChange(delivery._id, 'delivery_status', e.target.value)}
                >
                  <option value="">Select Delivery Status</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </td>
              <td>
                <button className="pm-btn btn-primary" onClick={() => saveChanges(delivery._id)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AcceptedDeliveries;
