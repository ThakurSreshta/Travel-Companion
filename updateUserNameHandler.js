const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');

router.put('/editUserName', (req, res) => {
  const userId = req.body.userId;
  const  username  = req.body.username;


  const query = 'UPDATE users SET username = ? WHERE id = ?';

  con.query(query, [username, userId], (err, result) => {
    handleUpdateResult(err, result, res);
  });
});


// A function to handle the result of the update operation
function handleUpdateResult(err, result, res) {
  if (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    if (result.affectedRows > 0) {
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
}

module.exports = router;