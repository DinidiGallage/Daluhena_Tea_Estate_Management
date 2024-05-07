import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddTaskForm.css'; // Import CSS file

const AddTaskForm = () => {
    const [nicList, setNicList] = useState([]);
    const [selectedNic, setSelectedNic] = useState('');
    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [completeLevelOfTask, setCompleteLevelOfTask] = useState('Not Started');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        async function fetchNicList() {
            try {
                const response = await axios.get('http://localhost:8070/cultivation/get-nic-list');
                setNicList(response.data.map(nic => nic.nic));
            } catch (error) {
                console.error('Error fetching NIC list:', error);
                setErrorMessage('Error fetching NIC list. Please try again later.');
            }
        }

        fetchNicList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            nic: selectedNic,
            task,
            taskDate,
            taskAddedDate: new Date(), // Set taskAddedDate as current date
            completeLevelOfTask
        };

        try {
            await axios.post('http://localhost:8070/cultivation/add-task', newTask);
            setSuccessMessage('Task added successfully!');
            // Navigate to TaskList page after successful submission
            navigate('/TaskList');
        } catch (error) {
            console.error('Error adding task:', error);
            setErrorMessage('Error adding task. Please try again later.');
        }

        // Reset form fields after submission
        setSelectedNic('');
        setTask('');
        setTaskDate('');
        setCompleteLevelOfTask('Not Started');
    };

    return (
        <div className="WC-add-task-container">
            <h2>Add Task</h2>
            {successMessage && <p className="WC-success-message">{successMessage}</p>}
            {errorMessage && <p className="WC-error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="WC-add-task-form">
                <table className="WC-form-table">
                    <tbody>
                        <tr>
                            <td className="WC-form-label">NIC:</td>
                            <td>
                                <select value={selectedNic} onChange={(e) => setSelectedNic(e.target.value)} required className="WC-form-select">
                                    <option value="">Select NIC</option>
                                    {nicList.map(nic => (
                                        <option key={nic} value={nic}>{nic}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="WC-form-label">Task:</td>
                            <td><input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" required className="WC-form-input" /></td>
                        </tr>
                        <tr>
                            <td className="WC-form-label">Task Date:</td>
                            <td><input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} required className="WC-form-input" /></td>
                        </tr>
                        <tr>
                            <td className="WC-form-label">Complete Level of Task:</td>
                            <td>
                                <select value={completeLevelOfTask} onChange={(e) => setCompleteLevelOfTask(e.target.value)} required className="WC-form-select">
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="WC-submit-button">Add Task</button>
            </form>
        </div>
    );
};

export default AddTaskForm;
