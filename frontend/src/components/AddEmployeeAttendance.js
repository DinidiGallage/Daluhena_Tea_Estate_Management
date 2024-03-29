import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEmployeeLeave() {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [jobrole, setJobRole] = useState("");
  const [dayType, setDayType] = useState("");
  const [date, setDate] = useState(null);
  const [attendance, setAttendance] = useState("");

  function sendData(e) {
    e.preventDefault();

    // Prepare data object to send to the server
    const newEmployeeAttendance = {
      name,
      nic,
      jobrole,
      dayType,
      date,
      attendance
    };

    // Send the data to the server using axios
    axios.post("http://localhost:8070/EmployeeAttendance/add", newEmployeeAttendance)
      .then(() => {
        alert("New employee attendance added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div>
        <h2 className="text-center mb-4">Employee Attendance</h2>
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Employee Full name</label>
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
          <div className="mb-3">
            <label className="form-label">Day Type</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="dayType" id="weekdays" value="weekdays" onChange={(e) => setDayType(e.target.value)} />
              <label className="form-check-label" htmlFor="weekdays">Weekdays</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="dayType" id="weekends" value="weekends" onChange={(e) => setDayType(e.target.value)} />
              <label className="form-check-label" htmlFor="weekends">Weekends</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Attendance Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="form-control"
              placeholderText="Select attendance date"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Attendance</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="attendancePresent" checked={attendance === "present"} onChange={(e) => setAttendance(e.target.checked ? "present" : "absent")} />
              <label className="form-check-label" htmlFor="attendancePresent">Present</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="attendanceAbsent" checked={attendance === "absent"} onChange={(e) => setAttendance(e.target.checked ? "absent" : "present")} />
              <label className="form-check-label" htmlFor="attendanceAbsent">Absent</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
