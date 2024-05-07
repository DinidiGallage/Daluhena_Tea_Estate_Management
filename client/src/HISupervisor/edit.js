import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./editHarvestData.css"; // Import CSS file

function EditHarvestData() {
    const { id } = useParams(); // Get the ID from URL params
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [harvestData, setHarvestData] = useState({
        picker_id: '',
        expire_date: '',
        quantity: 0,
        tea_type: ''
    });
    const [teaTypes, setTeaTypes] = useState([]); // State to store tea types

    useEffect(() => {
        // Fetch existing harvested data and tea types when component mounts
        fetchHarvestData();
        fetchTeaTypes();
    }, []);

    const fetchHarvestData = async () => {
        try {
            // Make a GET request to retrieve harvested data by ID
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/editHarvestData/${id}`);
            // Convert date strings to JavaScript Date objects
            const { expire_date, ...rest } = response.data;
            setHarvestData({
                ...rest,
                expire_date: new Date(expire_date).toISOString().slice(0, 10)
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTeaTypes = async () => {
        try {
            // Make a GET request to retrieve tea types
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/teaTypes`);
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
            await axios.put(`http://localhost:8070/harvestAndinventory/updateHarvestData/${id}`, harvestData);
            // Navigate back to the previous page after successful update
            navigate(-1);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="edit-harvest-container">
            <h2>Edit Harvest Data</h2>
            <form onSubmit={handleSubmit} className="edit-harvest-form">
                <div>
                    <label className="form-label">Picker ID:</label>
                    <input type="text" name="picker_id" value={harvestData.picker_id} onChange={handleChange} className="form-input" />
                </div>
                <div>
                    <label className="form-label">Expire Date:</label>
                    <input type="date" name="expire_date" value={harvestData.expire_date} onChange={handleChange} className="form-input" />
                </div>
                <div>
                    <label className="form-label">Quantity:</label>
                    <input type="number" name="quantity" value={harvestData.quantity} onChange={handleChange} className="form-input" />
                </div>
                <div>
                    <label className="form-label">Tea Type:</label>
                    <select name="tea_type" value={harvestData.tea_type} onChange={handleChange} className="form-input">
                        <option value="">Select Tea Type</option>
                        {teaTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">Update</button>
            </form>
        </div>
    );
}

export default EditHarvestData;
