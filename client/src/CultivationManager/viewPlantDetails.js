import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CultivationData.css'; // Import the CSS file
import './Backgroundimage.css';

const CultivationData = () => {
    const [cultivations, setCultivations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('area'); // Default search type is area
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/cultivation/getPlantData');
                setCultivations(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cultivation data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this cultivation record?')) {
            try {
                await axios.delete(`http://localhost:8070/cultivation/delete-cultivation/${id}`);
                setCultivations(cultivations.filter(cultivation => cultivation._id !== id));
                alert('Cultivation record deleted successfully.');
            } catch (error) {
                console.error('Error deleting cultivation:', error);
                alert('Failed to delete cultivation record.');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/EditCultivation/${id}`);
    };

    const handleAddPlantDetails = () => {
        navigate('/AddCultivationForm');
    };

    // Filter cultivations based on search input and type
    const filteredCultivations = cultivations.filter(cultivation => {
        const searchTerm = searchInput.toLowerCase();
        switch (searchType) {
            case 'area':
                return cultivation.area.toLowerCase().includes(searchTerm);
            case 'numberOfTeaPlants':
                return cultivation.numberOfTeaPlants.toString().includes(searchTerm);
            case 'healthStatus':
                return cultivation.healthStatus.toLowerCase().includes(searchTerm);
            case 'detailsOfPlant':
                return cultivation.detailsOfPlant.toLowerCase().includes(searchTerm);
            case 'lastAddedFertilizerDate':
                return new Date(cultivation.lastAddedFertilizerDate).toLocaleDateString().includes(searchTerm);
            case 'plantedDate':
                return new Date(cultivation.plantedDate).toLocaleDateString().includes(searchTerm);
            default:
                return false;
        }
    });

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    return (
        <div className="cultivation-container">
            <h1>Cultivation Data</h1>
            <div className="search-container">
                <input type="text" placeholder="Search..." value={searchInput} onChange={handleSearchInputChange} />
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="area">Area</option>
                    <option value="numberOfTeaPlants">Number of Tea Plants</option>
                    <option value="healthStatus">Health Status</option>
                    <option value="detailsOfPlant">Details of Plant</option>
                    <option value="lastAddedFertilizerDate">Last Added Fertilizer Date</option>
                    <option value="plantedDate">Planted Date</option>
                </select>
                <button onClick={handleAddPlantDetails} className="add-plant-button">Add Plant Details</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="cultivation-table">
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>Number of Tea Plants</th>
                            <th>Health Status</th>
                            <th>Details of Plant</th>
                            <th>Last Added Fertilizer Date</th>
                            <th>Planted Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCultivations.map(cultivation => (
                            <tr key={cultivation._id}>
                                <td>{cultivation.area}</td>
                                <td>{cultivation.numberOfTeaPlants}</td>
                                <td>{cultivation.healthStatus}</td>
                                <td>{cultivation.detailsOfPlant}</td>
                                <td>{new Date(cultivation.lastAddedFertilizerDate).toLocaleDateString()}</td>
                                <td>{new Date(cultivation.plantedDate).toLocaleDateString()}</td>
                                <td className="edit-delete-cell">
                                    <button onClick={() => handleEdit(cultivation._id)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(cultivation._id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CultivationData;
