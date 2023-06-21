const mongoose = require('mongoose');


const CourseDataSchema = new mongoose.Schema({

    studentId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'StudentData'},
    courseName:{
        type:String,
        required:true
    },
    scores: {
        aptitude: [
          { week: Number, score: Number },
        
        ],
        verbal: [
          { week: Number, score: Number },
    
        ],
        technical: [
          { week: Number, score: Number },
  
        ],
        
      },
        totalScore:Number,
        totalScorePercentage:Number,
        totalScoreGrade:String,
        totalScoreRank:Number,
        attendance:Number,
        attendancePercentage:Number,
        result:String,





});

const CourseData = mongoose.model('CourseData',CourseDataSchema);

module.exports = CourseData;