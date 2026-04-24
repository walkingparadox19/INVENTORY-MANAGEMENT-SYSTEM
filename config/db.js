// =============================================
// config/db.js - Database Connection File
// =============================================
// This file connects our Node.js app to MySQL database

const mysql = require('mysql2');
require('dotenv').config(); // Load settings from .env file

// Create a connection pool (manages multiple connections efficiently)
const pool = mysql.createPool({
    host: process.env.DB_HOST,         // Usually 'localhost'
    user: process.env.DB_USER,         // Your MySQL username
    password: process.env.DB_PASSWORD, // Your MySQL password
    database: process.env.DB_NAME,     // Database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use Promises (so we can use async/await)
const db = pool.promise();

module.exports = db;
