import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditEmployee() {
  const [employee, setEmployee] = useState({
    employee_ID: '',
    designation: '',
    basic_salary: ''
  });

  const { id } = useParams(); // This retrieves the `id` param from the URL
  const navigate = useNavigate(); // Used for navigating

  useEffect(() => {
    axios.get(`http://localhost:8070/employeeSalary/getEmployee/${id}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
        alert('Failed to fetch employee details');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8070/employeeSalary/updateEmployee/${id}`, employee)
      .then(() => {
        alert('Employee updated successfully');
        navigate('/EmployeeDetails');  // Navigate to /EmployeeDetails after update
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        alert('Failed to update employee details');
      });
  };

  return (
    <div className="container">
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input 
            type="text" 
            className="form-control" 
            name="employee_ID" 
            value={employee.employee_ID} 
            onChange={handleChange} 
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <input 
            type="text" 
            className="form-control" 
            name="designation" 
            value={employee.designation} 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Basic Salary</label>
          <input 
            type="text" 
            className="form-control" 
            name="basic_salary" 
            value={employee.basic_salary} 
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditEmployee;
