const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const loginSection = document.getElementById('login-section');

if (localStorage.getItem('loggedInUser')) {
  displayLoggedInState(localStorage.getItem('loggedInUser'));
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('loggedInUser', username);
        displayLoggedInState(username);
    } else {
        loginMessage.textContent = 'Please enter both username and password.';
    }
});

function displayLoggedInState(username) {
    loginSection.innerHTML = `
        <h2>Welcome, ${username}!</h2>
        <button id="logout-button">Logout</button>
    `;

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    location.reload();
  });
}