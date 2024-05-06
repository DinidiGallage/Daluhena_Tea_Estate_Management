import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ViewSales() {
    const [sales, setSales] = useState([]);
    const [totalSales, setTotalSales] = useState(0); // State variable for total sales
    const navigate = useNavigate();
    const componentRef = useRef();

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = () => {
        axios.get('http://localhost:8070/employeeSalary/getSales')
            .then(response => {
                setSales(response.data);
                calculateTotalSales(response.data); // Calculate total sales initially
            })
            .catch(error => {
                console.error('Failed to fetch sales:', error);
                alert('Failed to fetch sales');
            });
    };

    const deleteSale = (id) => {
        axios.delete(`http://localhost:8070/employeeSalary/deleteSale/${id}`)
            .then(() => {
                alert('Sale deleted successfully');
                fetchSales(); // Refetch sales after deletion
            })
            .catch(error => {
                console.error('Failed to delete sale:', error);
                alert(`Failed to delete sale: ${error.response ? error.response.data.error : 'Server error'}`);
            });
    };

    const editSale = (id) => {
        navigate(`/editSale/${id}`);
    };

    const calculateTotalSales = (salesData) => {
        const total = salesData.reduce((acc, sale) => acc + sale.sales_amount, 0);
        setTotalSales(total);
    };

    const generatePDF = () => {
        html2canvas(componentRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Date and time
            const now = new Date();
            const dateStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

            // Add company and sales manager details in bold
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.setTextColor('#2e4b36');
            pdf.text("Company Name: Daluhena Tea Estate", 10, 20);
            pdf.text("Sales Manager: Malmi Perera", 10, 30);

            // Add sales details
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.text("Sales Details:", 10, 50);
            let yPos = 60;
            sales.forEach(sale => {
                pdf.text(`${sale.sales_type}: ${sale.sales_amount}`, 10, yPos);
                yPos += 10;
            });

            // Add total sales
            pdf.setFontSize(14);
            pdf.text(`Total Sales: ${totalSales}`, 10, yPos + 10);

            // Add auto-generated date and time
            pdf.setFontSize(10);
            pdf.text(`Generated on: ${dateStr}`, 10, pdfHeight - 10);

            // Save the PDF
            pdf.save("sales_report.pdf");
        });
    };

    return (
        <div className="container">
            <h1><center>Sales</center></h1>
            <p>Total Sales: {totalSales}</p> {/* Display total sales amount */}
            <table className="table" ref={componentRef}>
                <thead>
                    <tr>
                        <th>Sales Type</th>
                        <th>Sales Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale._id}>
                            <td>{sale.sales_type}</td>
                            <td>{sale.sales_amount}</td>
                            <td>{new Date(sale.date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => editSale(sale._id)} className="btn btn-primary">Edit</button>
                                <button onClick={() => deleteSale(sale._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
            <button onClick={generatePDF} className="btn btn-success">Generate Report</button>
        </div>
    );
}

export default ViewSales;
