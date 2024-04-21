import React, { useState, useEffect } from 'react';

function EmployeeDetails() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await fetch('/employee-details');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const addPackage = async (employeeId, currentPackage) => {
        const newPackage = prompt('Enter new salary package name:', currentPackage || '');

        if (!newPackage) {
            alert('Please enter a valid package name');
            return;
        }

        try {
            await fetch(`/employee-details/${employeeId}/add-salary-package/${encodeURIComponent(newPackage)}`, {
                method: 'GET',
            });
            alert('Salary package added successfully');
            fetchEmployeeDetails(); // Refresh employee details after adding package
        } catch (error) {
            console.error('Error adding salary package:', error);
            alert('Failed to add salary package');
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.employee_ID}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.basic_salary}</td>
                            <td>{employee.salary_package_name || 'Not Set'}</td>
                            <td>
                                <button onClick={() => addPackage(employee._id, employee.salary_package_name)}>Add Package</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeDetails;