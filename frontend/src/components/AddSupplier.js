import React, { useState } from "react";
import axios from "axios";

export default function AddSupplier() {
  const [supplierName, setSupplierName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [productTypes, setProductTypes] = useState("");
  const [error, setError] = useState("");

  function validateInputs() {
    if (!supplierName || !contactPerson || !phone || !email || !address || !productTypes) {
      setError("All fields are required.");
      return false;
    }

    // Validate phone number format
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be in the format XXX-XXX-XXXX.");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
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
            placeholder="Enter phone number (XXX-XXX-XXXX)"
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

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
