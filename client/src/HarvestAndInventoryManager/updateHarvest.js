import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./harvestInventory.css";

function HarvestInventoryTable() {
    const [harvestData, setHarvestData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHarvestData();
    }, []);

    const fetchHarvestData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/harvestAndinventory/harvestInventory');
            setHarvestData(response.data.map(data => ({
                ...data,
                status: 'Choose status',
                // Ensure dates are parsed safely
                expire_date: safeDateParse(data.expire_date),
                harvest_date: safeDateParse(data.harvest_date)
            })));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`http://localhost:8070/harvestAndinventory/updateStatus/${id}`, { request_status: status });
            setHarvestData(prevData => prevData.map(data => data._id === id ? { ...data, status } : data));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Helper function to parse dates safely
    const safeDateParse = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (harvestData.length === 0) {
        return <div>No new harvested data available.</div>;
    }

    return (
        <div className="HI-harvest-inventory-container">
            <h2 className="HI-harvest-inventory-heading">Harvest Inventory</h2>
            <table className="HI-harvest-inventory-table">
                <thead>
                    <tr>
                        <th>Picker ID</th>
                        <th>Quantity</th>
                        <th>Tea Type</th>
                        <th>Expire Date</th>
                        <th>Harvest Date</th>
                        <th>Update Status</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {harvestData.map((data, index) => (
                        <tr key={index} className="harvest-inventory-row">
                            <td>{data.picker_id}</td>
                            <td>{data.quantity}</td>
                            <td>{data.tea_type}</td>
                            <td>{data.expire_date}</td>
                            <td>{data.harvest_date}</td>
                            <td>
                                <select className="HI-status-select" value={data.status} onChange={(e) => handleStatusChange(data._id, e.target.value)}>
                                    <option value="Choose status" disabled>Choose status</option>
                                    <option value="Accept">Accept</option>
                                    <option value="Reject">Reject</option>
                                </select>
                            </td>
                            <td>
                                <button className="HI-add-button">Add</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HarvestInventoryTable;
