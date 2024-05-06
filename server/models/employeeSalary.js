const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSalarySchema = new Schema({
    employee_ID: { type: String },
    designation: { type: String },
    basic_salary: { type: Number },
    salary_package_name: { type: String },
    ot_payment_per_hour: { type: Number },
    tax: { type: Number },
    bonus: { type: Number },
    total_salary: { type: Number },
    expenses_type: { type: String },
    expense_amount: { type: Number },
    sales_type: { type: String },
    sales_amount: { type: Number },
    date: { type: Date, default: Date.now } ,// This line adds a date field with the current date as default
    Expenses_name: {type:String},
    Amount_expense :{type:Number},
    no_of_hours_worked:{type:Number}

});

const employeeSalary = mongoose.model("employeeSalary", employeeSalarySchema);

module.exports = employeeSalary;