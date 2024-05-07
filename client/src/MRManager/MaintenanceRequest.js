import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceRequests = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [techId, setTechId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8070/manager/maintenance');
        const pendingRequests = response.data.filter(req => req.status === 'Pending');
        setMaintenanceRequests(pendingRequests);
        setFilteredRequests(pendingRequests);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const filtered = maintenanceRequests.filter(request =>
      request.item_id.toString().includes(searchTerm)
    );
    setFilteredRequests(filtered);
  }, [searchTerm, maintenanceRequests]);

  const handleApproveReject = async (id, status) => {
    try {
      await axios.put(`http://localhost:8070/manager/maintenance/${id}/approve`, { status });
      const updatedRequests = maintenanceRequests.filter(req => req._id !== id);
      setMaintenanceRequests(updatedRequests);
      setFilteredRequests(updatedRequests);
      if (status === 'Approved') {
        setShowAssignForm(true);
        setSelectedRequest(id);
      }
    } catch (err) {
      console.error("Error updating request status: ", err);
    }
  };

  const handleAssignTechnician = async () => {
    try {
      await axios.put(`http://localhost:8070/manager/maintenance/${selectedRequest}/assign`, { tech_id: techId });
      setShowAssignForm(false);
      setSelectedRequest(null);
      setTechId('');
    } catch (err) {
      console.error("Error assigning technician: ", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1 style={{ color: "white" }}>View Maintenance Requests</h1>
      <input
        type="text"
        placeholder="Search by Item ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      <div>
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request._id}>
                <td>{request.item_id}</td>
                <td>{request.details}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Pending' && (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleApproveReject(request._id, 'Approved')}>Approve</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleApproveReject(request._id, 'Rejected')}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAssignForm && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Technician</h5>
                <button type="button" className="btn-close" onClick={() => setShowAssignForm(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="tech_id" className="form-label">Technician ID</label>
                    <input type="text" className="form-control" id="tech_id" value={techId} onChange={(e) => setTechId(e.target.value)} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAssignForm(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleAssignTechnician}>Assign Technician</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequests;
