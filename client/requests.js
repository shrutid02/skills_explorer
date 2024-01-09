// script to send POST requests to client and read the response

// Make request to the server using /login route
function login(event) {
    const loginErrorMsg = document.getElementById("login-error-msg");
    event.preventDefault();

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username-field').value,
            password: document.getElementById('password-field').value,
        }),
    })
    .then(response => {
        var status = response.status;
        
        if(status == 200) window.location.href = '/home.html';
        else {
            alert('Invalid username/password. Please try again.');
            window.location.href = '/login.html';
        }
    })
    .catch(error => {
        console.error('Error: ', error);
    });
}

// Make request to the server using /signup route
function signup(event) {
    event.preventDefault(); // Prevent the default form submission

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username-field').value,
            email: document.getElementById('email-field').value,
            password: document.getElementById('password-field').value,
            confirm_password: document.getElementById('confirm-password-field').value
        }),
    })
    .then(response => {
        var status = response.status;
        if(status == 400) {
             alert("Password mismatch. Please try again.");
             window.location.href = "/signup.html"
             return;
        }
        alert("Account created successfully!");
        window.location.href = "/login.html"
        
    })
    .catch(error => {
        console.error('Error: ', error);
    });
}

//Make request to the server using /become_mentor route
function becomeMentor(event) {
    event.preventDefault(); 

    var selectedSkill = document.getElementById('skill').value;
    console.log("skill is ", selectedSkill);

    fetch('http://localhost:3000/become_mentor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            skill:selectedSkill
        }),
    })
    .then(response => {
        var status = response.status;
        if(status == 400) {
             alert("Couldn't update skill. Please try again.");
             window.location.href = "/become_mentor.html"
             return;
        }
        alert("Skill updated successfully! Please wait for a mentee to contact you.");
        window.location.href = "/home.html"
        
    })
    .catch(error => {
        console.error('Error: ', error);
    });
}

//Make request to the server using /find_mentor route
 function findMentor(event) {
    event.preventDefault(); 

    var selectedSkill = document.getElementById('skill-find').value;
    console.log("skill to find is ", selectedSkill);

    mentorDetails = "";

    fetch('http://localhost:3000/find_mentor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            skill:selectedSkill
        }),
    })
    .then(response => {
        var status = response.status;
        if(status == 400) {
             alert("Couldn't find a mentor. Please try again.");
             window.location.href = "/find_mentor.html"
             return;
        }

        return response.text();
        
    }).then(text =>  {
        mentorDetails = text;        
        window.location.href = "/mentor_details.html"

    })
    .catch(error => {
        console.error('Error: ', error);
    });
}

//Make request to the server using /mentor_details route
function displayMentorDetails(){
    fetch('http://localhost:3000/mentor_details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
    })
    .then(response => {
        return response.text();
        
    }).then(text =>  {
        document.getElementById("mentor-details").innerHTML = text;

    })
    .catch(error => {
        console.error('Error: ', error);
    });
}

