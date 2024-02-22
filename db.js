const mysql = require('mysql');

const express = require("express");
const router = express.Router();

const con = mysql.createConnection({
    host: 'localhost',        // Replace with your MySQL host
    user: 'sqluser@%',    // Replace with your MySQL username
    password: '2001',  // Replace with your MySQL password
    database: 'travelbuddy',  // Replace with your database name
});

con.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL: ', err);
  } else {
      console.log('Connected to MySQL');
  }
});

// Error event handler
con.on('error', (err) => {
  console.error('MySQL connection error: ', err);
});

  

module.exports = con;