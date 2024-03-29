import React from "react";

function Header() {
  return (
      <div>
          <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "280px", height: "100vh"}}>
              <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                      <a href="/" className="nav-link active" aria-current="page">
                          Home
                      </a>
                  </li>
                  <li>
                      <a href="/addrepair" className="nav-link link-dark">
                          Add Repair
                      </a>
                  </li>
                  <li>
                      <a href="/addmaintenance" className="nav-link link-dark">
                          Add Maintenance
                      </a>
                  </li>
                  <li>
                      <a href="#" className="nav-link link-dark">
                          FAQs
                      </a>
                  </li>
                  <li>
                      <a href="#" className="nav-link link-dark">
                          About
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  );
}

export default Header;