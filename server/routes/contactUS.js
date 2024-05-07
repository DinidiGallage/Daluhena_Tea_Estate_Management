const express = require('express');
const router = express.Router();
const delivery = require("../models/contactUS");
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    try {
      const { firstName, lastName, email, contactNumber, message } = req.body;
  
      if (!firstName || !lastName || !email || !contactNumber || !message) {
        return res.status(400).send('All fields are required.');
      }
  
      // Creating a new message document
      const newMessage = new ContactMessage({
        firstName,
        lastName,
        email,
        contactNumber,
        message
      });
  
      // Saving the message to the database
      await newMessage.save();
      res.status(201).send('Message stored successfully.');
    } catch (error) {
      res.status(500).send('Server error: ' + error.message);
    }
  });
  
  module.exports = router;