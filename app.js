var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const accountSid = 'AC1568eb30838c3018a91f3d6a792ac408';
const authToken = '704a6f8cd8ac7efaa0092759e5f710bd';
const client = require('twilio')(accountSid, authToken);
const mailgun = require('mailgun-js')({ apiKey: 'pubkey-d71aa61bf452467433273b25ac82d1a5', domain: 'sandbox6bf64798855142d49d1e706c658f4ca5.mailgun.org' });


function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

const { connectToMongoDB, connectToMySQL,connectToSQLServer,connectToPostgreSQL,sendOTPMessage }=require('./database/userdb')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var otpVerify = require('./routes/otpverify');
var app = express();
app.use(express.json());
app.use(bodyParser.json());
// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend application URL
// };
app.use(cors());
connectToMongoDB();
connectToMySQL();
// const phoneNumber = '+923206566380'; // Replace with the desired phone number

// sendOTPMessage(phoneNumber)
//   .then((response) => {
//     console.log(response);
//     // Handle the response here
//   })
//   .catch((error) => {
//     console.error(error);
//     // Handle the error here
//   });
// connectToSQLServer()
// connectToPostgreSQL();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/send-verification-code',userRouter)
app.use('/verify-otp',otpVerify)









// app.post('/send-verification-code', (req, res) => {
//   const { phoneNumber } = req.body;

//   const otpCode = generateOTP();

//   // Send the OTP via Twilio SMS
//   client.messages
//     .create({
//       body: `Your OTP code is: ${otpCode}`,
//       from: '+13158608609',
//       to: phoneNumber,
//     })
//     .then((message) => {
//       console.log('OTP SMS sent:', message.sid);
//       res.json({ message: 'OTP SMS sent successfully' });
//     })
//     .catch((error) => {
//       console.log('Error sending OTP SMS:', error);
//       res.status(500).json({ error: 'Error sending OTP SMS' });
//     });
//   });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};












// Call the connection functions
















  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
