const mongoose = require('mongoose');

const StudentDataSchema =new mongoose.Schema({
  
    CRMID: String,
    name:String,
    contact: Number,
    email:String,
    batch:String,
    course:String,
    
    
    
    
}, { timestamps: true})

const StudentData= mongoose.model('StudentData',StudentDataSchema);

module.exports = StudentData;