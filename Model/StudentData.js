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
    totalScore:Number,
    totalScorePercentage:Number,
    totalScoreGrade:String,
    totalScoreRank:Number,
    attendance:Number,
    attendancePercentage:Number,
    result:String,
    
}, { timestamps: true})

const StudentData= mongoose.model('StudentData',StudentDataSchema);

module.exports = StudentData;