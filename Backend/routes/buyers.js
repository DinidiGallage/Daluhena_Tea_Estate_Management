const express = require('express');
const router = express.Router();
const Buyer = require('../models/buyers'); // Importing the Buyer model

router.post("/add", (req, res) => {
    const {
        name,
        number,
        email,
        companyName,
        companyAddress,
        companyNumber,
        teaType,
        contractEndDate
    } = req.body;
    
    const newBuyer = new Buyer({
        name,
        number,
        email,
        companyName,
        companyAddress,
        companyNumber,
        teaType,
        contractEndDate: new Date(contractEndDate) // Assuming contractEndDate is a string in ISO format
    });
    
    newBuyer.save()
      .then(() => {
          res.json('Buyer details added');
      })
      .catch(err => {
          console.error(err);
          res.status(500).json('Error adding buyer details');
      });
});


// Route to view all buyers
router.get("/", (req, res) => {
    Buyer.find()
        .then(buyers => {
            res.json(buyers);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error retrieving buyers');
        });
});


// Route to view data for a specific buyer by ID
router.get("/:buyerId", (req, res) => {
    const buyerId = req.params.buyerId;

    Buyer.findById(buyerId)
        .then(buyer => {
            if (!buyer) {
                return res.status(404).json('Buyer not found');
            }
            res.json(buyer);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error retrieving buyer');
        });
});

// Route to delete data for a specific buyer by ID
router.delete("/:buyerId", (req, res) => {
    const buyerId = req.params.buyerId;

    Buyer.findByIdAndDelete(buyerId)
        .then(deletedBuyer => {
            if (!deletedBuyer) {
                return res.status(404).json('Buyer not found');
            }
            res.json('Buyer deleted successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error deleting buyer');
        });
});
// Route to update data for a specific buyer by ID
router.put("/:buyerId", (req, res) => {
    const buyerId = req.params.buyerId;
    const updatedBuyerData = req.body; // New data to update

    Buyer.findByIdAndUpdate(buyerId, updatedBuyerData, { new: true })
        .then(updatedBuyer => {
            if (!updatedBuyer) {
                return res.status(404).json('Buyer not found');
            }
            res.json('Buyer updated successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error updating buyer');
        });
});
// Route to view all buyers or search by name
router.get("/", (req, res) => {
    const { name } = req.query; // Extract the name from query parameters if provided

    // Define the filter object based on whether name is provided or not
    const filter = name ? { name: { $regex: new RegExp(name, "i") } } : {};

    Buyer.find(filter)
        .then(buyers => {
            res.json(buyers);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error retrieving buyers');
        });
});

module.exports = router;
