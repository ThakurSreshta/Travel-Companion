const express = require('express');
const axios = require('axios');
const router = express.Router();


router.post('/reverse-geocode', async (req, res) => {
  try {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    // console.log(latitude);

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    const response = await axios.get(apiUrl);

    // const location = {
    //   address: response.data.display_name,
    //   // You can extract more details from the response if needed
    // };
    // console.log(response.data.display_name);
    res.json(location);
  } catch (error) {
    console.error('Error during reverse geocoding:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;