import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddSales.css";

function AddSale() {
    const [sale, setSale] = useState({
        sales_type: '',
        sales_amount: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Function to validate the entire form
    const validateForm = () => {
        const isValid = sale.sales_type !== '' && !isNaN(sale.sales_amount) && sale.sales_amount > 0;
        setIsFormValid(isValid);
    };

    useEffect(() => {
        validateForm();
    }, [sale]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;

        // Handle number parsing for sales_amount
        if (name === 'sales_amount') {
            parsedValue = parseFloat(value);
            // Prevent non-numeric input by setting it to an empty string if it's NaN
            if (isNaN(parsedValue)) {
                parsedValue = '';
            }
        }

        setSale(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            alert('Please fill all fields correctly before submitting.');
            return;
        }

        axios.post('http://localhost:8070/employeeSalary/addSale', sale)
            .then(response => {
                alert('Sale Added Successfully!');
                setSale({ sales_type: '', sales_amount: '' }); // Reset form
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
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Add Sale</button>
            </form>
        </div>
    );
}

export default AddSale;
