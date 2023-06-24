const mongoose = require('mongoose');


const CourseDataSchema = new mongoose.Schema({

    studentId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'StudentData'},
    courseName:{
        type:String,
        required:true
    },
    date:{
        type:Date,  
        required:true
    },
    week:{
        type:Number,
    },
    isPresent:Boolean,
    scores: {
        aptitude: 
          { maxScore:Number, minScore:Number ,score: Number},
        
        
        verbal: 
          { maxScore:Number, minScore:Number, score: Number},
    
        
        technical:
          { maxScore:Number, minScore:Number , score: Number },
  
        
        
      },
       





});

const CourseData = mongoose.model('CourseData',CourseDataSchema);

module.exports = CourseData;