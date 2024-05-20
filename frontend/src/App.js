import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddSalaryPackage from './SalaryPackage/AddSalaryPackage';
import ViewSalaryPackages from './SalaryPackage/ViewSalaryPackage';
import EditSalaryPackage from './SalaryPackage/editSalaryPackage';

import AddExpense from './Expenses/Addexpenses';
import ViewExpenses from './Expenses/ViewExpenses';
import EditExpense from './Expenses/EditExpense';

import AddSale from './Sales/AddSales';
import EditSale from './Sales/EditSales';
import ViewSales from './Sales/ViewSales';

import WelcomePageFM from './WelcomePageFS';
import Dashboard from './FManagerHeader';

import LayoutWithHeader from './Layout';
import HeaderFSManager from './HeaderManager';

import AddDebitCredit from './Final_Reports/AddDebitCredit';
import ViewDebitCredit from './Final_Reports/ViewDebitCredit';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Routes>
              <Route path="/WelcomePageFM" element={<WelcomePageFM />} />
              <Route path="/Dashboard" element={<LayoutWithHeader><Dashboard /></LayoutWithHeader>} />

              <Route path="/AddSalaryPackage" element={<LayoutWithHeader><AddSalaryPackage /></LayoutWithHeader>} />
              <Route path="/ViewSalaryPackages" element={<LayoutWithHeader><ViewSalaryPackages /></LayoutWithHeader>} />
              <Route path="/EditSalaryPackage/:id" element={<LayoutWithHeader><EditSalaryPackage /></LayoutWithHeader>} />

              <Route path="/AddExpense" element={<LayoutWithHeader><AddExpense /></LayoutWithHeader>} />
              <Route path="/ViewExpenses" element={<LayoutWithHeader><ViewExpenses /></LayoutWithHeader>} />
              <Route path="/EditExpense/:id" element={<LayoutWithHeader><EditExpense /></LayoutWithHeader>} />

              <Route path="/AddSales" element={<LayoutWithHeader><AddSale /></LayoutWithHeader>} />
              <Route path="/ViewSales" element={<LayoutWithHeader><ViewSales /></LayoutWithHeader>} />
              <Route path="/EditSales/:id" element={<LayoutWithHeader><EditSale /></LayoutWithHeader>} />

              <Route path="/AddDebitCredit" element={<LayoutWithHeader><AddDebitCredit /></LayoutWithHeader>} />
              <Route path="/ViewDebitCredit" element={<LayoutWithHeader><ViewDebitCredit /></LayoutWithHeader>} />

              <Route path="/HeaderFSManager" element={<HeaderFSManager />} />

              <Route exact path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
