import './App.css';
import Header from './components/header';
import AddRepair from './components/addrepair';
import Dashboard from './components/dashboard'; // Make sure this path matches your file structure
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// AddRepairPage includes the Header and the AddRepair components
function AddRepairPage() {
  return (
    <div className="flex-container">
      <Header />
      <div className="main-content">
        <AddRepair />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Default route for Dashboard */}
        <Route path="/addrepair" element={<AddRepairPage />} /> {/* Specific route for AddRepair with Header */}
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;




