import './App.css';
import AddFertilizer from './components/AddFertilizer';
import AddSupplier from './components/AddSupplier';
import AddPurchase from './components/AddPurchase';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/fertilizer/add" element={<AddFertilizer />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          <Route path="/purchase/add" element={<AddPurchase />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

