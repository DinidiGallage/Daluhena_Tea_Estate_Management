import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from '../../images/DashboardBackground.png'; 

export default function AllSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8070/supplier")
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this supplier?");
  
    if (isConfirmed) {
      axios.delete(`http://localhost:8070/supplier/delete/${id}`)
        .then(response => {
          setSuppliers(suppliers.filter(supplier => supplier._id !== id));
          console.log("Supplier deleted successfully");
          alert("Supplier deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting supplier:", error);
        });
    }
  };

  const handleUpdate = (id) => {
    console.log("Update button clicked for supplier id:", id);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return (
      supplier.supplierName.toLowerCase().includes(lowercaseQuery) ||
      (supplier.productTypes && supplier.productTypes.some(type => type.toLowerCase().includes(lowercaseQuery)))
    );
  });

  return (
    <div style={{ marginLeft: "280px" }}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '40px 60px' }}>All Supplier Details</h1>
        <input
          type="text"
          placeholder="Search Supplier or Product Type"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginLeft: "20px", marginBottom: "10px" }}
        />
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Product Types</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier._id}>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.contactPerson}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.productTypes.join(", ")}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdate(supplier._id)}
                        style={{ marginRight: "5px" }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(supplier._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
