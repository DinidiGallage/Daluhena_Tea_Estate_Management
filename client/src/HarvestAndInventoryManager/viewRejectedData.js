// RejectedHarvestDataTable.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./rejectedHarvestData.css"; // Import CSS file

function RejectedHarvestDataTable() {
    const [harvestData, setHarvestData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch rejected harvest data from the backend when component mounts
        fetchRejectedHarvestData();
    }, []);

    const fetchRejectedHarvestData = async () => {
        try {
            // Make a GET request to retrieve rejected harvested data
            const response = await axios.get('http://localhost:8070/harvestAndinventory/rejectedHarvestData');
            setHarvestData(response.data);
        } catch (error) {
            console.error('Error fetching rejected data:', error);
        }
    };

    const handleEdit = (id) => {
        // Navigate to the edit page with the specific ID
        navigate(`/EditRejectedHarvestPageManager/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Make a DELETE request to delete data based on ID
            await axios.delete(`http://localhost:8070/harvestAndinventory/deleteHarvestData/${id}`);
            // Fetch updated data after deletion
            fetchRejectedHarvestData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="rejected-harvest-container">
            <h2 className="rejected-harvest-heading">Rejected Harvest Data</h2>
            <table className="rejected-harvest-table">
                <thead>
                    <tr>
                        <th>Picker ID</th>
                        <th>Harvest Date</th>
                        <th>Expire Date</th>
                        <th>Quantity</th>
                        <th>Tea Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {harvestData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.picker_id}</td>
                            <td>{new Date(data.harvest_date).toISOString().slice(0, 10)}</td>
                            <td>{new Date(data.expire_date).toISOString().slice(0, 10)}</td>
                            <td>{data.quantity}</td>
                            <td>{data.tea_type}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(data._id)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(data._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RejectedHarvestDataTable;
