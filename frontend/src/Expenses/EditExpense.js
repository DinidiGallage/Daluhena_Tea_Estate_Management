import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditExpense() {
    const [expense, setExpense] = useState({ expenses_type: '', expense_amount: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8070/employeeSalary/getExpense/${id}`)
            .then(response => {
                setExpense({
                    expenses_type: response.data.expenses_type,
                    expense_amount: response.data.expense_amount
                });
            })
            .catch(error => {
                console.error('Failed to fetch expense details:', error);
                alert('Failed to fetch expense details');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense(prevState => ({
            ...prevState,
            [name]: name === 'expense_amount' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/employeeSalary/updateExpense/${id}`, expense)
            .then(() => {
                alert('Expense updated successfully');
                navigate('/ViewExpenses');
            })
            .catch(error => {
                console.error('Failed to update expense:', error);
                alert('Failed to update expense');
            });
    };

    return (
        <div className="container">
            <h1>Edit Expense</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Expense Type</label>
                    <select name="expenses_type" className="form-control" value={expense.expenses_type} onChange={handleChange} required>
                        <option value="">Select Expense Type</option>
                        <option value="Employee Salaries">Employee Salaries</option>
                        <option value="Fertilizer Expenses">Fertilizer Expenses</option>
                        <option value="Repair and Maintenance Expenses">Repair and Maintenance Expenses</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Expense Amount</label>
                    <input type="number" name="expense_amount" className="form-control" value={expense.expense_amount} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditExpense;
