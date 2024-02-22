
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');



// Route to send user profile data to the frontend
router.put('/getConnectMessage', (req, res) => {
  // Replace '1' with the actual user ID or identifier of the logged-in user
  const userId = req.body.userId;
  const companionUserId = req.body.companionId;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  // Simulated database query to fetch user data (replace with your actual query)
  const query = 'Insert into connectDetails values(?,?,?,?)';
  con.query(query, [userId,companionUserId,latitude,longitude], (err, result) => {
    if (err) {
      console.error('Error querying the database: ' + err.message);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.affectedRows > 0) {
        res.json({success : true});
      } else {
        res.status(404).json({ error: 'Inserting error' });
      }
    }
  });
});

module.exports= router;


