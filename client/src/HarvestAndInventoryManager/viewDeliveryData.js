import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './deliveryData.css';

function DeliveryDataTable() {
    const [deliveryData, setDeliveryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('tea_type'); // Default search criteria

    useEffect(() => {
        fetchDeliveryData();
    }, []);

    const fetchDeliveryData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/harvestAndinventory/deliveryData');
            setDeliveryData(response.data);
        } catch (error) {
            console.error('Error fetching delivery data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/harvestAndinventory/deleteDeliveryData/${id}`);
            fetchDeliveryData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/EditDeliveryData/${id}`;
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/deliveryData?${searchCriteria}=${searchQuery}`);
            setDeliveryData(response.data);
        } catch (error) {
            console.error('Error searching delivery data:', error);
        }
    };

    return (
        <div className="delivery-data-container">
            <h2 className="delivery-data-heading">Delivery Data</h2>
            <div className="search-bar-container">
                <select
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                    className="search-dropdown"
                >
                    <option value="tea_type">Tea Type</option>
                    <option value="quantity">Quantity</option>
                    <option value="delivered_date">Delivered Date</option>
                </select>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search by ${searchCriteria}`}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <Link to="/AddDeliveryData">
                <button className="add-button">Add New Delivery Data</button>
            </Link>
            <table className="delivery-data-table">
                <thead>
                    <tr>
                        <th>Tea Type</th>
                        <th>Quantity</th>
                        <th>Delivered Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.tea_type}</td>
                            <td>{data.quantity}</td>
                            <td>{new Date(data.delivered_date).toISOString().slice(0, 10)}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(data._id)}>Delete</button>
                                <button className="edit-button" onClick={() => handleEdit(data._id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DeliveryDataTable;
