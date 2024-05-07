import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./addDelivery.css";

export default function AddDeliveryRequest() {
  const [factory_name, setFactoryName] = useState("");
  const [tea_type, setTeaType] = useState("");
  const [delivery_date, setDeliveryDate] = useState(null);
  const [delivery_quantity, setDeliveryQuantity] = useState(0); // State for delivery quantity

  const handleFactoryNameChange = (event) => {
    setFactoryName(event.target.value);
  };

  const handleTeaTypeChange = (event) => {
    setTeaType(event.target.value);
  };

  const handleDateChange = (date) => {
    setDeliveryDate(date);
  };

  const handleDeliveryQuantityChange = (event) => { // Handler for delivery quantity change
    setDeliveryQuantity(parseInt(event.target.value));
  };

  const sendData = (e) => {
    e.preventDefault();
    const newDeliveryRequest = {
      factory_name,
      tea_type,
      delivery_date,
      delivery_quantity, // Include delivery quantity in the request
    };
    axios.post("http://localhost:8070/delivery/addDeliveryRequest", newDeliveryRequest) // Correct URL
      .then(() => {
        alert("Delivery Request Added");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const today = new Date(); // Get today's date

  return (
    <div className="pm-container">
      <form onSubmit={sendData} className="pm-form">
        <div className="pm-form-group">
          <label htmlFor="tea_type" className="pm-form-label">
            Tea Type
          </label>
          <select
            className="pm-form-select"
            id="tea_type"
            value={tea_type}
            onChange={handleTeaTypeChange}
          >
            <option value="">Select Tea Type</option>
            <option value="Black Tea">Black Tea</option>
            <option value="Green Tea">Green Tea</option>
            <option value="Chinese Tea">Chinese Tea</option>
            <option value="Sri Lankan Tea">Sri Lankan Tea</option>
          </select>
        </div>
        <div className="pm-form-group">
          <label htmlFor="delivery_quantity" className="pm-form-label">
            Delivery Quantity
          </label>
          <input
            type="number"
            className="pm-form-control"
            id="delivery_quantity"
            value={delivery_quantity} // Bind value to state
            onChange={handleDeliveryQuantityChange} // Add onChange handler
          />
        </div>
        <div className="pm-form-group">
          <label htmlFor="delivery_date" className="pm-form-label">
            Delivery Date
          </label>
          <DatePicker
            className="pm-form-control"
            selected={delivery_date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={today} // Set minimum date to today
          />
        </div>
       
        <button type="submit" className="pm-btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
