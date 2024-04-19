import React, { useState, useEffect } from 'react';

function SalesExpensesProfitTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch total sales and expenses data
    Promise.all([
      fetch('http://localhost:8090/employeeSalary/getTotalSalesInPreviousMonths').then(response => response.json()),
      fetch('http://localhost:8090/employeeSalary/getTotalExpensesInPreviousMonths').then(response => response.json())
    ])
      .then(([salesData, expensesData]) => {
        // Combine sales and expenses data
        const combinedData = salesData.map(salesItem => {
          const expensesItem = expensesData.find(expensesItem => expensesItem.month === salesItem.month);
          const profit = salesItem.totalSales - (expensesItem ? expensesItem.totalExpenses : 0);
          return {
            year: salesItem.year,
            month: salesItem.month,
            totalSales: salesItem.totalSales,
            totalExpenses: expensesItem ? expensesItem.totalExpenses : 0,
            profit: profit
          };
        });
        setData(combinedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Sales, Expenses, and Profit in Previous Months</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Total Sales</th>
            <th>Total Expenses</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.month}</td>
              <td>{item.totalSales}</td>
              <td>{item.totalExpenses}</td>
              <td>{item.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesExpensesProfitTable;
