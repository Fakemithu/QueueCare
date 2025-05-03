document.addEventListener('DOMContentLoaded', () => {
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Toggle form view 
registerBtn.addEventListener('click', () => {
    container.classList.add('active'); 
}); 

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// REGISTER form submission
document.querySelector('.form-box.register form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Send to backend
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful! You can now log in.');
            document.querySelector('.container').classList.remove('active'); // Switch to login
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    });
});

// LOGIN form submission
document.querySelector('.form-box.login form').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Login submit!');
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Send to backend
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            window.location.href = '/user'; // Redirect to home page
        } else {
            alert('Invalid email or password');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    });
});
});
