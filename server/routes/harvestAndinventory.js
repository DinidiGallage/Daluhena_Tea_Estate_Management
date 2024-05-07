const router = require("express").Router();
const HarvestInventory = require("../models/harvestAndinventory");




// Add harvest data from supervisor
router.post('/addharvest', async (req, res) => {
    try {
        // Extracting fields from request body
        const { picker_id, harvest_date, expire_date, quantity, tea_type } = req.body;

        // Creating a new harvest inventory object with request_status set to "Add" by default
        const newHarvestInventory = new HarvestInventory({
            picker_id,
            harvest_date,
            expire_date,
            quantity,
            tea_type,
            type: "Add", // Set request_status to "Add" by default
        });

        // Saving the new harvest inventory object
        await newHarvestInventory.save();

        res.status(201).json({ message: 'Harvested data added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//update the accept request status from manager
router.put('/updateStatus/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the document ID from request parameters
        const { request_status } = req.body; // Extract the new request_status from request body

        // Update the document's request_status field based on ID
        const updatedHarvestInventory = await HarvestInventory.findByIdAndUpdate(id, { request_status }, { new: true });

        if (!updatedHarvestInventory) {
            return res.status(404).json({ error: 'Harvest inventory not found' });
        }

        res.status(200).json(updatedHarvestInventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//retireve all data
router.get('/', async (req, res) => {
    try {
        // Retrieve all documents from the HarvestInventory collection
        const allHarvestInventory = await HarvestInventory.find();

        // Send the retrieved documents as response
        res.status(200).json(allHarvestInventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get harvested data with type "Add" and non-"Reject" or non-"Accept" request_status
router.get('/harvestInventory', async (req, res) => {
    try {
        // Query the database for documents with type "Add" and request_status not in ["Reject", "Accept"]
        const harvestInventories = await HarvestInventory.find({ 
            type: "Add", 
            request_status: { $nin: ["Reject", "Accept"] } 
        }, 'picker_id quantity tea_type expire_date harvest_date');

        // Send the retrieved documents as response
        res.status(200).json(harvestInventories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get harvested data with request_status "Accept" and specified fields
router.get('/acceptedHarvestData/search', async (req, res) => {
    try {
        const { field, value } = req.query;

        // Validate if the field is one of the allowed fields
        const allowedFields = ['picker_id', 'harvest_date', 'expire_date', 'quantity', 'tea_type'];
        if (!allowedFields.includes(field)) {
            return res.status(400).json({ error: 'Invalid field provided' });
        }

        // Construct the query object based on the selected field and value
        const query = {};
        if (field === 'expire_date' || field === 'harvest_date') {
            // Parse date value and construct date range query
            const dateValue = new Date(value);
            const endDate = new Date(dateValue);
            endDate.setDate(endDate.getDate() + 1); // Adjust to search within a day range
            query[field] = { $gte: dateValue, $lt: endDate };
        } else if (field === 'quantity') {
            // Match exact quantity value (assuming quantity is stored as a numeric type)
            query[field] = parseInt(value);
        } else {
            // Case-insensitive search using regex for other fields
            query[field] = { $regex: value, $options: 'i' };
        }

        // Query the database for documents with request_status "Accept" and the specified field/value pair
        const harvestInventories = await HarvestInventory.find(
            { request_status: "Accept", ...query },
            'picker_id harvest_date expire_date quantity tea_type'
        );

        res.status(200).json(harvestInventories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;
// Delete harvested data by ID
router.delete('/deleteHarvestData/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the document ID from request parameters

        // Find and delete the document based on ID
        const deletedHarvestData = await HarvestInventory.findByIdAndDelete(id);

        if (!deletedHarvestData) {
            return res.status(404).json({ error: 'Harvest data not found' });
        }

        res.status(200).json({ message: 'Harvest data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update harvested data by ID
router.put('/updateHarvestDataFromManager/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the document ID from request parameters
        const updatedData = req.body; // Extract the updated data from request body

        // Update the document based on ID
        const updatedHarvestData = await HarvestInventory.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedHarvestData) {
            return res.status(404).json({ error: 'Harvest data not found' });
        }

        res.status(200).json(updatedHarvestData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Get harvested data by ID with specified fields
router.get('/harvestInventory/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from request parameters

        // Query the database for the document with the specified ID
        const harvestData = await HarvestInventory.findById(id)
            .select('picker_id quantity tea_type expire_date harvest_date');

        if (!harvestData) {
            return res.status(404).json({ error: 'Harvest data not found' });
        }

        // Send the retrieved document as response
        res.status(200).json(harvestData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/rejectedHarvestData', async (req, res) => {
    try {
        // Query the database for documents with request_status "Reject"
        const harvestInventories = await HarvestInventory.find(
            { request_status: "Reject" },
            'picker_id harvest_date expire_date quantity tea_type'
        );

        // Send the retrieved documents as response
        res.status(200).json(harvestInventories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get harvest data for supervisor with search functionality
// Get harvest data for supervisor with search functionality
// Get harvest data for supervisor with search functionality
router.get('/addedHarvestData', async (req, res) => {
    try {
        const { searchQuery, searchType } = req.query;
        let query = { type: "Add" }; // Base query to find documents with type "Add"

        // If search query and type are provided, construct the search condition
        if (searchQuery && searchType) {
            const searchCondition = {};
            // Add search conditions for specified search types
            switch (searchType) {
                case 'picker_id':
                case 'harvest_date':
                case 'expire_date':
                case 'quantity':
                case 'tea_type':
                case 'request_status':
                    searchCondition[searchType] = { $regex: searchQuery, $options: 'i' };
                    break;
                default:
                    break;
            }
            query = { ...query, ...searchCondition };
        }

        // Query the database with the constructed query
        const harvestData = await HarvestInventory.find(
            query,
            'picker_id harvest_date expire_date quantity tea_type request_status'
        );

        // Send the retrieved documents as response
        res.status(200).json(harvestData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Get harvested data by ID for editing
router.get('/editHarvestData/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from request parameters

        // Query the database for the document with the specified ID
        const harvestData = await HarvestInventory.findById(id)
            .select('picker_id expire_date quantity tea_type');

        if (!harvestData) {
            return res.status(404).json({ error: 'Harvest data not found' });
        }

        // Send the retrieved document as response
        res.status(200).json(harvestData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update harvested data by ID
router.put('/updateHarvestData/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the document ID from request parameters
        const updatedData = req.body; // Extract the updated data from request body

        // Update the document based on ID
        const updatedHarvestData = await HarvestInventory.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedHarvestData) {
            return res.status(404).json({ error: 'Harvest data not found' });
        }

        res.status(200).json(updatedHarvestData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// add delivery data 
router.post('/addHarvestDataMinus', async (req, res) => {
    try {
        const { picker_id, tea_type, quantity, delivered_date } = req.body;

        // Create a new HarvestInventory object
        const newHarvestData = new HarvestInventory({
          
            tea_type,
            quantity,
            delivered_date,
            type: "Minus", // Set type as "Minus"
            request_status:"Accept"

        });

        // Save the new harvest data to the database
        await newHarvestData.save();

        res.status(201).json({ message: 'Harvest data added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get delivery data (type "Minus")
router.get('/deliveryData', async (req, res) => {
    try {
        // Extract query parameters from the request
        const { tea_type, quantity, delivery_date } = req.query;
        
        // Construct the base query
        let query = { type: "Minus" };

        // Add optional query parameters
        if (tea_type) {
            query.tea_type = tea_type;
        }
        if (quantity) {
            query.quantity = quantity;
        }
        if (delivery_date) {
            // Assuming delivery_date is in ISO format (e.g., "2022-04-20T00:00:00Z")
            query.delivery_date = new Date(delivery_date);
        }

        // Query the database with the constructed query
        const deliveryData = await HarvestInventory.find(query);

        // Send the retrieved documents as response
        res.status(200).json(deliveryData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete delivery data by ID
router.delete('/deleteDeliveryData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Delete the delivery data from the database by ID
        await HarvestInventory.findByIdAndDelete(id); // Corrected line
        res.status(200).json({ message: 'Delivery data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get delivery data by ID
router.get('/deliveryData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Query the database for the delivery data with the specified ID
        const deliveryData = await HarvestInventory.findById(id);
        // Send the retrieved data as response
        res.status(200).json(deliveryData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update delivery data by ID
router.put('/updateDeliveryData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        // Update the delivery data in the database by ID
        const updatedDeliveryData = await HarvestInventory.findByIdAndUpdate(id, updatedData, { new: true });
        // Send the updated data as response
        res.status(200).json(updatedDeliveryData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get the total quantity of each tea type where type is "Add" and request_status is "Accept"
router.get('/totalQuantityAdd', async (req, res) => {
    try {
        const addTeaTypeQuantity = await HarvestInventory.aggregate([
            { $match: { type: "Add", request_status: "Accept" } }, // Filter documents where type is "Add" and request_status is "Accept"
            { $group: { _id: "$tea_type", totalQuantity: { $sum: "$quantity" } } } // Group by tea_type and sum the quantity
        ]);
        res.status(200).json(addTeaTypeQuantity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get the total quantity of each tea type where type is "Minus"
router.get('/totalQuantityMinus', async (req, res) => {
    try {
        const minusTeaTypeQuantity = await HarvestInventory.aggregate([
            { $match: { type: "Minus" } }, // Filter documents where type is "Minus"
            { $group: { _id: "$tea_type", totalQuantity: { $sum: "$quantity" } } } // Group by tea_type and sum the quantity
        ]);
        res.status(200).json(minusTeaTypeQuantity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/differenceQuantity', async (req, res) => {
    try {
        const { tea_type } = req.query;

        let matchQuery = {};
        if (tea_type) {
            matchQuery = { tea_type: { $regex: new RegExp(tea_type, 'i') } };
        }

        const addTeaTypeQuantity = await HarvestInventory.aggregate([
            { $match: { $and: [{ type: "Add" }, { request_status: "Accept" }, matchQuery] } },
            { $group: { _id: "$tea_type", totalQuantityAdd: { $sum: "$quantity" } } }
        ]);

        const minusTeaTypeQuantity = await HarvestInventory.aggregate([
            { $match: { $and: [{ type: "Minus" }, { request_status: "Accept" }, matchQuery] } },
            { $group: { _id: "$tea_type", totalQuantityMinus: { $sum: "$quantity" } } }
        ]);

        const difference = addTeaTypeQuantity.map(add => ({
            tea_type: add._id,
            difference: (add.totalQuantityAdd || 0) - (minusTeaTypeQuantity.find(minus => minus._id === add._id)?.totalQuantityMinus || 0)
        }));

        res.status(200).json(difference);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




//inventory
router.post('/addTeaType', async (req, res) => {
    try {
        const { type } = req.body; // Get the tea type from request body

        // Check if the tea type already exists
        const existingType = await HarvestInventory.findOne({ tea_type: type });

        if (existingType) {
            // If the tea type already exists, return an error response
            return res.status(400).json({ error: 'Tea type already exists' });
        }

        // Save the new tea type to the database
        await HarvestInventory.create({ tea_type: type });

        // Send a success response
        res.status(201).json({ message: 'Tea type added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//inventory
router.get('/teaTypes', async (req, res) => {
    try {
        // Query the database for distinct tea types
        const teaTypes = await HarvestInventory.distinct('tea_type');

        // Send the retrieved tea types as response
        res.status(200).json(teaTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/addpicker', async (req, res) => {
    try {
        const { picker_id, employee_nic } = req.body;

        // Create a new HarvestInventory object with other fields explicitly set to null
        const newHarvestInventory = new HarvestInventory({
            picker_id,
            employee_nic,
            harvest_date: null,
            expire_date: null,
            quantity: null,
            tea_type: null,
            delivered_date: null,
            request_status: null,
            type: null
        });

        // Save the new harvest data to the database
        await newHarvestInventory.save();

        // Respond with a success message
        res.status(201).json({ message: 'Picker and employee data added successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a route to get the count of unique picker_ids
router.get('/pickerCount', async (req, res) => {
    try {
        // Aggregate to get the count of unique picker_ids
        const pickerCount = await HarvestInventory.aggregate([
            { $group: { _id: "$picker_id" } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);

        // Send the count as response
        res.status(200).json(pickerCount && pickerCount.length > 0 ? pickerCount[0].count : 0);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get the percentage of quantity of each tea type where type="Add" and request_status="Accept"
router.get('/percentageAddAccept', async (req, res) => {
    try {
        // Aggregate to get the total quantity of each tea type where type="Add" and request_status="Accept"
        const addAcceptTotalQuantity = await HarvestInventory.aggregate([
            { $match: { type: "Add", request_status: "Accept" } },
            { $group: { _id: "$tea_type", totalQuantity: { $sum: "$quantity" } } }
        ]);

        // Get the total quantity of all tea types where type="Add" and request_status="Accept"
        const totalQuantityAddAccept = addAcceptTotalQuantity.reduce((total, tea) => total + tea.totalQuantity, 0);

        // Calculate the percentage for each tea type
        const percentageAddAccept = addAcceptTotalQuantity.map(tea => ({
            tea_type: tea._id,
            percentage: (tea.totalQuantity / totalQuantityAddAccept) * 100
        }));

        res.status(200).json(percentageAddAccept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to get the percentage of each tea type where type="Minus" and request_status="Accept"
router.get('/percentageMinusAccept', async (req, res) => {
    try {
        // Aggregate to get the total quantity of each tea type where type="Minus" and request_status="Accept"
        const minusAcceptTotalQuantity = await HarvestInventory.aggregate([
            { $match: { type: "Minus" } },
            { $group: { _id: "$tea_type", totalQuantity: { $sum: "$quantity" } } }
        ]);

        // Get the total quantity of all tea types where type="Minus" and request_status="Accept"
        const totalQuantityMinusAccept = minusAcceptTotalQuantity.reduce((total, tea) => total + tea.totalQuantity, 0);

        // Calculate the percentage for each tea type
        const percentageMinusAccept = minusAcceptTotalQuantity.map(tea => ({
            tea_type: tea._id,
            percentage: (tea.totalQuantity / totalQuantityMinusAccept) * 100
        }));

        res.status(200).json(percentageMinusAccept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get the count of documents where request_status="Reject"
router.get('/rejectCount', async (req, res) => {
    try {
        // Count documents where request_status="Reject"
        const rejectCount = await HarvestInventory.countDocuments({ request_status: "Reject" });

        res.status(200).json({ count: rejectCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get the count of documents where request_status="Accept"
router.get('/acceptCount', async (req, res) => {
    try {
        // Count documents where request_status="Accept"
        const acceptCount = await HarvestInventory.countDocuments({ request_status: "Accept" });

        res.status(200).json({ count: acceptCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to view picker by picker ID
router.get('/viewPicker/:picker_id', async (req, res) => {
    try {
        const { picker_id } = req.params;

        // Find the picker by picker ID
        const picker = await HarvestInventory.find({ picker_id });

        if (!picker) {
            return res.status(404).json({ message: 'Picker not found' });
        }

        res.status(200).json(picker);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to view the picker ID along with the count of quantity with type "Add"
router.get('/pickerIdQuantityCount', async (req, res) => {
    try {
        // Aggregate to group by picker ID and count the quantity where type is "Add"
        const pickerQuantityCount = await HarvestInventory.aggregate([
            { $match: { type: "Add" } },
            { 
                $group: { 
                    _id: "$picker_id", 
                    employee_nic: { $first: "$employee_nic" }, // Get the first NIC for each picker
                    count: { $sum: "$quantity" } 
                } 
            }
        ]);

        // Send the result as response
        res.status(200).json(pickerQuantityCount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to view all pickers
// Route to view all pickers along with their NICs
router.get('/viewAllPickers', async (req, res) => {
    try {
        // Find all pickers with non-null employee_nic
        const allPickers = await HarvestInventory.find(
            { employee_nic: { $ne: null } },
            { picker_id: 1, employee_nic: 1 }
        );

        if (!allPickers || allPickers.length === 0) {
            return res.status(404).json({ message: 'No pickers found' });
        }

        res.status(200).json(allPickers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a specific picker entry based on picker_id
// Delete a specific picker entry based on the document _id
router.delete('/deletePicker/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is provided
        if (!id) {
            return res.status(400).json({ error: 'Picker ID is required' });
        }

        // Find and remove the picker entry by _id
        const deletedPicker = await HarvestInventory.findOneAndDelete({ _id: id });

        if (!deletedPicker) {
            return res.status(404).json({ message: 'Picker not found' });
        }

        res.status(200).json({ message: 'Picker deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;