const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cultivationSchema = new Schema({
    area: { type: String, required: false },
    numberOfTeaPlants: { type: Number, required: false },
    healthStatus: { type: String, required: false },
    detailsOfPlant: { type: String, required: false },
    lastAddedFertilizerDate: { type: Date, required: false },
    plantedDate: { type: Date, required: false },
    nic: { type: String, required: false },
    name: { type: String, required: false },
    task: { type: String, required: false },
    taskDate: { type: Date, required: false },
    taskAddedDate: { type: Date, required: false },
    completeLevelOfTask: { type: String, required: false },
    scheduleType: { type: String, required: false },
    scheduleDetails: { type: String, required: false },
    scheduledDate: { type: Date, required: false },
    scheduleAddedDate: { type: Date, required: false },
    employeeStatus: { type: String, required: false },
    status: { type: String, required: false },
    note: { type: String, required: false }   
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

const Cultivation = mongoose.model('Cultivation', cultivationSchema);

module.exports = Cultivation;
