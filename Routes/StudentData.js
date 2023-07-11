const express = require('express');

const StudentDataRoute= express.Router();
const upload = require('../controllers/uploadDataPath.js');

const {PostCourseData,getCourseData} = require('../controllers/StudentData.js');

StudentDataRoute.post('/upload',upload.single('file'),PostCourseData)
                .get('/getCourseData',getCourseData);



module.exports = StudentDataRoute;