const mongoose = require('mongoose');


const CourseDataSchema = new mongoose.Schema({

    studentId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'StudentData'},
    courseName:{
        type:String,
        required:true
    },
    scores: {
        aptitude: [
          { week: Number, score: Number , isPresent: Boolean},
        
        ],
        verbal: [
          { week: Number, score: Number ,isPresent: Boolean},
    
        ],
        technical: [
          { week: Number, score: Number ,isPresent: Boolean},
  
        ],
        
      },
       





});

const CourseData = mongoose.model('CourseData',CourseDataSchema);

module.exports = CourseData;