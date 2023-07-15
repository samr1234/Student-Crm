const mongoose = require('mongoose');


const CourseDataSchema = new mongoose.Schema({

  studentId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'StudentData'},
  SrNo: Number,
  email: String,
  Apptitude: Number,
  ApptitudeMax: Number,
  Aptitude_Prec: Number,
  English: Number,
  EnglishMax: Number,
  English_Prec: Number,
  Technical: Number,
  TechniclMax: Number,
  Technical_Prec: Number,
  Total_Marks_obt: Number,
  Total_Marks: Number,
  Overall_Prec: Number,
  Average: Number,
  Date: Date,
  ClassesAttended: String,
  TotalAttendance: String,
  Correct: Number,
  Incorrect: Number,
  Skipped: Number,
  TotalTimeTaken: String,
  TimeDuration: String,
  TotalQuestion: Number,
  TopStudent: String,
  Rank: Number,
  TestShare: String,
});

const CourseData = mongoose.model('CourseData',CourseDataSchema);

module.exports = CourseData;