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
import LayoutWithHeader from './Layout';

import WelcomePage from './WelcomePage';
import Header from './Header';
import Dashboard from './dashboard';

import AddSalaryPAckageToEmployee from './CalculateEmployeeSalary/AddSalaryPackagesToEmployees';
import EpmloyeeAndSalaryPackage from './CalculateEmployeeSalary/ViewCalculatedSlary';

import Salary from './SalaryPackage/AddSalaryPackage'; // Import your Salary component
import Final_Reports from './Final_Reports/Final_reports'; // Import your FinalReports component
import Expenses from './Expenses/Addexpenses';
import Sales from './Sales/AddSales'

function App() {
  return (
   
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Routes>
                <Route path="/WelcomePage" element={<WelcomePage />} />

              
                <Route path="/AddSalaryPackage" element={<LayoutWithHeader><AddSalaryPackage /></LayoutWithHeader>} />
                <Route path="/ViewSalaryPackages" element={<LayoutWithHeader><ViewSalaryPackages /></LayoutWithHeader>} />
                <Route path="/EditSalaryPackage/:id" element={<LayoutWithHeader><EditSalaryPackage /></LayoutWithHeader>} />

                <Route path="/AddExpense" element={<LayoutWithHeader><AddExpense /></LayoutWithHeader>} />
                <Route path="/ViewExpenses" element={<LayoutWithHeader><ViewExpenses /></LayoutWithHeader>} />
                <Route path="/EditExpense/:id" element={<LayoutWithHeader><EditExpense /></LayoutWithHeader>} />

                <Route path="/AddSales" element={<LayoutWithHeader><AddSale /></LayoutWithHeader>} />
                <Route path="/ViewSales" element={<LayoutWithHeader><ViewSales /></LayoutWithHeader>} />
                <Route path="/EditSales/:id" element={<LayoutWithHeader><EditSale /></LayoutWithHeader>} />
             

                <Route path="/AddSalaryPAckageToEmployee" element={<LayoutWithHeader><AddSalaryPAckageToEmployee /></LayoutWithHeader>} />
                <Route path="/EpmloyeeAndSalaryPackage" element={<LayoutWithHeader><EpmloyeeAndSalaryPackage /></LayoutWithHeader>} />

                <Route path="/dashboard" element={<LayoutWithHeader>< Dashboard /></LayoutWithHeader>} />

                <Route path="/Header" element={<Header />} />

               
          <Route exact path="/" component={Dashboard} />
          <Route path="/AddSalaryPackage" component={Salary} />
          <Route path="/Final-reports" component={Final_Reports} />
          <Route path="/Expenses" component={Expenses} />
          <Route path="/Sales" component={Sales} />
       
                

              </Routes>
            </div>
          </div>
        </div>
      </Router>
   
  );
}

export default App;