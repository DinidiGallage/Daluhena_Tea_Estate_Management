import './App.css';
import Header from './components/Header';
import AddEmployee from './components/AddEmployee';
import AddEmployeeLeave from './components/AddEmployeeLeave';
import AddEmployeeAttendance from './components/AddEmployeeAttendance';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/EmployeeLeave/add" element={<AddEmployeeLeave />} />
          <Route path="/EmployeeAttendance/add" element={<AddEmployeeAttendance />} />
        </Routes>

        
       
        

      </div>
    </Router>
  );
}

export default App;
