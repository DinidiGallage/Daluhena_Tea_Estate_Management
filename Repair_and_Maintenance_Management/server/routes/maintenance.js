const router = require("express").Router();
const Maintenance = require("../models/maintenance")

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

module.exports = router;