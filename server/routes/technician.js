const express = require("express");
const router = express.Router();
const Maintenance = require("../models/maintenance");
const Repair = require("../models/repair");

// Middleware to check if the request exists and is in the correct status to be updated
async function checkRequestStatus(req, res, next) {
    const { id } = req.params;
    const { type } = req.body; // type: 'maintenance' or 'repair'
    const Model = type === 'maintenance' ? Maintenance : Repair;

    try {
        let request = await Model.findById(id);
        if (!request) {
            return res.status(404).send({ error: "Request not found." });
        } else if (request.status !== "In Progress") {
            return res.status(400).send({ error: "Request is not in progress." });
        }
        req.request = request;
        next();
    } catch (err) {
        res.status(500).send({ error: "Server error" });
    }
}

// Route to start a job
router.put("/:id/start", checkRequestStatus, async (req, res) => {
    req.request.start_date = new Date();
    req.request.cost = req.body.cost || 0;

    try {
        await req.request.save();
        res.status(200).send({ message: "Job started successfully.", request: req.request });
    } catch (err) {
        res.status(500).send({ error: "Could not update the job." });
    }
});


// Route to complete a job
router.put("/:id/complete", checkRequestStatus, async (req, res) => {
    req.request.end_date = new Date();
    req.request.status = 'Completed';  // Explicitly set the status to 'Completed'

    try {
        await req.request.save();
        res.status(200).send({ message: "Job completed successfully.", request: req.request });
    } catch (err) {
        res.status(500).send({ error: "Could not complete the job." });
    }
});


module.exports = router;