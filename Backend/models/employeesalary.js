const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeesalarySchema = new Schema({
    salary_id: { type: String },
    employee_id: { type: String },
    package_id: { type: String },
    salary_amount: { type: String },
    calculation_date: { type: Date }
});

const employeesalary = mongoose.model("employeesalary", employeesalarySchema);
module.exports = employeesalary;

