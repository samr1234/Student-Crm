var express    = require('express');

var bodyParser = require('body-parser');
var path       = require('path');

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


app.use(cors());



app.use('',StudentDataRoute);
//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at '+port));
