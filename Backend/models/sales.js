const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
    sales_type: { type: String },
    date: { type: Date },
    //amount: { type: Number },
    sales_id:{ type: Number },
    sale_description: { type: String },
    quantity: { type: Number },
    unit_price: { type: Number },
    buyer_name: { type: String },
    factory_name: { type: String },
    Email: { type: String },
    tea_type: { type: String },
    total: { type: Number },
    tea_type: { type: String },
    seller: { type: String },
    invoice_No: { type: Number }


});

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;
