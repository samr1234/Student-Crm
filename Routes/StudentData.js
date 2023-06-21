const express = require('express');

const StudentDataRoute= express.Router();
const upload = require('../controllers/uploadDataPath.js');

const {getStudentData,PostStudentData} = require('../controllers/StudentData.js');

StudentDataRoute.route('/').post(upload.single('excel'),PostStudentData)
StudentDataRoute.route('/data').get(getStudentData);

module.exports = StudentDataRoute;