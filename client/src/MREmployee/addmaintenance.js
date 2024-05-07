import React, { useState } from "react";
import axios from 'axios';
import './form.css'; // Make sure this path matches your CSS file location

export default function AddMaintenance() {
    // Initialize date_created with the current date in YYYY-MM-DD format
    const [date_created, setDateCreated] = useState(new Date().toISOString().split('T')[0]);
    const [item_id, setItemId] = useState("");
    const [details, setDetails] = useState("");
    const [status, setStatus] = useState("Pending");
    const [tech_id, setTechId] = useState("");
    const [start_date, setDateStart] = useState("");
    const [end_date, setDateEnd] = useState("");
    const [cost, setCost] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newMaintenance = {
            item_id,
            details,
            date_created,
            status,
            tech_id,
            start_date,
            end_date,
            cost
        };

        // POST request to add a new Maintenance record
        axios.post('http://localhost:8070/Maintenance/add', newMaintenance)
            .then(() => {
                alert('New Maintenance added!');
            })
            .catch((error) => {
                alert('Error adding Maintenance: ', error.message);
            });
    }

    return (
        <div>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow form-card">
                            <div className="card-body text-dark">
                                <h2 className="card-title text-center mb-4" >Add Maintenance</h2>
                                <form onSubmit={sendData}>
                                    {/* Item ID Field */}
                                    <div className="mb-3">
                                        <label htmlFor="item_id" className="form-label">Item ID</label>
                                        <input type="text" className="form-control" id="item_id" value={item_id} onChange={(e) => setItemId(e.target.value)} placeholder="Enter Item ID" required />
                                    </div>

                                    {/* Details Field */}
                                    <div className="mb-3">
                                        <label htmlFor="details" className="form-label">Details</label>
                                        <textarea className="form-control" id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Enter Maintenance Details" rows="3" required></textarea>
                                    </div>

                                    {/* Created Date Field */}
                                    <div className="mb-3">
                                        <label htmlFor="date_created" className="form-label">Created Date</label>
                                        <input type="date" className="form-control" id="date_created" value={date_created} readOnly required />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}