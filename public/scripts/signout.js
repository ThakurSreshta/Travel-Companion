var userId = "";
window.addEventListener("DOMContentLoaded", () => {

  const homeLink = document.getElementById("homeLink");
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const params = new URLSearchParams(url.search);
  const param1Value = params.get("userId");
  userId = param1Value;
  // console.log(userId);

  homeLink.onclick = () => {
    window.location.href = "./home.html?userId=" + userId;
  };
});

const signOut = document.getElementById("confirm-sign-out");

signOut.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = "./index.html";
});
