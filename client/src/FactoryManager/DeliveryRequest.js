import React, { Component } from 'react';
import './DisplayDeliveries.css';
import axios from 'axios';
import "./DeliveryRequest.css";
class DisplayDeliveries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveries: [],
            selectedStatus: {}, // Maps delivery IDs to their selected statuses
        };
    }

    componentDidMount() {
        this.fetchDeliveries();
    }

    fetchDeliveries = async () => {
        try {
            const response = await axios.get('http://localhost:8070/delivery/pending-deliveries');
            // Assuming your backend sends the request_status for each delivery
            // Filter out deliveries that are already accepted or rejected
            const filteredDeliveries = response.data.filter(delivery => 
                delivery.request_status !== "Accept" && delivery.request_status !== "Reject"
            );
            this.setState({ deliveries: filteredDeliveries });
        } catch (error) {
            console.error("Error fetching deliveries:", error);
        }
    };

    handleStatusChange = (deliveryId, newStatus) => {
        this.setState(prevState => ({
            selectedStatus: {
                ...prevState.selectedStatus,
                [deliveryId]: newStatus,
            }
        }));
    };

    handleSaveStatus = async (deliveryId) => {
        const newStatus = this.state.selectedStatus[deliveryId];
        if (!newStatus) return; // Don't proceed if no status is selected
    
        try {
            await axios.post(`http://localhost:8070/delivery/update-delivery-status/${deliveryId}`, { newStatus });
    
            // Optimistically remove the delivery from the state to immediately reflect the change
            this.setState(prevState => ({
                deliveries: prevState.deliveries.filter(delivery => delivery._id !== deliveryId),
                selectedStatus: {
                    ...prevState.selectedStatus,
                    [deliveryId]: "", // Optionally reset the status selection for this delivery
                }
            }));
        } catch (error) {
            console.error("Error saving delivery status:", error);
        }
    };
    

    render() {
        if (this.state.deliveries.length === 0) {
            return <div className='pm-no-requests'>No new requests are available.</div>;
        }

        return (
            <div className='pm-delivery-container'>
                {this.state.deliveries.map((delivery) => (
                    <div key={delivery._id}>
                        <p>Tea Type: {delivery.tea_type}</p>
                        <p>Delivery Quantity: {delivery.delivery_quantity}</p>
                        <p>Delivery Date: {new Date(delivery.delivery_date).toLocaleDateString()}</p>
                        <select
                            value={this.state.selectedStatus[delivery._id] || ''}
                            onChange={(e) => this.handleStatusChange(delivery._id, e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Update">Accept</option>
                            <option value="Reject">Rejected</option>
                        </select>
                        <button onClick={() => this.handleSaveStatus(delivery._id)}>Save</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default DisplayDeliveries;
