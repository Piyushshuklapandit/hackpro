document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.navbar .login-btn');
    const signupButton = document.querySelector('.navbar .signup-btn'); // Changed from signinButton
    const logoutButton = document.querySelector('.navbar .logout-btn');
    const ctaButton = document.querySelector('.cta-btn');
    const loginContainer = document.querySelector('.login-container');
    const signupContainer = document.querySelector('.signup-container'); // Changed from signinContainer
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form'); // Changed from signinForm
    const errorMessageLogin = document.querySelector('.login-container .error-message');
    const errorMessageSignup = document.querySelector('.signup-container .error-message'); // Changed from errorMessageSignin
    const heroSection = document.querySelector('.hero');
    const infoSections = document.querySelectorAll('.info-section');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Check login status
    const isLoggedIn = localStorage.getItem('username');
    if (isLoggedIn) {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        logoutButton.style.display = 'inline-flex';
    }

    // Ensure hero section is visible
    if (heroSection) {
        heroSection.classList.add('visible');
    } else {
        console.error('Hero section not found in the DOM');
    }

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
        signupContainer.style.display = 'none';
        window.scrollBy({ top: 100, behavior: 'smooth' });
    });

    // Sign-up button click (Changed from Sign-in)
    signupButton.addEventListener('click', () => {
        signupContainer.style.display = 'block';
        loginContainer.style.display = 'none';
        window.scrollBy({ top: 100, behavior: 'smooth' });
    });

    // CTA button click (triggers login)
    ctaButton.addEventListener('click', () => {
        if (!isLoggedIn) {
            loginContainer.style.display = 'block';
            signupContainer.style.display = 'none';
            window.scrollBy({ top: 100, behavior: 'smooth' });
        } else {
            // If already logged in, redirect to home page
            window.location.href = 'home.html';
        }
    });

    // Close buttons for popups
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'none';
        });
    });

    // Logout button click
    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        loginButton.style.display = 'inline-flex';
        signupButton.style.display = 'none'; // Hide Sign Up after logout
        logoutButton.style.display = 'none';
        alert('Logged out successfully!');
        window.location.href = 'index.html'; // Redirect to login page
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
            signupButton.style.display = 'none';
            logoutButton.style.display = 'inline-flex';
            window.location.href = 'home.html'; // Redirect to home page
        } else {
            errorMessageLogin.textContent = 'Invalid username or password.';
        }
    });

    // Sign-up form submission (Changed from Sign-in)
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        // Store the new user's credentials in localStorage
        if (username && password) {
            errorMessageSignup.textContent = '';
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Sign-up successful! Please log in.');
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block'; // Prompt user to log in after signing up
        } else {
            errorMessageSignup.textContent = 'Please enter a valid username and password.';
        }
    });
});