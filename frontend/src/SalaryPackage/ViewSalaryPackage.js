import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewSalaryPackage.css'; // Import the CSS file
import { FaSearch } from 'react-icons/fa';


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

    // Filtering packages based on search query
    const filteredPackages = packages.filter(pkg =>
        pkg.salary_package_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container1">
            <h1><center>Salary Packages</center></h1>
            {/* Search input field with search icon */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <FaSearch className="search-icon" />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>OT Payment per Hour</th>
                        <th>Tax (%)</th>
                        <th>Bonus</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Display filtered packages */}
                    {filteredPackages.map(pkg => (
                        <tr key={pkg._id}>
                            <td>{pkg.salary_package_name}</td>
                            <td>{pkg.ot_payment_per_hour}</td>
                            <td>{pkg.tax}</td>
                            <td>{pkg.bonus}</td>
                            <td>{new Date(pkg.date).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editPackage(pkg._id)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deletePackage(pkg._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewSalaryPackages;
