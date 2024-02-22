const updateButton = document.getElementById("update-profile-button");
var userId = "";
var updatedData;

window.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.getElementById("homeLink");
  const profileLink = document.getElementById("profileLink");

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const param1Value = params.get("userId");

  userId = param1Value;
  updatedData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    PhoneNumber: document.getElementById("PhoneNumber").value,
    age: document.getElementById("age").value,
    location: document.getElementById("location").value,
    userId: userId,
    // Add more profile fields as needed
  };

  homeLink.onclick = () => {
    window.location.href = "./home.html?userId=" + userId;
  };

  profileLink.onclick = () => {
    window.location.href = "./profile.html?userId=" + userId;
  };

  fetchData(updatedData);

  change(updatedData);
});

function change(updatedData) {
  const form = document.getElementById("update-profile-button");

  const editUserName = document.getElementById("editUserName");
  const editEmail = document.getElementById("editEmail");
  const editAge = document.getElementById("editAge");
  const editLocation = document.getElementById("editLocation");
  const editPhone = document.getElementById("editPhone");

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const ageInput = document.getElementById("age");
  const locationInput = document.getElementById("location");
  const phoneInput = document.getElementById("PhoneNumber");

  const details = {
    username: "editUserName",
    email: "editEmail",
    age: "editAge",
    location: "editLocation",
    phone: "editPhone",
  };

  editButton(editUserName, usernameInput);
  editButton(editEmail, emailInput);
  editButton(editAge, ageInput);
  editButton(editLocation, locationInput);
  editButton(editPhone, phoneInput);

  form.onsubmit = (e) => {
    e.preventDefault();

    updatedData.username = usernameInput.value;
    updatedData.email = emailInput.value;
    updatedData.age = ageInput.value;
    updatedData.location = locationInput.value;
    updatedData.PhoneNumber = phoneInput.value;

    updateData(editUserName, updatedData, details.username);
    updateData(editEmail, updatedData, details.email);
    updateData(editAge, updatedData, details.age);
    updateData(editLocation, updatedData, details.location);
    updateData(editLocation, updatedData, details.phone);

    usernameInput.setAttribute("readonly", true);
    emailInput.setAttribute("readonly", true);
    ageInput.setAttribute("readonly", true);
    locationInput.setAttribute("readonly", true);
    phoneInput.setAttribute("readonly", true);

    const msg = document.getElementById("msg");
    msg.innerHTML = `<h1>Updated SucessFully</h1>`;
    setTimeout(() => {
      msg.innerHTML = "";
    }, 2000);
  };
}

function editButton(field, fieldInput) {
  field.onclick = () => {
    fieldInput.removeAttribute("readonly");
  };
}

function updateData(field, formData, detail) {
  fetch(`/${detail}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetchData(updatedData) {
  fetch("/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("username").value = data.username;
      document.getElementById("email").value = data.email;
      document.getElementById("location").value = data.location;
      document.getElementById("age").value = data.age;
      document.getElementById("PhoneNumber").value = data.PhoneNumber;
      // Populate other fields as needed
    })
    .catch((error) => console.error("Error fetching user profile:", error));
}
