import React, { useState, useEffect } from 'react';
import axios from "axios";
import UpdateEmployeeDetails from "./UpdateEmployeeDetails"; // Import the UpdateEmployeeDetails component

function AllEmployeesDisplay() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control the visibility of the update form
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // State to store the ID of the selected employee

    useEffect(() => {
        axios.get("http://localhost:8070/employee/")
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching employees");
            });
    }, []);

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.contactNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this employee?');
    
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:8070/employee/delete/${id}`);
                if (response.status === 200) {
                    setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
                    alert('Employee deleted successfully');
                } else {
                    console.error("Error deleting employee:", response.statusText);
                    setError("Error deleting employee");
                }
            } catch (error) {
                console.error("Error deleting employee:", error.message);
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setError("Error deleting employee");
            }
        }
    };

    const handleUpdate = (id) => {
        setSelectedEmployeeId(id); // Set the selected employee ID
        setShowUpdateForm(true); // Show the update form
    };

    return (
        <div className="container mt-5" style={{ marginLeft: "220px" }}>
            <h1>All Employees</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="input-group mb-3" style={{ width: "300px" }}> {/* Adjust the width here */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search employees"
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
                        <th>Contact Number</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee.nic}>
                            <td>{employee.name}</td>
                            <td>{employee.nic}</td>
                            <td>{employee.jobrole}</td>
                            <td>{employee.contactNumber}</td>
                            <td>
                                <button className="btn btn-success me-2" onClick={() => handleUpdate(employee._id)}>Update</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showUpdateForm && <UpdateEmployeeDetails id={selectedEmployeeId} />} {/* Render the update form when showUpdateForm is true */}
        </div>
    );
}

export default AllEmployeesDisplay;
