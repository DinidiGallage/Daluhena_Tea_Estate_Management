// EditCultivation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCultivation.css'; // Import CSS file
import './Backgroundimage.css';
const EditCultivation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        area: '',
        numberOfTeaPlants: 0,
        healthStatus: '',
        detailsOfPlant: '',
        lastAddedFertilizerDate: '',
        plantedDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCultivationData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8070/cultivation/get-cultivation/${id}`);
                setFormData({
                    area: response.data.area,
                    numberOfTeaPlants: response.data.numberOfTeaPlants,
                    healthStatus: response.data.healthStatus,
                    detailsOfPlant: response.data.detailsOfPlant,
                    lastAddedFertilizerDate: new Date(response.data.lastAddedFertilizerDate).toISOString().slice(0, 10),
                    plantedDate: new Date(response.data.plantedDate).toISOString().slice(0, 10)
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching cultivation data:', err);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            }
        };

        fetchCultivationData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8070/cultivation/update-cultivation/${id}`, formData);
            alert('Cultivation updated successfully!');
            navigate('/CultivationData');
        } catch (err) {
            console.error('Failed to update cultivation:', err);
            alert('Failed to update data. Please try again.');
        }
    };

    return (
        <div className="edit-cultivation-container">
            <h2>Edit Cultivation</h2>
            {loading ? <p>Loading data...</p> : (
                <form onSubmit={handleSubmit} className="edit-cultivation-form">
                    <div className="form-group">
                        <label>Area:</label>
                        <input type="text" name="area" value={formData.area} onChange={handleChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Number of Tea Plants:</label>
                        <input type="number" name="numberOfTeaPlants" value={formData.numberOfTeaPlants} onChange={handleChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Health Status:</label>
                        <select name="healthStatus" value={formData.healthStatus} onChange={handleChange} required className="form-select">
                            <option value="">Select Health Status</option>
                            <option value="Healthy">Healthy</option>
                            <option value="Diseased">Diseased</option>
                            <option value="Infested">Infested</option>
                            <option value="Nutrient Deficient">Nutrient Deficient</option>
                            <option value="Stressed">Stressed</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Details of Plant:</label>
                        <input type="text" name="detailsOfPlant" value={formData.detailsOfPlant} onChange={handleChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Last Added Fertilizer Date:</label>
                        <input type="date" name="lastAddedFertilizerDate" value={formData.lastAddedFertilizerDate} onChange={handleChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Planted Date:</label>
                        <input type="date" name="plantedDate" value={formData.plantedDate} onChange={handleChange} required className="form-input" />
                    </div>
                    <button type="submit" className="submit-button">Update Cultivation</button>
                </form>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default EditCultivation;
