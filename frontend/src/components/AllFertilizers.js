import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllFertilizers() {
  const [fertilizers, setFertilizers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/fertilizer")
      .then(response => {
        setFertilizers(response.data);
      })
      .catch(error => {
        console.error("Error fetching fertilizers:", error);
      });
  }, []);

  // Function to handle delete button click
  const handleDelete = (id) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to delete this fertilizer?");
  
    // If confirmed, proceed with deletion
    if (isConfirmed) {
      axios.delete(`http://localhost:8070/fertilizer/delete/${id}`)
        .then(response => {
          // Remove the deleted fertilizer from the state
          setFertilizers(fertilizers.filter(fertilizer => fertilizer._id !== id));
          console.log("Fertilizer deleted successfully");
          // Show success message
          alert("Fertilizer deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting fertilizer:", error);
        });
    }
  };

  // Function to handle update button click
  const handleUpdate = (id) => {
    // Implement update logic here
    console.log("Update button clicked for fertilizer id:", id);
  };

  return (
    <div style={{ marginLeft: "280px", marginTop: "20px" }}> {/* Add marginTop here */}
      <h1 style={{ textAlign: "center" }}>All Fertilizer Details</h1>
      <table className="table" style={{ width: "calc(100% - 250px)" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Quantity (kg)</th>
            <th>Manufactured Date</th>
            <th>Expired Date</th>
            <th>Operation</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {fertilizers.map(fertilizer => (
            <tr key={fertilizer._id}>
              <td>{fertilizer.fertilizerName}</td>
              <td>{fertilizer.fertilizerType}</td>
              <td>{fertilizer.manufacturer}</td>
              <td>{fertilizer.quantity}</td>
              <td>{new Date(fertilizer.manufacturedDate).toLocaleDateString()}</td>
              <td>{new Date(fertilizer.expiredDate).toLocaleDateString()}</td>
              <td>
                {/* Horizontal flex container for buttons */}
                <div style={{ display: "flex" }}>
                  {/* Update button */}
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdate(fertilizer._id)}
                    style={{ marginRight: "5px" }}
                  >
                    Update
                  </button>
                  {/* Delete button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(fertilizer._id)}
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
