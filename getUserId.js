
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');



// Route to send user profile data to the frontend
router.post('/getUserId', (req, res) => {
  // Replace '1' with the actual user ID or identifier of the logged-in user
  const phoneNumber = req.body.phoneNumber;

  // Simulated database query to fetch user data (replace with your actual query)
  const query = 'select id from users where PhoneNumber = ?';
  con.query(query, [phoneNumber], (err, result) => {
    if (err) {
      console.error('Error querying the database: ' + err.message);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'fetching  error' });
      }
    }
  });
});

module.exports= router;


