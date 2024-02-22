
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');



// Route to send user profile data to the frontend
router.post('/getConnectUserDetails', (req, res) => {
  // Replace '1' with the actual user ID or identifier of the logged-in user
  const id = req.body.userId;

  // Simulated database query to fetch user data (replace with your actual query)
  const query = 'SELECT * FROM users WHERE id = ?';
  con.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error querying the database: ' + err.message);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});

module.exports= router;


