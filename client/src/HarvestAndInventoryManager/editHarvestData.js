import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editHarvestPageManager.css'; // Import CSS file

function EditHarvestPageManager() {
    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [harvestData, setHarvestData] = useState({
        picker_id: 0, // Changed to number input
        harvest_date: '',
        expire_date: '',
        quantity: 0,
        tea_type: ''
    });
    const [teaTypes, setTeaTypes] = useState([]); // State to store fetched tea types

    useEffect(() => {
        // Fetch existing harvested data and tea types when component mounts
        fetchHarvestData();
        fetchTeaTypes();
    }, []);

    const fetchHarvestData = async () => {
        try {
            // Make a GET request to retrieve harvested data by ID
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/harvestInventory/${id}`);
            const { picker_id, harvest_date, expire_date, quantity, tea_type } = response.data;

            // Format date strings to match the date input format (YYYY-MM-DD)
            const formattedHarvestDate = new Date(harvest_date).toISOString().split('T')[0];
            const formattedExpireDate = new Date(expire_date).toISOString().split('T')[0];

            // Set the state with the formatted data
            setHarvestData({
                picker_id,
                harvest_date: formattedHarvestDate,
                expire_date: formattedExpireDate,
                quantity,
                tea_type
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTeaTypes = async () => {
        try {
            // Make a GET request to retrieve tea types
            const response = await axios.get('http://localhost:8070/harvestAndinventory/teaTypes');
            setTeaTypes(response.data);
        } catch (error) {
            console.error('Error fetching tea types:', error);
        }
    };

    const handleChange = (e) => {
        // Update state with user input
        const { name, value } = e.target;
        setHarvestData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a PUT request to update harvested data by ID
            await axios.put(`http://localhost:8070/harvestAndinventory/updateHarvestDataFromManager/${id}`, harvestData);
            // Navigate back to the previous page after successful update
            navigate(-1);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="HI-edit-harvest-container">
            <h2>Edit Harvest Data</h2>
            <form className="HI-edit-harvest-form" onSubmit={handleSubmit}>
                <div className="HI-form-group">
                    <label>Picker ID:</label>
                    <input type="number" name="picker_id" value={harvestData.picker_id} onChange={handleChange} className="HI-form-control" />
                </div>
                <div className="HI-form-group">
                    <label>Harvest Date:</label>
                    <input type="date" name="harvest_date" value={harvestData.harvest_date} onChange={handleChange} className="HI-form-control" />
                </div>
                <div className="HI-form-group">
                    <label>Expire Date:</label>
                    <input type="date" name="expire_date" value={harvestData.expire_date} onChange={handleChange} className="HI-form-control" />
                </div>
                <div className="HI-form-group">
                    <label>Quantity:</label>
                    <input type="number" name="quantity" value={harvestData.quantity} onChange={handleChange} className="HI-form-control" />
                </div>
                <div className="HI-form-group">
                    <label>Tea Type:</label>
                    <select name="tea_type" value={harvestData.tea_type} onChange={handleChange} className="HI-form-control">
                        <option value="">Select Tea Type</option>
                        {teaTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditHarvestPageManager;
