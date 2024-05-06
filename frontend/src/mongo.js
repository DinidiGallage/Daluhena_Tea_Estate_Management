const mongoose=require("mongoose")
mongoose.connect("Mongodb://localhost:8070/react-login-tut")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

const newSchema= new mongoose