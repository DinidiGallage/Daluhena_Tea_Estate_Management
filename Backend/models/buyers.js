const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    name: { type: String },
    number: { type: Number },
    email: { type: String },
    companyName: { type: String },
    companyAddress: { type: String },
    companyNumber: { type: Number },
    teaType: { type: String },
    contractEndDate: { type: Date },
});

const buyer = mongoose.model("buyer", buyerSchema);
module.exports = buyer;
