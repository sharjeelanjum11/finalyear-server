const { MongoClient } = require('mongodb');
const mysql = require('mysql');
const sql = require('mssql');
const pg = require('pg');
const accountSid = 'AC1568eb30838c3018a91f3d6a792ac408';
const authToken = '704a6f8cd8ac7efaa0092759e5f710bd';
// const client = require('twilio')(accountSid, authToken);

// MongoDB Configuration
const mongoConfig = {
  url: 'mongodb+srv://sharjeel:sharjeel191@serverlessinstance0.pbqi4dq.mongodb.net/?retryWrites=true&w=majority',
  dbName: 'bank',
};




// MySQL Configuration
const mysqlConfig = {
    host: 'db-mysql-blr1-28013-do-user-10551916-0.b.db.ondigitalocean.com',
  user: 'doadmin',
  password: 'sAVNS_vMTtzmyGM0mjg224tX9',
  database: 'defaultdb',
 
};
// SQL Server Configuration
const sqlConfig = {
    
    server: '34.129.145.12',
    user: 'sql345',
    password: 'sql345543',
    database: 'sqluser1',
  };



  const pgConfig = {
    host: 'db-postgresql-blr1-54893-do-user-10551916-0.b.db.ondigitalocean.com',
    port: '25060',
    user: 'doadmin',
    password: 'AVNS_sGewpd37TgpijQhGSHZ',
    database: 'defaultdb',
  };



// Connect to MongoDB
// async function connectToMongoDB() {
//   try {
//     const mongoClient = await MongoClient.connect(mongoConfig.url);
//     console.log('Connected to MongoDB successfully');
//     // Perform further operations with MongoDB
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }
// Import the required dependencies




// Connection URI
const uri = 'mongodb+srv://sharjeel:sharjeel191@serverlessinstance0.pbqi4dq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
// Create a new instance of MongoClient

// Connect to MongoDB and perform the transaction
async function connectToMongoDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB successfully');

    // Perform the transaction
    await performTransaction();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Define the transaction function
async function performTransaction() {
  const session = client.startSession();

  try {
    session.startTransaction();

    // Get a reference to the database and collection
    const database = client.db('owner');
    const collection = database.collection('check');
 
    // const document2 = { name: 'sharjeel', age: 35 };
    // await collection.insertOne(document2, { session });
    // console.log('Document 1 inserted');

    // Perform operations within the transaction
    const filter = {
      $or: [
        { name: "sharjeel anjum" },
        { name: "ali ali" },
        // Add more conditions here
      ]
    }; // Replace with the actual document ID
    const update = { $set: { age: -20 } };

    const result = await collection.updateOne(filter, update,{session});

    console.log('Modified documents:', result.modifiedCount);

    // Introduce a delay before committing the transaction (3 minutes)
    await delay(1 * 30 * 1000);
     // Collection 1: 'check1'
     const collection1 = database.collection('check1');
    //  const document1 = { name: 'ali', age: 30 };
     const result1 = await collection1.updateOne(filter, update,{session} );
     console.log('Modified documents:', result1.modifiedCount);
    //  await collection1.insertOne(document1, { session });
    //  console.log('Document 1 inserted');

    // Commit the transaction
    await session.commitTransaction();
    console.log('Transaction committed successfully');
  } catch (error) {
    console.error('Error performing transaction:', error);

    // Abort the transaction in case of an error
    await session.abortTransaction();
    console.log('Transaction rolled back');
  } finally {
    session.endSession();
  }
}

// Delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// // Connect to MongoDB and perform the transaction
// async function connectAndPerformTransaction() {
//   try {
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log('Connected to MongoDB successfully');

//     // Perform the transaction
//     await performTransaction();
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   } finally {
//     // Close the connection
//     await client.close();
//     console.log('Connection closed');
//   }
// }


// Call the connectAndPerformTransaction function
// connectAndPerformTransaction().catch(console.error);


// Connect to MySQL
async function connectToMySQL() {
  try {
    const connection = await mysql.createConnection(mysqlConfig);
    console.log('Connected to MySQL successfully');
    // Perform further operations with MySQL
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
}




  // Connect to SQL Server
async function connectToSQLServer() {
    try {
      await sql.connect(sqlConfig);
      console.log('Connected to SQL Server successfully');
      // Perform further operations with SQL Server
    } catch (error) {
      console.error('Error connecting to SQL Server:', error);
    }
  }




  // Connect to PostgreSQL
async function connectToPostgreSQL() {
    try {
      const pool = new pg.Pool(pgConfig);
      const client = await pool.connect();
      console.log('Connected to PostgreSQL successfully');
      // Perform further operations with PostgreSQL
    } catch (error) {
      console.error('Error connecting to PostgreSQL:', error);
    }
  }

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

function sendOTPMessage(phoneNumber) {
  const otpCode = generateOTP();

  // Send the OTP via Twilio SMS
  return client.messages
    .create({
      body: `Your OTP code is: ${otpCode}`,
      from: '+13158608609',
      to: phoneNumber,
    })
    .then((message) => {
      console.log('OTP SMS sent:', message.sid);
      return { message: 'OTP SMS sent successfully' };
    })
    .catch((error) => {
      console.log('Error sending OTP SMS:', error);
      throw new Error('Error sending OTP SMS');
    });
}






module.exports = {
  connectToMongoDB,
  connectToMySQL,connectToPostgreSQL,connectToSQLServer,sendOTPMessage
};
