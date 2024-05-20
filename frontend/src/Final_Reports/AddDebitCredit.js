// AddDebitCredit.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddDebitCredit() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8080/employeeSalary/addDebitCredit', formData)
            .then(response => {
                alert('File uploaded successfully!');
                setFile(null); // Clear file input
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setError('Failed to upload file: ' + error.response.data.error);
                } else {
                    setError('Failed to upload file: ' + error.message);
                }
            });
    };

    return (
        <div className="salary-package-container">
            <h1><center>Upload Reports</center></h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Upload PDF:</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    {error && <span className="error">{error}</span>}
                </div>
                <button type="submit" className="submit-btn">Upload</button>
            </form>
        </div>
    );
}

export default AddDebitCredit;
