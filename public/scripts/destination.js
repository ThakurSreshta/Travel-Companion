var userId = "";

window.addEventListener("DOMContentLoaded", () => {

  const homeLink = document.getElementById("homeLink");
  const profileLink = document.getElementById("profileLink");
  const signoutLink = document.getElementById("signoutLink");

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const param1Value = params.get("userId");

  userId = param1Value;

  homeLink.onclick = () => {
    window.location.href = "./home.html?userId=" + userId;
  };

  profileLink.onclick = () => {
    window.location.href = "./profile.html?userId=" + userId;
  };
  signoutLink.onclick = () => {
    window.location.href = "./signout.html?userId=" + userId;
  };

});

document
  .getElementById("add-destination-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const destinationName = document.getElementById("destinationName").value;
    const SeatsAvailable = document.getElementById("SeatsAvailable").value;
    const TravelDate = document.getElementById("TravelDate").value;
    const PhoneNumber = document.getElementById("PhoneNumber").value;
    const VehicleName = document.getElementById("VehicleName").value;

    // Simple validation checks

    console.log(
      destinationName,
      SeatsAvailable,
      TravelDate,
      PhoneNumber,
      VehicleName
    );

    const formData = {
      destinationName: destinationName,
      SeatsAvailable: SeatsAvailable,
      TravelDate: TravelDate,
      PhoneNumber: PhoneNumber,
      VehicleName: VehicleName,
      userId : userId
    };

    // console.log(JSON.stringify(formData));

    fetch("/addDestination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const msg = document.getElementById("msg");
        msg.innerHTML = `<h1 style ="color:blue">Updated SucessFully</h1>`;
        setTimeout(() => {
          msg.innerHTML = "";
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  });
