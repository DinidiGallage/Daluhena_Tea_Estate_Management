const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require("dotenv").config();

// PORT declaration to run the app
const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB!");
});

// Import routes
const salarypackageRouter = require("./routes/salarypackage.js");
const employeesalaryRouter = require("./routes/employeesalary.js");


// Use routes
app.use("/salarypackage", salarypackageRouter);
app.use("/employeesalary", employeesalaryRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});
