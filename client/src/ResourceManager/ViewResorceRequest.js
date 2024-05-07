import React, { useEffect, useState } from 'react';
import './deliveries.css'; // Ensure this points to the actual location of your CSS file
import axios from 'axios';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom v6

function Deliveries() {
    const [deliveries, setDeliveries] = useState([]);
    const [searchField, setSearchField] = useState('driver_nic'); // default search field
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/delivery/deliveriesRM?searchField=${searchField}&searchTerm=${searchTerm}`);
                setDeliveries(response.data);
            } catch (err) {
                console.error('Error fetching data: ', err);
            }
        };

        fetchData();
    }, [searchField, searchTerm]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    };

    return (
        <div>
            <div className="pm-search-bar">
                <select value={searchField} onChange={e => setSearchField(e.target.value)}>
                    <option value="driver_nic">Driver NIC</option>
                    <option value="delivery_status">Delivery Status</option>
                    <option value="lorry_number">Lorry Number</option>
                    <option value="delivery_date">Delivery Date</option>
                </select>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setSearchTerm('')}>Clear</button>
            </div>
            <table className="pm-table">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Driver NIC</th>
                        <th>Lorry Number</th>
                        <th>Delivery Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((delivery) => (
                        <tr key={delivery._id}>
                            <td>{delivery.delivery_quantity}</td>
                            <td>{formatDate(delivery.delivery_date)}</td>
                            <td>{delivery.driver_nic}</td>
                            <td>{delivery.lorry_number}</td>
                            <td>{delivery.delivery_status}</td>
                            <td>
                                <Link to={`/editDelivery/${delivery._id}`} className="pm-edit-button">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Deliveries;
