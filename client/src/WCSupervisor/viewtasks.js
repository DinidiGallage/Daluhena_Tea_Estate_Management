import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./TaskDataViewer.css";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('nic'); // Default search type is nic

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get('http://localhost:8070/cultivation/tasks');
                setTasks(response.data.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/cultivation/delete-task/${id}`);
            console.log('Task deleted successfully');
            // Update tasks list after deletion
            setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Function to format date as "YYYY-MM-DD"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Change the locale as per your requirement
    };

    // Filter tasks based on search input and type
    const filteredTasks = tasks.filter(task => {
        const searchTerm = searchInput.toLowerCase();
        switch (searchType) {
            case 'nic':
                return task.nic.toLowerCase().includes(searchTerm);
            case 'task':
                return task.task.toLowerCase().includes(searchTerm);
            case 'taskDate':
                return formatDate(task.taskDate).includes(searchTerm);
            case 'taskAddedDate':
                return formatDate(task.taskAddedDate).includes(searchTerm);
            case 'completeLevelOfTask':
                return task.completeLevelOfTask.toLowerCase().includes(searchTerm);
            case 'employeeStatus':
                return task.employeeStatus.toLowerCase().includes(searchTerm);
            case 'status':
                return task.status.toLowerCase().includes(searchTerm);
            case 'note':
                return task.note.toLowerCase().includes(searchTerm);
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

    return (
        <div className="WC-task-data-container">
            <h2 className="WC-task-data-title">Task List</h2>
            <div className="search-container">
                <input type="text" placeholder="Search..." value={searchInput} onChange={handleSearchInputChange} />
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="nic">NIC</option>
                    <option value="task">Task</option>
                    <option value="taskDate">Task Date</option>
                    <option value="taskAddedDate">Task Added Date</option>
                    <option value="completeLevelOfTask">Complete Level of Task</option>
                    <option value="employeeStatus">Employee Status</option>
                    <option value="status">Status</option>
                    <option value="note">Note</option>
                </select>
            </div>
            <table className="WC-task-table">
                <thead>
                    <tr>
                        <th>NIC</th>
                        <th>Task</th>
                        <th>Task Date</th>
                        <th>Task Added Date</th>
                        <th>Complete Level of Task</th>
                        <th>Employee Status</th>
                        <th>Status</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.nic}</td>
                            <td>{task.task}</td>
                            <td>{formatDate(task.taskDate)}</td>
                            <td>{formatDate(task.taskAddedDate)}</td>
                            <td>{task.completeLevelOfTask}</td>
                            <td>{task.employeeStatus}</td>
                            <td>{task.status}</td>
                            <td>{task.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
