const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema =  new Schema({
    
    delivery_id: {type:Number,},
    delivery_quantity: {type:Number, },
    driver_nic: {type:String, },
    delivery_status: {type:String, },
    request_status: {type:String, },
    lorry_number: {type:String, },
    delivery_date: {type:Date, },
    tea_type: {type:String, },
    factory_name_address:{type:String, },
    factory_password:{type:String, },

})

const  delivery = mongoose.model("delivery",deliverySchema);

module.exports=delivery;