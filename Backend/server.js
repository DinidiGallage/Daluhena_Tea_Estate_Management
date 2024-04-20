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
app.use(express.json()); // for parsing application/json


const URL = process.env.MONGODB_URL;
// Connect to MongoDB database using Mongoose ORM
mongoose.connect(URL);


// Check connection
const connection =  mongoose.connection;
connection.once("open", () => {
    console.log("Connected to MongoDB!");
})




const buyerRouter = require( "./routes/buyers.js" );
const salesRouter = require( "./routes/sales.js" );



app.use("/buyer", buyerRouter);
app.use("/sales", salesRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
