import React, { useState } from "react";
import axios from "axios";

export default function AddFertilizer() {
  const [fertilizerName, setName] = useState("");
  const [fertilizerType, setType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [quantity, setQuantity] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newFertilizer = {
      fertilizerName,
      fertilizerType,
      manufacturer,
      quantity
    };

    axios.post("http://localhost:8070/fertilizer/add", newFertilizer)
      .then(() => {
        alert("Fertilizer Added");
        setName("");
        setType("");
        setManufacturer("");
        setQuantity("");

      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form style={{ width: "500px" }} onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="fertilizerName">Fertilizer Name</label>
          <input
            type="text"
            className="form-control"
            id="fertilizerName"
            placeholder="Enter fertilizer name"
            value={fertilizerName}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setType(e.target.value)}
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
            type="text"
            className="form-control"
            id="quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
