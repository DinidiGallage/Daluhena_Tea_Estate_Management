import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllPurchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/purchase")
      .then(response => {
        setPurchases(response.data);
      })
      .catch(error => {
        console.error("Error fetching purchases:", error);
      });
  }, []);

// Function to handle delete button click
const handleDelete = (id) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to delete this purchase?");
  
    // If confirmed, proceed with deletion
    if (isConfirmed) {
      axios.delete(`http://localhost:8070/purchase/delete/${id}`)
        .then(response => {
          // Remove the deleted purchase from the state
          setPurchases(purchases.filter(purchase => purchase._id !== id));
          console.log("Purchase deleted successfully");
          // Show success message
          alert("Purchase deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting purchase:", error);
        });
    }
  };

  

  // Function to handle update button click
  const handleUpdate = (id) => {
    // Implement update logic here
    console.log("Update button clicked for purchase id:", id);
  };

  return (
    <div style={{ marginLeft: "280px" }}>
      <h1 style={{ textAlign: "center" }}>All Purchase Details</h1>
      <table className="table" style={{ width: "calc(100% - 250px)" }}>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Product</th>
            <th>Invoice Number</th>
            <th>Purchase Date</th>
            <th>Payment Status</th>
            <th>Quantity (kg)</th>
            <th>Unit Price (LKR)</th>
            <th>Total Price (LKR)</th>
            <th>Operation</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase._id}>
              <td>{purchase.supplier}</td>
              <td>{purchase.product}</td>
              <td>{purchase.invoiceNumber}</td>
              <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
              <td>{purchase.paymentStatus}</td>
              <td>{purchase.qty}</td>
              <td>{purchase.unitPrice}</td>
              <td>{purchase.totalPrice}</td>
              <td>
                {/* Horizontal flex container for buttons */}
                <div style={{ display: "flex" }}>
                  {/* Update button */}
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdate(purchase._id)}
                    style={{ marginRight: "5px" }}
                  >
                    Update
                  </button>
                  {/* Delete button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(purchase._id)}
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
