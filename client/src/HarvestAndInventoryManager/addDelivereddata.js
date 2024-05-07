import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./adddeliver.css";

function AddDeliveryData() {
    const [formData, setFormData] = useState({
        tea_type: '',
        quantity: 0,
        delivered_date: ''
    });
    const [teaTypes, setTeaTypes] = useState([]);

    useEffect(() => {
        fetchTeaTypes();
    }, []);

    const fetchTeaTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8070/harvestAndinventory/teaTypes');
            setTeaTypes(response.data);
        } catch (error) {
            console.error('Error fetching tea types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to add delivery data
            await axios.post('http://localhost:8070/harvestAndinventory/addHarvestDataMinus', formData);
            alert('Delivery data added successfully');
            // Clear form data after successful submission
            setFormData({
                tea_type: '',
                quantity: 0,
                delivered_date: ''
            });
        } catch (error) {
            console.error('Error adding delivery data:', error);
            alert('Failed to add delivery data. Please try again.');
        }
    };

    return (
        <div className="HI-add-delivery-container">
            <h2 className="HI-add-delivery-heading">Add Delivery Data</h2>
            <form className="HI-add-delivery-form" onSubmit={handleSubmit}>
                <div>
                    <label className="HI-add-delivery-label">Tea Type:</label>
                    <select className="HI-add-delivery-input" name="tea_type" value={formData.tea_type} onChange={handleChange}>
                        <option value="">Select Tea Type</option>
                        {teaTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="HI-add-delivery-label">Quantity:</label>
                    <input className="HI-add-delivery-input" type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div>
                    <label className="HI-add-delivery-label">Delivered Date:</label>
                    <input className="HI-add-delivery-date-input" type="date" name="delivered_date" value={formData.delivered_date} onChange={handleChange} />
                </div>
                <button className="HI-add-delivery-submit-btn" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddDeliveryData;
