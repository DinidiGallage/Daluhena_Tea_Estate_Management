const router = require("express").Router();
const Maintenance = require("../models/maintenance");
const PDFDocument = require('pdfkit');

router.route("/add").post((req, res) => {
    const item_id = Number(req.body.item_id);
    const details = req.body.details;
    const date_created = req.body.date_created;
    const tech_id = Number(req.body.tech_id);
    const start_date = req.body.start_date;
    const status = req.body.status;
    const end_date = req.body.end_date;
    const cost = Number(req.body.cost);

    const  newMItem = new Maintenance({
        item_id,
        details,
        date_created,
        tech_id,
        start_date,
        status,
        end_date,
        cost
    });
    
    newMItem.save()
      .then(()=>{
          res.json('Maintenance added')
      })
      .catch(err =>{
          console.log(err)
      })
})

router.route("/").get((req,res)=>{
    Maintenance.find().then((items) =>{
        res.json(items)
    }).catch((err) =>{
        res.send('Error getting items')
    })
});

router.route("/update/:id").put(async (req,res)=> {
    let maintenanceId = req.params.id;
    const{item_id , details , date_created ,tech_id ,start_date,status, end_date , cost} = req.body;

    const  updateFields = {
        item_id,
        details,
        date_created,
        tech_id,
        start_date,
        status,
        end_date,
        cost
    };

    const update = await Maintenance.findByIdAndUpdate(maintenanceId, updateFields).then(() =>{
        res.status(200).send({'message': 'Updated Successfully!'});
    }).catch((error) =>{
        res.status(500).send("Unable to Update");
    });
});

router.route("/delete/:id").delete(async (req,res)=>{
    let id= req.params.id;

    await  Maintenance.findByIdAndDelete(id)
    .then(()=>{
        res.send(`Item with the id ${id} has been deleted`)
    }).catch((err)=>{
        console.log(err);
        res.status(400).send("Delete Unsuccessful")
    })
})

router.route("/get/:id").get( async(req,res)=>{
    let id = req.params.id;
    const Maintenance = await  Maintences.findById(id).then(() => res.status(200).json(Maintences))
    .catch((err)=>console.log(err));
})



router.get('/generatePDF', (req, res) => {
    Maintenance.find()
    .then(items => {
        // Initialize a PDFDocument with A4 paper size
        const doc = new PDFDocument({
            size: 'A3',
            margin: 50  // Define margins to make the content look better
        });

        res.setHeader('Content-disposition', 'attachment; filename="maintenance_report.pdf"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        doc.fontSize(25).text('Maintenance Report', { underline: true });
        doc.moveDown(2);

        // Define the table headers
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text('Item ID', 50, 120)
           .text('Details', 120, 120)
           .text('Date Created', 270, 120)
           .text('Tech ID', 360, 120)
           .text('Start Date', 430, 120)
           .text('Status', 520, 120)
           .text('End Date', 600, 120)
           .text('Cost', 700, 120);

        let y = 140;
        doc.font('Helvetica');
        items.forEach(item => {
            doc.fontSize(10)
               .text(item.item_id.toString(), 50, y)
               .text(item.details, 120, y, { width: 120 })
               .text(item.date_created.toISOString().split('T')[0], 270, y)
               .text(item.tech_id.toString(), 360, y)
               .text(item.start_date ? item.start_date.toISOString().split('T')[0] : 'N/A', 430, y)
               .text(item.status, 520, y)
               .text(item.end_date ? item.end_date.toISOString().split('T')[0] : 'N/A', 600, y)
               .text(item.cost ? `$${item.cost.toFixed(2)}` : 'N/A', 700, y);
            y += 20;
            if (y > 750) {  // Check to ensure content does not overflow the page
                doc.addPage();
                y = 50;  // Reset y to the top of the new page
            }
        });

        doc.end();
    })
    .catch(err => {
        res.status(500).send('Error processing request');
    });
});


module.exports = router;