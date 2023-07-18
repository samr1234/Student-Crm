const express = require('express');
const xlsx = require('xlsx');
const CourseData = require('../Model/CourseData.js');
const StudentData = require('../Model/StudentData.js');
const path = require('path');
const multer = require('multer');
const fs= require('fs');
const { json } = require('body-parser');
const moment = require('moment');


// const PostCourseData = async (req, res) => {
//   try {
//     const file = req.file;
  
//     const workbook = xlsx.readFile(file.path);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     // Generate JSON file
//     const jsonFilename = file.originalname.replace('.xlsx', '.json');
//     const jsonFilePath = path.join(__dirname, 'uploads', jsonFilename);
//     fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

//     let emails = [];
//     const courseDataPromises = [];

//     for (let i = 0; i < jsonData.length; i++) {
//       const email = jsonData[i].email;
//       emails.push(email);

//       let data = await StudentData.findOne({ email: email });

//       if (data) {
//         const courseData = CourseData.create({
//           studentId: data._id,
//           SrNo: jsonData[i].SrNo,
//           email: jsonData[i].email,
//           Apptitude: jsonData[i].Apptitude,
//           ApptitudeMax: jsonData[i].ApptitudeMax,
//           Aptitude_Prec: jsonData[i].Aptitude_Prec,
//           English: jsonData[i].English,
//           EnglishMax: jsonData[i].EnglishMax,
//           English_Prec: jsonData[i].English_Prec,
//           Technical: jsonData[i].Technical,
//           TechniclMax: jsonData[i].TechniclMax,
//           Technical_Prec: jsonData[i].Technical_Prec,
//           Total_Marks_obt: jsonData[i].Total_Marks_obt,
//           Total_Marks: jsonData[i].Total_Marks,
//           Overall_Prec: jsonData[i].Overall_Prec,
//           Average: jsonData[i].Average,
//           Date: jsonData[i].Date,
//           ClassesAttended: jsonData[i].ClassesAttended,
//           TotalAttendance: jsonData[i].TotalAttendance,
//           Correct: jsonData[i].Correct,
//           Incorrect: jsonData[i].Incorrect,
//           Skipped: jsonData[i].Skipped,
//           TotalTimeTaken: jsonData[i].TotalTimeTaken,
//           TimeDuration: jsonData[i].TimeDuration,
//           TotalQuestion: jsonData[i].TotalQuestion,
//           TopStudent: jsonData[i].TopStudent,
//           Rank: jsonData[i].Rank,
//           TestShare: jsonData[i].TestShare,
//         });

//         courseDataPromises.push(courseData);
//       }
//     }

//     const savedCourseData = await Promise.all(courseDataPromises);

//     res.json({ message: 'Conversion successful', data: savedCourseData });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'An error occurred while processing the data' });
//   }
// };

const PostCourseData = async (req, res) => {
  try {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Generate JSON file
    const jsonFilename = file.originalname.replace('.xlsx', '.json');
    const jsonFilePath = path.join(__dirname, 'uploads', jsonFilename);
    fs.writeFileSync(jsonFilePath,JSON.stringify(jsonData, null, 2));

    const courseDataPromises = [];

    for (let i = 0; i < jsonData.length; i++) {
      const email = jsonData[i].email;

      // Find student data
      const studentData = await StudentData.findOne({ email: email });
      if (!studentData) {
        continue; // Skip if student data not found
      }

      const date = jsonData[i].Date;
      const finalDate = new Date(date).toISOString();
      const existingData = await CourseData.findOne({ studentId: studentData._id, Date:finalDate});
      console.log("existing data",existingData);

      if (!existingData) {
        // Create new course data if no existing data found
        const courseData = CourseData.create({
          studentId: studentData._id,
          SrNo: jsonData[i].SrNo,
          email: jsonData[i].email,
          Apptitude: jsonData[i].Apptitude,
          ApptitudeMax: jsonData[i].ApptitudeMax,
          Aptitude_Prec: jsonData[i].Aptitude_Prec,
          English: jsonData[i].English,
          EnglishMax: jsonData[i].EnglishMax,
          English_Prec: jsonData[i].English_Prec,
          Technical: jsonData[i].Technical,
          TechniclMax: jsonData[i].TechniclMax,
          Technical_Prec: jsonData[i].Technical_Prec,
          Total_Marks_obt: jsonData[i].Total_Marks_obt,
          Total_Marks: jsonData[i].Total_Marks,
          Overall_Prec: jsonData[i].Overall_Prec,
          Average: jsonData[i].Average,
          Date: jsonData[i].Date,
          ClassesAttended: jsonData[i].ClassesAttended,
          TotalAttendance: jsonData[i].TotalAttendance,
          Correct: jsonData[i].Correct,
          Incorrect: jsonData[i].Incorrect,
          Skipped: jsonData[i].Skipped,
          TotalTimeTaken: jsonData[i].TotalTimeTaken,
          TimeDuration: jsonData[i].TimeDuration,
          TotalQuestion: jsonData[i].TotalQuestion,
          TopStudent: jsonData[i].TopStudent,
          Rank: jsonData[i].Rank,
          TestShare: jsonData[i].TestShare,
        });

        courseDataPromises.push(courseData);
      }
    }

    const savedCourseData = await Promise.all(courseDataPromises);

    res.json({ message: 'Conversion successful', data: savedCourseData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while processing the data' });
  }
};



const getCourseData = (req,res)=>{

  const limit = parseInt(req.query._limit);;
  console.log(limit)
  CourseData.find().sort({ Rank : 1 }).limit(limit).then(data => {
    // console.log(data)
    

    res.send(data);
    
 
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Error getting data' });
  }
  );

}

const getSingleData = (req,res)=>{

  const email = 'maninderkaur06739@gmail.com'
  CourseData.find({email:email}).then(data => {
    console.log(data)
    

    res.send(data);
    
 
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Error getting data' });

}
  );
}

const postStudentData =(req,res)=>{

  const file = req.file;
  
  const workbook = xlsx.readFile(file.path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Generate JSON file
  const jsonFilename = file.originalname.replace('.xlsx', '.json');
  const jsonFilePath = path.join(__dirname, 'uploads', jsonFilename);
  fs.writeFileSync(jsonFilePath,JSON.stringify(jsonData, null, 2));

  // Save JSON data to MongoDB
  StudentData.insertMany(jsonData)
    .then(savedData => {
      console.log('Data saved to MongoDB');
      res.json({ message: 'Conversion successful', data: savedData});
    }
    )


}

const getStudentData = (req,res)=>{
  // let email ="prabhgold2000@gmail.com";
  StudentData.find().then(data => {
    // console.log(data)

    res.send(data);
  })
}

const getDateData = async(req,res)=>{

  try {
    const email = 'prabhgold2000@gmail.com'
    const  date  = req.query.date; // Get the date from query parameters
// console.log("date",date)
    // Perform the query to filter data based on the date
    const filteredData = await CourseData.find({ email:email,Date: date });

    res.json(filteredData); // Send the filtered data as a JSON response
  } catch (error) {
    console.error('Error retrieving filtered data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {PostCourseData,getCourseData,getSingleData,postStudentData,getStudentData,getDateData};