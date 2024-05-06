import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Final_reports.css";

function FinalReports() {
    const [totalSales, setTotalSales] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        fetchTotalSales();
        fetchTotalExpenses();
    }, []);

    const fetchTotalSales = async () => {
        try {
            const response = await axios.get('http://localhost:8070/employeeSalary/getTotalSales');
            setTotalSales(response.data.totalSales);
        } catch (error) {
            console.error('Failed to fetch total sales:', error);
            alert('Failed to fetch total sales');
        }
    };

    const fetchTotalExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:8070/employeeSalary/getTotalExpenses');
            setTotalExpenses(response.data.totalExpenses);
        } catch (error) {
            console.error('Failed to fetch total expenses:', error);
            alert('Failed to fetch total expenses');
        }
    };

    useEffect(() => {
        const profitValue = totalSales - totalExpenses;
        setProfit(profitValue);
    }, [totalSales, totalExpenses]);

    return (
        <div className="final-reports">
            <h1 className="final-reports__heading">Final Reports</h1>
            <table className="final-reports__table">
                <thead>
                    <tr>
                        <th>Debit</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalExpenses}</td>
                        <td>{totalSales}</td>
                    </tr>
                </tbody>
            </table>
            <h3 className="final-reports__profit">Profit: {profit}</h3>
        </div>
    );
}

export default FinalReports;
