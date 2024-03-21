const express = require('express');
const router = express.Router();
const Purchase = require("../models/Purchase");

// Add new purchase
router.route("/add").post((req, res) => {
    const { supplier, product, invoiceNumber, purchaseDate, paymentStatus, qty, unitPrice } = req.body;

    // Calculate totalPrice
    const totalPrice = qty * unitPrice;

    const newPurchase = new Purchase({
        supplier,
        product,
        invoiceNumber,
        purchaseDate,
        paymentStatus,
        qty,
        unitPrice,
        totalPrice // Automatically calculated
    });

    newPurchase.save()
        .then(() => {
            res.json("Purchase Details Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding purchase details" });
        });
});

// Retrieve all purchase details
router.route("/").get((req, res) => {
    Purchase.find()
        .then((purchases) => {
            res.json(purchases);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving purchase details" });
        });
});

// Update purchase details
router.route("/update/:id").put(async (req, res) => {
    const purchaseId = req.params.id;
    const { supplier, product, invoiceNumber, purchaseDate, paymentStatus, qty, unitPrice } = req.body;

    // Calculate totalPrice
    const totalPrice = qty * unitPrice;

    const updatePurchase = {
        supplier,
        product,
        invoiceNumber,
        purchaseDate,
        paymentStatus,
        qty,
        unitPrice,
        totalPrice // Automatically calculated
    };

    try {
        const update = await Purchase.findByIdAndUpdate(purchaseId, updatePurchase);
        res.status(200).send({ status: "Purchase Details Updated", purchase: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete purchase
router.route("/delete/:id").delete(async (req, res) => {
    const purchaseId = req.params.id;

    try {
        await Purchase.findByIdAndDelete(purchaseId);
        res.status(200).send({ status: "Purchase records deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting purchase records", error: err.message });
    }
});

// Get details of one purchase
router.route("/get/:id").get(async (req, res) => {
    const purchaseId = req.params.id;

    try {
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(404).send({ status: "Error", error: "Purchase not found" });
        }
        res.status(200).send({ status: "Purchase fetched", purchase: purchase });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get purchase", error: err.message });
    }
});

module.exports = router;

