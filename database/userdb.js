const { MongoClient } = require('mongodb');
const mysql = require('mysql');
const sql = require('mssql');
const pg = require('pg');
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
async function connectToMongoDB() {
  try {
    const mongoClient = await MongoClient.connect(mongoConfig.url);
    console.log('Connected to MongoDB successfully');
    // Perform further operations with MongoDB
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}



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




module.exports = {
  connectToMongoDB,
  connectToMySQL,connectToPostgreSQL,connectToSQLServer
};
