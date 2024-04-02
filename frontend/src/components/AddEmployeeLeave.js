import React, { useState } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

export default function AddEmployeeLeave() {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [jobrole, setJobRole] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveFrom, setLeaveFrom] = useState(null);
  const [leaveTo, setLeaveTo] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState("");

  function sendData(e) {
    e.preventDefault();

    if (!name || !nic || !jobrole || !leaveType || !leaveFrom || !leaveTo || !leaveStatus) {
      alert("Please fill in all fields");
      return;
    }

    if (leaveFrom >= leaveTo) {
      alert("Leave end date should be after start date");
      return;
    }

    const newEmployeeLeave = {
      name,
      nic,
      jobrole,
      leaveType,
      leaveFrom,
      leaveTo,
      leaveStatus
    };

    axios.post("http://localhost:8070/EmployeeLeave/add", newEmployeeLeave)
      .then(() => {
        alert("New employee leave added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5" style={{ marginLeft: "250px" }}>
      <h2>Add New Employee Leave</h2>
      <form onSubmit={sendData} className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Employee Full Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Employee name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="nic" className="form-label">Employee NIC</label>
            <input type="text" className="form-control" id="nic" placeholder="Enter Employee NIC" onChange={(e) => setNIC(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="jobrole" className="form-label">Employee Job Role</label>
            <input type="text" className="form-control" id="jobrole" placeholder="Enter Employee Job role" onChange={(e) => setJobRole(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="leaveType" className="form-label">Leave Type</label>
            <select className="form-select" id="leaveType" onChange={(e) => setLeaveType(e.target.value)}>
              <option value="">Select leave type</option>
              <option value="Casual">Casual</option>
              <option value="Annual">Annual</option>
              <option value="Medical">Medical</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
       {/*   <div className="mb-3">
            <label htmlFor="leaveFrom" className="form-label">Leave Date From</label>
            <DatePicker
              selected={leaveFrom}
              onChange={(date) => setLeaveFrom(date)}
              className="form-control"
              placeholderText="Select leave start date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leaveTo" className="form-label">Leave Date To</label>
            <DatePicker
              selected={leaveTo}
              onChange={(date) => setLeaveTo(date)}
              className="form-control"
              placeholderText="Select leave end date"
              dateFormat="dd/MM/yyyy"
            />
  </div>*/}
            <div className="form-group">
              <label htmlFor="leaveFrom">Leave Date From</label>
              <input
                type="date"
                className="form-control"
                id="leaveFrom"
                value={leaveFrom}
                onChange={(e) => setLeaveFrom(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="leaveTo">Leave Date To</label>
              <input
                type="date"
                className="form-control"
                id="leaveTo"
                value={leaveTo}
                onChange={(e) =>  setLeaveTo(e.target.value)}
              />
            </div>




          <div className="mb-3">
            <label htmlFor="leaveStatus" className="form-label">Leave Status</label>
            <select className="form-select" id="leaveStatus" onChange={(e) => setLeaveStatus(e.target.value)}>
              <option value="">Select leave status</option>
              <option value="Approve">Approve</option>
              <option value="Reject">Reject</option>
            </select>
          </div>
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </div>
      </form>
    </div>
  );
}
