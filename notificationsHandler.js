const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');

// Endpoint for fetching companion details
router.post('/companion-details', (req, res) => {
    const userId = req.body.userId; // Get the user ID from the query parameters (e.g., /companion-details?userId=123)
    
    const query = 'SELECT * from connectdetails  WHERE userId =  ?';
    con.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching companion details:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (results.length > 0) {
                // console.log(results);
                //const companionDetails = results[0];
                res.json(results);
            } else {
                res.status(404).json({ message: 'Companion details not found' });
            }
        }
    });
});

module.exports = router;
