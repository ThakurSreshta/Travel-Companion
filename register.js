const express = require('express');
const router = express.Router();
const con = require('./db');

// Handle POST request for user registration
router.post('/register', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const PhoneNumber = req.body.PhoneNumber;
    const age = req.body.age;
    const location = req.body.location;
    const password = req.body.password;
  // Validate user input (add more validation as needed)

  // Insert the user data into the database
  const insertUserQuery = 'INSERT INTO users (username, email, PhoneNumber, age, location, password) VALUES (?, ?, ?, ?, ?, ?)';
  con.query(insertUserQuery, [username, email,  PhoneNumber, age, location, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Registration failed.' });
    }

    // Registration successful
    return res.status(200).json({ message: 'Registration successful.' });
  });
});

module.exports = router; 
