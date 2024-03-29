const router = require ("express").Router();
let Employee = require ("../models/Employee");

router.route("/add").post((req,res)=>{

    const name =req.body.name;
    const nic =req.body.nic;
    const email =req.body.email;
    const contactNumber =req.body.contactNumber;
    const gender =req.body.gender;
    const age =req.body.age;
    const address =req.body.address;
    const jobrole =req.body.jobrole;
    const qualifications =req.body.qualifications;

    const NewEmployee = new Employee({

    name,
    nic,
    email,
    contactNumber,
    gender,
    age,
    address,
    jobrole,
    qualifications

    })

    NewEmployee.save().then(()=>{
        res.json("New Employee added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err);
    })


})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {name,nic,email,contactNumber,gender,age,address,jobrole,qualifications} = req.body;

    const updateEmployee = {
        name,
        nic,
        email,
        contactNumber,
        gender,
        age,
        address,
        jobrole,
        qualifications

    }

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee)
    .then(() => {
        res.status(200).send({status: "User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data" })
    })
    
})
router.route("/delete/:id").delete(async(req,res) =>{
    let userId =req.params.id;

    await Employee.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User deleted successfully"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user ", error: err.message});

    })
})
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await Employee.findById(userId)
    .then((Employee) =>{
        res.status(200).send({status : "User fetched",Employee})

    }).catch(()=>{
        console.log(err.message)
        res.status(500).send({status: "Error with fetch user ", error: err.message});
    })
})

module.exports = router;
