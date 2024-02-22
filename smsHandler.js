const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');


router.post('/send-sms', (req, res) => {
    const contact = req.body.contact;
    const message = req.body.message;

    // Perform SMS sending logic here
    // This is where you would integrate with your SMS gateway

    // For demonstration purposes, we'll just send a success response
    res.send('SMS sent successfully');
});
module.exports = router;
