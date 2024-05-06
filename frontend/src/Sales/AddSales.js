// File: AddSale.js

import React, { useState } from 'react';
import axios from 'axios';
import "./AddSales.css";

function AddSale() {
    const [sale, setSale] = useState({
        sales_type: '',
        sales_amount: ''
    });

    const [errors, setErrors] = useState({});

    // Validate each field individually
    const validateField = (name, value) => {
        let errorMessage = '';

        switch (name) {
            case 'sales_type':
                if (!value) errorMessage = 'Please select a Sales Type';
                break;
            case 'sales_amount':
                if (isNaN(value) || value <= 0) errorMessage = 'Please enter a valid Sales Amount';
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'sales_amount' ? parseFloat(value) : value;

        setSale(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));

        // Validate each field as it's being changed
        validateField(name, parsedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform a final validation check before submitting
        const validationFields = Object.keys(sale);
        validationFields.forEach(field => validateField(field, sale[field]));

        // Check for any existing errors before submission
        const hasErrors = Object.values(errors).some(errorMessage => errorMessage);
        if (hasErrors) {
            alert('Please correct the errors before submitting the form');
            return;
        }

        axios.post('http://localhost:8070/employeeSalary/addSale', sale)
            .then(response => {
                alert('Sale Added Successfully!');
                setSale({ sales_type: '', sales_amount: '' }); // Reset form
                setErrors({});
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Failed to add sale');
            });
    };

    return (
        <div className="container-sales">
            <h1><center>Add Sale</center></h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sales_type">Sales Type</label>
                    <select
                        id="sales_type"
                        name="sales_type"
                        className="form-control"
                        value={sale.sales_type}
                        onChange={handleChange}>
                        <option value="">Select Sales Type</option>
                        <option value="Factory Checks">Factory Checks</option>
                        <option value="Factory Cash">Factory Cash</option>
                        <option value="Factory Deposits">Factory Deposits</option>
                    </select>
                    {errors.sales_type && <span className="error">{errors.sales_type}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="sales_amount">Sales Amount</label>
                    <input
                        type="number"
                        id="sales_amount"
                        name="sales_amount"
                        className="form-control"
                        value={sale.sales_amount}
                        onChange={handleChange}
                        required />
                    {errors.sales_amount && <span className="error">{errors.sales_amount}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Add Sale</button>
            </form>
        </div>
    );
}

export default AddSale;
