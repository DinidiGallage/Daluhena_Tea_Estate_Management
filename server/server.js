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



const deliveryRouter = require( "./routes/delivery.js" );
app.use("/delivery", deliveryRouter);

const contactUSRouter = require("./routes/contactUS.js");
app.use("/conactUS", contactUSRouter);

const WeatherforcastAndCultivationRouter = require("./routes/Weatherforcast.js");
app.use("/Weatherforcast", WeatherforcastAndCultivationRouter);

const CulivationRouter = require("./routes/Cultivation.js");
app.use("/cultivation", CulivationRouter);


const harvestAndinventoryRouter = require("./routes/harvestAndinventory.js");
app.use("/harvestAndinventory",harvestAndinventoryRouter );


const maintenanceRouter = require("./routes/maintenance.js");
app.use("/maintenance", maintenanceRouter);

const repairRouter = require("./routes/repair.js");
app.use("/repair", repairRouter);

const managerRouter = require("./routes/manager.js");  // Include the manager router
app.use("/manager", managerRouter);  // Mount the manager router

const technicianRouter = require("./routes/technician.js");
app.use("/technician", technicianRouter);






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
