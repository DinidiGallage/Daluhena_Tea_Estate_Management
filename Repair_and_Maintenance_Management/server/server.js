const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;
// Connect to MongoDB database using Mongoose ORM
mongoose.connect(URL, { 
    //useCreateIndex: true ,
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    //useFindAndModify: false
});

const connection =  mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB!");
})

const maintenanceRouter = require( "./routes/maintenance.js" );
const RepairRouter = require( "./routes/repair.js" );

app.use("/maintenance", maintenanceRouter);
app.use("/repair", RepairRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
