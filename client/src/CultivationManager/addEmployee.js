// React Component with updated class names
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css'; // Import CSS file

function AddEmployee() {
    const [nic, setNic] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate(); // Used for navigation after submission

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nic || !name) {
            alert("Both NIC and name are required!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8070/cultivation/add-employee', { nic, name });
            alert(response.data.message);
            navigate('/NICList'); // Navigate to NICList page using useNavigate
        } catch (error) {
            alert(`Failed to add employee: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="WC-add-employee-container">
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit} className="WC-add-employee-form">
                <label>
                    NIC:
                    <input
                        type="text"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        required
                        className="WC-input-field"
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="WC-input-field"
                    />
                </label>
                <button type="submit" className="WC-submit-button">Add Employee</button>
            </form>
        </div>
    );
}

export default AddEmployee;
