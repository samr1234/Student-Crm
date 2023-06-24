const StudentData = require('../Model/StudentData');
const CourseData = require('../Model/CourseData')
var XLSX       = require('xlsx');
const fs = require('fs')


const StudentDataPost =((req, res, next) => {
  const filePath = './public/uploads/result.xlsx';

const fileData = fs.readFileSync(filePath);

const workbook = XLSX.read(fileData, { type: 'buffer' });
const sheetNameList = workbook.SheetNames;

sheetNameList.forEach((sheetName) => {
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  StudentData.insertMany(xlData).then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});

  res.status(200).json({ message: 'File uploaded and processed successfully' });
});




const PostCourseData = ((req,res,next)=>{

    
        fs.readFile('data.json', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send('Error reading JSON file');
          }
      
          try {
            const jsonData = JSON.parse(data);
            const bulkOps = jsonData.map(doc => ({
              insertOne: {
                document: doc,
             
              }
            }));
      
            CourseData.collection.bulkWrite(bulkOps, (error, result) => {
              if (error) {
                console.error('Error saving data to MongoDB:', error);
                return res.status(500).send('Error saving data to MongoDB');
              }
              console.log('Data saved to MongoDB:', result);
              res.status(200).send('Data saved to MongoDB');
            });
          } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(400).send('Error parsing JSON');
          }
        

    })
});

const getStudentData=((req,res)=>{

    StudentData.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data!=''){
                res.send({data});
            }else{
                res.send({});
            }
        }
    });


});

const getCourseData = ((req,res,next)=>{

    CourseData.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data!=''){
                res.send({data});
            }else{
                res.send({});
            }
        }
    });
});

module.exports = {getCourseData,PostCourseData,StudentDataPost,getStudentData};