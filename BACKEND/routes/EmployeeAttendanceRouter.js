const router = require ("express").Router();
const EmployeeAttendance = require("../models/EmployeeAttendance");
const EmployeeLeave = require("../models/EmployeeLeave");
let Employee = require ("../models/EmployeeLeave");

router.route("/add").post((req,res)=>{

    const name =req.body.name;
    const nic =req.body.nic;
    const jobrole =req.body.jobrole;
    const dayType =req.body.dayType;
    const date =req.body.date;
    const attendance =req.body.attendance;
   
   

    const NewEmployeeAttendance = new EmployeeAttendance({

    name,
    nic,
    jobrole,
    dayType,
    date,
    attendance
    

    })

    NewEmployeeAttendance.save().then(()=>{
        res.json("New Employee attendance added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{

    EmployeeAttendance.find().then((EmployeeAttendanceRouter)=>{
        res.json(EmployeeAttendanceRouter)
    }).catch((err)=>{
        console.log(err);
    })


})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {name,nic,jobrole,dayType,date,attendance} = req.body;

    const updateEmployeeLeave = {
        name,
        nic,
        jobrole,
        dayType,
        date,
        attendance
    
    }

    const update = await EmployeeAttendance.findByIdAndUpdate(userId,updateEmployeeAttendance)
    .then(() => {
        res.status(200).send({status: "Attendance updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating attendance data" })
    })
    
})
router.route("/delete/:id").delete(async(req,res) =>{
    let userId =req.params.id;

    await EmployeeAttendance.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Delete attendance successfully"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete attendance ", error: err.message});

    })
})
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await EmployeeAttendance.findById(userId)
    .then((EmployeeAttendance) =>{
        res.status(200).send({status : "Attendance fetched",EmployeeAttendance})

    }).catch(()=>{
        console.log(err.message)
        res.status(500).send({status: "Error with fetch attendance ", error: err.message});
    })
})

module.exports = router;
