// Import necessary modules and set up your Express app
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');

// Handle POST requests to the login route
router.post('/login', (req, res) => {
  // Assuming you're using a form to collect username and password
  // Validate and sanitize user input if necessary
  const username = req.body.username;
  const password = req.body.password;

  // Query the database to find the user
  const query = 'SELECT * FROM users WHERE email = ? and password = ?';
  con.query(query, [username, password], (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(401).json({message : "fail"});
    }
  });
});


// Export the router
module.exports = router;
