// const addContactForm = document.getElementById("add-trusted-contact-form");
var userId = " ";

document.addEventListener("DOMContentLoaded", function () {
  //getting userId from url
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const param1Value = params.get("userId");
  userId = param1Value;

  const listData = {
    userId: userId,
  };

  fetch("/trustedList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listData),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      displayUserProfile(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

function displayUserProfile(users) {
  users.forEach((user) => {
    var profileInfo = document.getElementById("trustedContactsList");
    const ele = document.createElement("div");
    ele.setAttribute('class','userId');
    
    ele.innerHTML = `
    <p><strong>UserId:</strong> ${userId}</p>
    <p><strong>ContactName:</strong> ${user.contactName}</p>
    <p><strong>PhoneNumber:</strong> ${user.PhoneNumber}</p>
    <!-- Add more profile information as needed -->
     `;
     profileInfo.appendChild(ele);
  });

  
}
