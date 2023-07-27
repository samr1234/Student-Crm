const express = require('express');

const StudentDataRoute= express.Router();
const upload = require('../controllers/uploadDataPath.js');

const {PostCourseData,getCourseData,getSingleData,postStudentData,getStudentData,getDateData,Login,Profile} = require('../controllers/StudentData.js');

StudentDataRoute.post('/upload',upload.single('file'),PostCourseData)
                .get('/getSingleData',getSingleData);

StudentDataRoute.get('/getCourseData',getCourseData)
StudentDataRoute.post('/postStudentData',upload.single('file'),postStudentData)
                .get('/getStudentData',getStudentData)

StudentDataRoute.post('/login',Login)
StudentDataRoute.get('/profile',Profile)
StudentDataRoute.get('/getDateData',getDateData);            




module.exports = StudentDataRoute;