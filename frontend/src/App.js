import './App.css';
import AddFertilizer from './components/Fertilizers/AddFertilizer';
import AddSupplier from './components/Suppliers/AddSupplier';
import AddPurchase from './components/Purchases/AddPurchase';
import AllPurchases from './components/Purchases/AllPurchases';
import AllSuppliers from './components/Suppliers/AllSuppliers';
import AllFertilizers from './components/Fertilizers/AllFertilizers';
import PurchaseHistoryReport from './components/Purchases/PurchaseHistoryReport'; 
import PurchasesPage from './components/Purchases/PurchasesPage';
import SuppliersPage from './components/Suppliers/SuppliersPage';
import FertilizersPage from './components/Fertilizers/FertilizersPage'; 
import ScheduleProcess from './components/Fertilizers/ScheduleProcess'; 
import Login from './components/Login'; // Import the Login component

import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          
          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Routes for adding new data */}
          <Route path="/purchase/add" element={<AddPurchase />} />
          <Route path="/fertilizer/add" element={<AddFertilizer />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          
          {/* Routes for displaying all data */}
          <Route path="/purchase/" element={<AllPurchases />} />
          <Route path="/supplier/" element={<AllSuppliers />} />
          <Route path="/fertilizer/" element={<AllFertilizers />} />

          {/* Route for purchase history report */}
          <Route path="/report-generation" element={<PurchaseHistoryReport />} />

          {/* Route for the PurchasesPage */}
          <Route path="/purchases" element={<PurchasesPage />} />

          {/* Route for the SuppliersPage */}
          <Route path="/suppliers" element={<SuppliersPage />} />

          {/* Route for the FertilizersPage */}
          <Route path="/fertilizers" element={<FertilizersPage />} />

          {/* Route for the ScheduleProcess */}
          <Route path="/fertilizer/schedule" element={<ScheduleProcess />} />

          {/* Route for the Login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
