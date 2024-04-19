import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditSale() {
    const [sale, setSale] = useState({
        sales_type: '',
        sales_amount: 0 // Assuming sales_amount should be a number
    });

    const { id } = useParams(); // This retrieves the `id` param from the URL
    const navigate = useNavigate(); // Used for navigating after updates

    useEffect(() => {
        axios.get(`http://localhost:8070/employeeSalary/getSale/${id}`)
            .then(response => {
                setSale(response.data); // Assuming response.data contains the sale object directly
            })
            .catch(error => {
                console.error('Error fetching sale details:', error);
                alert('Failed to fetch sale details');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale(prevState => ({
            ...prevState,
            [name]: name === 'sales_amount' ? parseFloat(value) : value // Parsing value to float if it's sales_amount
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/employeeSalary/updateSale/${id}`, sale)
            .then(() => {
                alert('Sale updated successfully');
                navigate('/ViewSales'); // Navigate back to the sales view page after successful update
            })
            .catch(error => {
                console.error('Error updating sale:', error);
                alert('Failed to update sale');
            });
    };

    return (
        <div className="container">
            <h1>Edit Sale</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Sales Type</label>
                    <select
                        className="form-control"
                        name="sales_type"
                        value={sale.sales_type}
                        onChange={handleChange}
                        required>
                        <option value="">Select Sales Type</option>
                        <option value="Factory Checks">Factory Checks</option>
                        <option value="Factory Cash">Factory Cash</option>
                        <option value="Factory Deposits">Factory Deposits</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Sales Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        name="sales_amount"
                        value={sale.sales_amount}
                        onChange={handleChange}
                        required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditSale;
