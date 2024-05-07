import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './edit.css'; // Custom styles for modal and form enhancements

export default function MREdit() {
    const [displayRecords, setDisplayRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRecordId, setEditRecordId] = useState(null);
    const [editFormData, setEditFormData] = useState({ item_id: '', details: '' });
    const [viewMode, setViewMode] = useState('maintenance');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [viewMode]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/${viewMode}/`);
            setDisplayRecords(response.data.reverse());
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const deleteRecord = async (recordId) => {
        try {
            await axios.delete(`http://localhost:8070/${viewMode}/delete/${recordId}`);
            setDisplayRecords(prevRecords => prevRecords.filter(record => record._id !== recordId));
        } catch (err) {
            console.error("Error deleting record: ", err);
        }
    };

    const startEdit = (record) => {
        setEditRecordId(record._id);
        setEditFormData({ item_id: record.item_id, details: record.details });
        setShowModal(true);
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const saveEdit = async () => {
        try {
            const updatedRecord = { ...editFormData, _id: editRecordId };
            await axios.put(`http://localhost:8070/${viewMode}/update/${editRecordId}`, updatedRecord);
            setDisplayRecords(prevRecords =>
                prevRecords.map(record => 
                    record._id === editRecordId ? updatedRecord : record
                )
            );
            setShowModal(false);
            setEditRecordId(null); // Exit editing mode
        } catch (err) {
            console.error("Error updating record: ", err);
        }
    };

    const cancelEdit = () => {
        setShowModal(false);
        setEditRecordId(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <div className="container mr-view-status-container">
            <div className="mr-top-section d-flex justify-content-between align-items-center mb-3">
                <h1 style={{ color: "white" }}>{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Status</h1>
                <div className="mr-button-group">
                    <button className="btn btn-primary me-2" onClick={() => setViewMode('maintenance')}>Maintenance</button>
                    <button className="btn btn-secondary" onClick={() => setViewMode('repair')}>Repair</button>
                </div>
            </div>
            <div className="table-responsive">
                <table className=" table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayRecords.map((record) => (
                            <tr key={record._id}>
                                <td>{record.item_id}</td>
                                <td>{record.details}</td>
                                <td>
                                    <button className="btn btn-outline-success btn-sm me-2" onClick={() => startEdit(record)}>Edit</button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteRecord(record._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }} onClick={cancelEdit}>
                    <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                        <div className="modal-content mr-modal-content">
                            <div className="modal-header mr-modal-header">
                                <h5 className="modal-title">Edit Record</h5>
                                <button type="button" className="btn-close" onClick={cancelEdit}></button>
                            </div>
                            <div className="modal-body mr-modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="item_id" className="form-label">Item ID</label>
                                        <input type="text" className="form-control mr-form-control" id="item_id" name="item_id" value={editFormData.item_id} onChange={handleEditFormChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="details" className="form-label">Details</label>
                                        <input type="text" className="form-control mr-form-control" id="details" name="details" value={editFormData.details} onChange={handleEditFormChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer mr-modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={saveEdit}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
