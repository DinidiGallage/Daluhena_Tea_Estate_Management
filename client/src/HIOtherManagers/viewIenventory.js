import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DifferenceQuantity.css'; // Import CSS file


function DifferenceQuantity() {
    const [differenceData, setDifferenceData] = useState([]);
    const [teaType, setTeaType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDifferenceData();
    }, [teaType]); // Refetch data when teaType changes

    const fetchDifferenceData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8070/harvestAndinventory/differenceQuantity?tea_type=${teaType}`);
            setDifferenceData(response.data);
        } catch (error) {
            setError('Error fetching difference data');
        } finally {
            setLoading(false);
        }
    };

    const handleTeaTypeChange = (e) => {
        setTeaType(e.target.value);
    };

    return (
        <div className="HI-difference-quantity-container">
            <h2 className="HI-difference-quantity-heading">Difference Quantity</h2>
            <div className="HI-search-container">
                <label htmlFor="teaType" className="HI-label">Select Tea Type:</label>
                <input
                    type="text"
                    id="teaType"
                    value={teaType}
                    onChange={handleTeaTypeChange}
                    placeholder="Enter Tea Type"
                    className="HI-input"
                />
                <button onClick={fetchDifferenceData} className="HI-button">Search</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="HI-error">{error}</p>
            ) : (
                <table className="HI-table">
                    <thead>
                        <tr>
                            <th className="HI-th">Tea Type</th>
                            <th className="HI-th">Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {differenceData.map((item, index) => (
                            <tr key={index}>
                                <td className="HI-td">{item.tea_type}</td>
                                <td className="HI-td">{item.difference}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
      
        </div>

        
    );
}

export default DifferenceQuantity;
