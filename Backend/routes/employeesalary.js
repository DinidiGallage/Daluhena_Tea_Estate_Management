const router = require("express").Router();
const employeesalary = require("../models/employeesalary")

router.route("/add").post((req,res)=>{

  const  salary_id = String(req.body.salary_id);
  const  employee_id = String(req.body.employee_id);
  const  package_id = String(req.body.package_id);
  const  salary_amount= String(req.body.salary_amount);
  const  calculation_date= Date(req.body.calculation_date);

  const newemployeesalary = new employeesalary({
    salary_id,
    employee_id,
    package_id,
    salary_amount,
    calculation_date,
  });

  newemployeesalary.save()
  .then(()=>{
        res.json('employee salary details added')
  })
  .catch(err=>{
        console.log(err)
  })

})

router.route("/").get((req,res)=>{
    employeesalary.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        res.send('error getting items')
    })
});
module.exports = router;