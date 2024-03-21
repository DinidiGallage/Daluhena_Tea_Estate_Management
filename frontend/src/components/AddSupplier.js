import React, { useState } from "react";
import axios from "axios";

export default function AddSupplier() {
  const [supplierName, setSupplierName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [productTypes, setProductTypes] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newSupplier = {
      supplierName,
      contactPerson,
      phone,
      email,
      address,
      productTypes
    };

    axios.post("http://localhost:8070/supplier/add", newSupplier)
      .then(() => {
        alert("Supplier Added");
        setSupplierName("");
        setContactPerson("");
        setPhone("");
        setEmail("");
        setAddress("");
        setProductTypes("");
      })
      .catch((err) => {
        alert(err.response.data.message); // Display error message from server
      });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form style={{ width: "500px" }} onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="supplierName">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            id="supplierName"
            placeholder="Enter supplier name"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            className="form-control"
            id="contactPerson"
            placeholder="Enter contact person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productTypes">Product Types</label>
          <input
            type="text"
            className="form-control"
            id="productTypes"
            placeholder="Enter product types"
            value={productTypes}
            onChange={(e) => setProductTypes(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
