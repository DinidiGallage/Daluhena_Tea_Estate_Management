import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RepairInProgress() {
    const [displayRecords, setDisplayRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/repair/');
            const inProgressRecords = response.data.filter(record => record.status === "In Progress");
            setDisplayRecords(inProgressRecords);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleStart = async (record) => {
        const cost = prompt("Please enter the cost for this job:");
        if (cost !== null && cost.trim() !== "") {
            try {
                const response = await axios.put(`http://localhost:8070/technician/${record._id}/start`, { type: 'repair', cost: parseFloat(cost) });
                alert(response.data.message);
                fetchData();
            } catch (err) {
                alert("Failed to start the job: " + err.message);
            }
        }
    };

    const handleComplete = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8070/technician/${id}/complete`, { type: 'repair' });
            alert(response.data.message);
            fetchData();
        } catch (err) {
            alert("Failed to complete the job: " + err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
            <h2>Repair In Progress</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Details</th>
                        <th>Start Date</th>
                        <th>Cost</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayRecords.map((record) => (
                        <tr key={record._id}>
                            <td>{record.item_id}</td>
                            <td>{record.details}</td>
                            <td>{record.start_date ? new Date(record.start_date).toLocaleDateString() : "Not Started"}</td>
                            <td>{record.cost ? `$${record.cost.toFixed(2)}` : "No Cost Set"}</td>
                            <td>
                                {!record.start_date ? (
                                    <button onClick={() => handleStart(record)}>Start</button>
                                ) : (
                                    <button onClick={() => handleComplete(record._id)}>Complete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
