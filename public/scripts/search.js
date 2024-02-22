// Get references to HTML elements
const destinationInput = document.getElementById("destination");
const searchButton = document.getElementById("formId");
var userId = "";
const msg = document.getElementById("connectMsg");
var locationDetails = "";

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(
    position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      locationDetails = {
        latitude : latitude,
        longitude : longitude,
      }
    },
    error => {
      console.error('Error getting geolocation:', error);
    }
  );
}

// Function to perform a search when the button is clicked
searchButton.onsubmit = (e) => {
  e.preventDefault();
  const destination = destinationInput.value;
  destinationInput.value = "";
  // You can implement logic to fetch and display search results here
  // For now, let's simulate the results with a simple message

  const formData = {
    location: destination,
  };

  // console.log(JSON.stringify(formData));

  fetch("/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      insertData(data);
    })
    .catch((error) => {
      console.log(error);
    });

  connect();
};

const insertData = (data) => {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = ``;
  data.forEach((item) => {
    if (item.userId != userId) {
      const ele = document.createElement("div");
      ele.innerHTML = `<div class="ele">
        <h1>Destination Name :  <span class="sEle">${item.DestinationName}</span></h1>
        <div class="desc">
            <div class="seats"><h5>NoOfSeatsAvailable     : <span class="dEle">${item.NoOfSeatsAvailable}</span></h5></div>
            <div class="date"><h5>Travel Date             : <span class="dEle">${item.TravelDate}</span></h5></div>
            <div class="phoneNumber"><h5>Phone Number     : <span class="dEle" id="phonevalue">${item.phoneNumber}</span></h5></div>
            <div class="vehcile"><h5>Vehicle Name         :<span class="dEle">${item.vehicleName}</span></h5></div>
            <button type ="click" class="bClass"> Connect </button>
        </div>
    </div>`;
      searchResults.appendChild(ele);
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const profileLink = document.getElementById("profileLink");
  const homeLink = document.getElementById("homeLink");
  const destinationLink = document.getElementById("destinationLink");
  const signoutLink = document.getElementById("signoutLink");
  const notificationLink = document.getElementById("notificationLink");

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const param1Value = params.get("userId");

  userId = param1Value;

  profileLink.onclick = () => {
    window.location.href = "./profile.html?userId=" + userId;
  };
  homeLink.onclick = () => {
    window.location.href = "./home.html?userId=" + userId;
  };
  destinationLink.onclick = () => {
    window.location.href = "./destination.html?userId=" + userId;
  };
  signoutLink.onclick = () => {
    window.location.href = "./signout.html?userId=" + userId;
  };
  notificationLink.onclick = () => {
    window.location.href = "./notification.html?userId=" + userId;
  };

  getGeolocation();
});



function connect() {
  document
    .getElementById("search-results")
    .addEventListener("click", function (event) {
      const latitude = locationDetails.latitude;
      const longitude = locationDetails.longitude;

      if (event.target.classList.contains("bClass")) {
        var clickedItem = event.target.closest(".ele");
        // console.log("Connect button clicked for:", clickedItem);
        // Access data or perform actions based on the clicked item
        const phoneNumberValue =
          clickedItem.querySelector("#phonevalue").textContent;
        const details = {
          userId: userId,
          phoneNumber: phoneNumberValue,
        };

        getDetails(details.userId, details.phoneNumber,latitude,longitude);
      }
    });
}

function getDetails(userId, phoneNumber,latitude,longitude) {
  var userDetails;
  console.log(userId);
  fetch("/getConnectUserDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      userDetails = {
        userId: data[0].id,
        username: data[0].username,
        email: data[0].email,
        phoneNumber: data[0].PhoneNumber,
      };
      // console.log(userDetails);
      getUserId(userDetails, phoneNumber,latitude,longitude);
    })
    .catch((error) => {
      console.log(error);
    });
}
function getUserId(userDetails, phoneNumber,latitude,longitude) {
  fetch("/getUserId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber: phoneNumber }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      sendDetails(userDetails, data[0].id,latitude,longitude);
      console.log(userDetails.userId);
    })
    .catch((error) => {
      console.log(error);
    });
}
function sendDetails(userDetails, ownerId,latitude,longitude) {
  console.log(userDetails.userId);
  const details = {
    companionPhoneNumber: userDetails.phoneNumber,
    companionId: userDetails.userId,
    companionEmail: userDetails.email,
    userId: ownerId,
    latitude : latitude,
    longitude : longitude,
  };
  fetch("/getConnectMessage", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        msg.innerHTML = `<h1>Connected !</h1>`;
      } else {
        msg.innerHTML = `<h1>Already Connected!</h1>`;
      }
      setTimeout(() => {
        msg.innerHTML = "";
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
}

