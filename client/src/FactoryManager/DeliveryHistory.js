import React, { Component } from 'react';
import axios from 'axios';
import "./DeliverHistory.css";

class DeliveryHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryHistory: [],
            searchField: 'delivery_quantity', // default search field
            searchTerm: ''
        };
    }

    componentDidMount() {
        this.fetchDeliveryHistory();
    }

    fetchDeliveryHistory = async () => {
        const { searchField, searchTerm } = this.state;
        const query = searchTerm ? `?searchField=${searchField}&searchTerm=${searchTerm}` : '';
        try {
            const response = await axios.get(`http://localhost:8070/delivery/delivery-history${query}`);
            this.setState({ deliveryHistory: response.data });
        } catch (error) {
            console.error("Error fetching delivery history:", error);
        }
    };

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleFieldChange = (e) => {
        this.setState({ searchField: e.target.value });
    };

    handleSearch = () => {
        this.fetchDeliveryHistory();
    };

    render() {
        return (
            <div>
                <h2>Delivery History</h2>
                <div className="pm-search-bar">
                    <select value={this.state.searchField} onChange={this.handleFieldChange}>
                        <option value="delivery_quantity">Delivery Quantity</option>
                        <option value="tea_type">Tea Type</option>
                        <option value="delivery_date">Delivery Date</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={this.state.searchTerm} 
                        onChange={this.handleSearchChange}
                    />
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                <table className="pm-table">
                    <thead>
                        <tr>
                            <th>Tea Type</th>
                            <th>Delivery Quantity</th>
                            <th>Driver NIC</th>
                            <th>Delivery Status</th>
                            <th>Request Status</th>
                            <th>Lorry Number</th>
                            <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deliveryHistory.length > 0 ? (
                            this.state.deliveryHistory.map((delivery, index) => (
                                <tr key={index}>
                                    <td>{delivery.tea_type || "Pending"}</td>
                                    <td>{delivery.delivery_quantity || "Pending"}</td>
                                    <td>{delivery.driver_nic || "Pending"}</td>
                                    <td>{delivery.delivery_status || "Pending"}</td>
                                    <td>{delivery.request_status || "Pending"}</td>
                                    <td>{delivery.lorry_number || "Pending"}</td>
                                    <td>{new Date(delivery.delivery_date).toLocaleDateString() || "Pending"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No delivery history found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DeliveryHistory;
