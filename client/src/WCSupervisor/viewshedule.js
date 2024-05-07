import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ScheduleDataViewer.css";

const ScheduleTable = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('scheduleType'); // Default search type is scheduleType

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/cultivation/get-schedules');
                setSchedules(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter schedules based on search input and type
    const filteredSchedules = schedules.filter(schedule => {
        const searchTerm = searchInput.toLowerCase();
        switch (searchType) {
            case 'scheduleType':
                return schedule.scheduleType.toLowerCase().includes(searchTerm);
            case 'scheduledDate':
                return new Date(schedule.scheduledDate).toLocaleDateString().includes(searchTerm);
            case 'scheduleAddedDate':
                return new Date(schedule.scheduleAddedDate).toLocaleDateString().includes(searchTerm);
            default:
                return false;
        }
    });

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    if (loading) {
        return <p>Loading schedules...</p>;
    }

    return (
        <div className="WC-schedule-data-container">
            <h2 className="WC-schedule-data-title">Schedule List</h2>
            <div className="search-container">
                <input type="text" placeholder="Search..." value={searchInput} onChange={handleSearchInputChange} />
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="scheduleType">Schedule Type</option>
                    <option value="scheduledDate">Scheduled Date</option>
                    <option value="scheduleAddedDate">Added Date</option>
                </select>
            </div>
            <table className="WC-schedule-table">
                <thead>
                    <tr>
                        <th>Schedule Type</th>
                        <th>Details</th>
                        <th>Scheduled Date</th>
                        <th>Added Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSchedules.map(schedule => (
                        <tr key={schedule._id}>
                            <td>{schedule.scheduleType}</td>
                            <td>{schedule.scheduleDetails}</td>
                            <td>{new Date(schedule.scheduledDate).toLocaleDateString()}</td>
                            <td>{new Date(schedule.scheduleAddedDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;
