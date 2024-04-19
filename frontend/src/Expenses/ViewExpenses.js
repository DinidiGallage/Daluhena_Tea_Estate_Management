import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewExpenses() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        axios.get('http://localhost:8070/employeeSalary/getExpenses')
            .then(response => {
                setExpenses(response.data); 
            })
            .catch(error => {
                console.error('Failed to fetch expenses:', error);
                alert('Failed to fetch expenses');
            });
    };

    const deleteExpense = (id) => {
        axios.delete(`http://localhost:8070/employeeSalary/deleteSalaryPackage/${id}`)
            .then(() => {
                alert('Expense deleted successfully');
                fetchExpenses();  
            })
            .catch(error => {
                console.error('Failed to delete Expense:', error);
                alert(`Failed to delete Expense: ${error.response ? error.response.data.error : 'Server error'}`);
            });
    };


    const editExpense = (id) => {
        navigate(`/editExpense/${id}`);
    };

    return (
        <div className="container">
            <h1><center>Expenses</center></h1>
            {expenses.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Expense Type</th>
                            <th>Expense Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(expense => (
                            <tr key={expense._id}>
                                <td>{expense.expenses_type}</td>
                                <td>{expense.expense_amount}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => editExpense(expense._id)} className="btn btn-primary">Edit</button>
                                    <button onClick={() => deleteExpense(expense._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No expenses found.</p>
            )}
        </div>
    );
}

export default ViewExpenses;
