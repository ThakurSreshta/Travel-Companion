
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');



// Route to send user profile data to the frontend
router.post('/trustedListph', (req, res) => {
 
  const userId = req.body.userId;

  const query = 'SELECT PhoneNumber FROM trusted_contacts WHERE userId = ? ';
  con.query(query, [userId],(err, result) => {
    if (err) {
      console.error('Error querying the database: ' + err.message);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.length > 0) {
        // console.log(user);
        res.json(result);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});

module.exports= router;


