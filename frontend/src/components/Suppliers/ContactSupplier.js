import React, { useState } from "react";
import emailjs from 'emailjs-com'; // Import emailjs library
import supplierIcon from '../../images/Icons/supplier.png';
import contactIcon from '../../images/Icons/contact.png';


export default function ContactSupplierPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your emailjs service ID, template ID, and user ID
    emailjs.sendForm('service_hdfcilv', 'template_yabuzgi', e.target, 'ID5hHST5nKht9tr22')
      .then((result) => {
        console.log(result.text);
        setSuccessMessage("Email sent successfully!"); // Update success message state
      }, (error) => {
        console.log(error.text);
      });
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const handleBack = () => {
    window.location.href = "/suppliers"; // Navigate back to suppliers page
  };

  return (
    <div className="transparent-box" style={{ marginLeft: "340px", marginRight: "auto", marginTop: "80px", marginBottom: "20px", padding: "50px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "1000px" }}>
      <div style={{ backgroundColor: "#1E421D", padding: "20px", borderRadius: "15px", marginBottom: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={contactIcon} alt="Supplier Icon" style={{ marginRight: "30px", width: "40px", height: "40px", filter: "invert(1)" }} />
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "bold", margin: "0" }}>Contact Supplier</h1>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" style={{ marginBottom: "20px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" style={{ marginBottom: "20px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="4" style={{ marginBottom: "20px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#1E421D", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Send Email</button>
        {successMessage && <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>} {/* Display success message */}
      </form>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
        <img src={supplierIcon} alt="Back Icon" style={{ marginRight: "10px", width: "30px", height: "30px" }} onClick={handleBack} />
        <p style={{ color: "#1E421D", fontSize: "18px", fontWeight: "bold", margin: "0", cursor: "pointer" }} onClick={handleBack}>Back to Suppliers</p>
      </div>
    </div>
  );
}
