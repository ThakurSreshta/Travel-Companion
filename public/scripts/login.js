window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form'); // Assuming you have a form element with the ID 'login-form'
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value; // Get the username from the form
    const password = document.getElementById('password-input').value; // Get the password from the form


    const formData = {
      username: username,
      password: password,
    }


    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "fail") {
          const em = document.getElementById("errorMsg");
          em.innerHTML = `<h1 style ="color:red">Invalid Details</h1>`;
          setTimeout(() => {
            em.innerHTML = "";
          }, 5000);
          
        }
        else {
          const id = data[0].id;
          window.location.href = "./home.html"+"?userId="+id;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  });


})