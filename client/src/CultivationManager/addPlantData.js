// React Component with updated class names
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCultivationForm.css'; // Import CSS file

function AddCultivationForm() {
    const [formData, setFormData] = useState({
        area: '',
        numberOfTeaPlants: '',
        healthStatus: '',
        detailsOfPlant: '',
        lastAddedFertilizerDate: '',
        plantedDate: new Date().toISOString().slice(0, 10)
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.area || !formData.numberOfTeaPlants || !formData.healthStatus ||
            !formData.detailsOfPlant || !formData.lastAddedFertilizerDate || !formData.plantedDate) {
            setMessage('Please fill all the fields.');
            return;
        }

        try {
            await axios.post('http://localhost:8070/Cultivation/add-cultivation', {
                ...formData,
                numberOfTeaPlants: parseInt(formData.numberOfTeaPlants, 10)
            });
            setMessage('Plant data added successfully');
            setFormData({
                area: '',
                numberOfTeaPlants: '',
                healthStatus: '',
                detailsOfPlant: '',
                lastAddedFertilizerDate: '',
                plantedDate: new Date().toISOString().slice(0, 10)
            });
            // Navigate back to CultivationData page after successful submission
            navigate('/CultivationData');
        } catch (error) {
            setMessage('Failed to add plant data: ' + (error.response?.data?.message || error.message));
        }
    };
    
    return (
        <div className="WC-add-cultivation-container">
            <h2>Add Plant Cultivation Data</h2>
            <form onSubmit={handleSubmit} className="WC-add-cultivation-form">
                <label className="WC-form-label">
                    Area:
                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className="WC-form-input"
                    />
                </label>
                <br />
                <label className="WC-form-label">
                    Number of Tea Plants:
                    <input
                        type="number"
                        name="numberOfTeaPlants"
                        value={formData.numberOfTeaPlants}
                        onChange={handleChange}
                        required
                        min="0"
                        className="WC-form-input"
                    />
                </label>
                <br />
                <label className="WC-form-label">
                    Health Status:
                    <select
                        name="healthStatus"
                        value={formData.healthStatus}
                        onChange={handleChange}
                        required
                        className="WC-form-select"
                    >
                        <option value="">Select Health Status</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Diseased">Diseased</option>
                        <option value="Infested">Infested</option>
                        <option value="Nutrient Deficient">Nutrient Deficient</option>
                        <option value="Stressed">Stressed</option>
                    </select>
                </label>
                <br />
                <label className="WC-form-label">
                    Details of Plant:
                    <input
                        type="text"
                        name="detailsOfPlant"
                        value={formData.detailsOfPlant}
                        onChange={handleChange}
                        required
                        className="WC-form-input"
                    />
                </label>
                <br />
                <label className="WC-form-label">
                    Last Added Fertilizer Date:
                    <input
                        type="date"
                        name="lastAddedFertilizerDate"
                        value={formData.lastAddedFertilizerDate}
                        onChange={handleChange}
                        required
                        className="WC-form-input"
                    />
                </label>
                <br />
                <label className="WC-form-label">
                    Planted Date (Default to Today):
                    <input
                        type="date"
                        name="plantedDate"
                        value={formData.plantedDate}
                        onChange={handleChange}
                        required
                        className="WC-form-input"
                    />
                </label>
                <br />
                <button type="submit" className="WC-submit-button">Submit</button>
            </form>
            {message && <p className="WC-message">{message}</p>}
        </div>
    );
}

export default AddCultivationForm;
