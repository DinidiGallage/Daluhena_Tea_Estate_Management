const express = require('express');
const router = express.Router();
const delivery = require("../models/delivery");
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const MANAGERS = {
    "Pickup and Delivery Manager": "pdm@123",
    "Resource Manager": "rm@123",
    "Factory Manager": "fm@123",
    "Buyer and Sales Manager": "bsm@123",
    "Inventory Manager": "im@123"
};



router.route("/add").post((req, res) => {
    const delivery_id  = Number(req.body.delivery_id);
    const delivery_quantity = Number(req.body.delivery_quantity);
    const driver_nic = req.body.driver_nic;
    const delivery_status = req.body.delivery_status;
    const request_status = req.body.request_status;
    const lorry_number = req.body.lorry_number;
    const delivery_date  = req.body.delivery_date;
    const tea_type = req.body.tea_type;
    const factory_password=req.body.factory_password;
    
    const newdelivery = new delivery({
        delivery_id,
        delivery_quantity,
        driver_nic,
        delivery_status,
        request_status,
        lorry_number,
        delivery_date,
        tea_type,
        factory_password
    });
    
    newdelivery.save()
      .then(()=>{
          res.json('delivery Details added')
      })
      .catch(err =>{
          console.log(err)
          res.status(500).json('Error adding delivery details');
      })
})

// Assuming `router` is your Express router and `delivery` is your Mongoose model
router.route("/addDeliveryRequest").post((req, res) => {
  
    const delivery_quantity = Number(req.body.delivery_quantity);
    const delivery_date = req.body.delivery_date;
    const tea_type = req.body.tea_type;
    
    // Here, we're setting the additional fields to "Pending"
    const newDelivery = new delivery({
        delivery_quantity,
        delivery_date,
        tea_type,
        delivery_status: "Pending",      // Set default as "Pending"
        request_status: "Pending",       // Set default as "Pending"
        lorry_number: "Pending"          // Set default as "Pending"
    });
    
    newDelivery.save()
        .then(() => {
            res.json('Delivery Details added');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Error adding delivery details');
        });
});



// fetch all data
router.route("/").get((req,res)=>{
    delivery.find().then((items) =>{
        res.json(items)
    }).catch((err) =>{
        res.send('Error getting items')
    })
});





        



//delete data
router.route("/delete/:id").delete(async (req,res)=>{
    let id= req.params.id;

    await  delivery.findByIdAndDelete(id)
    .then(()=>{
        res.send(`Item with the id ${id} has been deleted`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).send("Delete Unsuccessful")
    })
})
// Route to get delivery history by ID
router.get('/getHistory/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deliveryItem = await Delivery.findById(id);
        
        if (!deliveryItem) {
            return res.status(404).send({ message: 'Delivery not found' });
        }

        res.status(200).send(deliveryItem);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});




//display newRequestsgetDeliveryHistoryFactory
router.route("/displayNewRequest/:id").get(async (req, res) => {
    try {
      let id = req.params.id;
      const delivery = await delivery.findById(id, 'delivery_quantity delivery_date tea_type');
      if (!delivery) {
        return res.status(404).json({ message: 'Delivery not found' });
      }
      res.status(200).json(delivery);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  


  router.put('/updateDelivery/:id', async (req, res) => {
    const { id } = req.params;
    const allowedUpdates = ['delivery_quantity', 'driver_nic', 'delivery_status', 'request_status', 'lorry_number', 'delivery_date', 'tea_type'];
    const updateData = req.body;

    // Filter out any fields not allowed for update
    const filteredUpdates = Object.keys(updateData)
        .filter(key => allowedUpdates.includes(key))
        .reduce((acc, key) => {
            acc[key] = updateData[key];
            return acc;
        }, {});

    try {
        // Find the document by ID and update it with the filtered data from the request body
        const updatedDelivery = await delivery.findByIdAndUpdate(id, filteredUpdates, { new: true });

        // If no document was found, send a 404 response
        if (!updatedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        // Send back the updated document
        res.json(updatedDelivery);
    } catch (error) {
        // Log the error and send a 500 response if an error occurs
        console.error(error);
        res.status(500).json({ message: 'Error updating delivery', error: error.message });
    }
});

router.get('/getHistory', async (req, res) => {
    try {
        const searchField = req.query.searchField;
        const searchTerm = req.query.searchTerm;

        let query = {};

        // Additional conditions to filter out documents where delivery_quantity and tea_type are not null deliveriesDataforView
        query.delivery_quantity = { $ne: null };
        query.tea_type = { $ne: null };

        if (searchField && searchTerm) {
            // Assuming all fields are strings. If they're not, you'd need additional parsing logic
            if (searchField === 'delivery_date') {
                // For date, convert searchTerm to a Date object
                const date = new Date(searchTerm);
                query[searchField] = {
                    $gte: new Date(date.setHours(0, 0, 0)),
                    $lte: new Date(date.setHours(23, 59, 59))
                };
            } else if (searchField === 'delivery_quantity') {
                // For numeric fields, convert searchTerm to number
                query[searchField] = Number(searchTerm);
            } else {
                // For other string fields, use a regex for partial matching (case insensitive)
                query[searchField] = { $regex: searchTerm, $options: 'i' };
            }
        }

        const items = await Delivery.find(query, 'delivery_quantity driver_nic delivery_status request_status lorry_number delivery_date tea_type');
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting items: ' + err.message);
    }
});






router.get("/getDeliveryHistoryFactory/:factory_name", async (req, res) => {
    const factoryName = req.params.factory_name;
    try {
        const deliveries = await delivery.find({ factory_name: factoryName });
        if (deliveries.length === 0) {
            return res.status(404).json({ message: 'No deliveries found for this factory' });
        }
        const response = deliveries.map(deliveryItem => ({
            delivery_quantity: deliveryItem.delivery_quantity || 'Pending',
            delivery_date: deliveryItem.delivery_date || 'Pending',
            tea_type: deliveryItem.tea_type || 'Pending',
            driver_nic: deliveryItem.driver_nic || 'Pending',
            delivery_status: deliveryItem.delivery_status || 'Pending',
            request_status: deliveryItem.request_status || 'Pending',
            lorry_number: deliveryItem.lorry_number || 'Pending',
        }));

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/updateDeliveryStatus/:deliveryId', async (req, res) => {
    const { deliveryId } = req.params;
    const { status } = req.body;
  
    try {
      const delivery = await Delivery.findById(deliveryId);
  
      if (!delivery) {
        return res.status(404).send('Delivery not found');
      }
  
      delivery.delivery_status = status;
      await delivery.save();
  
      res.send('Delivery status updated successfully');
    } catch (error) {
      console.error('Error updating delivery status:', error);
      res.status(500).send('Internal server error');
    }
  });
// Update specified fields for a delivery
// Update delivery details
// Assuming `delivery` is your Mongoose model
const Delivery = require('../models/delivery'); // Adjust the path as needed

router.put('/updateDelivery/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    // Find the document by ID and update it
    const updatedDelivery = await Delivery.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.json(updatedDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating delivery', error: error.message });
  }
});

// Route to "delete" (nullify) specified fields for a delivery acceptedDeliveries delivery-history
router.route("/nullify/:id").put(async (req, res) => {
    let deliveryId = req.params.id;
    // Set specified fields to null
    const nullifyFields = {

        delivery_quantity: null, 
        driver_nic: null, 
        delivery_status: null, 
        request_status: null, 
        lorry_number: null,
        delivery_date: null,
        tea_type: null
    };

    try {
        const nullified = await delivery.findByIdAndUpdate(deliveryId, nullifyFields, { new: true });
        if (!nullified) {
            return res.status(404).send({ 'message': 'Delivery not found' });
        }
        res.status(200).json(nullified); // Send back the updated (nullified) document
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to nullify fields");
    }
});
;





// Update a delivery
router.route('/updateDeliveryHistory/:id').put((req, res) => {
    Delivery.findById(req.params.id)
        .then(delivery => {
            delivery.delivery_quantity = req.body.delivery_quantity;
            delivery.driver_nic = req.body.driver_nic;
            delivery.delivery_status = req.body.delivery_status;
            delivery.request_status = req.body.request_status;
            delivery.lorry_number = req.body.lorry_number;
            delivery.delivery_date = req.body.delivery_date;
            delivery.tea_type = req.body.tea_type;

            delivery.save()
                .then(() => res.json('Delivery updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addResourceRequest').post((req, res) => {
    const { factory_name_address, delivery_date, delivery_quantity, tea_type } = req.body;
  
    const newDelivery = new Delivery({
      factory_name_address,
      delivery_date,
      delivery_quantity,
      tea_type // Make sure to include this in your frontend form or modify accordingly
    });
  
    newDelivery.save()
      .then(() => res.json('Delivery request added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});



// Assuming `Delivery` is the correct Mongoose model imported at the top of your file
router.post('/update-delivery-status/:deliveryId', async (req, res) => {
    const { deliveryId } = req.params;
    const { newStatus } = req.body; // 'newStatus' comes from the frontend
  
    if (!["Update", "Reject"].includes(newStatus)) {
      return res.status(400).send("Invalid status update.");
    }
  
    try {
      // Ensure correct mapping of frontend status to the database status
      const statusToUpdate = newStatus === "Update" ? "Accepted" : "Rejected";
      
      const updatedDelivery = await Delivery.findByIdAndUpdate(
        deliveryId,
        { request_status: statusToUpdate }, // Use the correct status based on frontend input
        { new: true } // This option returns the document after update
      );
  
      if (!updatedDelivery) {
        return res.status(404).send("Delivery not found.");
      }
  
      res.json(updatedDelivery);
    } catch (error) {
      console.error(error); // Logging the error to the console for debugging
      res.status(500).send("Internal server error");
    }
});

  // In delivery.js(Factory manager)
 // Example endpoint adjustment in your Express.js backend
router.get('/pending-deliveries', async (req, res) => {
    try {
        // Fetch deliveries where request_status is neither "Accepted" nor "Rejected"
        // and where tea_type, delivery_date, and delivery_quantity are not null
        const pendingDeliveries = await Delivery.find({
            request_status: { $nin: ["Accepted", "Rejected"] },
            tea_type: { $ne: null },
            delivery_date: { $ne: null },
            delivery_quantity: { $ne: null }
        });
        res.json(pendingDeliveries);
    } catch (error) {
        console.error("Error fetching pending deliveries:", error);
        res.status(500).send("Internal server error");
    }
});

// Assuming `Delivery` is your Mongoose model for the deliveries collection

// Endpoint to get delivery history factory manager
// Assuming `Delivery` is your Mongoose model for the deliveries collection

router.get('/delivery-history', async (req, res) => {
    const { searchField, searchTerm } = req.query;

    let query = {};

    // Additional conditions to filter out documents where delivery_quantity and tea_type are not null
    query.delivery_quantity = { $ne: null };
    query.tea_type = { $ne: null };

    if (searchField && searchTerm) {
        if (searchField === 'delivery_date') {
            const date = new Date(searchTerm);
            query[searchField] = {
                $gte: new Date(date.setHours(0, 0, 0)),
                $lte: new Date(date.setHours(23, 59, 59))
            };
        } else if (searchField === 'delivery_quantity') {
            query[searchField] = Number(searchTerm);
        } else {
            query[searchField] = { $regex: searchTerm, $options: 'i' }; // case insensitive partial match
        }
    }

    try {
        const deliveries = await Delivery.find(query);
        res.json(deliveries);
    } catch (error) {
        console.error('Failed to retrieve deliveries:', error);
        res.status(500).send('Error retrieving deliveries');
    }
});

// Assuming Express router setup and Delivery is the correct Mongoose model
router.get('/acceptedDeliveries', async (req, res) => {
    try {
        const acceptedDeliveries = await Delivery.find({
            request_status: 'Accepted',
            delivery_status: { $nin: ['Available', 'Unavailable'] }
        });

        res.json(acceptedDeliveries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching accepted deliveries');
    }
});


//deliveriesRM?searchField
// Route to update specific fields of a delivery item(Resource Manager)
router.put('/updateDeliveryResource/:id', async (req, res) => {
    const { id } = req.params;
    const { driver_nic, delivery_status, lorry_number } = req.body;

    // Validate or sanitize input as necessary

    try {
        // Find the delivery by ID and update specified fields 
        const updatedDelivery = await Delivery.findByIdAndUpdate(id, {
            $set: {
                driver_nic,
                delivery_status,
                lorry_number
            }
        }, { new: true }); // Option { new: true } ensures the updated document is returned

        if (!updatedDelivery) {
            return res.status(404).send({ message: 'Delivery not found' });
        }

        res.json(updatedDelivery);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating delivery');
    }
});


router.get('/deliveriesRM', async (req, res) => {
    const { searchField = 'driver_nic', searchTerm = '' } = req.query;
    let query = {
        tea_type: { $ne: null },
        delivery_quantity: { $ne: null },
        delivery_date: { $ne: null },
        lorry_number: { $ne: null },
        driver_nic: { $ne: null },
    };

    // Adding search conditions to query if searchTerm is provided
    if (searchTerm) {
        if (searchField === 'delivery_date') {
            // For date, create a range for the whole day
            const date = new Date(searchTerm);
            query[searchField] = {
                $gte: new Date(date.setHours(0, 0, 0)),
                $lte: new Date(date.setHours(23, 59, 59))
            };
        } else if (searchField === 'delivery_quantity') {
            // Convert searchTerm to number for numeric fields
            query[searchField] = Number(searchTerm);
        } else {
            // Use regex for partial and case insensitive matching for string fields
            query[searchField] = { $regex: searchTerm, $options: 'i' };
        }
    }

    try {
        const deliveries = await Delivery.find(query);
        res.json(deliveries);
    } catch (error) {
        console.error('Failed to retrieve deliveries: ', error);
        res.status(500).send('Error retrieving deliveries');
    }
});

// Route to fetch a specific delivery by its ID getHistory
router.get('/deliveriesRM/:id', async (req, res) => {
    try {
        const { id } = req.params; // Destructure id from req.params
        const isValidObjectId = mongoose.Types.ObjectId.isValid(id); // Validate the object ID
        
        if (!isValidObjectId) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        
        // Fetch the delivery using findById and select only lorry_number and driver_nic.
        // Assuming 'delivery_request' was a typo or incorrect, replace with actual fields you need.
        // For this example, I'm using 'lorry_number' and 'driver_nic'. Add the correct field for 'deliver_request'.
        const delivery = await Delivery.findById(id)
                                       .select('driver_nic lorry_number delivery_status -_id'); // Exclude _id from the result, adjust fields as needed
                                       
        if (!delivery) {
            return res.status(404).send({ message: 'Delivery not found' }); // Send 404 if not found
        }
        
        res.status(200).send(delivery); // Send the delivery data
    } catch (error) {
        res.status(500).send({ message: error.message }); // Send 500 on error
    }
});


//acceptedDeliveries
//Harvest and Inventory manager,Buyer and Sales Manager
router.get('/deliveriesDataforView/', async (req, res) => {
    try {
        const deliveries = await Delivery.find({
            request_status: "Accepted",
            delivery_status: { $ne: "Unavailable" }
        }, 'delivery_quantity delivery_date tea_type');

        res.json(deliveries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching delivery data');
    }
});


// Add this route towards the end of your delivery.js file
router.get('/monthlyDeliveriesByTeaType', async (req, res) => {
    // Make sure to get the current date based on the server's time zone.
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const startOfMonth = new Date(currentYear, currentMonth, 1); // First day of the current month
    const endOfMonth = new Date(currentYear, currentMonth + 1, 1); // First day of the next month

    try {
        const results = await Delivery.aggregate([
            {
                $match: {
                    delivery_date: {
                        $gte: startOfMonth,
                        $lt: endOfMonth
                    },
                    request_status: "Accepted", // Include documents where request_status is "Accepted"
                    delivery_status: { $ne: "Unavailable" } // Exclude where delivery_status is "Unavailable"
                }
            },
            {
                $group: {
                    _id: { 
                        month: { $month: "$delivery_date" },
                        year: { $year: "$delivery_date" },
                        teaType: "$tea_type"
                    },
                    totalQuantity: { $sum: "$delivery_quantity" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.teaType": 1 }
            }
        ]);

        res.json({
            message: "Accepted and available delivery quantities by tea type for the current month",
            data: results
        });
    } catch (err) {
        console.error("Error aggregating delivery quantities:", err);
        res.status(500).send('Error fetching monthly deliveries by tea type');
    }
});



//dashboard
router.get('/deliveryStatusCounts', async (req, res) => {
    try {
        const statuses = await Delivery.aggregate([
            {
                $match: {
                    delivery_status: { $ne: null } // Exclude documents where delivery_status is null
                }
            },
            {
                $group: {
                    _id: '$delivery_status',
                    count: { $sum: 1 },
                    delivery_dates: { $push: "$delivery_date" }
                }
            }
        ]);
        res.json(statuses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching delivery status counts');
    }
});

//dashboard
router.get('/requestStatusCounts', async (req, res) => {
    try {
        const statuses = await Delivery.aggregate([
            {
                $match: {
                    request_status: { $ne: null } // Exclude documents where request_status is null
                }
            },
            {
                $group: {
                    _id: '$request_status',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(statuses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching request status counts');
    }
});

//dashboard
router.get('/deliveryStatusSummary', async (req, res) => {
    try {
        const statusCounts = await Delivery.aggregate([
            {
                $match: {
                    delivery_status: { $ne: null } // Exclude documents where delivery_status is null
                }
            },
            {
                $group: {
                    _id: '$delivery_status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const summary = statusCounts.reduce((acc, { _id: status, count }) => {
            acc[`${status}s`] = count;
            return acc;
        }, {});

        res.json(summary);
    } catch (error) {
        console.error('Error fetching delivery status summary:', error);
        res.status(500).send('Error fetching delivery status summary');
    }
});

//dashboard
router.get('/requestStatusSummary', async (req, res) => {
    try {
        const statusCounts = await Delivery.aggregate([
            {
                $match: {
                    request_status: { $ne: null } // Exclude documents where request_status is null
                }
            },
            {
                $group: {
                    _id: '$request_status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const summary = statusCounts.reduce((acc, { _id: status, count }) => {
            acc[status] = count;
            return acc;
        }, {});

        res.json(summary);
    } catch (error) {
        console.error('Error fetching request status summary:', error);
        res.status(500).send('Error fetching request status summary');
    }
});

//dashboard
router.get('/deliveryQuantityPercentagePerTeaType', async (req, res) => {
    try {
        // Perform the aggregation
        const result = await Delivery.aggregate([
            {
                // Match documents based on the updated criteria
                $match: {
                    delivery_status: { $nin: ["Unavailable", "Pending"] },
                    request_status: "Accepted"
                }
            },
            {
                // Group by tea type and sum their quantities
                $group: {
                    _id: "$tea_type",
                    totalQuantity: { $sum: "$delivery_quantity" }
                }
            },
            {
                // Look up to calculate the overall total quantity for the accepted requests
                $lookup: {
                    from: Delivery.collection.name,
                    pipeline: [
                        {
                            $match: {
                                delivery_status: { $nin: ["Unavailable", "Pending"] },
                                request_status: "Accepted"
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                overallTotalQuantity: { $sum: "$delivery_quantity" }
                            }
                        }
                    ],
                    as: "overall"
                }
            },
            {
                // Deconstruct the 'overall' array
                $unwind: "$overall"
            },
            {
                // Project the desired output, including the percentage calculation
                $project: {
                    _id: 0,
                    tea_type: "$_id",
                    percentage: {
                        $multiply: [
                            { $divide: ["$totalQuantity", "$overall.overallTotalQuantity"] },
                            100
                        ]
                    }
                }
            },
            {
                // Optionally sort the output for better readability
                $sort: { tea_type: 1 }
            }
        ]);

        // Formatting the output to have percentages rounded to two decimal places
        const formattedResult = result.map(item => ({
            ...item,
            percentage: parseFloat(item.percentage.toFixed(2))
        }));

        // Send the response
        res.json({
            message: "Delivery quantity percentage per tea type",
            data: formattedResult
        });
    } catch (error) {
        console.error('Error calculating delivery quantity percentage per tea type:', error);
        res.status(500).send('Error calculating delivery quantity percentage per tea type');
    }
});


// In your existing routes file (e.g., delivery.js)

// Endpoint to fetch deliveries grouped by date
router.get('/deliveriesByDate', async (req, res) => {
    try {
        const groupedDeliveries = await Delivery.aggregate([
            {
                $group: {
                    _id: "$delivery_date", // Group by delivery date
                    totalQuantity: { $sum: "$delivery_quantity" }, // Sum of quantities for the group
                    teaTypes: { $addToSet: "$tea_type" } // Unique tea types delivered
                }
            },
            { $sort: { _id: 1 } } // Optional: sort by date
        ]);

        res.json(groupedDeliveries);
    } catch (error) {
        console.error('Error fetching grouped deliveries:', error);
        res.status(500).send('Internal server error');
    }
});

router.route('/addDriver').post((req, res) => {
    const { driver_nic } = req.body;
    delivery.create({
        driver_nic, 
        delivery_id: null,
        delivery_quantity: null,
        delivery_status: null,
        request_status: null,
        lorry_number: null,
        delivery_date: null,
        tea_type: null,
        user_name: null,
        password: null
    })
    .then(() => {
        res.status(201).json({ message: 'Driver NIC added successfully' });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('Error adding driver NIC');
    });
});
//deliveriesRM/${id}
// View all driver_nic

router.route('/viewDrivers').get((req, res) => {
    delivery.distinct('driver_nic', { 
        driver_nic: { $ne: null },
        delivery_id: null,
        delivery_quantity: null,
        delivery_status: null,
        request_status: null,
        lorry_number: null,
        delivery_date: null,
        tea_type: null,
        user_name: null,
        password: null
    })
    .then(drivers => {
        res.json(drivers);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('Error fetching driver NICs');
    });
});;

router.route('/deleteDriver/:driver_nic').delete((req, res) => {
    const { driver_nic } = req.params;
    delivery.deleteMany({ driver_nic })
        .then(() => {
            res.json({ message: 'Driver NIC deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error deleting driver NIC');
        });
});

router.route('/countDrivers').get((req, res) => {
    delivery.countDocuments({ 
        driver_nic: { $ne: null },
        delivery_id: null,
        delivery_quantity: null,
        delivery_status: null,
        request_status: null,
        lorry_number: null,
        delivery_date: null,
        tea_type: null,
        user_name: null,
        password: null
    })
    .then(count => {
        res.json({ count });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('Error counting driver NICs');
    });
});
router.route('/addLorryNumber').post((req, res) => {
    const { lorry_number } = req.body;
    delivery.create({
        lorry_number, 
        delivery_id: null,
        delivery_quantity: null,
        delivery_status: null,
        request_status: null,
        driver_nic: null,
        delivery_date: null,
        tea_type: null,
        user_name: null,
        password: null
    })
    .then(() => {
        res.status(201).json({ message: 'Lorry number added successfully' });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('Error adding lorry number');
    });
});


router.route('/viewLorryNumbers').get((req, res) => {
    delivery.distinct('lorry_number', { 
        lorry_number: { $ne: null },
        delivery_id: null,
        delivery_quantity: null,
        delivery_status: null,
        request_status: null,
        driver_nic: null,
        delivery_date: null,
        tea_type: null,
        user_name: null,
        password: null
    })
    .then(lorryNumbers => {
        res.json(lorryNumbers);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('Error fetching lorry numbers');
    });
});

//getHistory
router.route('/deleteLorryNumber/:lorry_number').delete((req, res) => {
    const { lorry_number } = req.params;
    delivery.deleteMany({ lorry_number })
        .then(() => {
            res.json({ message: 'Lorry number deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error deleting lorry number');
        });
});

router.route('/countLorryNumbers').get((req, res) => {
    delivery.countDocuments({ 
        lorry_number: { $ne: null },
        delivery_id: null,
        delivery_quantity: null,
        delivery_status: null,
        request_status: null,
        driver_nic: null,
        delivery_date: null,
        tea_type: null,
        user_name: null,
        password: null
    })
    .then(count => {
        res.json({ count });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('Error counting lorry numbers');
    });
});


//delivery-history

// Monthly Delivery Report by Tea Type
router.get('/monthlyDeliveryReportPDF', async (req, res) => {
    try {
        const results = await delivery.aggregate([
            {
                $match: {
                    tea_type: { $nin: [null, "Pending"] }, // Exclude documents where tea_type is null or 'Pending'
                    request_status: "Accepted" // Filter by request_status equal to "Accepted"
                }
            },
            {
                $project: { // Project only the specified fields
                    tea_type: 1,
                    delivery_date: 1,
                    delivery_quantity: 1,
                    driver_nic: 1,
                    lorry_number: 1,
                    _id: 0 // Exclude the _id field
                }
            },
            {
                $sort: { "delivery_date": 1 } // Sort by delivery_date
            }
        ]);

        // Convert results to HTML table
// Convert results to HTML table
const htmlTable = `
        <html>
        <head><title>Monthly Delivery Report</title></head>
        <body>
            <h1>Monthly Delivery Report</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Tea Type</th>
                        <th>Delivery Date</th>
                        <th>Delivery Quantity</th>
                        <th>Driver NIC</th>
                        <th>Lorry Number</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.map(result => `
                        <tr>
                            <td>${result.tea_type}</td>
                            <td>${new Date(result.delivery_date).toLocaleDateString('en-US')}</td>
                            <td>${result.delivery_quantity}</td>
                            <td>${result.driver_nic}</td>
                            <td>${result.lorry_number}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `;


        // Generate PDF from HTML
        pdf.create(htmlTable).toBuffer((err, buffer) => {
            if (err) {
                console.error('Error generating PDF:', err);
                res.status(500).send('PDF generation error');
            } else {
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="monthly_delivery_report.pdf"'
                });
                res.send(buffer);
            }
        });
    } catch (error) {
        console.error('Error fetching monthly delivery report:', error);
        res.status(500).json({ message: 'Error fetching monthly delivery report' });
    }
});

const pdf = require('html-pdf');
const fs = require('fs');

router.get('/fullDeliveryReport', async (req, res) => {
    try {
        const results = await delivery.aggregate([
            {
                $match: {
                    tea_type: { $nin: [null, "Pending"] } // Exclude documents where tea_type is null or 'Pending'
                }
            },
            {
                $group: {
                    _id: "$tea_type",
                    total_quantity: { $sum: "$delivery_quantity" }
                }
            },
            {
                $sort: { "_id": 1 } // Sort by tea_type
            }
        ]);

        // Convert results to HTML table
        const htmlTable = `
            <html>
            <head><title>Full Delivery Report</title></head>
            <body>
                <h1>Full Delivery Report</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Tea Type</th>
                            <th>Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(result => `
                            <tr>
                                <td>${result._id}</td>
                                <td>${result.total_quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        // Generate PDF from HTML
        pdf.create(htmlTable).toBuffer((err, buffer) => {
            if (err) {
                console.error('Error generating PDF:', err);
                res.status(500).send('PDF generation error');
            } else {
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="full_delivery_report.pdf"'
                });
                res.send(buffer);
            }
        });
    } catch (error) {
        console.error('Error fetching full delivery report:', error);
        res.status(500).json({ message: 'Error fetching full delivery report' });
    }
});

// New route to handle PDF generation based on report type
router.get('/downloadReport/:reportType', async (req, res) => {
    const { reportType } = req.params;
    
    try {
        // Fetch data depending on the report type
        const conditions = { tea_type: { $nin: [null, "Pending"] } };
        if (reportType === 'monthly') {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            conditions.delivery_date = { $gte: startOfMonth, $lt: endOfMonth };
        }

        const results = await delivery.find(conditions, 'tea_type delivery_date delivery_quantity driver_nic lorry_number -_id');

        // Convert results to HTML
        const htmlContent = `
            <html>
            <head><title>${reportType.toUpperCase()} Delivery Report</title></head>
            <body>
                <h1>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Delivery Report</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Tea Type</th>
                            <th>Delivery Date</th>
                            <th>Quantity</th>
                            <th>Driver NIC</th>
                            <th>Lorry Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(result => `
                            <tr>
                                <td>${result.tea_type}</td>
                                <td>${result.delivery_date.toISOString().split('T')[0]}</td>
                                <td>${result.delivery_quantity}</td>
                                <td>${result.driver_nic}</td>
                                <td>${result.lorry_number}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        // Generate PDF from HTML
        pdf.create(htmlContent).toStream((err, stream) => {
            if (err) {
                res.status(500).send('Error generating PDF');
                return;
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${reportType}_delivery_report.pdf`);
            stream.pipe(res);
        });
    } catch (error) {
        res.status(500).send('Error fetching report data');
    }
});



const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Endpoint to download the full delivery report as CSV




// Count the number of documents with request_status "Pending"
router.get('/countPendingRequests', (req, res) => {
    delivery.countDocuments({ request_status: "Pending" })
        .then(count => {
            res.json({ count });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error counting pending requests');
        });
});

// Count the number of documents with delivery_status "Delivering"
router.get('/countDeliveringStatus', (req, res) => {
    delivery.countDocuments({ delivery_status: "Delivering" })
        .then(count => {
            res.json({ count });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error counting delivering status');
        });
});

// Count the number of documents with delivery_status "Pending"
router.get('/countPendingDeliveries', (req, res) => {
    delivery.countDocuments({ delivery_status: "Pending" })
        .then(count => {
            res.json({ count });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error counting pending deliveries');
        });
});
module.exports = router;







// Adding a new delivery: Handles a POST request to add a new delivery to the database.
// Adding a delivery request: Handles a POST request to add a new delivery request with default status values.
// Fetching all deliveries: Handles a GET request to fetch all delivery records from the database.
// Deleting a delivery: Handles a DELETE request to delete a delivery by its ID.
// Getting delivery history by ID: Handles a GET request to fetch the delivery history by its ID.
// Displaying new delivery requests: Handles a GET request to display new delivery requests based on the factory's ID.
// Updating delivery status: Handles a PUT request to update the delivery status based on its ID.
// Fetching delivery history by factory name: Handles a GET request to fetch delivery history based on the factory's name.
// Factory login: Handles a POST request for factory login authentication.
// Fetching pending deliveries: Handles a GET request to fetch pending deliveries for the factory manager.
// Fetching delivery history: Handles a GET request to fetch delivery history for the factory manager.
// Fetching accepted deliveries: Handles a GET request to fetch accepted deliveries.
// Updating specific fields of a delivery item: Handles a PUT request to update specific fields of a delivery item.
// Fetching delivery history by ID: Handles a GET request to fetch delivery history by its ID.
// Fetching delivery data for viewing: Handles a GET request to fetch delivery data for viewing.
// Fetching monthly deliveries by tea type: Handles a GET request to fetch monthly deliveries grouped by tea type.
// Fetching delivery status counts: Handles a GET request to fetch counts of different delivery statuses.
// Fetching request status counts: Handles a GET request to fetch counts of different request statuses.
// Fetching total quantity delivered of each tea type: Handles a GET request to fetch total quantity delivered of each tea type.
// Fetching popularity percentage of each tea type: Handles a GET request to fetch popularity percentage of each tea type.