import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditSalaryPackage() {
    // Initial state aligned with AddSalaryPackage
    const [packageDetails, setPackageDetails] = useState({
        salary_package_name: '',
        ot_payment_per_hour: 0,
        tax: 0,
        bonus: 0,
        basic_salary: 0,
        designation: '',
        no_of_hours_worked: 0 // Corrected and consistent
    });

    const { id } = useParams(); // Captures the :id from the URL
    const navigate = useNavigate();

    // Fetch data and populate form
    useEffect(() => {
        axios.get(`http://localhost:8070/employeeSalary/getSalaryPackage/${id}`)
            .then(response => {
                console.log('Fetched data:', response.data); // Debugging output
                setPackageDetails(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch package details:', error);
                alert('Failed to fetch package details');
            });
    }, [id]);

    // Handle form input changes consistently
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPackageDetails({
            ...packageDetails,
            [name]: name === 'salary_package_name' || name === 'designation' ? value : parseFloat(value)
        });
    };

    // Handle form submission to update the package
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting data:', packageDetails); // Debugging output
        axios.put(`http://localhost:8070/employeeSalary/updateSalaryPackage/${id}`, packageDetails)
            .then(response => {
                console.log('Update response:', response); // Debugging output
                alert('Package updated successfully');
                navigate('/ViewSalaryPackages');
            })
            .catch(error => {
                console.error('Failed to update package:', error.response || error.message);
                alert('Failed to update package');
            });
    };

    return (
        <div className="salary-package-edit-container"> {/* Adjust class name to your stylesheet */}
            <h1><center>Edit Salary Package</center></h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Salary Package Name</label>
                    <input
                        type="text"
                        name="salary_package_name"
                        value={packageDetails.salary_package_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>OT Payment per Hour ($)</label>
                    <input
                        type="number"
                        name="ot_payment_per_hour"
                        value={packageDetails.ot_payment_per_hour}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Tax (%)</label>
                    <input
                        type="number"
                        name="tax"
                        value={packageDetails.tax}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Bonus ($)</label>
                    <input
                        type="number"
                        name="bonus"
                        value={packageDetails.bonus}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Designation</label>
                    <input
                        type="text"
                        name="designation"
                        value={packageDetails.designation}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Basic Salary ($)</label>
                    <input
                        type="number"
                        name="basic_salary"
                        value={packageDetails.basic_salary}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>No. of Hours Worked</label>
                    <input
                        type="number"
                        name="no_of_hours_worked"
                        value={packageDetails.no_of_hours_worked}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-btn">Update Package</button> {/* Consistent with AddSalaryPackage */}
            </form>
        </div>
    );
}

export default EditSalaryPackage;
