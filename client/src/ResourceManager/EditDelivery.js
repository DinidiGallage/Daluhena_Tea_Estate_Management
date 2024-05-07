import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editDelivery.css'; // Make sure the path is correct

function EditDelivery() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState({
        driver_nic: '',
        lorry_number: '',
        delivery_status: '',
    });
    const [driverNICs, setDriverNICs] = useState([]);
    const [lorryNumbers, setLorryNumbers] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const fetchDriverNICs = axios.get('http://localhost:8070/delivery/viewDrivers');
                const fetchLorryNumbers = axios.get('http://localhost:8070/delivery/viewLorryNumbers');
                const fetchDeliveryDetails = axios.get(`http://localhost:8070/delivery/deliveriesRM/${id}`);
                
                const [driversResponse, lorriesResponse, deliveryResponse] = await Promise.all([
                    fetchDriverNICs, 
                    fetchLorryNumbers, 
                    fetchDeliveryDetails
                ]);
                
                setDriverNICs(driversResponse.data);
                setLorryNumbers(lorriesResponse.data);
                setDelivery({
                    driver_nic: deliveryResponse.data.driver_nic,
                    lorry_number: deliveryResponse.data.lorry_number,
                    delivery_status: deliveryResponse.data.delivery_status,
                });
            } catch (error) {
                console.error('There was an error fetching the data: ', error);
            }
        };

        fetchInitialData();
    }, [id]); // Depend on 'id' to refetch when it changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDelivery(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const saveChanges = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/delivery/updateDeliveryResource/${id}`, delivery);
            alert('Delivery updated successfully.');
            navigate('/ViewResourceHistory');
        } catch (err) {
            console.error(err);
            alert('Failed to update delivery.');
        }
    };

    return (
        <div className="pd-edit-delivery-container">
            <h2>Edit Delivery</h2>
            <form className="pd-edit-form" onSubmit={saveChanges}>
                <table className="pd-edit-table">
                    <thead>
                        <tr>
                            <th>Driver NIC</th>
                            <th>Lorry Number</th>
                            <th>Delivery Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select className="pd-edit-select" name="driver_nic" value={delivery.driver_nic} onChange={handleChange}>
                                    <option value="">Select Driver NIC</option>
                                    {driverNICs.map((nic, index) => (
                                        <option key={index} value={nic}>{nic}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select className="pd-edit-select" name="lorry_number" value={delivery.lorry_number} onChange={handleChange}>
                                    <option value="">Select Lorry Number</option>
                                    {lorryNumbers.map((number, index) => (
                                        <option key={index} value={number}>{number}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select className="pd-edit-select" name="delivery_status" value={delivery.delivery_status} onChange={handleChange}>
                                    <option value="">Select Delivery Status</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Delivering">Delivering</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                            <td>
                                <button type="submit" className="pd-edit-button">Save Changes</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default EditDelivery;
