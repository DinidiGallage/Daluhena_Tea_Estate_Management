const router = require ("express").Router();
const EmployeeLeave = require("../models/EmployeeLeave");
let Employee = require ("../models/EmployeeLeave");

router.route("/add").post((req,res)=>{

    const name =req.body.name;
    const nic =req.body.nic;
    const jobrole =req.body.jobrole;
    const leaveType =req.body.leaveType;
    const leaveFrom =req.body.leaveFrom;
    const leaveTo =req.body.leaveTo;
    const leaveStatus =req.body.leaveStatus;
   

    const NewEmployeeLeave = new EmployeeLeave({

    name,
    nic,
    jobrole,
    leaveType,
    leaveFrom,
    leaveTo,
    leaveStatus
    

    })

    NewEmployeeLeave.save().then(()=>{
        res.json("New Employee Leave added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{

    EmployeeLeave.find().then((EmployeeLeaveRouter)=>{
        res.json(EmployeeLeaveRouter)
    }).catch((err)=>{
        console.log(err);
    })


})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {name,nic,jobrole,leaveType,leaveFrom,leaveTo,leaveStatus} = req.body;

    const updateEmployeeLeave = {
        name,
        nic,
        jobrole,
        leaveType,
        leaveFrom,
        leaveTo,
        leaveStatus

    }

    const update = await EmployeeLeave.findByIdAndUpdate(userId,updateEmployeeLeave)
    .then(() => {
        res.status(200).send({status: "Leave updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating Leave data" })
    })
    
})
router.route("/delete/:id").delete(async(req,res) =>{
    let userId =req.params.id;

    await EmployeeLeave.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Reject leave successfully"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete leave ", error: err.message});

    })
})
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await EmployeeLeave.findById(userId)
    .then((EmployeeLeave) =>{
        res.status(200).send({status : "Leave fetched",EmployeeLeave})

    }).catch(()=>{
        console.log(err.message)
        res.status(500).send({status: "Error with fetch Leave ", error: err.message});
    })
})

module.exports = router;
