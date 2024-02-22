const express = require('express');
const router = express.Router();
const con = require('./db');

// Handle POST request for user registration
router.post('/addDestination', (req, res) => {

    const destinationName = req.body.destinationName;
    const SeatsAvailable = req.body.SeatsAvailable;
    const TravelDate = req.body.TravelDate;
    const PhoneNumber = req.body.PhoneNumber;
    const VehicleName = req.body.VehicleName;
    const userId = req.body.userId;

  // Validate user input (add more validation as needed)

  // Insert the user data into the database
  const insertUserQuery = 'INSERT INTO location (DestinationName,TravelDate, phoneNumber, vehicleName, NoOfSeatsAvailable,userId) VALUES (?, ?, ?, ?, ?,?)';
  con.query(insertUserQuery, [destinationName, TravelDate, PhoneNumber, VehicleName, SeatsAvailable,userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Registration failed.' });
    }

    // Registration successful
    return res.status(200).json({ message: 'Registration successful.' });
  });
});

module.exports = router; 
