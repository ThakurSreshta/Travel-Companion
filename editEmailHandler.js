
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');


// router.put('/editdetails', (req, res) => {
//     const userId = req.body.userId;
//     const { field, value } = req.body;
//     console.log(field);
//     // Validate the 'field' parameter to prevent SQL injection
//     const validFields = ['username', 'email', 'location', 'age', 'PhoneNumber']; // Add more fields as needed
//     if (!validFields.includes(field)) {
//       return res.status(400).json({ error: 'Invalid field' });
//     }

//     const query = `UPDATE users SET ${field} = ? WHERE id = ?`;

//     con.query(query, [value, userId], (err, result) => {
//       if (err) {
//         console.error('Error updating profile:', err);
//         res.status(500).json({ error: 'Internal server error' });
//       } else {
//         if (result.affectedRows > 0) {
//           res.json({ message: 'Profile updated successfully' });
//         } else {
//           res.status(404).json({ error: 'User not found' });
//         }
//       }
//     });
//   });

// Route to update email
router.put('/editEmail', (req, res) => {
  const userId = req.body.userId;
  const email  = req.body.email;

  const query = 'UPDATE users SET email = ? WHERE id = ?';

  con.query(query, [email, userId], (err, result) => {
    handleUpdateResult(err, result, res);
  });
});

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