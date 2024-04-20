const express = require('express');
const router = express.Router();
const Sales = require('../models/sales'); // Importing the Sales model

// Route to add new sales
router.post("/add", (req, res) => {
    const { sales_id,
        sale_description,
        quantity,
        unit_price,
        buyer_name,
        factory_name,
        Email,
        tea_type,
        total,
        date,
        seller,
        invoice_No,
        sales_type
 } = req.body;

    const newSale = new Sales({
        sales_type,
        date: new Date(date), // Assuming date is a string in ISO format
        sales_id,
        sale_description,
        quantity,
        unit_price,
        buyer_name,
        factory_name,
        Email,
        tea_type,
        total,
        seller,
        invoice_No
       

    });

    newSale.save()
      .then(() => {
          res.json('Sales details added');
      })
      .catch(err => {
          console.error(err);
          res.status(500).json('Error adding sales details');
      });
});

// Route to view all sales
router.get("/", (req, res) => {
    Sales.find()
        .then(sales => {
            res.json(sales);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error retrieving sales');
        });
});

// Route to view data for a specific sale by ID
router.get("/:saleId", (req, res) => {
    const saleId = req.params.saleId;

    Sales.findById(saleId)
        .then(sale => {
            if (!sale) {
                return res.status(404).json('Sale not found');
            }
            res.json(sale);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error retrieving sale');
        });
});

// Route to delete data for a specific sale by ID
router.delete("/:saleId", (req, res) => {
    const saleId = req.params.saleId;

    Sales.findByIdAndDelete(saleId)
        .then(deletedSale => {
            if (!deletedSale) {
                return res.status(404).json('Sale not found');
            }
            res.json('Sale deleted successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error deleting sale');
        });
});

// Route to update data for a specific sale by ID
router.put("/:saleId", (req, res) => {
    const saleId = req.params.saleId;
    const updatedSaleData = req.body; // New data to update

    Sales.findByIdAndUpdate(saleId, updatedSaleData, { new: true })
        .then(updatedSale => {
            if (!updatedSale) {
                return res.status(404).json('Sale not found');
            }
            res.json('Sale updated successfully');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error updating sale');
        });
});

// Route to fetch monthly sales report
router.get('/monthly-sales-report', async (req, res) => {
    try {
        const { year, month } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const monthlySales = await Sales.find({ date: { $gte: startDate, $lte: endDate } });

        let totalSalesAmount = 0;
        let totalQuantitiesSold = 0;
        monthlySales.forEach(sale => {
            totalSalesAmount += sale.total;
            totalQuantitiesSold += sale.quantity;
        });

        const monthlyReport = {
            numberOfSales: monthlySales.length,
            totalSalesAmount: totalSalesAmount,
            totalQuantitiesSold: totalQuantitiesSold
        };

        res.json({ success: true, report: monthlyReport });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Route to fetch yearly sales report
router.get('/yearly-sales-report', async (req, res) => {
    try {
        const { year } = req.query;
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        const yearlySales = await Sales.find({ date: { $gte: startDate, $lte: endDate } });

        let totalSalesAmount = 0;
        let totalQuantitiesSold = 0;
        yearlySales.forEach(sale => {
            totalSalesAmount += sale.total;
            totalQuantitiesSold += sale.quantity;
        });

        const yearlyReport = {
            numberOfSales: yearlySales.length,
            totalSalesAmount: totalSalesAmount,
            totalQuantitiesSold: totalQuantitiesSold
        };

        res.json({ success: true, report: yearlyReport });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Route to search sales by description
router.get("/search", async (req, res) => {
    try {
        const { description } = req.query; // Extract the description from query parameters if provided

        // Define the filter object based on whether description is provided or not
        const filter = description ? { sale_description: { $regex: new RegExp(description, "i") } } : {};

        const sales = await Sales.find(filter);
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving sales" });
    }
});




module.exports = router;
