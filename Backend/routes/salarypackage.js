const router = require("express").Router();
const salarypackage = require("../models/salarypackage");


router.route("/add").post((req,res)=>{

  const  package_id = String(req.body.package_id);
  const  package_name = String(req.body.package_name);
  const  parameters = String(req.body.parameters);
  const  created_by= String(req.body.created_by);
  const  created_at= Date(req.body.created_at);
  const last_updated_at= Date(req.body.last_updated_at);



  const salarypackage = new salarypackage({
    salary_id,
    employee_id,
    package_id,
    salary_amount,
    calculation_date,
  });

  newsalarypackage.save()
  .then(()=>{
        res.json('employee salary details added')
  })
  .catch(err=>{
        console.log(err)
  })

})

router.route("/").get((req,res)=>{
    salarypackage.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        res.send('error getting items')
    })
});
module.exports = router;