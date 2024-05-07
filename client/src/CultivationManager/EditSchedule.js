// EditSchedule.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditSchedule.css'; // Import CSS file
import './Backgroundimage.css';
const EditSchedule = () => {
    const [formData, setFormData] = useState({
        scheduleType: '',
        scheduleDetails: '',
        scheduledDate: '',
        scheduleAddedDate: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/cultivation/get-schedule/${id}`);
                const { scheduleType, scheduleDetails, scheduledDate, scheduleAddedDate } = response.data;
                
                // Format date strings as Date objects
                const formattedScheduledDate = new Date(scheduledDate).toISOString().split('T')[0];
                const formattedScheduleAddedDate = new Date(scheduleAddedDate).toISOString().split('T')[0];
                
                setFormData({
                    scheduleType,
                    scheduleDetails,
                    scheduledDate: formattedScheduledDate,
                    scheduleAddedDate: formattedScheduleAddedDate
                });
            } catch (error) {
                console.error('Failed to fetch schedule data:', error);
            }
        };
    
        fetchSchedule();
    }, [id]);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8070/cultivation/update-schedule/${id}`, formData);
            alert('Schedule updated successfully');
            navigate('/ScheduleTable');
        } catch (error) {
            console.error('Failed to update schedule:', error);
            alert('Failed to update schedule');
        }
    };

    return (
        <div className="edit-schedule-container">
            <h2>Edit Schedule</h2>
            <form onSubmit={handleSubmit} className="edit-schedule-form">
                <label>
                    Schedule Type:
                    <input type="text" name="scheduleType" value={formData.scheduleType} onChange={handleChange} className="form-input" />
                </label>
                <label>
                    Details:
                    <input type="text" name="scheduleDetails" value={formData.scheduleDetails} onChange={handleChange} className="form-input" />
                </label>
                <label>
                    Scheduled Date:
                    <input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className="form-input" />
                </label>
                <label>
                    Added Date:
                    <input type="date" name="scheduleAddedDate" value={formData.scheduleAddedDate} onChange={handleChange} className="form-input" />
                </label>
                <button type="submit" className="submit-button">Update Schedule</button>
            </form>
        </div>
    );
};

export default EditSchedule;
