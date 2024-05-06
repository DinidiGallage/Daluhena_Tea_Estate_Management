import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewSalaryPackage.css'; // Make sure this points to the correct CSS file path
import { FaSearch } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ViewSalaryPackages() {
    const [packages, setPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = () => {
        axios.get('http://localhost:8070/employeeSalary/getAllSalaryPackages')
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch salary packages:', error);
                alert('Failed to fetch salary packages');
            });
    };

    const deletePackage = (id) => {
        axios.delete(`http://localhost:8070/employeeSalary/deleteSalaryPackage/${id}`)
            .then(() => {
                alert('Package deleted successfully');
                fetchPackages();
            })
            .catch(error => {
                console.error('Failed to delete package:', error);
                alert(`Failed to delete package: ${error.response ? error.response.data.error : 'Server error'}`);
            });
    };

    const editPackage = (id) => {
        navigate(`/editSalaryPackage/${id}`);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const calculateTotalSalary = (pkg) => {
        const grossSalary = pkg.basic_salary + (pkg.ot_payment_per_hour * pkg.no_of_hours_worked) + pkg.bonus;
        const taxAmount = (grossSalary * pkg.tax) / 100;
        return {
            totalSalary: Math.round(grossSalary - taxAmount),
            taxAmount: Math.round(taxAmount)
        };
    };

    const generateTaxReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(12); // Set font size

        let linePosition = 20;
        const lineHeight = 10;

        doc.text('Company Name: Daluhena Tea Estates', 20, linePosition);
        linePosition += lineHeight;
        doc.text('Finance Manager: Malmi Perera', 20, linePosition);
        linePosition += lineHeight * 2;

        let totalTaxDeducted = 0;

        packages.forEach(pkg => {
            const { taxAmount } = calculateTotalSalary(pkg);
            totalTaxDeducted += taxAmount;
            doc.text(`${pkg.designation} - Tax Deducted: $${taxAmount}`, 20, linePosition);
            linePosition += lineHeight;
        });

        doc.text(`Total Tax Deducted: $${totalTaxDeducted}`, 20, linePosition);
        linePosition += lineHeight;
        doc.text(`Report generated on: ${new Date().toLocaleString()}`, 20, linePosition);

        doc.save('tax_report.pdf');
    };

    const generateSalaryReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(12); // Set font size

        let linePosition = 20;
        const lineHeight = 10;

        doc.text('Company Name: Daluhena Tea Estates', 20, linePosition);
        linePosition += lineHeight;
        doc.text('Finance Manager: Malmi Perera', 20, linePosition);
        linePosition += lineHeight * 2;

        let totalSalary = 0;

        packages.forEach(pkg => {
            const { totalSalary: employeeSalary } = calculateTotalSalary(pkg);
            totalSalary += employeeSalary;
            doc.text(`${pkg.designation} - Salary Paid: $${employeeSalary}`, 20, linePosition);
            linePosition += lineHeight;
        });

        doc.text(`Total Salary Paid: $${totalSalary}`, 20, linePosition);
        linePosition += lineHeight;
        doc.text(`Report generated on: ${new Date().toLocaleString()}`, 20, linePosition);

        doc.save('salary_report.pdf');
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.salary_package_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container1">
            <h1><center>Salary Packages</center></h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <FaSearch className="search-icon" />
            </div>
            <button className="btn btn-success" onClick={generateTaxReport}>Generate Tax Report</button>
            <br /><br />
            <button className="btn btn-success" onClick={generateSalaryReport}>Generate Salary Report</button>
            <br /><br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Designation</th>
                        <th>Basic Salary</th>
                        <th>OT Payment per Hour</th>
                        <th>No Of hours worked</th>
                        <th>Tax (%)</th>
                        <th>Bonus</th>
                        <th>Total Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPackages.map(pkg => {
                        const { totalSalary, taxAmount } = calculateTotalSalary(pkg);
                        return (
                            <tr key={pkg._id}>
                                <td>{pkg.salary_package_name}</td>
                                <td>{pkg.designation}</td>
                                <td>{pkg.basic_salary}</td>
                                <td>{pkg.ot_payment_per_hour}</td>
                                <td>{pkg.no_of_hours_worked}</td>
                                <td>{pkg.tax}</td>
                                <td>{pkg.bonus}</td>
                                <td>{totalSalary}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => editPackage(pkg._id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deletePackage(pkg._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ViewSalaryPackages;
