var express    = require('express');

var bodyParser = require('body-parser');
var path       = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv  = require('dotenv');

require('./Model/Connection.js');


// model
require('./Model/Connection.js')

// controller
require('./controllers/uploadDataPath.js');

//multer

// const upload = require('./controllers/uploadDataPath.js');

//connect to db


//init app

var app = express();
app.use(express.json());
app.use(cookieParser());

//fetch data from the request
// app.use(express.urlencoded({ extended: true }));

// Router

const StudentDataRoute= require('./Routes/StudentData.js');
//static folder path
app.use(express.static(path.resolve(__dirname,'public')));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
    
}));
// app.use(cors());

app.use('',StudentDataRoute);
//assign port
var port = process.env.PORT || 3001;
app.listen(port,()=>console.log('server run at '+port));
// '192.168.1.43',