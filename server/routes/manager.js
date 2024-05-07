const router = require("express").Router();
const Maintenance = require("../models/maintenance");
const Repair = require("../models/repair");

// Middleware to fetch request details
async function getRequestDetails(req, res, next) {
    const { type, id } = req.params;
    try {
        const model = type === 'maintenance' ? Maintenance : Repair;
        req.requestDetails = await model.findById(id);
        if (!req.requestDetails) return res.status(404).json({ message: "Request not found" });
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error fetching request details" });
    }
}

// GET all requests (filtered by status if provided)
router.get("/:type", async (req, res) => {
    const { type } = req.params;
    const { status } = req.query;
    const model = type === 'maintenance' ? Maintenance : Repair;

    try {
        const requests = await model.find(status ? { status } : {});
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching requests" });
    }
});

// Approve or reject a request
router.put("/:type/:id/approve", getRequestDetails, async (req, res) => {
    const { status } = req.body; // should be 'Approved' or 'Rejected'
    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Only 'Approved' or 'Rejected' allowed" });
    }

    try {
        req.requestDetails.status = status;
        await req.requestDetails.save();
        res.json({ message: `Request ${status}` });
    } catch (error) {
        res.status(500).json({ message: "Error updating request status" });
    }
});

// Assign a technician to a request
router.put("/:type/:id/assign", getRequestDetails, async (req, res) => {
    const { tech_id } = req.body;
    if (req.requestDetails.status !== 'Approved') {
        return res.status(400).json({ message: "Request must be Approved before assigning a technician" });
    }

    try {
        req.requestDetails.tech_id = tech_id;
        req.requestDetails.status = "In Progress";
        await req.requestDetails.save();
        res.json({ message: "Technician assigned successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error assigning technician" });
    }
});

// View all requests
router.get("/requests", async (req, res) => {
    try {
        const maintenanceRequests = await Maintenance.find();
        const repairRequests = await Repair.find();
        res.json({ maintenanceRequests, repairRequests });
    } catch (error) {
        res.status(500).json({ message: "Error fetching all requests" });
    }
});

module.exports = router;