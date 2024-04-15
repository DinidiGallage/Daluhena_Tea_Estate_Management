import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddEmployeeAttendance() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8070/employee/");
      setEmployees(response.data);
      setLoading(false);
      // Initialize attendance data based on the number of employees
      setAttendanceData(
        response.data.map((employee) => ({
          employeeId: employee._id,
          name: employee.name,
          nic: employee.nic,
          jobrole: employee.jobrole,
          attendance: "",
          dayType: "",
          error: "",
        }))
      );
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    // Fetch attendance data for the selected date if needed
  };

  const handleAttendanceChange = (index, value) => {
    setAttendanceData((prevState) => {
      const updatedData = [...prevState];
      updatedData[index].attendance = value;
      updatedData[index].error = "";
      return updatedData;
    });
  };

  const handleDayTypeChange = (index, dayType) => {
    setAttendanceData((prevState) => {
      const updatedData = [...prevState];
      updatedData[index].dayType = dayType;
      updatedData[index].error = "";
      return updatedData;
    });
  };

  const validateData = () => {
    const attendanceErrors = [];
    const dayTypeErrors = [];

    attendanceData.forEach((employee, index) => {
      if (!employee.attendance) {
        attendanceErrors.push(`Please select attendance for Employee ${index + 1}`);
      }
      if (!employee.dayType) {
        dayTypeErrors.push(`Please select day type for Employee ${index + 1}`);
      }
    });

    setErrors([...attendanceErrors, ...dayTypeErrors]);
    return attendanceErrors.length === 0 && dayTypeErrors.length === 0;
  };
  const saveAttendance = async () => {
    try {
      if (!validateData()) {
        return;
      }
      
      // Filter out employees with empty attendance data
      const employeesWithAttendance = attendanceData.map((employee) => ({
        _id: employee.employeeId, // Include employeeId to identify the employee
        name: employee.name,
        nic: employee.nic,
        jobrole: employee.jobrole,
        date,
        attendance: employee.attendance,
        dayType: employee.dayType,
      }));

      // Send a POST request to save the attendance data
      await axios.post("http://localhost:8070/EmployeeAttendance/add", employeesWithAttendance);
      alert("Attendance saved successfully");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Error saving attendance. Please try again later.");
    }
  };

  return (
    <div className="background-container">
    <div className="container mt-3" style={{ maxWidth: "calc(100% - 255px)", paddingLeft: "20px",paddingRight: "20px",paddingTop: "20px" ,paddingBottom: "20px"}} >
      <h2>Add Employee Attendance</h2>
      <div className="row">
        <div className="col-md-6">
          {/* Calendar Component */}
          <label htmlFor="date" style={{ fontWeight: 'bold' }}>Select the date in here :  
                <input type="date"  className="AttendancedateSelect" value={date} onChange={(e) => handleDateChange(e.target.value)} />
          </label>
         
        </div>
      </div>
      <table className="table mt-2">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>NIC</th>
            <th>Job Role</th>
            <th>Attendance</th>
            <th>Day Type</th>
          </tr>
        </thead>
        <tbody>
        {loading ? (
  <tr>
    <td colSpan="5">Loading...</td>
  </tr>
) : employees.length === 0 ? (
  <tr>
    <td colSpan="5">No employees available</td>
  </tr>
) : (
  attendanceData.map((employee, index) => (
    <tr key={employee._id}>
      <td>{employee.name}</td>
      <td>{employee.nic}</td>
      <td>{employee.jobrole}</td>
      <td>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={`attendance-${index}`}
            value="present"
            checked={employee.attendance === "present"}
            onChange={() => handleAttendanceChange(index, "present")}
          />
          <label className="form-check-label">Present</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={`attendance-${index}`}
            value="absent"
            checked={employee.attendance === "absent"}
            onChange={() => handleAttendanceChange(index, "absent")}
          />
          <label className="form-check-label">Absent</label>
        </div>
        <p className="text-danger">{errors[index]}</p> {/* Display attendance error message */}
      </td>
      <td>
        <select
          className="form-selectAttendance"
          value={employee.dayType}
          onChange={(e) => handleDayTypeChange(index, e.target.value)}
        >
          <option value="">Select Day Type</option>
          <option value="workday">Workday</option>
          <option value="holiday">Holiday</option>
        </select>
        <p className="text-danger">{errors[index + attendanceData.length]}</p> {/* Display day type error message */}
      </td>
    </tr>
  ))
)}
        </tbody>
      </table>
      <div className="col-12 text-center">
        <button type="button" className="btn btn-primary btn-lg" onClick={saveAttendance}>
          Save
        </button>
      </div>
    </div>
    </div>
  );
}
