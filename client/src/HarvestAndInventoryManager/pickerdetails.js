import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PickersTable() {
    const [pickers, setPickers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all pickers data
    const fetchPickers = async () => {
        try {
            const response = await axios.get('http://localhost:8070/harvestAndinventory/viewAllPickers');
            setPickers(response.data);
        } catch (err) {
            setError('Error fetching pickers');
        } finally {
            setLoading(false);
        }
    };

    // Delete a picker by ID
    const deletePicker = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/harvestAndinventory/deletePicker/${id}`);
            setPickers((prev) => prev.filter((picker) => picker._id !== id));
        } catch (err) {
            setError('Error deleting picker');
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchPickers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Pickers</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Picker ID</th>
                        <th>Employee NIC</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pickers.map((picker) => (
                        <tr key={picker._id}>
                            <td>{picker.picker_id}</td>
                            <td>{picker.employee_nic}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deletePicker(picker._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PickersTable;
