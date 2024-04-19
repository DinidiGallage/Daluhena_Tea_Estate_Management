const express = require('express');
const router = express.Router();
const employeeSalary = require("../models/employeeSalary");




// POST request to add new employee details
// Add Employee Details
router.post("/addEmployeeDetails", (req, res) => {
    const { employee_ID, designation, basic_salary } = req.body;

    const newEmployeeDetails = new employeeSalary({
        employee_ID,
        designation,
        basic_salary,
        salary_package_name: null,
        ot_payment_per_hour: null,
        tax: null,
        bonus: null,
        total_salary: null,
        expenses_type: null,
        expense_amount: null,
        sales_type: null,
        sales_amount: null
    });

    newEmployeeDetails.save()
        .then(() => res.json({ message: 'Employee details added successfully!' }))
        .catch(err => res.status(500).json({ error: 'Failed to add employee details', details: err }));
});
// Fetch All Employee Details
// Fetch All Employee Details with employee_ID, designation, and basic_salary not null
router.get("/getEmployeeDetails", (req, res) => {
    employeeSalary.find(
        { 
            employee_ID: { $ne: null, $exists: true, $ne: "" }, 
            designation: { $ne: null, $exists: true, $ne: "" },
            basic_salary: { $ne: null, $exists: true } 
        }, 
        'employee_ID designation basic_salary date' // Include 'date' in the fields you are selecting
    )
    .then(details => res.json(details))
    .catch(err => res.status(500).json({ error: 'Error fetching employee details', details: err }));
});


// Fetch Single Employee Detail
router.get("/getEmployee/:id", (req, res) => {
    employeeSalary.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json({ error: 'Error fetching employee data', details: err }));
});

// Update Employee Details
router.put("/updateEmployee/:id", (req, res) => {
    employeeSalary.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(employee => res.json({ message: 'Employee updated successfully', employee }))
        .catch(err => res.status(500).json({ error: 'Error updating employee data', details: err }));
});

// Delete Employee Details
router.delete("/deleteEmployee/:id", (req, res) => {
    employeeSalary.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Employee deleted successfully' }))
        .catch(err => res.status(500).json({ error: 'Error deleting employee data', details: err }));
});

// Add Salary Package Details
router.post("/addSalaryPackage", (req, res) => {
    const { salary_package_name, ot_payment_per_hour, tax, bonus } = req.body;

    const newSalaryPackage = new employeeSalary({
        salary_package_name,
        ot_payment_per_hour,
        tax,
        bonus
    });

    newSalaryPackage.save()
        .then(() => res.json({ message: 'Salary package added successfully!' }))
        .catch(err => res.status(500).json({ error: 'Failed to add salary package', details: err }));
});

// Get all salary packages
router.get("/getAllSalaryPackages", (req, res) => {
    employeeSalary.find(
        {
            salary_package_name: { $ne: null, $exists: true, $ne: "" },
            ot_payment_per_hour: { $ne: null, $exists: true },
            tax: { $ne: null, $exists: true },
            bonus: { $ne: null, $exists: true },
            date: { $ne: null, $exists: true } // Assuming 'date' is the field containing the date
        },
        'salary_package_name ot_payment_per_hour tax bonus date' // Include 'date' in the projection
    )
    .then(packages => res.json(packages))
    .catch(err => res.status(500).json({ error: 'Error fetching salary packages', details: err }));
});

// Delete a salary package
router.delete("/deleteSalaryPackage/:id", (req, res) => {
    employeeSalary.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Salary package deleted successfully' }))
        .catch(err => res.status(500).json({ error: 'Failed to delete salary package', details: err }));
});

// Update a salary package
router.put("/updateSalaryPackage/:id", (req, res) => {
    const { salary_package_name, ot_payment_per_hour, tax, bonus } = req.body;
    employeeSalary.findByIdAndUpdate(req.params.id, { salary_package_name, ot_payment_per_hour, tax, bonus }, { new: true })
        .then(updatedPackage => res.json(updatedPackage))
        .catch(err => res.status(500).json({ error: 'Failed to update salary package', details: err }));
});

// Get a single salary package by ID
router.get("/getSalaryPackage/:id", (req, res) => {
    employeeSalary.findById(req.params.id)
        .then(package => {
            if (!package) {
                return res.status(404).json({ error: 'Salary package not found' });
            }
            res.json(package);
        })
        .catch(err => res.status(500).json({ error: 'Error fetching salary package', details: err }));
});

// Post a new expense
router.post("/addExpense", (req, res) => {
    const { expenses_type, expense_amount } = req.body;
    const newExpense = new employeeSalary({
        expenses_type: expenses_type,
        expense_amount: expense_amount
    });

    newExpense.save()
        .then(() => res.json({ message: 'Expense added successfully!' }))
        .catch(err => res.status(400).json({ error: 'Failed to add expense', details: err }));
});

router.get("/getExpenses", (req, res) => {
    employeeSalary.find(
        { 
            expenses_type: { $ne: null }, 
            expense_amount: { $ne: null }, 
            date: { $ne: null } // Assuming date field exists and is not null
        },
        'expenses_type expense_amount date' // selecting expenses fields and date
    )
    .then(expenses => res.json(expenses))
    .catch(err => res.status(500).json({ error: 'Failed to fetch expenses', details: err }));
});

// Delete an expense
router.delete("/deleteExpense/:id", (req, res) => {
    employeeSalary.findByIdAndRemove(req.params.id)
        .then(() => res.json({ message: 'Expense deleted successfully!' }))
        .catch(err => res.status(500).json({ error: 'Failed to delete expense', details: err }));
});

// Update an expense
router.put("/updateExpense/:id", (req, res) => {
    const { expenses_type, expense_amount } = req.body;
    employeeSalary.findByIdAndUpdate(req.params.id, { expenses_type, expense_amount }, { new: true })
        .then(expense => res.json(expense))
        .catch(err => res.status(500).json({ error: 'Failed to update expense', details: err }));
});

// Assuming EmployeeSalary is your model containing expense data
router.get("/getExpense/:id", (req, res) => {
    employeeSalary.findById(req.params.id)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            res.json(expense);
        })
        .catch(err => res.status(500).json({ error: 'Error fetching expense details', details: err }));
});

// Update an expense
router.put("/updateExpense/:id", (req, res) => {
    const { expenses_type, expense_amount } = req.body;
    employeeSalary.findByIdAndUpdate(req.params.id, { expenses_type, expense_amount }, { new: true })
        .then(expense => res.json({ message: 'Expense updated successfully', expense }))
        .catch(err => res.status(500).json({ error: 'Failed to update expense', details: err }));
});

// Add a new sale
router.post("/addSale", (req, res) => {
    const { sales_type, sales_amount } = req.body;
    const newSale = new employeeSalary({
        sales_type,
        sales_amount
    });

    newSale.save()
        .then(() => res.json({ message: 'Sale added successfully!' }))
        .catch(err => res.status(400).json({ error: 'Failed to add sale', details: err }));
});

router.get("/getSales", (req, res) => {
    employeeSalary.find(
        { 
            sales_type: { $ne: null }, 
            sales_amount: { $ne: null } 
        },
        'sales_type sales_amount date' // Added 'date' to the projection
    )
    .then(sales => res.json(sales))
    .catch(err => res.status(500).json({ error: 'Failed to fetch sales', details: err }));
});

// Delete a sale
router.delete("/deleteSale/:id", (req, res) => {
    employeeSalary.findByIdAndDelete(req.params.id)
        .then(deletedSale => {
            if (!deletedSale) {
                return res.status(404).json({ message: 'Sale not found' });
            }
            res.json({ message: 'Sale deleted successfully!' });
        })
        .catch(err => res.status(500).json({ error: 'Failed to delete sale', details: err }));
});


// GET request to fetch a sale by ID
router.get("/getSale/:id", (req, res) => {
    employeeSalary.findById(req.params.id)
        .then(sale => {
            if (!sale) {
                return res.status(404).json({ error: 'Sale not found' });
            }
            res.json(sale);
        })
        .catch(err => res.status(500).json({ error: 'Error fetching sale details', details: err }));
});

// PUT request to update a sale
router.put("/updateSale/:id", (req, res) => {
    const { sales_type, sales_amount } = req.body;
    employeeSalary.findByIdAndUpdate(req.params.id, { sales_type, sales_amount }, { new: true })
        .then(sale => res.json({ message: 'Sale updated successfully', sale }))
        .catch(err => res.status(500).json({ error: 'Failed to update sale', details: err }));
});

const { startOfMonth, subMonths } = require('date-fns');

// GET request to fetch total sales amount for each month in previous months
router.get("/getTotalSalesInPreviousMonths", (req, res) => {
    // Calculate the start date of the current month
    const currentDate = new Date();
    const startOfCurrentMonth = startOfMonth(currentDate);

    // Calculate the start date of the first month to include in the aggregation
    const startOfPreviousMonth = subMonths(startOfCurrentMonth, 1);

    employeeSalary.aggregate([
        {
            $match: { 
                sales_amount: { $ne: null }, 
                date: { $ne: null, $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } // Filter documents from previous months
            }
        },
        {
            $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" } }, // Group by year and month
                totalSales: { $sum: "$sales_amount" } // Calculate total sales for each month
            }
        },
        {
            $project: {
                year: "$_id.year", // Include year in the output
                month: "$_id.month", // Include month in the output
                totalSales: 1, // Include totalSales in the output
                _id: 0 // Exclude _id field from the output
            }
        },
        {
            $sort: { year: 1, month: 1 } // Sort by year and month in ascending order
        }
    ])
    .then(totalSalesInPreviousMonths => res.json(totalSalesInPreviousMonths))
    .catch(err => res.status(500).json({ error: 'Failed to fetch total sales in previous months', details: err }));
});


router.get("/getTotalExpensesInPreviousMonths", (req, res) => {
    // Calculate the start date of the current month
    const currentDate = new Date();
    const startOfCurrentMonth = startOfMonth(currentDate);

    // Calculate the start date of the first month to include in the aggregation
    const startOfPreviousMonth = subMonths(startOfCurrentMonth, 1);

    employeeSalary.aggregate([
        {
            $match: { 
                expense_amount: { $ne: null }, // Filter documents with non-null expense_amount
                date: { $ne: null, $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } // Filter documents from previous months
            }
        },
        {
            $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" } }, // Group by year and month
                totalExpenses: { $sum: "$expense_amount" } // Calculate total expenses for each month
            }
        },
        {
            $project: {
                year: "$_id.year", // Include year in the output
                month: "$_id.month", // Include month in the output
                totalExpenses: 1, // Include totalExpenses in the output
                _id: 0 // Exclude _id field from the output
            }
        },
        {
            $sort: { year: 1, month: 1 } // Sort by year and month in ascending order
        }
    ])
    .then(totalExpensesInPreviousMonths => res.json(totalExpensesInPreviousMonths))
    .catch(err => res.status(500).json({ error: 'Failed to fetch total expenses in previous months', details: err }));
});

router.get("/getTotalProfitInPreviousMonths", (req, res) => {
    // Calculate the start date of the current month
    const currentDate = new Date();
    const startOfCurrentMonth = startOfMonth(currentDate);

    // Calculate the start date of the first month to include in the aggregation
    const startOfPreviousMonth = subMonths(startOfCurrentMonth, 1);

    // Fetch total sales in previous months
    const salesPromise = employeeSalary.aggregate([
        {
            $match: { 
                sales_amount: { $ne: null }, 
                date: { $ne: null, $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } // Filter documents from previous months
            }
        },
        {
            $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" } }, // Group by year and month
                totalSales: { $sum: "$sales_amount" } // Calculate total sales for each month
            }
        },
        {
            $project: {
                year: "$_id.year", // Include year in the output
                month: "$_id.month", // Include month in the output
                totalSales: 1, // Include totalSales in the output
                _id: 0 // Exclude _id field from the output
            }
        }
    ]);

    // Fetch total expenses in previous months
    const expensesPromise = employeeSalary.aggregate([
        {
            $match: { 
                expense_amount: { $ne: null }, // Filter documents with non-null expense_amount
                date: { $ne: null, $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } // Filter documents from previous months
            }
        },
        {
            $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" } }, // Group by year and month
                totalExpenses: { $sum: "$expense_amount" } // Calculate total expenses for each month
            }
        },
        {
            $project: {
                year: "$_id.year", // Include year in the output
                month: "$_id.month", // Include month in the output
                totalExpenses: 1, // Include totalExpenses in the output
                _id: 0 // Exclude _id field from the output
            }
        }
    ]);

    // Wait for both promises to resolve
    Promise.all([salesPromise, expensesPromise])
        .then(([salesData, expensesData]) => {
            // Combine sales and expenses data
            const profitData = salesData.map(salesItem => {
                const expensesItem = expensesData.find(expensesItem => expensesItem.month === salesItem.month && expensesItem.year === salesItem.year);
                const profit = salesItem.totalSales - (expensesItem ? expensesItem.totalExpenses : 0);
                return {
                    year: salesItem.year,
                    month: salesItem.month,
                    profit
                };
            });
            res.json(profitData);
        })
        .catch(err => res.status(500).json({ error: 'Failed to fetch total profit in previous months', details: err }));
});


// Update Employee Salary Package Name
router.put("/updateEmployeeSalaryPackage/:id", async (req, res) => {
    const { salary_package_name } = req.body;
    const employeeId = req.params.id;
    try {
        const updatedEmployee = await employeeSalary.findByIdAndUpdate(employeeId, { salary_package_name }, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        console.error('Failed to update employee salary package name:', err);
        res.status(500).json({ error: 'Failed to update employee salary package name', details: err });
    }
});


// Route to fetch all employee details with specified fields
router.get('/getEmployeeDetailsSalaryPackage', async (req, res) => {
    try {
        const employeeDetails = await employeeSalary.find({}, 'employee_ID designation basic_salary salary_package_name');
        res.json(employeeDetails);
    } catch (error) {
        console.error('Error fetching employee details:', error);
        res.status(500).json({ error: 'Failed to fetch employee details' });
    }
});
router.get('/employee-details', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/employee-details/:employeeId/add-salary-package/:packageName', async (req, res) => {
    try {
        const { employeeId, packageName } = req.params;

        const employee = await Employee.findById(employeeId);
        employee.salary_package_name = packageName;
        await employee.save();

        res.status(200).send('Salary package added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get('/employeeDetails', async (req, res) => {
    try {
        const employees = await EmployeeSalary.find();
        const updatedEmployees = employees.map(employee => {
            const taxAmount = (employee.basic_salary * employee.tax) / 100;
            const bonusAmount = (employee.basic_salary * employee.bonus) / 100;
            const totalSalary = employee.basic_salary - taxAmount + bonusAmount;
            return { ...employee.toObject(), total_salary: totalSalary };
        });
        res.json(updatedEmployees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Backend code
router.get("/getEmployeeDetails", (req, res) => {
    employeeSalary.find(
        { 
            employee_ID: { $ne: null, $exists: true, $ne: "" }, 
            designation: { $ne: null, $exists: true, $ne: "" },
            basic_salary: { $ne: null, $exists: true } 
        }, 
        'employee_ID designation basic_salary salary_package_name' // Include 'salary_package_name' in the fields you are selecting
    )
    .then(details => res.json(details))
    .catch(err => res.status(500).json({ error: 'Error fetching employee details', details: err }));
});

module.exports = router;
