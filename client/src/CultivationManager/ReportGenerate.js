import React, { useState } from 'react';
import axios from 'axios';

const ReportGenerator = () => {
    const [reportType, setReportType] = useState('tasks');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/cultivation/generate-report', {
                reportType,
                fromDate,
                toDate
            }, { responseType: 'blob' });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Report Type:
                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                        <option value="tasks">Tasks</option>
                        <option value="schedules">Schedules</option>
                        <option value="cultivations">Cultivations</option>
                    </select>
                </label>
                <label>
                    From Date:
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </label>
                <label>
                    To Date:
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </label>
                <button type="submit">Download Report</button>
            </form>
        </div>
    );
};

export default ReportGenerator;
