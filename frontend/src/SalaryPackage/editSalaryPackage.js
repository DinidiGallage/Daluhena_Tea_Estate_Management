import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditSalaryPackage() {
    const [packageDetails, setPackageDetails] = useState({
        salary_package_name: '',
        ot_payment_per_hour: 0,
        tax: 0,
        bonus: 0
    });
    const { id } = useParams(); // This captures the :id from the URL
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8070/employeeSalary/getSalaryPackage/${id}`)
            .then(response => {
                setPackageDetails(response.data); // Set the fetched data into state
            })
            .catch(error => {
                console.error('Failed to fetch package details', error);
                alert('Failed to fetch package details');
            });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPackageDetails({
            ...packageDetails,
            [name]: name === 'salary_package_name' ? value : parseFloat(value) // Ensure numeric fields are parsed
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8070/employeeSalary/updateSalaryPackage/${id}`, packageDetails)
            .then(() => {
                alert('Package updated successfully');
                navigate('/ViewSalaryPackages'); // Adjusted to navigate to the list view
            })
            .catch(error => {
                console.error('Failed to update package', error);
                alert('Failed to update package');
            });
    };

    return (
        <div className="container">
            <h1>Edit Salary Package</h1>
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditSalaryPackage;
