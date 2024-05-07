import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./inventory.css";

function InventoryDifference() {
    const [differences, setDifferences] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [searchQuery]); // Trigger fetchData whenever searchQuery changes

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/differenceQuantity?tea_type=${searchQuery}`);
            setDifferences(response.data);
        } catch (error) {
            console.error('Error fetching inventory differences:', error);
        }
    };

    const handleSearch = () => {
        fetchData(); // Call fetchData to fetch data based on search query
    };

    const generatePDF = () => {
        // Generate PDF from the inventory table
        const pdf = new jsPDF('p', 'mm', 'a4');
        const table = document.querySelector('.inventory-table');
        html2canvas(table).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('inventory_report.pdf');
        });
    };

    return (
        <div className="inventory-container">
            <h2 className="inventory-heading">Inventory Differences</h2>
            <div className="search-bar-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Tea Type"
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
                <button onClick={generatePDF} className="pdf-button">Generate PDF</button>
            </div>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th className="table-header">Tea Type</th>
                        <th className="table-header">Difference</th>
                    </tr>
                </thead>
                <tbody>
                    {differences.map((difference, index) => (
                        <tr key={index} className="table-row">
                            <td className="table-cell">{difference.tea_type}</td>
                            <td className="table-cell">{difference.difference}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryDifference;
