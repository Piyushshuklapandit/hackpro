document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.navbar .login-btn');
    const signupButton = document.querySelector('.navbar .signup-btn'); // Changed from signinButton
    const logoutButton = document.querySelector('.navbar .logout-btn');
    const loginContainer = document.querySelector('.login-container');
    const signupContainer = document.querySelector('.signup-container'); // Changed from signinContainer
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form'); // Changed from signinForm
    const errorMessageLogin = document.querySelector('.login-container .error-message');
    const errorMessageSignup = document.querySelector('.signup-container .error-message'); // Changed from errorMessageSignin
    const heroSection = document.querySelector('.hero');
    const infoSections = document.querySelectorAll('.info-section');

    // Check login status
    const isLoggedIn = localStorage.getItem('username');
    if (isLoggedIn) {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none'; // Changed from signinButton
        logoutButton.style.display = 'inline-flex';
    }

    // Hero section visibility
    heroSection.classList.add('visible');

    // Intersection Observer for info sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    infoSections.forEach(section => {
        observer.observe(section);
    });

    // Login button click
    loginButton.addEventListener('click', () => {
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none'; // Changed from signinContainer
        window.scrollBy({ top: 100, behavior: 'smooth' });
    });

    // Sign-up button click (Changed from Sign-in)
    signupButton.addEventListener('click', () => {
        signupContainer.style.display = 'block'; // Changed from signinContainer
        loginContainer.style.display = 'none';
        window.scrollBy({ top: 100, behavior: 'smooth' });
    });

    // Logout button click
    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        loginButton.style.display = 'inline-flex';
        signupButton.style.display = 'inline-flex'; // Changed from signinButton
        logoutButton.style.display = 'none';
        alert('Logged out successfully!');
    });

    // Login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Check against stored credentials in localStorage
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            errorMessageLogin.textContent = '';
            alert('Login successful!');
            loginContainer.style.display = 'none';
            loginButton.style.display = 'none';
            signupButton.style.display = 'none'; // Changed from signinButton
            logoutButton.style.display = 'inline-flex';
            // window.location.href = 'main.html'; // Uncomment if main.html exists
        } else {
            errorMessageLogin.textContent = 'Invalid username or password.';
        }
    });

    // Sign-up form submission (Changed from Sign-in)
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value; // Changed from signin-username
        const password = document.getElementById('signup-password').value; // Changed from signin-password

        // Store the new user's credentials in localStorage
        if (username && password) {
            errorMessageSignup.textContent = ''; // Changed from errorMessageSignin
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Sign-up successful! Please log in.');
            signupContainer.style.display = 'none'; // Changed from signinContainer
            loginContainer.style.display = 'block'; // Prompt user to log in after signing up
        } else {
            errorMessageSignup.textContent = 'Please enter a valid username and password.'; // Changed from errorMessageSignin
        }
    });
});