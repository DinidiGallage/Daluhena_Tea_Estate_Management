import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ViewExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const navigate = useNavigate();
    const componentRef = useRef();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        axios.get('http://localhost:8070/employeeSalary/getExpenses')
            .then(response => {
                setExpenses(response.data);
                calculateTotalExpenses(response.data);
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

    const calculateTotalExpenses = (expensesData) => {
        const total = expensesData.reduce((acc, expense) => acc + expense.expense_amount, 0);
        setTotalExpenses(total);
    };

    const generatePDF = () => {
        html2canvas(componentRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Date and time
            const now = new Date();
            const dateStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

            // Add company and finance manager details in bold
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.setTextColor('#2e4b36');
            pdf.text("Company Name: Daluhena Tea Estate", 10, 20);
            pdf.text("Finance Manager: Malmi Perera", 10, 30);

            // Add expenses details
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.text("Expenses Details:", 10, 50);
            let yPos = 60;
            expenses.forEach(expense => {
                pdf.text(`${expense.expenses_type}: ${expense.expense_amount}`, 10, yPos);
                yPos += 10;
            });

            // Add total expenses
            pdf.setFontSize(14);
            pdf.text(`Total Expenses: ${totalExpenses}`, 10, yPos + 10);

            // Add auto-generated date and time
            pdf.setFontSize(10);
            pdf.text(`Generated on: ${dateStr}`, 10, pdfHeight - 10);

            // Save the PDF
            pdf.save("expenses_report.pdf");
        });
    };

    return (
        <div className="container">
            <h1><center>Expenses</center></h1>
            <p>Total Expenses: {totalExpenses}</p>
            <table className="table" ref={componentRef}>
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
            <br /><br />
            <button onClick={generatePDF} className="btn btn-success">Generate Report</button>
        </div>
    );
}

export default ViewExpenses;
