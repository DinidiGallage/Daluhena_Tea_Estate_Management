const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salarypackageSchema = new Schema({

package_id: {type:String,},
package_name: {type:String,},
Basic_salary: {type:String,},
OT : {type:String,},
Bonus : {type:Date,},
last_updated_at: {type:Date,}
})

const salarypackage = mongoose.model("salarypackage",salarypackageSchema);
module.exports=salarypackage;

