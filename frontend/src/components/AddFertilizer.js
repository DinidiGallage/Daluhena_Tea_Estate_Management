import React, { useState } from "react";
import axios from "axios";

export default function AddFertilizer() {
  const [fertilizerName, setFertilizerName] = useState("");
  const [fertilizerType, setFertilizerType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufacturedDate, setManufacturedDate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [error, setError] = useState("");

  function validateInputs() {
    if (
      !fertilizerName ||
      !fertilizerType ||
      !manufacturer ||
      !quantity ||
      !manufacturedDate ||
      !expiredDate
    ) {
      setError("All fields are required.");
      return false;
    }
  
    if (isNaN(quantity) || quantity <= 0) {
      setError("Quantity should be greater than zero.");
      return false;
    }
  
    const manufacturedTime = new Date(manufacturedDate).getTime();
    const expiredTime = new Date(expiredDate).getTime();
    if (isNaN(manufacturedTime) || isNaN(expiredTime) || manufacturedTime >= expiredTime) {
      setError(
        "Invalid manufactured date or expired date. Make sure the manufactured date is before the expired date."
      );
      return false;
    }
  
    setError("");
    return true;
  }
  

  function sendData(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const newFertilizer = {
      fertilizerName,
      fertilizerType,
      manufacturer,
      quantity,
      manufacturedDate,
      expiredDate
    };

    axios.post("http://localhost:8070/fertilizer/add", newFertilizer)
      .then(() => {
        alert("Fertilizer Added");
        setFertilizerName("");
        setFertilizerType("");
        setManufacturer("");
        setQuantity("");
        setManufacturedDate("");
        setExpiredDate("");
        setError("");
      })
      .catch((err) => {
        alert(err.response.data.message); // Display error message from server
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={sendData}>
            <div className="form-group">
              <label htmlFor="fertilizerName">Fertilizer Name</label>
              <input
                type="text"
                className="form-control"
                id="fertilizerName"
                placeholder="Enter fertilizer name"
                value={fertilizerName}
                onChange={(e) => setFertilizerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fertilizerType">Fertilizer Type</label>
              <input
                type="text"
                className="form-control"
                id="fertilizerType"
                placeholder="Enter fertilizer type"
                value={fertilizerType}
                onChange={(e) => setFertilizerType(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="manufacturer">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                id="manufacturer"
                placeholder="Enter manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="manufacturedDate">Manufactured Date</label>
              <input
                type="date"
                className="form-control"
                id="manufacturedDate"
                value={manufacturedDate}
                onChange={(e) => setManufacturedDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiredDate">Expired Date</label>
              <input
                type="date"
                className="form-control"
                id="expiredDate"
                value={expiredDate}
                onChange={(e) => setExpiredDate(e.target.value)}
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
