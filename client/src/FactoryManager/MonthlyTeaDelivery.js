import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutForOutside from '../OtherManagersPD/LayoutForOutside'; // Import LayoutForOutside
import "./MonthlyDelivery.css";
function MonthlyDeliveries() {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/delivery/monthlyDeliveriesByTeaType')
            .then(response => {
                setDeliveries(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the monthly deliveries data:', error);
            });
    }, []);

    return (
        <LayoutForOutside> {/* Wrap the page content with LayoutForOutside */}
            <div className="pd-monthly-deliveries-container">
                <h2 className="pd-monthly-deliveries-heading">Monthly Delivery Quantities by Tea Type</h2>
                <table className="pd-monthly-deliveries-table pm-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Tea Type</th>
                            <th>Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.map(({ _id: { year, month, teaType }, totalQuantity }) => (
                            <tr key={`${year}-${month}-${teaType}`} className="pd-delivery-row">
                                <td className="pd-delivery-data">{year}</td>
                                <td className="pd-delivery-data">{month}</td>
                                <td className="pd-delivery-data">{teaType}</td>
                                <td className="pd-delivery-data">{totalQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutForOutside>
    );
}

export default MonthlyDeliveries;
