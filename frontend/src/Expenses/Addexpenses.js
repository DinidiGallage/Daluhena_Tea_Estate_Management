// File: AddExpense.js

import React, { useState } from 'react';
import axios from 'axios';
import './Addexpenses.css'; // Import the CSS file

function AddExpense() {
    const [expense, setExpense] = useState({
        expenses_type: '',
        expense_amount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense(prevState => ({
            ...prevState,
            [name]: name === 'expense_amount' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         // Basic validation
    if (!expense.expenses_type) {
        alert('Please select an Expense Type');
        return;
    }
    if (isNaN(expense.expense_amount) || expense.expense_amount <= 0) {
        alert('Please enter a valid Expense Amount');
        return;
    }
        
        
        axios.post('http://localhost:8070/employeeSalary/addExpense', expense)
            .then(response => {
                alert('Expense Added Successfully!');
                setExpense({ expenses_type: '', expense_amount: '' });  // Reset form
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Failed to add expense');
            });
    };

    return (
        <div className="container">
            <h1><center>Add Expense</center></h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="expenses_type">Expense Type</label>
                    <select
                        id="expenses_type"
                        name="expenses_type"
                        className="form-control"
                        value={expense.expenses_type}
                        onChange={handleChange}
                        required>
                        <option value="">Select Expense Type</option>
                        <option value="Employee Salaries">Employee Salaries</option>
                        <option value="Fertilizer Expenses">Fertilizer Expenses</option>
                        <option value="Repair and Maintenance Expenses">Repair and Maintenance Expenses</option>
                    </select>
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
                </div>
                <button type="submit" className="btn btn-primary">Add Expense</button>
            </form>
        </div>
    );
}

export default AddExpense;
