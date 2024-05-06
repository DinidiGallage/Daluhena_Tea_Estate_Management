const express = require('express');
const router = express.Router();
const employeeSalary = require("../models/employeeSalary");
const { startOfMonth, subMonths } = require('date-fns');

// Add Salary Package Details
router.post("/addSalaryPackage", (req, res) => {
    const { salary_package_name, ot_payment_per_hour, tax, bonus, designation, basic_salary,no_of_hours_worked } = req.body;

    const newSalaryPackage = new employeeSalary({
        salary_package_name,
        ot_payment_per_hour,
        no_of_hours_worked,
        tax,
        bonus,
        designation,
        basic_salary
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
            date: { $ne: null, $exists: true },// Assuming 'date' is the field containing the date
            designation: { $ne: null, $exists: true },
            basic_salary: { $ne: null, $exists: true },
            no_of_hours_worked: { $ne: null, $exists: true }

        },
        'salary_package_name ot_payment_per_hour tax bonus date designation basic_salary  no_of_hours_worked' // Include 'date' in the projection
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
    const { salary_package_name, ot_payment_per_hour, tax, bonus, designation, basic_salary } = req.body;
    employeeSalary.findByIdAndUpdate(req.params.id, { salary_package_name, ot_payment_per_hour, tax, bonus, designation, basic_salary, no_of_hours_worked }, { new: true })
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

// Get expenses
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

// Get expense by ID
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

// Get sales
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

// Get sale by ID
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

// Update a sale
router.put("/updateSale/:id", (req, res) => {
    const { sales_type, sales_amount } = req.body;
    employeeSalary.findByIdAndUpdate(req.params.id, { sales_type, sales_amount }, { new: true })
        .then(sale => res.json({ message: 'Sale updated successfully', sale }))
        .catch(err => res.status(500).json({ error: 'Failed to update sale', details: err }));
});

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

// Endpoint to get total sales
router.get('/getTotalSales', (req, res) => {
    res.json(totalSalesData);
});

// Endpoint to get total expenses
router.get('/getTotalExpenses', (req, res) => {
    res.json(totalExpensesData);
});

module.exports = router;
