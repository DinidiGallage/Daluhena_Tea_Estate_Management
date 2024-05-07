import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './addedHarvestDataTable.css';

function AddedHarvestDataTable() {
    const [harvestData, setHarvestData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('picker_id'); // Default search type
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHarvestData();
    }, [searchQuery, searchType]); // Refetch data when search query or type changes

    const fetchHarvestData = async () => {
        setLoading(true);
        try {
            // Make a GET request to retrieve harvested data
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/addedHarvestData?searchQuery=${searchQuery}&searchType=${searchType}`);
            setHarvestData(response.data);
        } catch (error) {
            setError('Error fetching harvested data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchHarvestData();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date) ? date.toISOString().slice(0, 10) : 'Invalid Date';
    };

    return (
        <div className="HI-added-harvest-container">
            <h2>Added Harvest Data</h2>
            <form onSubmit={handleSubmit}>
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="picker_id">Picker ID</option>
                    <option value="tea_type">Tea Type</option>
                </select>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                />
                <button type="submit">Search</button>
            </form>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="HI-harvest-table">
                    <thead>
                        <tr>
                            <th>Picker ID</th>
                            <th>Harvest Date</th>
                            <th>Expire Date</th>
                            <th>Quantity</th>
                            <th>Tea Type</th>
                            <th>Request Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {harvestData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.picker_id}</td>
                                <td>{formatDate(data.harvest_date)}</td>
                                <td>{formatDate(data.expire_date)}</td>
                                <td>{data.quantity}</td>
                                <td>{data.tea_type}</td>
                                <td>{data.request_status}</td>
                                <td>
                                    <Link to={`/editHarvest/${data._id}`} className="HI-edit-link">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AddedHarvestDataTable;
