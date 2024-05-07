import React, { useState } from 'react';
import axios from 'axios';
import "./report.css";

function DeliveryReports() {
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState('');

    const downloadPDF = async (reportType) => {
        setLoading(true);
        setActiveButton(reportType); // Set the active button
        try {
            let url = "";
            if (reportType === 'full') {
                url = 'http://localhost:8070/delivery/fullDeliveryReport';
            } else if (reportType === 'monthly') {
                url = 'http://localhost:8070/delivery/monthlyDeliveryReportPDF';
            } else if (reportType === 'monthlyTeaType') {
                // Handle download for monthly tea type report
                // Adjust the URL according to your backend implementation
                url = 'http://localhost:8070/delivery/monthlyTeaTypeReportPDF';
            }
            
            const response = await axios.get(url, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', `${reportType}_delivery_report.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Remove the link when done
            setLoading(false);
        } catch (error) {
            console.error(`Error downloading ${reportType} PDF:`, error);
            setLoading(false);
        }
    };

    return (
        <div className="pd-container">
            <h1>Delivery Reports</h1>
            <div className="pd-buttons-container">
                <button 
                    onClick={() => downloadPDF('full')} 
                    disabled={loading} 
                    className={activeButton === 'full' ? 'pd-active' : 'pd-button'}
                >
                    {loading ? 'Downloading Full Report...' : 'Download Full Report PDF'}
                </button>
                <button 
                    onClick={() => downloadPDF('monthly')} 
                    disabled={loading} 
                    className={activeButton === 'monthly' ? 'pd-active' : 'pd-button'}
                >
                    {loading ? 'Downloading Monthly Report...' : 'Download Monthly Report PDF'}
                </button>
            </div>
        </div>
    );
}

export default DeliveryReports;
