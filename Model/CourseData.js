const mongoose = require('mongoose');


const CourseDataSchema = new mongoose.Schema({

    // studentId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'StudentData'},
    filename: String,
    jsonData: Object,
});

const CourseData = mongoose.model('CourseData',CourseDataSchema);

module.exports = CourseData;