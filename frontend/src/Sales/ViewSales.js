import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewSales() {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8070/employeeSalary/getSales')
            .then(response => {
                setSales(response.data);  
            })
            .catch(error => {
                console.error('Failed to fetch sales:', error);
                alert('Failed to fetch sales');
            });
    }, []);

    const deleteSale = (id) => {
        axios.delete(`http://localhost:8070/employeeSalary/deleteSale/${id}`)
            .then(() => {
                alert('Sale deleted successfully');
                setSales(prevSales => prevSales.filter(sale => sale._id !== id));  
            })
            .catch(error => {
                console.error('Failed to delete sale:', error);
                alert('Failed to delete sale');
            });
    };

    const editSale = (id) => {
        navigate(`/EditSales/${id}`);
    };

    return (
        <div className="container">
            <h1><center>Sales</center></h1>
            {sales.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sales Type</th>
                            <th>Sales Amount</th>
                            <th>Date</th> {/* New column for Date */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale._id}>
                                <td>{sale.sales_type}</td>
                                <td>{sale.sales_amount}</td>
                                <td>{new Date(sale.date).toLocaleDateString()}</td> {/* Display Date */}
                                <td>
                                    <button onClick={() => editSale(sale._id)} className="btn btn-primary">Edit</button>
                                    <button onClick={() => deleteSale(sale._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No sales found.</p>
            )}
        </div>
    );
}

export default ViewSales;
