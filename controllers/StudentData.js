const express = require('express');
const xlsx = require('xlsx');
const JsonData = require('../Model/CourseData.js');
const path = require('path');
const multer = require('multer');


const PostCourseData = (req,res)=>{

  const file = req.file;
  const workbook = xlsx.readFile(file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Save JSON data to MongoDB
  const data = new JsonData({
    filename: file.originalname, 
    jsonData: jsonData,
  });
  data.save()
    .then(savedData => {
      res.json({ message: 'Conversion successful', jsonData: savedData });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error saving data' });
    });
}

const getCourseData = (req,res)=>{

  JsonData.find().then(data => {
    // console.log(data)
    res.json(data.map(d => d.jsonData));
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Error getting data' });
  }
  );


}

module.exports = {PostCourseData,getCourseData};