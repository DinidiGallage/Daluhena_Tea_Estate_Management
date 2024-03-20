const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fertilizerSchema = new Schema({
    fertilizerName: {
        type: String,
        required: true
    },
    fertilizerType: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a non-negative number.'] // Set minimum value for quantity
    }
});

// Custom validation for quantity
fertilizerSchema.path('quantity').validate(function(value) {
    return value >= 0;
}, 'Quantity must be a non-negative number.');

const Fertilizer = mongoose.model("Fertilizer", fertilizerSchema);

module.exports = Fertilizer;
