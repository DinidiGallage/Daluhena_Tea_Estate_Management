// Frontend code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Changed to Link for navigation

function EmployeeDetails() {
    const [employeeDetails, setEmployeeDetails] = useState([]);

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = () => {
        axios.get('http://localhost:8070/employeeSalary/getEmployeeDetails') // Corrected the endpoint
            .then(response => {
                setEmployeeDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee details:', error);
                alert('Failed to fetch employee details');
            });
    };

    return (
        <div className="container">
            <h1>Employee Details</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Designation</th>
                        <th>Basic Salary</th>
                        <th>Salary Package Name</th>
                        <th>Action</th> {/* Added action column */}
                    </tr>
                </thead>
                <tbody>
                    {employeeDetails.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.employee_ID}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.basic_salary}</td>
                            <td>{employee.salary_package_name}</td>
                            <td>
                                <Link to={`/editEmployee/${employee._id}`}>Edit</Link> {/* Changed to Link for navigation */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeDetails;
