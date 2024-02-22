const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');

router.put('/editPhone', (req, res) => {
    const userId = req.body.userId;
    const phoneNumber = req.body.PhoneNumber;

    const query = 'UPDATE users SET phoneNumber = ? WHERE id = ?';

    con.query(query, [phoneNumber, userId], (err, result) => {
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