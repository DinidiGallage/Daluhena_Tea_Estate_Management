import React, { useState } from "react";
import axios from "axios";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [jobrole, setJobRole] = useState("");
  const [qualifications, setQualifications] = useState("");

  function sendData(e) {
    e.preventDefault();

    if (!name || !nic || !email || !contactNumber || !gender || !age || !address || !jobrole || !qualifications) {
      alert("Please fill in all fields");
      return;
    }


    const newEmployee = {
      name,
      nic,
      email,
      contactNumber,
      gender,
      age,
      address,
      jobrole,
      qualifications
    };

    axios.post("http://localhost:8070/employee/add", newEmployee)
      .then(() => {
        alert("New employee added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5" style={{ marginLeft: "220px" }}>
      <h2>Add New Employee</h2>
      <form onSubmit={sendData}>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Employee Full Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter Employee Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="nic" className="form-label">Employee NIC</label>
              <input type="text" className="form-control" id="nic" placeholder="Enter Employee NIC" value={nic} onChange={(e) => setNIC(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Employee Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter Employee Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select className="form-select" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="text" className="form-control" id="age" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">Contact Number</label>
              <input type="text" className="form-control" id="contactNumber" placeholder="Enter Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="jobrole" className="form-label">Job Role</label>
              <input type="text" className="form-control" id="jobrole" placeholder="Enter Job Role" value={jobrole} onChange={(e) => setJobRole(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="qualifications" className="form-label">Qualifications</label>
              <input type="text" className="form-control" id="qualifications" placeholder="Enter Qualifications" value={qualifications} onChange={(e) => setQualifications(e.target.value)} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>
    </div>
  );
}
