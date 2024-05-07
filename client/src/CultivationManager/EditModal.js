// EditModal.js

import React, { useState } from 'react';
import './Backgroundimage.css';
const EditModal = ({ nic, name, onSave, onClose }) => {
    const [newNic, setNewNic] = useState(nic);
    const [newName, setNewName] = useState(name);

    const handleSave = () => {
        onSave(newNic, newName);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Employee</h2>
                <div>
                    <label>NIC:</label>
                    <input type="text" value={newNic} onChange={(e) => setNewNic(e.target.value)} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditModal;
