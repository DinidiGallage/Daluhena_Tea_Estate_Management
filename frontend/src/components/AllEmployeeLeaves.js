import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function AllEmployeeLeaves() {
    const [leaveDetails, setLeaveDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8070/EmployeeLeave")
            .then((res) => {
                setLeaveDetails(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching leave details");
            });
    }, []);

    const filteredLeaves = leaveDetails.filter(leave =>
        leave.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.nic.toString().includes(searchQuery.toLowerCase()) ||
        leave.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveStatus.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this leave record?');
    
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8070/EmployeeLeave/delete/${id}`);
                if (response.status === 200) {
                    setLeaveDetails(prevLeaves => prevLeaves.filter(leave => leave._id !== id));
                    alert('Leave record deleted successfully');
                } else {
                    console.error("Error deleting leave record:", response.statusText);
                    setError("Error deleting leave record");
                }
            } catch (error) {
                console.error("Error deleting leave record:", error.message);
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setError("Error deleting leave record");
            }
        }
    };

    const handleEdit = (id) => {
        // Redirect to the edit page with the leave record ID
        // Implement the edit page/component using React Router
    };

    return (
        <div className="container mt-5" style={{ marginLeft: "250px" }}>
            <h1>All Leave Details</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="input-group mb-3" style={{ width: "300px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search leave details"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>NIC</th>
                        <th>Job Role</th>
                        <th>Leave Type</th>
                        <th>Leave From</th>
                        <th>Leave To</th>
                        <th>Leave Status</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeaves.map(record => (
                        <tr key={record._id}>
                            <td>{record.name}</td>
                            <td>{record.nic}</td>
                            <td>{record.jobrole}</td>
                            <td>{record.leaveType}</td>
                            <td>{record.leaveFrom}</td>
                            <td>{record.leaveTo}</td>
                            <td>{record.leaveStatus}</td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={() => handleEdit(record._id)}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(record._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllEmployeeLeaves;
