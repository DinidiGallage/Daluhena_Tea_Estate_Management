import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddSchedule.css'; // Import the CSS file

const AddSchedule = () => {
    const [formData, setFormData] = useState({
        scheduleType: '',
        scheduleDetails: '',
        scheduledDate: '',
        scheduleAddedDate: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8070/cultivation/add-schedule', formData);
            if (res.data.message === 'Schedule added successfully') {
                // Display success message
                alert('Schedule added successfully!');
                setFormData({
                    scheduleType: '',
                    scheduleDetails: '',
                    scheduledDate: '',
                    scheduleAddedDate: ''
                });
                // Navigate to ScheduleTable page after successful submission
                navigate('/ScheduleTable');
            } else {
                // Display error message
                setError('Failed to add schedule.');
            }
        } catch (err) {
            // Display error message
            setError(err.response.data.message || 'Failed to add schedule. Please try again.');
        }
    };

    return (
        <div className="WC-add-schedule-container">
            <h2>Add Schedule</h2>
            {error && <p className="WC-error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Schedule Type:</label>
                    <select name="scheduleType" value={formData.scheduleType} onChange={handleChange} required>
                        <option value="">Select Schedule Type</option>
                        <option value="Fertilizer Schedule">Fertilizer Schedule</option>
                        <option value="Watering Schedule">Watering Schedule</option>
                        <option value="Sheltering Schedule">Sheltering Schedule</option>
                        <option value="Weeding Schedule">Weeding Schedule</option>
                        <option value="Pest and Disease Management Schedule">Pest and Disease Management Schedule</option>
                        <option value="Harvesting Schedule">Harvesting Schedule</option>
                    </select>
                </div>
                <div>
                    <label>Schedule Details:</label>
                    <textarea name="scheduleDetails" value={formData.scheduleDetails} onChange={handleChange} required />
                </div>
                <div>
                    <label>Scheduled Date:</label>
                    <input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} required />
                </div>
                <div>
                    <label>Schedule Added Date:</label>
                    <input type="date" name="scheduleAddedDate" value={formData.scheduleAddedDate} onChange={handleChange} required />
                </div>
                <button type="submit" className="WC-submit-button">Add Schedule</button>
            </form>
        </div>
    );
};

export default AddSchedule;
