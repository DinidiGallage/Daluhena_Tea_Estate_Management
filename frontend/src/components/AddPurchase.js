import React, { useState } from "react";
import axios from "axios";
import backgroundImage from '../images/DashboardBackground.png'; 

export default function AddPurchase() {
  const [supplier, setSupplier] = useState("");
  const [product, setProduct] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [errors, setErrors] = useState({});

  function sendData(e) {
    e.preventDefault();

    const errors = {};

    if (!supplier) {
      errors.supplier = "Supplier name is required";
    }

    if (!product) {
      errors.product = "Product name is required";
    }

    if (!invoiceNumber) {
      errors.invoiceNumber = "Invoice number is required";
    }

    if (!purchaseDate) {
      errors.purchaseDate = "Purchase date is required";
    } else if (new Date(purchaseDate) > new Date()) {
      errors.purchaseDate = "Purchase date cannot be in the future";
    }

    if (!paymentStatus) {
      errors.paymentStatus = "Payment status is required";
    }

    if (!qty) {
      errors.qty = "Quantity is required";
    } else {
      if (isNaN(Number(qty)) || Number(qty) <= 0) {
        errors.qty = "Quantity must be a positive number";
      }
    }

    if (!unitPrice) {
      errors.unitPrice = "Unit price is required";
    } else {
      if (isNaN(Number(unitPrice)) || Number(unitPrice) <= 0) {
        errors.unitPrice = "Unit price must be a positive number";
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

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
        setErrors({});
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          // Server returned an error message
          alert(err.response.data.error);
        } else {
          // Generic error message
          alert("An error occurred while adding the purchase.");
        }
      });
  }

  return (
    <div className="transparent-box">
      <div className="form-container">
        <div className="form-wrapper" style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "2000px" }}>
          <form style={{ width: "100%", display: "flex", flexDirection: "column" }} onSubmit={sendData}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white", backgroundImage: `url(${backgroundImage})`, backgroundSize: '100% auto', padding: '40px 60px', width: "100%"  }}>Record New Purchase Details</h2> 
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div style={{ width: "50%", marginRight: "2%" }}>
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
                  {errors.supplier && <div className="text-danger">{errors.supplier}</div>}
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
                  {errors.product && <div className="text-danger">{errors.product}</div>}
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
                  {errors.invoiceNumber && <div className="text-danger">{errors.invoiceNumber}</div>}
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
                  {errors.purchaseDate && <div className="text-danger">{errors.purchaseDate}</div>}
                </div>
              </div>
              
              <div style={{ width: "50%", marginLeft: "2%" }}>
                <div className="form-group">
                  <label>Payment Status</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Paid"
                        checked={paymentStatus === "Paid"}
                        onChange={() => setPaymentStatus("Paid")}
                      />
                      Paid
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Pending"
                        checked={paymentStatus === "Pending"}
                        onChange={() => setPaymentStatus("Pending")}
                      />
                      Pending
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Unpaid"
                        checked={paymentStatus === "Unpaid"}
                        onChange={() => setPaymentStatus("Unpaid")}
                      />
                      Unpaid
                    </label>
                  </div>
                  {errors.paymentStatus && <div className="text-danger">{errors.paymentStatus}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="qty">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="qty"
                    placeholder="Enter quantity"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                  {errors.qty && <div className="text-danger">{errors.qty}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="unitPrice">Unit Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="unitPrice"
                    placeholder="Enter unit price"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                  />
                  {errors.unitPrice && <div className="text-danger">{errors.unitPrice}</div>}
                </div>
              </div>
            </div>
            <div style={{ width: "100%", marginLeft: "10%" }}>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
