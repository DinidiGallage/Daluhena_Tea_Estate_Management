import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RepairCompleted() {
    const [displayRecords, setDisplayRecords] = useState([]);
    const [allRecords, setAllRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchItemId, setSearchItemId] = useState('');
    const [searchTechId, setSearchTechId] = useState('');
    const [searchStartDate, setSearchStartDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/repair/');
                // Filter only repair records that are Completed
                const CompletedRepairRecords = response.data.filter(req => req.status === 'Completed');
                setAllRecords(CompletedRepairRecords);
                setDisplayRecords(CompletedRepairRecords);
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
                    (record.tech_id.toString().includes(searchTechId)) &&
                    (!searchStartDate || new Date(record.start_date).toLocaleDateString() === new Date(searchStartDate).toLocaleDateString()));
        });
        setDisplayRecords(filteredRecords);
    }, [searchItemId, searchTechId, searchStartDate, allRecords]);

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
            <h1 style={{ color: "white" }}>Repair Completed</h1>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Item ID"
                    value={searchItemId}
                    onChange={(e) => setSearchItemId(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Search by Technician ID"
                    value={searchTechId}
                    onChange={(e) => setSearchTechId(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="date"
                    value={searchStartDate}
                    onChange={(e) => setSearchStartDate(e.target.value)}
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
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "Completed" ? 'detail-Completed-assigned' :'detail-completed'}>{record.tech_id === 0 ? 'Still Not Assigned' : record.tech_id}</td>
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "Completed" ? 'detail-Completed-start' :'detail-completed'}>{!record.start_date ? 'Still not Started' : new Date(record.start_date).toLocaleDateString()}</td>
                            <td className={`status-${record.status.toLowerCase().replace(" ", "")}`}>{record.status}</td>
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "Completed" ? 'detail-Completed-completed' :'detail-completed'}>{!record.end_date ? 'Still not Ended' : new Date(record.end_date).toLocaleDateString()}</td>
                            <td className={record.status === "Pending" ? 'detail-pending' :record.status === "Completed" ? 'detail-Completed-cost' :'detail-completed'}>{record.cost === 0 ? 'Still Not Defined' : record.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
