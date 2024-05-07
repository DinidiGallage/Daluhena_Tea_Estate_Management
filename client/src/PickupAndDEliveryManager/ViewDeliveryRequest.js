import React, { useEffect, useState } from 'react';
import './DisplayDeliveries.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DisplayDeliveries() {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = (field = '', term = '') => {
        setLoading(true);
        let queryUrl = 'http://localhost:8070/delivery/getHistory';
        if (field && term) {
            queryUrl += `?searchField=${field}&searchTerm=${term}`;
        }
        axios.get(queryUrl)
            .then(response => {
                setDeliveries(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    const handleSearch = () => {
        if (!searchTerm || !searchField) {
            alert('Please enter a term and select a field to search by.');
            return;
        }
        fetchDeliveries(searchField, searchTerm);
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return 'Pending';
        }
        const date = new Date(dateString);
        if (isNaN(date)) {
            return 'Invalid Date';
        }
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    const deleteDelivery = (id) => {
        axios.delete(`http://localhost:8070/delivery/delete/${id}`)
            .then(() => {
                setDeliveries(deliveries.filter(delivery => delivery._id !== id));
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const startEdit = (id) => {
        navigate(`/EditDeliveryRequest/${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="">
            <h2>Delivery List</h2>
            <div className="pd-search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter search term..."
                    className="pd-search-input"
                />
                <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className="pd-search-select">
                    <option value="">Select Field</option>
                    <option value="tea_type">Tea Type</option>
                    <option value="delivery_date">Delivery Date</option>
                    <option value="delivery_quantity">Delivery Quantity</option>
                </select>
                <button onClick={handleSearch} className="pd-search-button">Search</button>
            </div>
            <table className="pd-table-container">
                <thead>
                    <tr>
                        <th className="pd-table-header">Delivery Quantity</th>
                        <th className="pd-table-header">Driver NIC</th>
                        <th className="pd-table-header">Delivery Status</th>
                        <th className="pd-table-header">Request Status</th>
                        <th className="pd-table-header">Lorry Number</th>
                        <th className="pd-table-header">Delivery Date</th>
                        <th className="pd-table-header">Tea Type</th>
                        <th className="pd-table-header">Edit</th>
                        <th className="pd-table-header">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.length > 0 ? (
                        deliveries.map((delivery) => (
                            <tr key={delivery._id}>
                                <td>{delivery.delivery_quantity || 'Pending'}</td>
                                <td>{delivery.driver_nic || 'Pending'}</td>
                                <td>{delivery.delivery_status || 'Pending'}</td>
                                <td>{delivery.request_status || 'Pending'}</td>
                                <td>{delivery.lorry_number || 'Pending'}</td>
                                <td>{formatDate(delivery.delivery_date)}</td>
                                <td>{delivery.tea_type || 'Pending'}</td>
                                <td>
                                <button className="pd-edit-button pd-edit-button-custom" onClick={() => startEdit(delivery._id)}>Edit</button>

                                </td>
                                <td>
                                    <button className="pd-delete-button" onClick={() => deleteDelivery(delivery._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayDeliveries;
