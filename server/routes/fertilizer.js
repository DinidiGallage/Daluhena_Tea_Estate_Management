//const router = require("express").Router;

const express = require('express');
const router = express.Router();

let Fertilizer = require("../models/Fertilizer");
// Add new fertilizer
router.route("/add").post((req, res) => {
    const { fertilizerName, fertilizerType, manufacturer, quantity } = req.body;

    const newFertilizer = new Fertilizer({
        fertilizerName,
        fertilizerType,
        manufacturer,
        quantity
    });

    newFertilizer.save()
        .then(() => {
            res.json("Fertilizer Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error adding fertilizer" });
        });
});

// Retrieve all fertilizer details
router.route("/").get((req, res) => {
    Fertilizer.find()
        .then((fertilizers) => {
            res.json(fertilizers);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error retrieving fertilizer details" });
        });
});

// Update fertilizer details
router.route("/update/:id").put(async (req, res) => {
    const fertilizerId = req.params.id;
    const { fertilizerName, fertilizerType, manufacturer, quantity } = req.body;

    const updateFertilizer = {
        fertilizerName,
        fertilizerType,
        manufacturer,
        quantity
    };

    try {
        const update = await Fertilizer.findByIdAndUpdate(fertilizerId, updateFertilizer);
        res.status(200).send({ status: "Fertilizer Details Updated", fertilizer: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating fertilizer", error: err.message });
    }
});

// Delete fertilizer
router.route("/delete/:id").delete(async (req, res) => {
    const fertilizerId = req.params.id;

    try {
        await Fertilizer.findByIdAndDelete(fertilizerId);
        res.status(200).send({ status: "Fertilizer records deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting fertilizer", error: err.message });
    }
});

// Get details of one fertilizer
router.route("/get/:id").get(async (req, res) => {
    const fertilizerId = req.params.id;

    try {
        const fertilizer = await Fertilizer.findById(fertilizerId);
        if (!fertilizer) {
            return res.status(404).send({ status: "Error", error: "Fertilizer not found" });
        }
        res.status(200).send({ status: "Fertilizer fetched", fertilizer: fertilizer });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get fertilizer", error: err.message });
    }
});

module.exports = router;