var userId = " ";

//adding trustedContacts
const addContactForm = document.getElementById("add-trusted-contact-form");

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  //getting userId from url
  const homeLink = document.getElementById("homeLink");
  const profileLink = document.getElementById("profileLink");
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
});
addContactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const contactNameInput = document.getElementById("contactName");
  const PhoneNumberInput = document.getElementById("PhoneNumber");

  const contactName = contactNameInput.value;
  const PhoneNumber = PhoneNumberInput.value;

  const listData = {
    userId: userId,
    contactName: contactName,
    PhoneNumber: PhoneNumber,
  };

  if (contactName && PhoneNumber) {
    // Send a POST request to the server
    fetch("/add-trusted-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
