import React, { useState } from 'react';
import axios from 'axios';
import './AddSalaryPackage.css'; // Import the CSS file



function AddSalaryPackage() {
    const [packageDetails, setPackageDetails] = useState({
        salary_package_name: '',
        ot_payment_per_hour: 0,
        tax: 0,
        bonus: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageDetails(prevState => ({
            ...prevState,
            [name]: name === 'salary_package_name' ? value : parseFloat(value) // Correctly handle string and number inputs
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

         // Basic validation
    if (packageDetails.salary_package_name.trim() === '') {
        alert('Please enter a valid Salary Package Name');
        return;
    }
    if (isNaN(packageDetails.ot_payment_per_hour) || packageDetails.ot_payment_per_hour <= 0) {
        alert('Please enter a valid OT Payment per Hour');
        return;
    }
    if (isNaN(packageDetails.tax) || packageDetails.tax < 0 || packageDetails.tax > 100) {
        alert('Please enter a valid Tax percentage between 0 and 100');
        return;
    }
    if (isNaN(packageDetails.bonus) || packageDetails.bonus < 0) {
        alert('Please enter a valid Bonus amount');
        return;
    }

    
        axios.post('http://localhost:8070/employeeSalary/AddSalaryPackage', packageDetails)
            .then(response => {
                alert('Salary Package Added Successfully!');
                // Reset form or additional actions upon success
                setPackageDetails({
                    salary_package_name: '',
                    ot_payment_per_hour: 0,
                    tax: 0,
                    bonus: 0
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Failed to add salary package');
            });
    };

    return (
        <div className="container ">
            <br />
            <h1><center>Add Salary Package</center></h1>
            <br /><br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Salary Package Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="salary_package_name"
                        value={packageDetails.salary_package_name}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>OT Payment per Hour</label>
                    <input
                        type="number"
                        className="form-control"
                        name="ot_payment_per_hour"
                        value={packageDetails.ot_payment_per_hour}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Tax (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="tax"
                        value={packageDetails.tax}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>Bonus</label>
                    <input
                        type="number"
                        className="form-control"
                        name="bonus"
                        value={packageDetails.bonus}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Add Package</button>
            </form>
        </div>
    );
    
}

export default AddSalaryPackage;
