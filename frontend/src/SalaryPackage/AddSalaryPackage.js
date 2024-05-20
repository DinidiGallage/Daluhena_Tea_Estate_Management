import React, { useState } from 'react';
import axios from 'axios';
import './AddSalaryPackage.css';

function AddSalaryPackage() {
    const [packageDetails, setPackageDetails] = useState({
        salary_package_name: '',
        ot_payment_per_hour: 0,
        tax: 0,
        bonus: 0,
        basic_salary: 0,
        designation: '',
        no_of_hours_worked: 0
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let errorMessage = "";

        
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        // Validate based on input type
        if (name === 'salary_package_name' || name === 'designation') {
            // Allow only letters and spaces
            parsedValue = value.replace(/[^a-zA-Z ]/g, '');
        } else {
            // For numeric fields, enforce formatting without altering input type="number" behavior
            if (value !== '') {
                parsedValue = parseFloat(value);
                if (isNaN(parsedValue)) parsedValue = 0; // Handle non-numeric input, set to zero if conversion fails
            }
        }

        setPackageDetails(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));

        // Validate each field as it's being changed
        validateField(name, parsedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform a final validation check before submitting
        const validationFields = Object.keys(packageDetails);
        validationFields.forEach(field => validateField(field, packageDetails[field]));

        // Check for any existing errors before submission
        const hasErrors = Object.values(errors).some(errorMessage => errorMessage);
        if (hasErrors) {
            alert("Please correct the errors before submitting the form");
            return;
        }

        axios.post('http://localhost:8070/employeeSalary/addSalaryPackage', packageDetails)
            .then(response => {
                alert('Salary Package Added Successfully!');
                setPackageDetails({
                    salary_package_name
: '',
ot_payment_per_hour: 0,
tax: 0,
bonus: 0,
basic_salary: 0,
designation: '',
no_of_hours_worked: 0
});
setErrors({});
})
.catch(error => {
console.error('There was an error!', error);
alert('Failed to add salary package');
});
};

return (
    <div className="salary-package-container">
        <h1><center>Add Salary Package</center></h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Salary Package Name:</label>
                <input
                    type="text"
                    name="salary_package_name"
                    value={packageDetails.salary_package_name}
                    onChange={handleChange}
                />
                {errors.salary_package_name && <span className="error">{errors.salary_package_name}</span>}
            </div>
            <div className="input-group">
                <label>Designation:</label>
                <input
                    type="text"
                    name="designation"
                    value={packageDetails.designation}
                    onChange={handleChange}
                />
                {errors.designation && <span className="error">{errors.designation}</span>}
            </div>
            <div className="input-group">
                <label>Basic Salary (Rs.):</label>
                <input
                    type="number"
                    name="basic_salary"
                    value={packageDetails.basic_salary}
                    onChange={handleChange}
                />
                {errors.basic_salary && <span className="error">{errors.basic_salary}</span>}
            </div>
            <div className="input-group">
                <label>OT Payment per Hour (Rs.):</label>
                <input
                    type="number"
                    name="ot_payment_per_hour"
                    value={packageDetails.ot_payment_per_hour}
                    onChange={handleChange}
                />
                {errors.ot_payment_per_hour && <span className="error">{errors.ot_payment_per_hour}</span>}
            </div>
            <div className="input-group">
                <label>Tax (%):</label>
                <input
                    type="number"
                    name="tax"
                    value={packageDetails.tax}
                    onChange={handleChange}
                />
                {errors.tax && <span className="error">{errors.tax}</span>}
            </div>
            <div className="input-group">
                <label>Bonus (Rs.):</label>
                <input
                    type="number"
                    name="bonus"
                    value={packageDetails.bonus}
                    onChange={handleChange}
                />
                {errors.bonus && <span className="error">{errors.bonus}</span>}
            </div>
            <div className="input-group">
                <label>No of Hours Worked:</label>
                <input
                    type="number"
                    name="no_of_hours_worked"
                    value={packageDetails.no_of_hours_worked}
                    onChange={handleChange}
                />
                {errors.no_of_hours_worked && <span className="error">{errors.no_of_hours_worked}</span>}
            </div>
            <button type="submit" className="submit-btn">Add Package</button>
        </form>
    </div>
);
}

export default AddSalaryPackage;