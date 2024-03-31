import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllSuppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/supplier")
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  // Function to handle delete button click
  const handleDelete = (id) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to delete this supplier?");
  
    // If confirmed, proceed with deletion
    if (isConfirmed) {
      axios.delete(`http://localhost:8070/supplier/delete/${id}`)
        .then(response => {
          // Remove the deleted supplier from the state
          setSuppliers(suppliers.filter(supplier => supplier._id !== id));
          console.log("Supplier deleted successfully");
          // Show success message
          alert("Supplier deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting supplier:", error);
        });
    }
  };

  // Function to handle update button click
  const handleUpdate = (id) => {
    // Implement update logic here
    console.log("Update button clicked for supplier id:", id);
  };

  return (
    <div style={{ marginLeft: "280px" }}>
      <h1 style={{ textAlign: "center" }}>All Supplier Details</h1>
      <table className="table" style={{ width: "calc(100% - 250px)" }}>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Product Types</th>
            <th>Operation</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier._id}>
              <td>{supplier.supplierName}</td>
              <td>{supplier.contactPerson}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td>{supplier.productTypes}</td>
              <td>
                {/* Horizontal flex container for buttons */}
                <div style={{ display: "flex" }}>
                  {/* Update button */}
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdate(supplier._id)}
                    style={{ marginRight: "5px" }}
                  >
                    Update
                  </button>
                  {/* Delete button */}
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
  );
}
