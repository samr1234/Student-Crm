const express = require('express');
const xlsx = require('xlsx');
const jwt =require('jsonwebtoken')
const CourseData = require('../Model/CourseData.js');
const StudentData = require('../Model/StudentData.js');
const path = require('path');
const multer = require('multer');
const fs= require('fs');
const { json } = require('body-parser');
const moment = require('moment');
const secretKey=process.env.SECRET_KEY;


const Login =(req,res,next)=>{


  const {email,CRMID} = req.body;
  console.log("email",email,CRMID)

  if(!email ){

      return res.status(400).json({msg:"Please enter email"})
  }
  if(!CRMID){

      return res.status(400).json({msg:"Please enter passwords"})
  }
  if (!email.includes("@")){
      return res.status(400).json({msg:"Please enter a valid email"})
  }
  StudentData.findOne({email:email}).then(userFound=>{


      if(!userFound){
              
              return res.status(400).json({msg:"User not found"})
          }

          if(CRMID!=userFound.CRMID){

            return res.status(400).json({msg:"Invalid password"})

              
          }
          // compare password
          // let comparePassword= bcrypt.compareSync(password,userFound.password);
          // if(!comparePassword){
          //     return res.status(400).json({msg:"Invalid password"})
          // }
          // create token 
          jwt.sign(
              {email:userFound.email,
              id:userFound._id},secretKey,{},(err,token)=>{
              if(err){
                  return res.status(500).json({msg:"Server error"})
              }
              console.log(userFound)
              console.log("token:::",token)
               res.cookie("token",token).json(userFound)
       
          })
          
  }).catch(err=>{
    console.log(err)
      res.status(500).json({msg:"Server error"})
  }
  )

}

const Profile = (req,res,next)=>{
  const {token} = req.cookies;
  
  console.log(token)
  
  if(token){
      jwt.verify(token,secretKey,{}, async (err,user)=>{
          if(err){
              res.json({msg:"Unauthorized"})
          }
          console.log("user::::",user)
          const data=  await StudentData.findById(user.id)
          console.log("profile worked::::::::",data)
           res.json(data)


          
      })       
  }
      
}

// const PostCourseData = async (req, res) => {
//   try {
//     const file = req.file;
//     const workbook = xlsx.readFile(file.path);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     // Generate JSON file
//     const jsonFilename = file.originalname.replace('.xlsx', '.json');
//     const jsonFilePath = path.join(__dirname, 'uploads', jsonFilename);
//     fs.writeFileSync(jsonFilePath,JSON.stringify(jsonData, null, 2));

//     const courseDataPromises = [];

//     for (let i = 0; i < jsonData.length; i++) {
//       const email = jsonData[i].email;
//       console.log("email",email)

//       // Find student data
//       const studentData = await StudentData.findOne({ email: email });
//       console.log("student data",studentData)
//       if (!studentData) {
//         continue; // Skip if student data not found
//       }

//       const date = jsonData[i].Date;
//       const finalDate = new Date(date).toISOString();
//       console.log(date, finalDate)
//       const existingData = await CourseData.findOne({ studentId: studentData._id, Date:finalDate});
//       console.log("existing data",existingData);

//       if (!existingData) {
//         // Create new course data if no existing data found
//         const courseData = CourseData.create({
         
//   studentId: studentData._id,
//   SrNo: jsonData[i].SrNo,
//   email: jsonData[i].email,
//   Apptitude: jsonData[i].Apptitude,
//   ApptitudeMax: jsonData[i].ApptitudeMax,
//   Aptitude_Prec: jsonData[i].Aptitude_Prec,
//   English: jsonData[i].English,
//   EnglishMax: jsonData[i].EnglishMax,
//   English_Prec: jsonData[i].English_Prec,
//   Technical: jsonData[i].Technical,
//   TechniclMax: jsonData[i].TechniclMax,
//   Technical_Prec: jsonData[i].Technical_Prec,
//   Total_Marks_obt: jsonData[i].Total_Marks_obt,
//   Total_Marks: jsonData[i].Total_Marks,
//   Overall_Prec: jsonData[i].Overall_Prec,
//   Average: jsonData[i].Average,
//   Date: jsonData[i].Date,
//   ClassesAttended: jsonData[i].ClassesAttended,
//   TotalAttendance: jsonData[i].TotalAttendance,
//   Correct: jsonData[i].Correct,
//   Incorrect: jsonData[i].Incorrect,
//   Skipped: jsonData[i].Skipped,
//   Apticorrect: jsonData[i].Apticorrect,
//   aptiincorrect: jsonData[i].aptiincorrect,
//   Skipped_1: jsonData[i].Skipped_1,
//   PDcorrect: jsonData[i].PDcorrect,
//   PDincorrect: jsonData[i].PDincorrect,
//   Skipped_2: jsonData[i].Skipped_2,
//   techcorrect: jsonData[i].techcorrect,
//   techncorrect: jsonData[i].techncorrect,
//   Skipped_3: jsonData[i].Skipped_3,
//   TotalTimeTaken: jsonData[i].TotalTimeTaken,
//   aptitime: jsonData[i].aptitime,
//   pdtime: jsonData[i].pdtime,
//   techtime: jsonData[i].techtime,
//   TimeDuration: jsonData[i].TimeDuration,
//   TotalQuestion: jsonData[i].TotalQuestion,
//   TopStudent: jsonData[i].TopStudent,
//   Rank: jsonData[i].Rank,
//   TestShare: jsonData[i].TestShare,
//   loistudends: jsonData[i].loistudends

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
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    // Step 1: Get unique email addresses from jsonData
    const uniqueEmails = [...new Set(jsonData.map(item => item.email))];

    console.log("unique::",uniqueEmails)
    // Step 2: Fetch studentId for unique emails in one query
    const studentData = await StudentData.find({ email: { $in: uniqueEmails } }, '_id email');

    // Step 3: Prepare a map of student email to studentId for easier lookup
    const studentEmailToIdMap = new Map(studentData.map(student => [student.email, student._id]));

    const courseDataPromises = [];

    for (let i = 0; i < jsonData.length; i++) {
      console.log("hello world")
      const email = jsonData[i].email;
      console.log(email)
      const studentId = studentEmailToIdMap.get(email);
      console.log(studentId)
      if (!studentId) {
        continue; // Skip if student data not found
      }

      const date = jsonData[i].Date;
      const finalDate = new Date(date).toISOString();
      console.log(date, finalDate)
      // Step 4: Check if course data already exists for the student and date combination
      const existingData = await CourseData.findOne({ studentId: studentId, Date: finalDate });

      if (!existingData) {
        // Create new course data if no existing data found
        const courseData = CourseData.create({
          studentId: studentId, // Corrected: Use studentId instead of studentData._id
       
          SrNo: jsonData[i].SrNo,
          email: jsonData[i].email,
          Apti: jsonData[i].Apti,
          AptiMax: jsonData[i].AptiMax,
          Apti_Prec: jsonData[i].Apti_Prec,
          English: jsonData[i].English,
          EnglishMax: jsonData[i].EnglishMax,
          English_Prec: jsonData[i].English_Prec,
          Tech: jsonData[i].Tech,
          TechMax: jsonData[i].TechMax,
          Tech_Prec: jsonData[i].Tech_Prec,
          Total_Marks_obt: jsonData[i].Total_Marks_obt,
          Total_Marks: jsonData[i].Total_Marks,
          Overall_Prec: jsonData[i].Overall_Prec,
          Average: jsonData[i].Average,
          Date: jsonData[i].Date,
          ClassesAttend: jsonData[i].ClassesAttend,
          TotalAttend: jsonData[i].TotalAttend,
          TotalCorrect: jsonData[i].TotalCorrect,
          Totalincorrect: jsonData[i].Totalincorrect,
          Totalskipped: jsonData[i].Totalskipped,
          Apticorrect: jsonData[i].Apticorrect,
          Aptiincorrect: jsonData[i].Aptiincorrect,
          AptiSkipped: jsonData[i].AptiSkipped,
          PDcorrect: jsonData[i].PDcorrect,
          PDincorrect: jsonData[i].PDincorrect,
          PdSkipped: jsonData[i].pdSkipped,
          techcorrect: jsonData[i].techcorrect,
          techincorrect: jsonData[i].techincorrect,
          TechSkipped: jsonData[i].TechSkipped,
          TotalTimeTaken: jsonData[i].TotalTimeTaken,
          Aptitime: jsonData[i].Aptitime,
          Pdtime: jsonData[i].Pdtime,
          Techtime: jsonData[i].Techtime,
          TimeDuration: jsonData[i].TimeDuration,
          TotalQuestions: jsonData[i].TotalQuestions,
          Totalaptiquestions: jsonData[i].Totalaptiquestions, // Assuming it should be the same as TotalQuestion
          Totalpdquestions: jsonData[i].Totalpdquestions, // Assuming it should be the same as TotalQuestion
          Totaltechquestions: jsonData[i].Totaltechquestions, // Assuming it should be the same as TotalQuestion
          TopStudent: jsonData[i].TopStudent,
          Rank: jsonData[i].Rank,
          TestShare: jsonData[i].TestShare,
          loistudends: jsonData[i].loistudends
          
          // ... (rest of the fields)
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


const getCourseData = (req, res) => {

  
  const limit = parseInt(req.query._limit);
  console.log(limit);

  CourseData.find()
    .sort({ Rank: 1 })
    .limit(limit)
    .populate('studentId') // Populate the 'student_id' field with the corresponding student data
    .exec()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error getting data' });
    });
}


const getSingleData = (req,res)=>{
  const {token}=req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not found' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

    // Token is valid, extract email from decoded data
    const email = decoded.email;

    // Use the email to find the corresponding data
    CourseData.find({ email: email })
      .populate('studentId')
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error getting data' });
      });
  });
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
console.log("date",date)
    // Perform the query to filter data based on the date
    const filteredData = await CourseData.find({ email:email,Date: date });
    console.log(filteredData)
    res.json(filteredData); // Send the filtered data as a JSON response
  } catch (error) {
    console.error('Error retrieving filtered data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




module.exports = {PostCourseData,getCourseData,getSingleData,postStudentData,getStudentData,getDateData,Login,Profile};