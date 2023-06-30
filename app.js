var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var path       = require('path');
var XLSX       = require('xlsx');
const cors = require('cors');
const http = require('http');
const dotenv  = require('dotenv');

const conn = require('./Model/Connection.js');

conn();
// model
require('./Model/Connection.js')

// controller
require('./controllers/uploadDataPath.js');

//multer

// const upload = require('./controllers/uploadDataPath.js');

//connect to db
const StudentData=require('./Model/StudentData.js');

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));


// Router

const StudentDataRoute= require('./Routes/StudentData.js');
//static folder path
app.use(express.static(path.resolve(__dirname,'public')));


// const multer = require('multer');


// const upload = multer({ dest: 'public' }); // Specify the destination directory for uploaded files

// app.post('/upload', upload.single('pdfFile'), (req, res) => {
//   if (!req.file) {
//     res.status(400).send('No file uploaded.');
//     return;
//   }

//   // Process the uploaded file here
//   console.log('Uploaded file:', req.file);
//   res.send('File uploaded successfully.');
// });


// const fileUrl = 'http://example.com/path/to/file.pdf'; // Replace with the actual file URL
// const destinationPath = '/path/to/save/file.pdf'; // Replace with the desired destination path

// const file = fs.createWriteStream(destinationPath);

// http.get(fileUrl, response => {
//   response.pipe(file);
//   file.on('finish', () => {
//     file.close(() => {
//       console.log('File downloaded successfully.');
//     });
//   });
// }).on('error', err => {
//   fs.unlink(destinationPath, () => {
//     console.error(`Error downloading file: ${err.message}`);
//   });
// });

app.use(cors());



app.use('',StudentDataRoute);
//assign port
var port = process.env.PORT || 3000;
app.listen(port,'192.168.0.110',()=>console.log('server run at '+port));
