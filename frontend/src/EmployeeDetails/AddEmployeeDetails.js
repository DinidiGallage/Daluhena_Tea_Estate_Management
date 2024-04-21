import React, { useState } from 'react';
import axios from 'axios';


export default function AddEmployeeDetails() {
  const [employee_ID, setEmployeeID] = useState('');
  const [designation, setDesignation] = useState('');
  const [basic_salary, setBasicSalary] = useState('');

  const handleEmployeeIDChange = (event) => {
    setEmployeeID(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleBasicSalaryChange = (event) => {
    setBasicSalary(event.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();
    const newEmployeeDetails = {
      employee_ID,
      designation,
      basic_salary,
    };
    axios.post('http://localhost:8070/employeeSalary/addEmployeeDetails', newEmployeeDetails)
      .then(() => {
        alert('Employee Details Added');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <h1>Add Employee Details</h1>
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="employee_ID" className="form-label">Employee ID</label>
          <input type="text" className="form-control" id="employee_ID" value={employee_ID} onChange={handleEmployeeIDChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="designation" className="form-label">Designation</label>
          <select className="form-select" id="designation" value={designation} onChange={handleDesignationChange} required>
            <option value="">Select Designation</option>
            <option value="Director">Director</option>
            <option value="Manager">Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Owner">Owner</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="basic_salary" className="form-label">Basic Salary</label>
          <input type="number" className="form-control" id="basic_salary" value={basic_salary} onChange={handleBasicSalaryChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
