import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MonthlyDeliveryReport() {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/delivery/monthlyDeliveryReport')
            .then(response => {
                setReportData(response.data);
            })
            .catch(error => {
                console.error('Error fetching monthly delivery report:', error);
            });
    }, []);

    const downloadPDF = () => {
        axios.get('/downloadPDF', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'MonthlyDeliveryReport.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error('Error downloading PDF:', error);
            });
    };

    return (
        <div>
            <h1>Monthly Delivery Report by Tea Type</h1>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Tea Type</th>
                        <th>Total Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => (
                        <tr key={index}>
                            <td>{item._id.month}</td>
                            <td>{item._id.year}</td>
                            <td>{item._id.teaType}</td>
                            <td>{item.totalQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={downloadPDF}>Download PDF</button>
        </div>
    );
}

export default MonthlyDeliveryReport;
