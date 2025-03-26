document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout-btn');

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('username');
    if (!isLoggedIn) {
        // If not logged in, redirect to the login page
        window.location.href = 'index.html';
    }

    // Logout button click
    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        alert('Logged out successfully!');
        window.location.href = 'index.html'; // Redirect to login page
    });
});