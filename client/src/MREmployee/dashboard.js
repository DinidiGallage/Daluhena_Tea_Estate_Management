// Inside src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import addicon from './icons/addicon.png';
import statusicon from './icons/statusicon.png';
import editicon from './icons/editicon.png';

function EmpDashboard() {
  return (
    <div>
        <div class="d-flex flex-column align-items-center mr-text-white pt-5 pb-2">
            <h1 style={{ color: "white" }}><strong>Employee Dashboard</strong></h1>
        </div>

        {/* Add Maintenance button */}
        <div class="d-flex justify-content-start">
          <div className='m-5'>
            <Link to="/MREmployee/addmaintenance">
              <div class="mr-card mr-card1">
                <img src={addicon} className='mr-icon-card' alt="Add Button" />
                <div class="container">
                  <h4 className='mr-text text-dark'><b>Maintenance</b></h4>  
                </div>
              </div>
            </Link>
          </div>

          {/* Add Repair button */}
          <div className='m-5'>
            <Link to="/MREmployee/addrepair">
              <div class="mr-card mr-card1">
                <img src={addicon} className='mr-icon-card' alt="Add Button" />
                <div class="container">
                  <h4 className='mr-text text-dark'><b>Repair</b></h4>  
                </div>
              </div>
            </Link>
          </div>

          {/* Check Status button */}
          <div className='m-5 w-100'>
            <Link to="/MREmployee/viewstatus">
              <div class="mr-card mr-card2">
                <div class="d-flex align-items-center">
                  <img src={statusicon} className='mr-icon-card2' alt="Add Button" />
                  <div className="container">
                    <h4 className='mr-text2 text-light'><b>Check Status</b></h4>  
                  </div>
                </div>
              </div>
            </Link>
          </div> 
        </div>


        <div class="d-flex justify-content-start">
          {/* edit repair button */}
          <div className='m-5'>
            <Link to="/MREmployee/editmaintenance">
              <div class="mr-card mr-card-edit">
                <div class="d-flex align-items-center">
                  <img src={editicon} className='mr-icon-card-edit' alt="Add Button" />
                  <div className="container">
                    <h4 className='mr-text-edit text-dark'><b>Edit Maintenance</b></h4>  
                  </div>
                </div>
              </div>
            </Link>
          </div> 

          {/* edit repair button */}
          <div className='m-5'>
            <Link to="/MREmployee/editrepair">
              <div class="mr-card mr-card-edit">
                <div class="d-flex align-items-center">
                  <img src={editicon} className='mr-icon-card-edit' alt="Add Button" />
                  <div className="container">
                    <h4 className='mr-text-edit text-dark'><b>Edit Repair</b></h4>  
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

    </div>
    
  );
}

export default EmpDashboard;



