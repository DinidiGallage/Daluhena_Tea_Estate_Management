import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ScheduleTable.css'; // Import the CSS file
import './Backgroundimage.css';

const ScheduleTable = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('scheduleType'); // Default search type is scheduleType
    const navigate = useNavigate();

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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            try {
                await axios.delete(`http://localhost:8070/cultivation/delete-schedule/${id}`);
                setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule._id !== id));
                alert('Schedule deleted successfully.');
            } catch (error) {
                console.error('Error deleting schedule:', error);
                alert('Failed to delete schedule.');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-schedule/${id}`);
    };

    const handleAddSchedule = () => {
        navigate('/AddSchedule');
    };

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
        <div className="schedule-table-container">
            <h2>Schedule List</h2>
            <div className="search-container">
                <input type="text" placeholder="Search..." value={searchInput} onChange={handleSearchInputChange} />
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="scheduleType">Schedule Type</option>
                    <option value="scheduledDate">Scheduled Date</option>
                    <option value="scheduleAddedDate">Added Date</option>
                </select>
                <button onClick={handleAddSchedule} className="add-schedule-button">Add New Schedule</button>
            </div>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Schedule Type</th>
                        <th>Details</th>
                        <th>Scheduled Date</th>
                        <th>Added Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSchedules.map(schedule => (
                        <tr key={schedule._id}>
                            <td>{schedule.scheduleType}</td>
                            <td>{schedule.scheduleDetails}</td>
                            <td>{new Date(schedule.scheduledDate).toLocaleDateString()}</td>
                            <td>{new Date(schedule.scheduleAddedDate).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(schedule._id)} className="edit-button">Edit</button>
                                <button onClick={() => handleDelete(schedule._id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;
