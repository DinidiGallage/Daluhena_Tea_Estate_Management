import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function AllEmployeeAttendance() {
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8070/EmployeeAttendance")
            .then((res) => {
                setAttendanceDetails(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching attendance details");
            });
    }, []);

    const filteredAttendance = attendanceDetails.filter(attendance =>
        attendance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.nic.toString().includes(searchQuery.toLowerCase()) ||
        attendance.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.dayType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendance.attendance.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this attendance record?');
    
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8070/EmployeeAttendance/delete/${id}`);
                if (response.status === 200) {
                    setAttendanceDetails(prevAttendance => prevAttendance.filter(attendance => attendance._id !== id));
                    alert('Attendance record deleted successfully');
                } else {
                    console.error("Error deleting attendance record:", response.statusText);
                    setError("Error deleting attendance record");
                }
            } catch (error) {
                console.error("Error deleting attendance record:", error.message);
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setError("Error deleting attendance record");
            }
        }
    };

    // Function to handle edit action
    const handleEdit = (id) => {
        // Redirect to the edit page with the attendance record ID
        // Implement the edit page/component using React Router
    };

    return (
        <div className="container mt-5" style={{ marginLeft: "250px" }}>
            <h1>All Attendance Details</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="input-group mb-3" style={{ width: "300px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search attendance details"
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
                        <th>Day Type</th>
                        <th>Date</th>
                        <th>Attendance</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAttendance.map(record => (
                        <tr key={record._id}>
                            <td>{record.name}</td>
                            <td>{record.nic}</td>
                            <td>{record.jobrole}</td>
                            <td>{record.dayType}</td>
                            <td>{record.date}</td>
                            <td>{record.attendance}</td>
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

export default AllEmployeeAttendance;
