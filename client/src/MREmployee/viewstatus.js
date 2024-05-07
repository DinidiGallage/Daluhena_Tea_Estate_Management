import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewstatus.css';

export default function MRViewStatus() {
    const [displayRecords, setDisplayRecords] = useState([]);
    const [allRecords, setAllRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('maintenance');
    const [inputID, setInputID] = useState(''); // State to hold input field value for Item ID
    const [inputStatus, setInputStatus] = useState(''); // State to hold input field value for Status
    const [searchID, setSearchID] = useState(''); // Actual search criteria for Item ID
    const [searchStatus, setSearchStatus] = useState(''); // Actual search criteria for Status

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/${viewMode}/`);
                setAllRecords(response.data.reverse());
                setDisplayRecords(response.data.reverse());
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [viewMode]);

    useEffect(() => {
        const filterRecords = () => {
            let filtered = allRecords;
            if (searchID) {
                filtered = filtered.filter(record => String(record?.item_id).includes(searchID));
            }
            if (searchStatus) {
                filtered = filtered.filter(record => record?.status === searchStatus);
            }
            setDisplayRecords(filtered);
        };

        filterRecords();
    }, [searchID, searchStatus]); // Depend only on search criteria state

    const handleSearch = () => {
        setSearchID(inputID);
        setSearchStatus(inputStatus);
    };

    const deleteRecord = async (recordId) => {
        try {
            await axios.delete(`http://localhost:8070/${viewMode}/delete/${recordId}`);
            const updatedRecords = allRecords.filter(record => record._id !== recordId);
            setAllRecords(updatedRecords);
            setDisplayRecords(updatedRecords); // Update display records directly
        } catch (err) {
            console.error("Error deleting record: ", err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div className="view-status-container">
            <div className="top-section">
                <h1 style={{color: "white"}}>{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Status</h1>
                <div className="button-group">
                    <button className="btn btn-primary" onClick={() => setViewMode('maintenance')}>Maintenance</button>
                    <button className="btn btn-secondary" onClick={() => setViewMode('repair')}>Repair</button>
                </div>
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search by Item ID"
                        value={inputID}
                        onChange={e => setInputID(e.target.value)}
                        className="search-input"
                    />
                    <select
                        value={inputStatus}
                        onChange={e => setInputStatus(e.target.value)}
                        className="search-select"
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <button onClick={handleSearch} className="btn btn-info">Search</button> {/* Search button */}
                </div>
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
                            <td>{record.date_created}</td>
                            <td className={getClassNameFor('tech_id', record)}>{record.tech_id === 0 ? 'Still Not Assigned' : record.tech_id}</td>
                            <td className={getClassNameFor('start_date', record)}>{!record.start_date ? 'Still not Started' : record.start_date}</td>
                            <td className={`status-${record.status ? record.status.toLowerCase().replace(" ", "") : ""}`}>{record.status}</td>
                            <td className={getClassNameFor('end_date', record)}>{!record.end_date ? 'Still not Ended' : record.end_date}</td>
                            <td className={getClassNameFor('cost', record)}>{record.cost === 0 ? 'Still Not Defined' : record.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Helper function to determine CSS classes based on record status
function getClassNameFor(field, record) {
    switch(field) {
        case 'tech_id':
        case 'start_date':
        case 'end_date':
        case 'cost':
            return record.status === "Pending" ? 'detail-pending' :
                   record.status === "In Progress" ? `detail-inprogress-${field.split('_')[0]}` :
                   'detail-completed';
        default:
            return '';
    }
}
