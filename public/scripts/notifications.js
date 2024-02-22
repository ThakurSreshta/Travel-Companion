var userId = " ";
var address = " ";

window.addEventListener("DOMContentLoaded", () => {
  const profileLink = document.getElementById("profileLink");
  const homeLink = document.getElementById("homeLink");
  const signoutLink = document.getElementById("signoutLink");

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

  signoutLink.onclick = () => {
    window.location.href = "./signout.html?userId=" + userId;
  };

  fetch("/companion-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      //  console.log(data);
      data.forEach((item) => {
         console.log(item.latitude);
        const formData = {
          latitude: item.latitude,
          longitude: item.longitude,
        };
        // console.log(formData);
        fetch("/reverse-geocode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.address);
            displayCompanionDetails(item.companionUserId,data.address);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

function displayCompanionDetails(companion,address) {
  // console.log(companion);
  const formData = {
    userId: companion,
  };

  fetch("/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(address);
      displayUserProfile(data,address);
    })
    .catch((error) => {
      console.log(error);
    });
}
function displayUserProfile(user,address) {
  // console.log(address);
  console.log(user);
  var profileInfo = document.getElementById("notification-list");
  // console.log(profileInfo);
  // console.log(user);
  const ele = document.createElement("div");
  ele.setAttribute("class", "userId");
  ele.innerHTML = `
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Location:</strong> ${address}</p>
      <p><strong>PhoneNumber:</strong> ${user.PhoneNumber}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <!-- Add more profile information as needed -->
  `;
  profileInfo.appendChild(ele);
}
