const mongoose = require('mongoose');

const StudentDataSchema =new mongoose.Schema({
    studentId:{
        type:String,
        // required:true,
        // unique:true
    },
    name:String,
    mobileNumber:String,
    email:String,
    loi:String,
    batch:String,
    attendance:String,
    result:String,
    
})

const StudentData= mongoose.model('StudentData',StudentDataSchema);

module.exports = StudentData;