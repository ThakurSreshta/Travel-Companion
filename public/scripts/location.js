var Address = " ";

document.addEventListener("DOMContentLoaded", function () {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const param1Value = params.get("userId");
  userId = param1Value;
  const shareLocationBtn = document.getElementById("shareLocationBtn");

  shareLocationBtn.addEventListener("click", function () {
    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;

        const listData = {
          latitude: latitude,
          longitude: longitude,
        };

        fetch("/reverse-geocode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listData),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            const formData = {
              Address: data,
              userId: userId,
            };
            // console.log(formData);
            sendLocationToServer(formData);
          })
          .catch((error) => {
            console.log(error);
          });
        alert(`Location shared: Latitude ${latitude}, Longitude ${longitude}`);
      });
    }
  });
});

function sendLocationToServer(formData) {
  // Replace with logic to fetch trusted contacts' phone numbers for the given userId
  // console.log(formData.userId);
  // console.log(formData.Address);
  fetch("/trustedListph", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: formData.userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        // console.log(item);
        // console.log(formData.Address);
        sendSMSTOContacts(item,formData.Address);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendSMSTOContacts(contact,location) {

  
  const smsGatewayURL = "https://api.example-sms-gateway.com/send"; // Replace with the actual SMS gateway URL
  const apiKey = "your_sms_gateway_api_key";
  
  // Replace placeholder values with actual data
  // console.log(location);

  const message = `Location Update - UserID: ${userId}, Location: ${location}`;
  const url = `${smsGatewayURL}?apiKey=${apiKey}&to=${contact.PhoneNumber}&message=${encodeURIComponent(message)}`;
  // console.log(message);
  console.log("Sending SMS to:", contact.PhoneNumber);
  console.log("SMS Gateway URL:", url); // Log the constructed URL

  // Make a POST request to the SMS gateway API
  fetch("/send-sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      contact: contact,
      message: message,
    }),
  })
    .then((response) => response.text())
    .then((responseData) => {
      // console.log(responseData);
      console.log(`SMS sent to ${contact.PhoneNumber}: ${responseData}`);
    })
    .catch((error) => {
      console.error(`Error sending SMS to ${contact}: ${error.message}`);
    });
}
