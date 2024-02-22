
document.getElementById('register-button').addEventListener('submit', function (e) {

    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const PhoneNumber = document.getElementById('PhoneNumber').value;
    const age = document.getElementById('age').value;
    const location = document.getElementById('location').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Simple validation checks

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
    }
    else {
        console.log(username, password, email, location, age, PhoneNumber);

        const formData = {
            username: username,
            password: password,
            email: email,
            location: location,
            age: age,
            PhoneNumber: PhoneNumber,
        }


        // console.log(JSON.stringify(formData));

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = "./index.html";
            })
            .catch((error) => {
                console.log(error);
            })
    }





});

