const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const harvestInventorySchema = new Schema({
    picker_id: { type: String },
    employee_nic: { type: String },
    harvest_date: { type: Date },
    expire_date: { type: Date },
    quantity: { type: Number }, // Corrected the spelling of 'quantity'
    tea_type: { type: String },
    delivered_date: { type: Date },
    request_status: { type: String },
    type: { type: String }
});

const HarvestInventory = mongoose.model("HarvestInventory", harvestInventorySchema); // Corrected the model name
module.exports = HarvestInventory; // Corrected the export statement