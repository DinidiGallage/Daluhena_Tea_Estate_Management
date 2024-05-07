const express = require('express');
const router = express.Router();
const Cultivation = require('../models/Cultivation');  // Ensure this path correctly points to where the Cultivation model is defined relative to this file
// const fs = require('fs');
// const PDFDocument = require('pdfkit');

const app = express();

// add details about newly planted tea plants
router.post('/add-cultivation', async (req, res) => {
    const { area, numberOfTeaPlants, healthStatus, detailsOfPlant, lastAddedFertilizerDate, plantedDate } = req.body;

    // Check if all fields are provided
    if (!area || !numberOfTeaPlants || !healthStatus || !detailsOfPlant || !lastAddedFertilizerDate || !plantedDate) {
        return res.status(400).json({ message: "All fields must be provided!" });
    }

    try {
        const newCultivation = new Cultivation({
            area,
            numberOfTeaPlants,
            healthStatus,
            detailsOfPlant,
            lastAddedFertilizerDate: new Date(lastAddedFertilizerDate),
            plantedDate: new Date(plantedDate)
        });

        await newCultivation.save();  // Save the new cultivation data to the database
        res.status(201).json({ message: "Plant data added successfully" });  // Respond with success message
    } catch (error) {
        res.status(500).json({ message: error.message });  // Respond with error message if something goes wrong
    }
});

// get details of the tea plants
router.get('/getPlantData', async (req, res) => {
    try {
        const cultivations = await Cultivation.find({
            $and: [
                { area: { $ne: null } },
                { numberOfTeaPlants: { $ne: null } },
                { healthStatus: { $ne: null } },
                { detailsOfPlant: { $ne: null } },
                { lastAddedFertilizerDate: { $ne: null } },
                { plantedDate: { $ne: null } }
            ]
        });
        res.json(cultivations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cultivation data: ' + error.message });
    }
});


// get details of the tea plants
router.get('/get-cultivation', async (req, res) => {
    try {
        const cultivations = await Cultivation.find({
            $and: [
                { area: { $ne: null } },
                { numberOfTeaPlants: { $ne: null } },
                { healthStatus: { $ne: null } },
                { detailsOfPlant: { $ne: null } },
                { lastAddedFertilizerDate: { $ne: null } },
                { plantedDate: { $ne: null } }
            ]
        }).select('area numberOfTeaPlants healthStatus detailsOfPlant lastAddedFertilizerDate plantedDate -_id');
        res.json(cultivations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plant data: ' + error.message });
    }
});


// delte details of plant data
router.delete('/delete-cultivation/:id', async (req, res) => {
    try {
        console.log('Deleting cultivation with ID:', req.params.id);
        const deletedCultivation = await Cultivation.findByIdAndDelete(req.params.id);
        if (!deletedCultivation) {
            return res.status(404).json({ message: 'Cultivation not found' });
        }
        res.json({ message: 'Cultivation deleted successfully' });
    } catch (error) {
        console.error('Error deleting cultivation:', error);
        res.status(500).json({ message: 'Error deleting cultivation: ' + error.message });
    }
});



// update details of plant data
router.get('/get-cultivation/:id', async (req, res) => {
    try {
        const cultivation = await Cultivation.findById(req.params.id);
        if (!cultivation) {
            return res.status(404).json({ message: "Cultivation data not found" });
        }
        res.json(cultivation);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cultivation data: ' + error.message });
    }
});

// PUT route to update cultivation data by ID
router.put('/update-cultivation/:id', async (req, res) => {
    const { area, numberOfTeaPlants, healthStatus, detailsOfPlant, lastAddedFertilizerDate, plantedDate } = req.body;

    try {
        const updatedCultivation = await Cultivation.findByIdAndUpdate(req.params.id, {
            area,
            numberOfTeaPlants,
            healthStatus,
            detailsOfPlant,
            lastAddedFertilizerDate: new Date(lastAddedFertilizerDate),
            plantedDate: new Date(plantedDate)
        }, { new: true }); // "new: true" returns the updated document

        if (!updatedCultivation) {
            return res.status(404).json({ message: "Cultivation data not found" });
        }
        res.json({ message: "Cultivation data updated successfully", updatedCultivation });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cultivation data: ' + error.message });
    }
});


// add sheduled data
router.post('/add-schedule', async (req, res) => {35                                                                                                                                                                                                         
    const { scheduleType, scheduleDetails, scheduledDate, scheduleAddedDate } = req.body;

    // Validate that all required fields are provided
    if (!scheduleType || !scheduleDetails || !scheduledDate || !scheduleAddedDate) {
        return res.status(400).json({ message: "All schedule fields must be provided!" });
    }

    try {
        const newSchedule = new Cultivation({
            scheduleType,
            scheduleDetails,
            scheduledDate: new Date(scheduledDate),
            scheduleAddedDate: new Date(scheduleAddedDate)
        });

        await newSchedule.save(); // Save the new schedule data to the database
        res.status(201).json({ message: "Schedule added successfully", data: newSchedule });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});




// get sheduled data
router.get('/get-schedules', async (req, res) => {
    try {
        const schedules = await Cultivation.find({
            $and: [
                { scheduleType: { $ne: null } },
                { scheduleDetails: { $ne: null } },
                { scheduledDate: { $ne: null } },
                { scheduleAddedDate: { $ne: null } }
            ]
        }).select('scheduleType scheduleDetails scheduledDate scheduleAddedDate _id'); // Include _id in the select
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule data: ' + error.message });
    }
});

//delete shedule data
router.delete('/delete-schedule/:id', async (req, res) => {
    try {
        console.log('Attempting to delete schedule with ID:', req.params.id);
        // Ensure that only schedule-type entries are being deleted if they are uniquely identifiable
        const deletedSchedule = await Cultivation.findOneAndDelete({
            _id: req.params.id,
            scheduleType: { $exists: true }  // Assuming 'scheduleType' is a field distinguishing schedules
        });

        if (!deletedSchedule) {
            console.log('No schedule found with ID:', req.params.id);
            return res.status(404).json({ message: "Schedule not found" });
        }
        console.log('Deleted schedule:', deletedSchedule);
        res.json({ message: "Schedule deleted successfully" });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ message: 'Error deleting schedule: ' + error.message });
    }
});



// Define route to view all cultivation data
router.get('/', async (req, res) => {
    try {
        // Retrieve all cultivation data from the database
        const allCultivations = await Cultivation.find();
        res.json(allCultivations); // Send the cultivation data as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cultivation data: ' + error.message });
    }
});

// GET route to fetch a single schedule data by ID
router.get('/get-schedule/:id', async (req, res) => {
    try {
        const schedule = await Cultivation.findOne({
            _id: req.params.id,
            scheduleType: { $ne: null },
            scheduleDetails: { $ne: null },
            scheduledDate: { $ne: null },
            scheduleAddedDate: { $ne: null }
        }).select('scheduleType scheduleDetails scheduledDate scheduleAddedDate');

        if (!schedule) {
            return res.status(404).json({ message: "Schedule data not found" });
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving schedule data: ' + error.message });
    }
});

// update shedule data
router.put('/update-schedule/:id', async (req, res) => {
    const { scheduleType, scheduleDetails, scheduledDate, scheduleAddedDate } = req.body;

    try {
        const updatedSchedule = await Cultivation.findByIdAndUpdate(req.params.id, {
            scheduleType,
            scheduleDetails,
            scheduledDate: new Date(scheduledDate),
            scheduleAddedDate: new Date(scheduleAddedDate)
        }, { new: true }); // "new: true" returns the updated document

        if (!updatedSchedule) {
            return res.status(404).json({ message: "Schedule data not found" });
        }
        res.json({ message: "Schedule data updated successfully", updatedSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule data: ' + error.message });
    }
});

// POST route to add new schedule data
router.post('/add-employee', async (req, res) => {
    const { nic, name } = req.body;

    // Validate that nic and name are provided
    if (!nic || !name) {
        return res.status(400).json({ message: "Both NIC and name must be provided for the schedule!" });
    }

    try {
        const newSchedule = new Cultivation({
            nic,
            name,
            // Set all other fields as null
            area: null,
            numberOfTeaPlants: null,
            healthStatus: null,
            detailsOfPlant: null,
            lastAddedFertilizerDate: null,
            plantedDate: null,
            task: null,
            taskDate: null,
            taskAddedDate: null,
            completeLevelOfTask: null,
            scheduleType: null,
            scheduleDetails: null,
            scheduledDate: null,
            scheduleAddedDate: null
        });

        await newSchedule.save(); // Save the new schedule data to the database
        res.status(201).json({ message: "Schedule added successfully", data: newSchedule });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
});



// GET route to fetch all unique non-null nic values with corresponding names
router.get('/get-nic-list', async (req, res) => {
    try {
        const uniqueNICs = await Cultivation.aggregate([
            { $match: { nic: { $ne: null } } }, // Filter out null NICs
            { $group: { _id: "$nic", name: { $first: "$name" } } }, // Group by NIC and get the first corresponding name
            { $project: { _id: 0, nic: "$_id", name: 1 } } // Project to include only nic and name fields
        ]);

        res.json(uniqueNICs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching unique NIC list: ' + error.message });
    }
});



// PUT route to update schedule data by NIC
router.put('/update-employee/:nic', async (req, res) => {
    const { name } = req.body;
    const nic = req.params.nic;

    try {
        const updatedEmployee = await Cultivation.findOneAndUpdate(
            { nic: nic }, // Find employee by NIC
            { name: name }, // Update employee name
            { new: true } // Return the updated document
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee data updated successfully", updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee data: ' + error.message });
    }
});

// DELETE route to delete employee data by NIC
router.delete('/delete-employee/:nic', async (req, res) => {
    const nic = req.params.nic;

    try {
        const deletedEmployee = await Cultivation.findOneAndDelete({ nic: nic });

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee data: ' + error.message });
    }
});


router.delete('/delete-employee/:nic', async (req, res) => {
    const nic = req.params.nic;

    try {
        // Assuming Cultivation is your Mongoose model
        const deletedEmployee = await Cultivation.findOneAndDelete({ nic: nic });

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully", deletedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee: ' + error.message });
    }
});

// POST route to add new task data
router.post('/add-task', async (req, res) => {
    const { nic, name, task, taskDate, taskAddedDate, completeLevelOfTask, employeeStatus, status, note } = req.body;

    // Check if all required fields are provided
    if (!nic || !task || !taskDate || !taskAddedDate) {
        return res.status(400).json({ message: "All task fields must be provided!" });
    }

    try {
        const newTask = new Cultivation({
            nic,
            name,
            task,
            taskDate: taskDate ? new Date(taskDate) : null,
            taskAddedDate: taskAddedDate ? new Date(taskAddedDate) : null,
            completeLevelOfTask: completeLevelOfTask || 'Have not Started',
            employeeStatus: employeeStatus || null,
            status: status || null,
            note: note || null
        });

        await newTask.save();  // Save the new task data to the database
        res.status(201).json({ message: "Task data added successfully", data: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });  // Respond with error message if something goes wrong
    }
});

// GET route to fetch task data where specified fields are not null
// GET route to fetch task data where specified fields are not null
router.get('/tasks', async (req, res) => {
    try {
        // Fetch tasks where specified fields are not null
        const tasks = await Cultivation.aggregate([
            {
                $match: {
                    nic: { $ne: null },
                    task: { $ne: null },
                    taskDate: { $ne: null },
                    taskAddedDate: { $ne: null }
                }
            },
            {
                $project: {
                    nic: 1,
                    name: 1,
                    task: 1,
                    taskDate: 1,
                    taskAddedDate: 1,
                    completeLevelOfTask: 1,
                    employeeStatus: { $ifNull: ["$employeeStatus", "Pending"] },
                    status: { $ifNull: ["$status", "Pending"] },
                    note: { $ifNull: ["$note", "Pending"] }
                }
            }
        ]);

        res.status(200).json({ message: "Task data retrieved successfully", data: tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });  // Respond with error message if something goes wrong
    }
});


// DELETE route to delete a task by ID
router.delete('/delete-task/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Cultivation.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to update a task by ID
router.put('/edit-task/:id', async (req, res) => {
    const taskId = req.params.id;
    const { nic, task, taskDate, taskAddedDate, completeLevelOfTask, employeeStatus, status, note } = req.body;

    try {
        const updatedTask = await Cultivation.findByIdAndUpdate(taskId, {
            nic,
            task,
            taskDate: new Date(taskDate),
            taskAddedDate: new Date(taskAddedDate),
            completeLevelOfTask,
            employeeStatus,
            status,
            note
        }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task updated successfully", data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// GET route to fetch task data by ID
router.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        // Fetch task data from the database using the provided ID
        const task = await Cultivation.findById(taskId);

        if (!task) {
            // If no task is found with the provided ID, return a 404 error
            return res.status(404).json({ message: 'Task not found' });
        }

        // Return the task data including additional fields
        res.status(200).json({
            data: {
                _id: task._id,
                nic: task.nic,
                task: task.task,
                taskDate: task.taskDate,
                taskAddedDate: task.taskAddedDate,
                completeLevelOfTask: task.completeLevelOfTask,
                employeeStatus: task.employeeStatus || 'Pending', // Set to 'Pending' if null
                status: task.status || 'Pending', // Set to 'Pending' if null
                note: task.note || 'Pending' // Set to 'Pending' if null
            }
        });
    } catch (error) {
        // If an error occurs during database operation, return a 500 error
        console.error('Error fetching task data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const mongoose = require('mongoose'); // Import mongoose module

// PUT route to update employeeStatus for a specific document by _id
router.put('/update-employee-status/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { employeeStatus } = req.body;

        // Check if taskId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid taskId" });
        }

        const updatedTask = await Cultivation.findByIdAndUpdate(
            taskId,
            { $set: { employeeStatus: employeeStatus } },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Employee status updated successfully", data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });  // Respond with error message if something goes wrong
    }
});



// GET route to fetch the count of unique NIC values
router.get('/nic-count', async (req, res) => {
    try {
        const nicCount = await Cultivation.aggregate([
            { $match: { nic: { $ne: null } } }, // Filter out null NICs
            { $group: { _id: "$nic", count: { $sum: 1 } } }, // Group by NIC and count occurrences
            { $count: "totalNICs" } // Count the total number of unique NICs
        ]);

        if (nicCount.length === 0) {
            return res.status(404).json({ message: "No NICs found" });
        }

        res.status(200).json(nicCount[0]); // Return the total count of unique NICs
    } catch (error) {
        res.status(500).json({ message: 'Error fetching NIC count: ' + error.message });
    }
});

// GET route to fetch the count of task completion statuses
router.get('/task-completion-count', async (req, res) => {
    try {
        const taskCompletionCount = await Cultivation.aggregate([
            {
                $group: {
                    _id: "$completeLevelOfTask",
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedCounts = {
            notStarted: 0,
            inProgress: 0,
            done: 0
        };

        // Process the aggregation result and update the formattedCounts object
        taskCompletionCount.forEach(status => {
            if (status._id === 'Not Started') {
                formattedCounts.notStarted = status.count;
            } else if (status._id === 'In Progress') {
                formattedCounts.inProgress = status.count;
            } else if (status._id === 'Done') {
                formattedCounts.done = status.count;
            }
        });

        res.status(200).json(formattedCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task completion count: ' + error.message });
    }
});

// Define a route to get the count of each schedule type
router.get('/schedule-count', async (req, res) => {
    try {
        // Aggregate the count of each schedule type, filtering out null scheduleType
        const scheduleCounts = await Cultivation.aggregate([
            { $match: { scheduleType: { $ne: null } } }, // Filter out null scheduleType
            { $group: { _id: "$scheduleType", count: { $sum: 1 } } }
        ]);

        // Transform the result into an object where keys are schedule types and values are counts
        const scheduleCountMap = {};
        scheduleCounts.forEach(schedule => {
            scheduleCountMap[schedule._id] = schedule.count;
        });

        res.json(scheduleCountMap);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule counts: ' + error.message });
    }
});
// Define a route to get the count of each employeeStatus
router.get('/employee-status-count', async (req, res) => {
    try {
        // Aggregate the count of each employeeStatus, excluding null values
        const statusCounts = await Cultivation.aggregate([
            { $match: { employeeStatus: { $ne: null } } }, // Exclude null values
            { $group: { _id: "$employeeStatus", count: { $sum: 1 } } }
        ]);

        // Transform the result into an object where keys are employeeStatus values and values are counts
        const statusCountMap = {};
        statusCounts.forEach(status => {
            statusCountMap[status._id] = status.count;
        });

        res.json(statusCountMap);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee status counts: ' + error.message });
    }
});

// GET route to fetch the percentage of task completion statuses
router.get('/task-completion-count-percentage', async (req, res) => {
    try {
        const taskCompletionCount = await Cultivation.aggregate([
            { 
                $match: { 
                    completeLevelOfTask: { $ne: null } // Exclude documents where completeLevelOfTask is null
                } 
            },
            {
                $group: {
                    _id: "$completeLevelOfTask",
                    count: { $sum: 1 }
                }
            }
        ]);

        let totalCount = 0;
        const formattedCounts = {};

        taskCompletionCount.forEach(status => {
            totalCount += status.count;
            formattedCounts[status._id] = status.count;
        });

        const percentages = {};
        Object.keys(formattedCounts).forEach(key => {
            percentages[key] = ((formattedCounts[key] / totalCount) * 100).toFixed(2);
        });

        res.status(200).json({ percentages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task completion count: ' + error.message });
    }
});

// Define a route to get the percentage of each schedule type
router.get('/schedule-count-percentage', async (req, res) => {
    try {
        // Aggregate the count of each schedule type, filtering out null scheduleType
        const scheduleCounts = await Cultivation.aggregate([
            { $match: { scheduleType: { $ne: null } } }, // Filter out null scheduleType
            { $group: { _id: "$scheduleType", count: { $sum: 1 } } }
        ]);

        let totalCount = 0;
        const scheduleCountMap = {};

        scheduleCounts.forEach(schedule => {
            totalCount += schedule.count;
            scheduleCountMap[schedule._id] = schedule.count;
        });

        const percentages = {};
        Object.keys(scheduleCountMap).forEach(key => {
            percentages[key] = ((scheduleCountMap[key] / totalCount) * 100).toFixed(2);
        });

        res.status(200).json({ percentages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule counts: ' + error.message });
    }
});

// Define a route to get the percentage of each employeeStatus
router.get('/employee-status-count-percentage', async (req, res) => {
    try {
        // Aggregate the count of each employeeStatus, excluding null values
        const statusCounts = await Cultivation.aggregate([
            { $match: { employeeStatus: { $ne: null } } }, // Exclude null values
            { $group: { _id: "$employeeStatus", count: { $sum: 1 } } }
        ]);

        let totalCount = 0;
        const statusCountMap = {};

        statusCounts.forEach(status => {
            totalCount += status.count;
            statusCountMap[status._id] = status.count;
        });

        const percentages = {};
        Object.keys(statusCountMap).forEach(key => {
            percentages[key] = ((statusCountMap[key] / totalCount) * 100).toFixed(2);
        });

        res.status(200).json({ percentages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee status counts: ' + error.message });
    }
});


// Define a route to get tasks and schedules for the current date
router.get('/tasks-and-schedules-today', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare dates

        // Find tasks and schedules for today's date
        const tasksAndSchedulesToday = await Cultivation.find({
            $or: [
                { $and: [{ taskDate: { $exists: true } }, { taskDate: today }] }, // Filter tasks for today's date
                { $and: [{ scheduledDate: { $exists: true } }, { scheduledDate: today }] } // Filter schedules for today's date
            ]
        });

        res.json(tasksAndSchedulesToday);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks and schedules for today: ' + error.message });
    }
});


// Define a route to fetch only task dates
router.get('/task-dates', async (req, res) => {
    try {
        // Aggregate only task dates where task is not null
        const taskDates = await Cultivation.aggregate([
            {
                $match: {
                    taskDate: { $exists: true }, // Match documents with taskDate
                    task: { $ne: null } // Exclude documents where task is null
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$taskDate", // Use taskDate as the date field
                    type: "Task", // Set type as "Task"
                    scheduleType: "$scheduleType", // Include scheduleType
                    task: "$task" // Include the task field
                }
            }
        ]);

        res.json(taskDates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task dates: ' + error.message });
    }
});

// Define a route to fetch schedule dates and types where scheduleType is not null
router.get('/schedule-dates', async (req, res) => {
    try {
        // Find documents where scheduledDate exists and scheduleType is not null
        const scheduleDates = await Cultivation.find({ scheduledDate: { $exists: true }, scheduleType: { $ne: null } })
                                                .select('scheduledDate scheduleType');

        res.json(scheduleDates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule dates: ' + error.message });
    }
});

router.post('/scheduleType', async (req, res) => {
    const { scheduleType } = req.body;

    // Check if scheduleType is provided
    if (!scheduleType) {
        return res.status(400).json({ message: "Schedule type must be provided!" });
    }

    try {
        const newTask = new Cultivation({
            scheduleType,
            area: null,
            numberOfTeaPlants: null,
            healthStatus: null,
            detailsOfPlant: null,
            lastAddedFertilizerDate: null,
            plantedDate: null,
            nic: null,
            name: null,
            task: null,
            taskDate: null,
            taskAddedDate: null,
            completeLevelOfTask: null,
            employeeStatus: null,
            status: null,
            note: null
        });

        await newTask.save();  // Save the new task data to the database
        res.status(201).json({ message: "Schedule type added successfully", data: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });  // Respond with error message if something goes wrong
    }
});
router.get('/scheduleType', async (req, res) => {
    try {
        const scheduleTypes = await Cultivation.distinct('scheduleType', { scheduleType: { $ne: null } }); // Retrieve distinct scheduleTypes where not null
        res.status(200).json({ data: scheduleTypes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to delete a schedule
router.delete('/scheduleType/:scheduleType', async (req, res) => {
    const scheduleType = req.params.scheduleType;

    try {
        // Find the schedule by scheduleType and delete it
        const deletedSchedule = await Cultivation.findOneAndDelete({ scheduleType });

        if (!deletedSchedule) {
            return res.status(404).json({ message: "Schedule not found!" });
        }

        res.json({ message: "Schedule deleted successfully", data: deletedSchedule });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Export router for use in the main application
module.exports = router;