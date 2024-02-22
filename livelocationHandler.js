// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const mysql = require('mysql');
// const router = express.Router();
// const con = require("./db");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // In-memory storage for live locations (replace this with a database in a real-world scenario)
// const liveLocations = {};

// // Endpoint to receive and store live locations
// router.post('/send-location', express.json(), (req, res) => {
//   const { latitude, longitude } = req.body;
//   const userId = req.body.userId;
//   liveLocations[userId] = { latitude, longitude };

//   // Notify trusted contacts about the live location
//   notifyTrustedContacts(userId, { latitude, longitude });

//   res.json({ message: 'Location received and stored successfully.' });
// });

// // Function to notify trusted contacts about the live location
// function notifyTrustedContacts(userId, liveLocation) {
//   // Fetch trusted contacts from the database
//   const query = `SELECT PhoneNumber FROM trusted_contacts WHERE userId = ?`;

//   con.query(query, [userId], (error, results) => {
//     if (error) {
//       console.error('Error fetching trusted contacts:', error);
//       return;
//     }
//     // Extract contact phone numbers from the database results
//     const trustedContacts = results.map(result => result.PhoneNumber);

//     // Notify each trusted contact via Socket.IO
//     trustedContacts.forEach((contactPhoneNumber) => {
//       const contactSocket = findSocketByPhoneNumber(contactPhoneNumber);
//       if (contactSocket) {
//         contactSocket.emit('liveLocation', { userId, liveLocation });
//       }
//     });
//   });
// }

// // Function to find a Socket.IO socket based on the user's phone number
// function findSocketByPhoneNumber(phoneNumber) {
//   const connectedSockets = Object.values(io.sockets.connected);

//   // Iterate through connected sockets and find the one with the matching phone number
//   for (const socket of connectedSockets) {
//     if (socket.phoneNumber === phoneNumber) {
//       return socket;
//     }
//   }

//   return null; // Return null if no matching socket is found
// }

// // Handle Socket.IO connection events
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle disconnect events
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//     // Additional logic to handle disconnect if needed
//   });

//   // Add additional socket-related logic here
// });

// module.exports = router;

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const router = express.Router();
const axios = require("axios");
const con = require("./db");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve your static files or frontend application if needed
// router.use(express.static('public'));

// Define a route to receive location data
router.post("/send-location", (req, res) => {
  const userId = req.body.userId;
  const location = req.body.address;
  // console.log(location);

  // Add logic to send location to trusted contacts
  // Example: sendLocationToContacts(userId, latitude, longitude);

  // Broadcast location to connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ userId, location }));
    }
  });

  // Send SMS notifications to trusted contacts
  sendSMSToContacts(userId, location);

  res.send("Location sent successfully");
});

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Function to send SMS notifications
function sendSMSToContacts(userId, location) {
  const query = `SELECT PhoneNumber FROM trusted_contacts WHERE userId = ?`;
  // console.log(query);
  con.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching trusted contacts:", error);
      return;
    }

    const trustedContacts = results.map((result) => result.PhoneNumber);
    console.log(trustedContacts);
    trustedContacts.forEach((contact) => {
      const smsGatewayURL = "https://api.example-sms-gateway.com/send";
      const apiKey = "your_sms_gateway_api_key";

      console.log(smsGatewayURL);

      // Replace placeholder values with actual data
      const message = `Location Update - UserID: ${userId}, Location : ${location}`;
      console.log(message);
      const url = `${smsGatewayURL}?apiKey=${apiKey}&to=${contact}&message=${encodeURIComponent(
        message
      )}`;

      // Make a POST request to the SMS gateway API
      axios
        .post(url)
        .then((response) =>
          console.log(`SMS sent to ${contact}: ${response.data}`)
        )
        .catch((error) =>
          console.error(`Error sending SMS to ${contact}: ${error.message}`)
        );
    });
  });
}
module.exports = router;

// const trustedContacts = ["7661991213", "7793978189"];

// trustedContacts.forEach((contact) => {
//   const smsGatewayURL = "https://api.example-sms-gateway.com/send";
//   const apiKey = "your_sms_gateway_api_key";

//   console.log(smsGatewayURL);

//   // Replace placeholder values with actual data
//   const message = `Location Update - UserID: ${userId}, Location : ${location}`;
//   console.log(message);
//   const url = `${smsGatewayURL}?apiKey=${apiKey}&to=${contact}&message=${encodeURIComponent(
//     message
//   )}`;

//   // Make a POST request to the SMS gateway API
//   axios
//     .post(url)
//     .then((response) => console.log(`SMS sent to ${contact}: ${response.data}`))
//     .catch((error) =>
//       console.error(`Error sending SMS to ${contact}: ${error.message}`)
//     );
// });

// module.exports = router;
