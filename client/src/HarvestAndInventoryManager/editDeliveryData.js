import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './editDeliveryData.css';

function EditDeliveryData() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        tea_type: '',
        quantity: '',
        delivered_date: ''
    });
    const [teaTypes, setTeaTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/harvestAndinventory/deliveryData/${id}`);
                const data = response.data;
                setFormData({
                    tea_type: data.tea_type,
                    quantity: data.quantity,
                    delivered_date: new Date(data.delivered_date).toISOString().slice(0, 10)
                });
            } catch (error) {
                console.error('Error fetching delivery data:', error);
            }
        };

        fetchData();
        fetchTeaTypes(); // Fetch tea types when component mounts
    }, [id]);

    const fetchTeaTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8070/harvestAndinventory/teaTypes');
            setTeaTypes(response.data);
        } catch (error) {
            console.error('Error fetching tea types:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/harvestAndinventory/updateDeliveryData/${id}`, formData);
            window.location.href = '/viewdelivery';
        } catch (error) {
            console.error('Error updating delivery data:', error);
        }
    };

    return (
        <div className="HI-edit-delivery-container">
            <h2>Edit Delivery Data</h2>
            <form onSubmit={handleSubmit} className="HI-edit-delivery-HI-form">
                <div className="HI-HI-form-group">
                    <label>Tea Type:</label>
                    <select name="tea_type" value={formData.tea_type} onChange={handleChange} className="HI-form-control">
                        <option value="">Select Tea Type</option>
                        {teaTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="HI-HI-form-group">
                    <label>Quantity:</label>
                    <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="HI-form-control" />
                </div>
                <div className="HI-HI-form-group">
                    <label>Delivered Date:</label>
                    <input type="date" name="delivered_date" value={formData.delivered_date} onChange={handleChange} className="HI-form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditDeliveryData;
