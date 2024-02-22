const express = require('express');
const router = express.Router();
const mysql = require('mysql'); // Assuming you've set up your MySQL connection
const con = require('./db');

//Route to update age
router.put('/editAge', (req, res) => {
    const userId = req.body.userId;
    const  age  = req.body.age;

    const query = 'UPDATE users SET age = ? WHERE id = ?';

    con.query(query, [age, userId], (err, result) => {
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