// Import necessary modules and set up your Express app
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');

// Handle POST requests to the login route
router.post('/search', (req, res) => {
   // Assuming you're using a form to collect username and password
  // Validate and sanitize user input if necessary
  const location = req.body.location;
  // Query the database to find the user
  const query = 'SELECT * FROM location WHERE DestinationName = ?';
  con.query(query, [location], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (results.length > 0) {
        // Here, you can create a session or generate a token for the user to maintain their authentication state
        res.status(200).json(results);
      } else {
        res.status(401).json({ message: 'Invaild Location'});
      }
    }
  });
});

// Export the router
module.exports = router;
