import React, { useState, useEffect } from 'react';

function EmployeeDetails() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await fetch('/employeeDetails');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    return (
        <div>
            <h1>Employee Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Designation</th>
                        <th>Basic Salary</th>
                        <th>Salary Package</th>
                        <th>Tax (%)</th>
                        <th>Bonus (%)</th>
                        <th>Total Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.employee_ID}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.basic_salary}</td>
                            <td>{employee.salary_package_name}</td>
                            <td>{employee.tax}</td>
                            <td>{employee.bonus}</td>
                            <td>{employee.total_salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeDetails;