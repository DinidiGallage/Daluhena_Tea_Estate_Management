import React, { useState } from "react";
import axios from "axios";

export default function AddPurchase() {
  const [supplier, setSupplier] = useState("");
  const [product, setProduct] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newPurchase = {
      supplier,
      product,
      invoiceNumber,
      purchaseDate,
      paymentStatus,
      qty,
      unitPrice
    };

    axios.post("http://localhost:8070/purchase/add", newPurchase)
      .then(() => {
        alert("Purchase Added");
        setSupplier("");
        setProduct("");
        setInvoiceNumber("");
        setPurchaseDate("");
        setPaymentStatus("");
        setQty("");
        setUnitPrice("");
      })
      .catch((err) => {
        alert(err.response.data.message); // Display error message from server
      });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form style={{ width: "500px" }} onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="supplier">Supplier</label>
          <input
            type="text"
            className="form-control"
            id="supplier"
            placeholder="Enter supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="product">Product</label>
          <input
            type="text"
            className="form-control"
            id="product"
            placeholder="Enter product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="invoiceNumber">Invoice Number</label>
          <input
            type="text"
            className="form-control"
            id="invoiceNumber"
            placeholder="Enter invoice number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="purchaseDate">Purchase Date</label>
          <input
            type="date"
            className="form-control"
            id="purchaseDate"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentStatus">Payment Status</label>
          <input
            type="text"
            className="form-control"
            id="paymentStatus"
            placeholder="Enter payment status"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="qty">Quantity</label>
          <input
            type="text"
            className="form-control"
            id="qty"
            placeholder="Enter quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            type="text"
            className="form-control"
            id="unitPrice"
            placeholder="Enter unit price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

