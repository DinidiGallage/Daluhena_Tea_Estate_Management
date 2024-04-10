import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from '../../images/DashboardBackground.png'; 

export default function AllFertilizers() {
  const [fertilizers, setFertilizers] = useState([]);
  const [updateData, setUpdateData] = useState({
    fertilizerName: "",
    fertilizerType: "",
    manufacturer: "",
    quantity: 0,
    manufacturedDate: "",
    expiredDate: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFertilizerId, setSelectedFertilizerId] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [successMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8070/fertilizer")
      .then(response => {
        setFertilizers(response.data);
      })
      .catch(error => {
        console.error("Error fetching fertilizers:", error);
      });
  }, []);

  const handleUpdate = (id) => {
    const updatedFertilizer = fertilizers.find(fertilizer => fertilizer._id === id);
    setUpdateData(updatedFertilizer);
    setSelectedFertilizerId(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (id) => {
    axios.put(`http://localhost:8070/fertilizer/update/${id}`, updateData)
      .then(response => {
        setFertilizers(fertilizers.map(fertilizer => {
          if (fertilizer._id === id) {
            return { ...fertilizer, ...updateData };
          }
          return fertilizer;
        }));
        console.log("Fertilizer updated successfully");
        alert("Fertilizer updated successfully");
        setUpdateData({
          fertilizerName: "",
          fertilizerType: "",
          manufacturer: "",
          quantity: 0,
          manufacturedDate: "",
          expiredDate: ""
        });
        setSelectedFertilizerId(null);
      })
      .catch(error => {
        console.error("Error updating fertilizer:", error);
        alert("Error updating fertilizer.");
      });
  };
  

  const handleCancel = () => {
    setSelectedFertilizerId(null);
    setUpdateData({
      fertilizerName: "",
      fertilizerType: "",
      manufacturer: "",
      quantity: 0,
      manufacturedDate: "",
      expiredDate: ""
    });
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this fertilizer?");
  
    if (isConfirmed) {
      axios.delete(`http://localhost:8070/fertilizer/delete/${id}`)
        .then(response => {
          setFertilizers(fertilizers.filter(fertilizer => fertilizer._id !== id));
          console.log("Fertilizer deleted successfully");
          alert("Fertilizer deleted successfully");
        })
        .catch(error => {
          console.error("Error deleting fertilizer:", error);
        });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFertilizers = fertilizers.filter(fertilizer =>
    fertilizer.fertilizerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ marginLeft: "280px"}}>
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', padding: '40px 60px', display: "flex" }}>All Fertilizer Details</h1>
        <input
          type="text"
          placeholder="Search Fertilizer"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginLeft: "20px", marginBottom: "10px" }}
        />
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Manufacturer</th>
                <th>Quantity (kg)</th>
                <th>Manufactured Date</th>
                <th>Expired Date</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {filteredFertilizers.map(fertilizer => (
                <tr key={fertilizer._id}>
                  <td>{fertilizer.fertilizerName}</td>
                  <td>{fertilizer.fertilizerType}</td>
                  <td>{fertilizer.manufacturer}</td>
                  <td>{fertilizer.quantity}</td>
                  <td>{new Date(fertilizer.manufacturedDate).toLocaleDateString()}</td>
                  <td>{new Date(fertilizer.expiredDate).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdate(fertilizer._id)}
                        style={{ marginRight: "5px", width: "90px" }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(fertilizer._id)}
                        style={{ width: "90px" }}
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
        {selectedFertilizerId && (
          <div style={{ marginTop: "20px", width: "60%", margin: "10px" }}>
            <h2 style={{ textAlign: "center" }}>Update Fertilizer</h2>
            <form onSubmit={() => handleSubmit(updateData._id)}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="fertilizerName"
                  value={updateData.fertilizerName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Type:</label>
                <input
                  type="text"
                  className="form-control"
                  name="fertilizerType"
                  value={updateData.fertilizerType}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Manufacturer:</label>
                <input
                  type="text"
                  className="form-control"
                  name="manufacturer"
                  value={updateData.manufacturer}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Quantity (kg):</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={updateData.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Manufactured Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="manufacturedDate"
                  value={updateData.manufacturedDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Expired Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="expiredDate"
                  value={updateData.expiredDate}
                  onChange={handleChange}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-primary" style={{ width: "90px", height: "40px", marginRight: "10px" }}>
                  Update
                </button>
                <button type="button" className="btn btn-secondary" style={{ width: "90px", height: "40px", }} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
            {confirmation && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <p>Are you sure you want to update this fertilizer?</p>
                <button className="btn btn-danger" onClick={() => handleSubmit(selectedFertilizerId)} style={{ marginRight: "10px" }}>
                  Yes
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmation(false)}>
                  No
                </button>
              </div>
            )}
            {successMessage && (
              <div style={{ textAlign: "center", marginTop: "10px", color: "green" }}>
                <p>{successMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
