import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./manager.css";

function EditDeliveryRequest() {
    const { id } = useParams();
    const [delivery, setDelivery] = useState({
        delivery_quantity: '',
        driver_nic: '',
        delivery_status: '',
        request_status: '',
        lorry_number: '',
        delivery_date: '',
        tea_type: ''
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/delivery/getHistory/${id}`);
                const formattedDate = response.data.delivery_date ? new Date(response.data.delivery_date).toISOString().split('T')[0] : '';
                const updatedDelivery = { ...response.data, delivery_date: formattedDate };
                setDelivery(updatedDelivery);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch delivery details');
                setLoading(false);
            }
        };
        fetchDelivery();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'delivery_quantity') {
            // Prevent typing letters in delivery quantity
            const regex = /^[0-9\b]+$/;
            if (e.target.value === '' || regex.test(e.target.value)) {
                setDelivery({ ...delivery, [e.target.name]: e.target.value });
            }
        } else {
            setDelivery({ ...delivery, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/delivery/updateDelivery/${id}`, delivery);
            navigate('/ViewDeliveryRequestHistory');
        } catch (error) {
            setError('Failed to update delivery');
        }
    };

    if (loading) return <div className="pd-loading">Loading...</div>;
    if (error) return <div className="pd-error">Error: {error}</div>;

    return (
        <div className="pd-edit-delivery-container">
            <h2>Edit Delivery Request</h2>
            <form onSubmit={handleSubmit} className="pd-edit-delivery-form">
                <div className="pd-form-group">
                    <label htmlFor="delivery_quantity">Delivery Quantity</label>
                    <input type="text" id="delivery_quantity" name="delivery_quantity" value={delivery.delivery_quantity || ''} onChange={handleChange} className="pd-form-control" />
                </div>
                <div className="pd-form-group">
                    <label htmlFor="driver_nic">Driver NIC</label>
                    <input type="text" id="driver_nic" name="driver_nic" value={delivery.driver_nic || ''} onChange={handleChange} className="pd-form-control" />
                </div>
                <div className="pd-form-group">
                    <label htmlFor="delivery_status">Delivery Status</label>
                    <select id="delivery_status" name="delivery_status" value={delivery.delivery_status || ''} onChange={handleChange} className="pd-form-select">
                        <option value="">Select a Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="pd-form-group">
                    <label htmlFor="request_status">Request Status</label>
                    <select id="request_status" name="request_status" value={delivery.request_status || ''} onChange={handleChange} className="pd-form-select">
                        <option value="">Select a Status</option>
                        <option value="New">New</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="pd-form-group">
                    <label htmlFor="lorry_number">Lorry Number</label>
                    <input type="text" id="lorry_number" name="lorry_number" value={delivery.lorry_number || ''} onChange={handleChange} className="pd-form-control" />
                </div>
                <div className="pd-form-group">
                    <label htmlFor="delivery_date">Delivery Date</label>
                    <input type="date" id="delivery_date" name="delivery_date" value={delivery.delivery_date || ''} onChange={handleChange} className="pd-form-control" />
                </div>
                <div className="pd-form-group">
                    <label htmlFor="tea_type">Tea Type</label>
                    <select id="tea_type" name="tea_type" value={delivery.tea_type || ''} onChange={handleChange} className="pd-form-select">
                        <option value="">Select a Type</option>
                        <option value="Black">Black</option>
                        <option value="Green">Green</option>
                        <option value="Oolong">Oolong</option>
                        <option value="White">White</option>
                    </select>
                </div>
                <button type="submit" className="pd-submit-btn">Save Changes</button>
            </form>
        </div>
    );
}

export default EditDeliveryRequest;
