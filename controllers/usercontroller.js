
// const bcrypt = require('bcryptjs')
// // const { use } = require('../routes/UserRoutes')
// const jwt= require('jsonwebtoken')
const express = require('express')
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://sharjeel:sharjeel191@serverlessinstance0.pbqi4dq.mongodb.net/?retryWrites=true&w=majority';
const clientMongo = new MongoClient(uri, { useUnifiedTopology: true });
const otpdocm = clientMongo.db('otp').collection('otpst');


const accountSid = 'AC1568eb30838c3018a91f3d6a792ac408';
const authToken = '704a6f8cd8ac7efaa0092759e5f710bd';
const client = require('twilio')(accountSid, authToken);
const mailgun = require('mailgun-js')({ apiKey: 'pubkey-d71aa61bf452467433273b25ac82d1a5', domain: 'sandbox6bf64798855142d49d1e706c658f4ca5.mailgun.org' });

const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };




 


// const {accountsCollection} =require('../config/connection');


// const transcoll=client.db('bank').collection('transactionslist')
// // const {accountsCollection} =require('../config/connection');

// const trans={name:"ali",no:"345"}

//  transcoll.insertOne(trans)








const Otphandler = async (req, res) => {
  const { formattedPhoneNumber } = req.body;

  try {
    // Check if the phone number already exists in MongoDB
    const existingOtpDoc = await otpdocm.findOne({ formattedPhoneNumber });

    if (existingOtpDoc) {
      // Phone number already exists
      res.status(400).json({ error: 'Phone number already exists', success: false });
    } else {
      const otpCode = generateOTP();

      // Send the OTP via Twilio SMS
      client.messages
        .create({
          body: `Your OTP code is: ${otpCode}`,
          from: '+13158608609',
          to: `${formattedPhoneNumber}`,
        })
        .then((message) => {
          console.log('OTP SMS sent:', message.sid);

          // Store the OTP in MongoDB
          const otpDoc = { formattedPhoneNumber, otpCode };
          otpdocm.insertOne(otpDoc)
            .then(() => {
              console.log('OTP stored in MongoDB');
              res.json({ message: 'OTP SMS sent successfully', success: true });
            })
            .catch((error) => {
              console.log('Error storing OTP in MongoDB:', error);
              res.status(500).json({ error: 'Error storing OTP in MongoDB', message: 'System Error Please Try Again' });
            });
        })
        .catch((error) => {
          console.log('Error sending OTP SMS:', error);
          res.status(500).json({ error: 'Error sending OTP SMS', message: 'Unable to send OTP. Please check your number format' });
        });
    }
  } catch (error) {
    console.log('Error checking phone number in MongoDB:', error);
    res.status(500).json({ error: 'Error checking phone number in MongoDB', success: false });
  }
};


  
const verifyOtp = async (req, res) => {
  const { formattedPhoneNumber, otpCode } = req.body;

  try {
    // Find the OTP document in MongoDB
    const otpDoca = await otpdocm.findOne({ formattedPhoneNumber });

    if (otpDoca && otpDoca.otpCode == otpCode) {
      // Valid OTP
      res.json({ message: 'OTP verification successful', success: true });
    } else {
      // Invalid OTP
      res.status(400).json({ error: 'Invalid OTP', success: false });
    }
  } catch (error) {
    console.log('Error verifying OTP in MongoDB:', error);
    res.status(500).json({ error: 'Error verifying OTP in MongoDB', success: false });
  }
};





module.exports = { Otphandler,verifyOtp};

