import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./addHarvestData.css"; // Import CSS file

function AddHarvestData() {
  const [harvestData, setHarvestData] = useState({
    picker_id: '',
    harvest_date: new Date().toISOString().slice(0, 10),
    expire_date: '',
    quantity: '',
    tea_type: ''
  });
  const [teaTypes, setTeaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeaTypes();
  }, []);

  const fetchTeaTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8070/harvestAndinventory/teaTypes');
      setTeaTypes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tea types:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate quantity and picker_id to accept only numbers
    if ((name === 'quantity' || name === 'picker_id') && !(/^\d+$/.test(value))) {
      return; // Don't update state if input is not a number
    }

    // Ensure Expire Date is after Harvest Date
    if (name === 'expire_date') {
      if (new Date(value) < new Date(harvestData.harvest_date)) {
        alert('Expire Date must be after Harvest Date');
        return;
      }
    }

    setHarvestData({ ...harvestData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/harvestAndinventory/addharvest', harvestData);
      alert('Harvest data added successfully!');
      setHarvestData({
        picker_id: '',
        harvest_date: new Date().toISOString().slice(0, 10),
        expire_date: '',
        quantity: '',
        tea_type: ''
      }); // Clear form fields after successful submission
    } catch (error) {
      console.error('There was an error!', error);
      alert('Failed to add harvest data. Please try again later.');
    }
  };

  return (
    <div className="HI-add-harvest-container">
      <h2>Add Harvest Data</h2>
      <form onSubmit={handleSubmit} className="HI-harvest-form">
        <table>
          <tbody>
            <tr>
              <td>
                <label className="HI-form-label">Picker ID:</label>
              </td>
              <td>
                <input type="number" name="picker_id" value={harvestData.picker_id} onChange={handleChange} className="HI-form-input" />
              </td>
            </tr>
            <tr>
              <td>
                <label className="HI-">Harvest Date:</label>
              </td>
              <td>
                <input type="date" name="harvest_date" value={harvestData.harvest_date} onChange={handleChange} className="HI-form-input" />
              </td>
            </tr>
            <tr>
              <td>
                <label className="HI-">Expire Date:</label>
              </td>
              <td>
                <input type="date" name="expire_date" value={harvestData.expire_date} onChange={handleChange} className="HI-form-input" />
              </td>
            </tr>
            <tr>
              <td>
                <label className="HI-">Quantity:</label>
              </td>
              <td>
                <input type="number" name="quantity" value={harvestData.quantity} onChange={handleChange} className="HI-form-input" />
              </td>
            </tr>
            <tr>
              <td>
                <label className="HI-">Tea Type:</label>
              </td>
              <td>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <select name="tea_type" value={harvestData.tea_type} onChange={handleChange} className="HI-form-select">
                    <option value="">Select Tea Type</option>
                    {teaTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="HI-submit-button">Submit</button>
      </form>
    </div>
  );
}

export default AddHarvestData;
