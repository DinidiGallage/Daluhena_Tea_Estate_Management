import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployeeDetails = ({ id }) => {
  const [updateData, setUpdateData] = useState({
    name: "",
    nic: "",
    email: "",
    contactNumber: "",
    gender: "",
    age: 0,
    address: "",
    jobrole: "",
    qualifications: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:8070/employee/get/${id}`)
      .then(response => {
        setUpdateData(response.data.employee); // Assuming the response contains 'employee' object
      })
      .catch(error => {
        console.error("Error fetching employee details:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8070/employee/update/${id}`, updateData);
      console.log("Employee updated successfully");
      alert("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ marginLeft: "220px" }}>
      <h1>Update Employee Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={updateData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>NIC:</label>
          <input
            type="text"
            className="form-control"
            name="nic"
            value={updateData.nic}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={updateData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            className="form-control"
            name="contactNumber"
            value={updateData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input
            type="text"
            className="form-control"
            name="gender"
            value={updateData.gender}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={updateData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={updateData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Job Role:</label>
          <input
            type="text"
            className="form-control"
            name="jobrole"
            value={updateData.jobrole}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Qualifications:</label>
          <input
            type="text"
            className="form-control"
            name="qualifications"
            value={updateData.qualifications}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployeeDetails;
