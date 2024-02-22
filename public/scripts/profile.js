
window.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.getElementById("profileLink");
    const homeLink = document.getElementById('homeLink');
    const signoutLink = document.getElementById('signoutLink');
    const trustedContactLink = document.getElementById('trustedContactLink');

    
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    const param1Value = params.get('userId');
    userId = param1Value;

    profileLink.onclick = () => {
        window.location.href = "./editprofile.html?userId=" + userId;
    }

    homeLink.onclick = () => {
        window.location.href = "./home.html?userId=" + userId;
    }

    signoutLink.onclick = () =>{
        window.location.href = "./signout.html?userId=" +userId;
    }

    trustedContactLink.onclick = ()=>{
        window.location.href = "./trustedContacts.html?userId=" +userId;
    }


    const formData = {
        userId : userId,
    }
    fetch('/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            displayUserProfile(data);
        }).catch((error) => {
            console.log(error);
        })
})

function displayUserProfile(user) {
    var profileInfo = document.getElementById('profile-Info');
    profileInfo.innerHTML = `
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>PhoneNumber:</strong> ${user.PhoneNumber}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <!-- Add more profile information as needed -->
    `;
}
