const express = require('express');

const StudentDataRoute= express.Router();
const upload = require('../controllers/uploadDataPath.js');
const multer = require('multer');
const {getCourseData,PostCourseData,StudentDataPost,getStudentData} = require('../controllers/StudentData.js');

StudentDataRoute.route('/Student').post(StudentDataPost).get(getStudentData);
StudentDataRoute.route('/data').post(PostCourseData).get(getCourseData);



module.exports = StudentDataRoute;