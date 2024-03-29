const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const maintenanceSchema =  new Schema({
    item_id: { type: Number, required: true },
    details: {type: String},
    date_created: { type: Date, default: Date.now() },
    tech_id: { type: Number },
    start_date: {type: Date} ,
    status: {type: String}, //"in progress" or "completed"
    end_date: {type :Date },
    cost: {type :Number }
})

const  Maintenance = mongoose.model("Maintenance",maintenanceSchema);

module.exports=Maintenance;

    