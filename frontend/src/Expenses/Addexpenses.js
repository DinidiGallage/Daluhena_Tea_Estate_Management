// File: AddExpense.js

import React, { useState } from 'react';
import axios from 'axios';
import './Addexpenses.css'; // Import the CSS file

function AddExpense() {
    const [expense, setExpense] = useState({
        expenses_type: '',
        expense_amount: ''
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let errorMessage = '';

        switch (name) {
            case 'expenses_type':
                if (!value) errorMessage = 'Please select an Expense Type';
                break;
            case 'expense_amount':
                if (isNaN(value) || value <= 0) errorMessage = 'Please enter a valid Expense Amount';
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
        const parsedValue = name === 'expense_amount' ? parseFloat(value) : value;

        setExpense(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));

        // Validate each field as it's being changed
        validateField(name, parsedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform a final validation check before submitting
        const validationFields = Object.keys(expense);
        validationFields.forEach(field => validateField(field, expense[field]));

        // Check for any existing errors before submission
        const hasErrors = Object.values(errors).some(errorMessage => errorMessage);
        if (hasErrors) {
            alert('Please correct the errors before submitting the form');
            return;
        }

        axios.post('http://localhost:8070/employeeSalary/addExpense', expense)
            .then(response => {
                alert('Expense Added Successfully!');
                setExpense({ expenses_type: '', expense_amount: '' }); // Reset form
                setErrors({});
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Failed to add expense');
            });
    };

    return (
        <div className="container-expenses">
            <h1><center>Add Expense</center></h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="expenses_type">Expense Type</label>
                    <select
                        id="expenses_type"
                        name="expenses_type"
                        className="form-control"
                        value={expense.expenses_type}
                        onChange={handleChange}>
                        <option value="">Select Expense Type</option>
                        <option value="Employee Salaries">Employee Salaries</option>
                        <option value="Fertilizer Expenses">Fertilizer Expenses</option>
                        <option value="Repair and Maintenance Expenses">Repair and Maintenance Expenses</option>
                    </select>
                    {errors.expenses_type && <span className="error">{errors.expenses_type}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="expense_amount">Expense Amount</label>
                    <input
                        type="number"
                        id="expense_amount"
                        name="expense_amount"
                        className="form-control"
                        value={expense.expense_amount}
                        onChange={handleChange}
                        required />
                    {errors.expense_amount && <span className="error">{errors.expense_amount}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Add Expense</button>
            </form>
        </div>
    );
}

export default AddExpense;
