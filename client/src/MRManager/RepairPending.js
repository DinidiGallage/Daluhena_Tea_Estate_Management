import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RepairPending() {
    const [displayRecords, setDisplayRecords] = useState([]);
    const [allRecords, setAllRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchItemId, setSearchItemId] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/repair/');
                // Filter only repair records that are pending
                const pendingRepairRecords = response.data.filter(req => req.status === 'Pending');
                setAllRecords(pendingRepairRecords);
                setDisplayRecords(pendingRepairRecords);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filteredRecords = allRecords.filter(record => {
            return (record.item_id.toString().includes(searchItemId) &&
                    (!searchDate || new Date(record.date_created).toDateString() === new Date(searchDate).toDateString()));
        });
        setDisplayRecords(filteredRecords);
    }, [searchItemId, searchDate, allRecords]);

    const deleteRecord = async (recordId) => {
        try {
            await axios.delete(`http://localhost:8070/repair/delete/${recordId}`);
            const updatedRecords = allRecords.filter(record => record._id !== recordId);
            setAllRecords(updatedRecords);
            setDisplayRecords(updatedRecords);
        } catch (err) {
            console.error("Error deleting record: ", err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div className="view-status-container">
            <h1 style={{ color: "white" }}>Repair Pending Requests</h1>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Item ID"
                    value={searchItemId}
                    onChange={(e) => setSearchItemId(e.target.value)}
                    style={{ marginRight: '10px', flex: 1 }}
                />
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    style={{ flex: 1 }}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Details</th>
                        <th>Request Created Date</th>
                        <th>Assigned Technician ID</th>
                        <th>Start Date</th>
                        <th>Status</th>
                        <th>Completed Date</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {displayRecords.map((record, index) => (
                        <tr key={index}>
                            <td>{record.item_id}</td>
                            <td>{record.details}</td>
                            <td>{new Date(record.date_created).toLocaleDateString()}</td>
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "In Progress" ? 'detail-inprogress-assigned' :'detail-completed'}>{record.tech_id ? record.tech_id : 'Not Assigned'}</td>
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "In Progress" ? 'detail-inprogress-assigned' :'detail-completed'}>{record.start_date ? new Date(record.start_date).toLocaleDateString() : 'Not Started'}</td>
                            <td className={`status-${record.status.toLowerCase().replace(" ", "")}`}>{record.status}</td>
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "In Progress" ? 'detail-inprogress-assigned' :'detail-completed'}>{record.end_date ? new Date(record.end_date).toLocaleDateString() : 'Not Ended'}</td>
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "In Progress" ? 'detail-inprogress-assigned' :'detail-completed'}>{record.cost ? `$${record.cost.toFixed(2)}` : 'Not Defined'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
