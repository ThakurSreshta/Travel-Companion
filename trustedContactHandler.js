// Import necessary modules and set up your Express app
const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db'); // Replace with your database connection setup

// Handle POST requests to add trusted contact
router.post('/add-trusted-contact', (req, res) => {
  
  const contactName  = req.body.contactName;
  const PhoneNumber = req.body.PhoneNumber;
  const userId = req.body.userId;

  console.log(contactName+" "+PhoneNumber);

  if (!contactName || !PhoneNumber) {
    return res.status(400).json({ error: 'Both contact name and PhoneNumber are required' });
  }

  const query = 'INSERT INTO trusted_contacts (userId,contactName, PhoneNumber) VALUES (?, ?, ?)';
  con.query(query, [userId,contactName, PhoneNumber], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json({ message: 'Trusted contact added successfully', contactId: results.insertId });
  });
});

// Export the router
module.exports = router;
