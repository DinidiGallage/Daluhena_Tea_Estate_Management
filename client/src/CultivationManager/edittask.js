// EditTask.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditTask.css'; // Import CSS file
import './Backgroundimage.css';
const EditTask = () => {
    const [taskData, setTaskData] = useState({
        nic: '',
        task: '',
        taskDate: '',
        taskAddedDate: '',
        completeLevelOfTask: '',
        employeeStatus: '',
        status: '',
        note: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/cultivation/tasks/${id}`);
                const { nic, task, taskDate, taskAddedDate, completeLevelOfTask, employeeStatus, status, note } = response.data.data;

                // Format date strings as "YYYY-MM-DD"
                const formattedTaskDate = formatDate(taskDate);
                const formattedTaskAddedDate = formatDate(taskAddedDate);

                setTaskData({
                    nic,
                    task,
                    taskDate: formattedTaskDate,
                    taskAddedDate: formattedTaskAddedDate,
                    completeLevelOfTask,
                    employeeStatus,
                    status,
                    note
                });
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        fetchTaskData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8070/cultivation/edit-task/${id}`, taskData);
            console.log('Task updated successfully');
            alert('Task updated successfully!');
            navigate('/TaskList');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Function to format date as "YYYY-MM-DD"
    const formatDate = (dateString) => {
        if (!dateString) return ''; // Check if dateString is empty
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <div className="edit-task-container">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit} className="edit-task-form">
                <div className="form-group">
                    <label>NIC:</label>
                    <input type="text" name="nic" value={taskData.nic} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                    <label>Task:</label>
                    <input type="text" name="task" value={taskData.task} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                    <label>Task Date:</label>
                    <input type="date" name="taskDate" value={taskData.taskDate} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                    <label>Task Added Date:</label>
                    <input type="date" name="taskAddedDate" value={taskData.taskAddedDate} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-group">
                    <label>Complete Level of Task:</label>
                    <select name="completeLevelOfTask" value={taskData.completeLevelOfTask} onChange={handleChange} required className="form-select">
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Employee Status:</label>
                    <input type="text" name="employeeStatus" value={taskData.employeeStatus} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <input type="text" name="status" value={taskData.status} onChange={handleChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Note:</label>
                    <textarea name="note" value={taskData.note} onChange={handleChange} className="form-textarea" />
                </div>
                <button type="submit" className="submit-button">Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;
