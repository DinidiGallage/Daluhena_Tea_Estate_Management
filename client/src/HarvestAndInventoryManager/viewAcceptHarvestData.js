import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./acceptedHarvestData.css"; // Import CSS file

function AcceptedHarvestDataTable() {
    const [harvestData, setHarvestData] = useState([]);
    const [searchField, setSearchField] = useState('picker_id'); // Default search field
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Fetch data from backend when component mounts
        fetchAcceptedHarvestData();
    }, []);

    const fetchAcceptedHarvestData = async () => {
        try {
            // Make a GET request to retrieve accepted harvested data
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/acceptedHarvestData/search?field=${searchField}&value=${searchValue}`);
            setHarvestData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Make a DELETE request to delete data based on ID
            await axios.delete(`http://localhost:8070/harvestAndinventory/deleteHarvestData/${id}`);
            // Fetch updated data after deletion
            fetchAcceptedHarvestData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleEdit = (id) => {
        // Navigate to the edit page with the specific ID
        navigate(`/EditHarvestPageManager/${id}`);
    };

    const handleSearch = async () => {
        try {
            // Make a GET request with updated search parameters
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/acceptedHarvestData/search?field=${searchField}&value=${searchValue}`);
            setHarvestData(response.data);
        } catch (error) {
            console.error('Error searching data:', error);
        }
    };

    const handleViewRejectedData = () => {
        // Navigate to the view rejected data page
        navigate('/ViewRejectData');
    };

    return (
        <div className="accepted-harvest-container">
            <h2 className="accepted-harvest-heading">Accepted Harvest Data</h2>
            <div className="search-container">
                <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                    <option value="picker_id">Picker ID</option>
                    <option value="harvest_date">Harvest Date</option>
                    <option value="expire_date">Expire Date</option>
                    <option value="quantity">Quantity</option>
                    <option value="tea_type">Tea Type</option>
                </select>
                <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleViewRejectedData}>View Rejected Data</button>
            </div>
            <table className="accepted-harvest-table">
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
                        <tr key={index} className="HI-harvest-data-row">
                            <td>{data.picker_id}</td>
                            <td>{data.harvest_date ? new Date(data.harvest_date).toISOString().slice(0, 10) : 'Invalid Date'}</td>
                            <td>{data.expire_date ? new Date(data.expire_date).toISOString().slice(0, 10) : 'Invalid Date'}</td>
                            <td>{data.quantity}</td>
                            <td>{data.tea_type}</td>
                            <td>
                                <button className="HI-edit-button" onClick={() => handleEdit(data._id)}>Edit</button>
                                <button className="HI-delete-button" onClick={() => handleDelete(data._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AcceptedHarvestDataTable;
