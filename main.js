// Handle user signup
document.getElementById('signupForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = event.target[0].value; // Get the username
    const password = event.target[1].value; // Get the password

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === username);
    
    if (existingUser) {
        alert("Username already exists. Please choose another.");
    } else {
        // Store new user data
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Signup successful!");
        // Redirect or clear the form
        event.target.reset();
    }
});

// Handle user login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = event.target[0].value; // Get the username
    const password = event.target[1].value; // Get the password

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find(user => user.username === username && user.password === password);
    
    if (loggedInUser) {
        alert("Login successful!");
        // Redirect to dashboard or other actions
        window.location.href = 'dashboard.html'; // Example redirect
    } else {
        alert("Invalid username or password.");
    }
});
