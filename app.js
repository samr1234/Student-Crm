var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var path       = require('path');
var XLSX       = require('xlsx');
const cors = require('cors');
const dotenv  = require('dotenv');
// model
require('./Model/Connection.js')

// controller
require('./controllers/uploadDataPath.js');

//multer

const upload = require('./controllers/uploadDataPath.js');

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


// app.get('/',(req,res)=>{
//    StudentData.find((err,data)=>{
//        if(err){
//            console.log(err)
//        }else{
//            if(data!=''){
//                res.render('home',{result:data});
//            }else{
//                res.render('home',{result:{}});
//            }
//        }
//    });
// });

// app.use(cors({
//     credentials: true,
//     origin:'http://localhost:5173'
// }));



app.use('',StudentDataRoute);
//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at '+port));
// '192.168.0.141'