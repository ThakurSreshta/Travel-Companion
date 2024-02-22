const express = require('express');
const bodyParser = require('body-parser'); 


const loginHandler = require('./loginHandler');
const registerHandler = require('./register');
const search = require('./searchHandler');
const profile = require('./profileHandler');
const updateUN = require('./updateUserNameHandler');
const editEmail = require('./editEmailHandler');
const editAge = require('./updateAgeHandler');
const editLocation = require('./updateLocationHandler');
const editNumber = require('./updatephoneNumberHnadler');
const addDestination = require('./addDestinationHandler');
const addtrustedContact = require('./trustedContactHandler');
const trustedList = require('./trustedlistHandler');
const getConnectUserDetails = require("./getConnectUserDetails");
const getConnectMessage = require("./getConnectMessage");
const getUserId = require("./getUserId");
const notification = require("./notificationsHandler");
const location = require("./locationHandler");
const live = require("./livelocationHandler");
const sms = require("./smsHandler");
const pNumber = require("./phoneNumberHandler");

const app = express();

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public')); // Corrected path for static files

// Use the loginHandler for routes
app.use(bodyParser.json());
app.use('/', loginHandler);
app.use('/',registerHandler);
app.use('/',search);
app.use('/',profile);
app.use('/',updateUN);
app.use('/',editEmail);
app.use('/',editAge);
app.use('/',editLocation);
app.use('/',editNumber);
app.use('/',addDestination);
app.use('/',addtrustedContact);
app.use('/',trustedList);
app.use("/",getConnectUserDetails);
app.use("/",getConnectMessage);
app.use("/",getUserId);
app.use('/',notification);
app.use("/",location);
app.use("/",live);
app.use("/",sms);
app.use("/",pNumber);

// Define a route to serve your HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Provide the path to your HTML file
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
