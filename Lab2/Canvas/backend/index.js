//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

//const {connection} = require('./db');
const passport  = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var dashboardRouter = require('./routes/dashboard');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var createCourseRouter = require('./routes/createCourse');
var enrollCourseRouter = require('./routes/enrollCourse');
var searchCourseRouter = require('./routes/searchCourse1');
var createAnnouncementRouter = require('./routes/createAnnouncement');
var viewAnnouncementRouter = require('./routes/viewAnnouncement');
var createQuizRouter = require('./routes/createQuiz');
var createAssignmentRouter = require('./routes/createAssignment');
var quizRouter = require('./routes/quiz');
var viewProfileRouter = require('./routes/viewProfile');
var editProfileRouter = require('./routes/editProfile');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Set up middleware
//var authenticationRequied = passport.authenticate('jwt', { session: false });

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
     extended: true
   }));
app.use(bodyParser.json());

app.use(express.static('./public'));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use('/dashboard', dashboardRouter);  
app.use('/SignUp', userRouter);
app.use('/login', loginRouter);
app.use('/createCourse', createCourseRouter);
app.use('/enrollCourse', enrollCourseRouter);
app.use('/searchCourse',searchCourseRouter);
app.use('/createAnnouncement', createAnnouncementRouter);
app.use('/viewAnnouncement', viewAnnouncementRouter);
app.use('/createQuiz', createQuizRouter);
app.use('/createAssignment', createAssignmentRouter);
app.use('/quiz',quizRouter);
app.use('/viewProfile',viewProfileRouter);
app.use('/editProfile',editProfileRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log(`destination`);  
      console.log(req.body.SjsuId);
      let dir = `./public/uploads/${req.body.SjsuId}`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      console.log("multer disk storage running...")
      cb(null, dir);
  },
  filename: (req, file, cb) => {
      console.log(`filename`);  
      console.log(req.body.SjsuId);
      cb(null, file.originalname);
  },
});

var upload = multer({ storage });


app.post('/profilePhoto', upload.single('selectedFile'), (req, res) => {
  console.log("Req : ", req.body);
  console.log("Res : ", res.file);
  res.send();
});

app.post('/multipleImage', upload.any(), (req, res) => {
  console.log("Req : ", req.body);
  console.log("Res : ", res.file);
  res.send();
});

app.post('/download/:file(*)', (req, res) => {
  console.log("Inside download file");
  var file = req.params.file;
  var fileLocation = path.join(__dirname + '/public/uploads', file);
  var img = fs.readFileSync(fileLocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(base64img);
});

app.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = app;

const port = 3001;
app.listen(3001, () => {console.log(`Magic happens on port ${port}`);})