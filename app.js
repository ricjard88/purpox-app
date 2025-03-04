// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Screen navigation
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginScreen.classList.remove('active');
    registerScreen.classList.add('active');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerScreen.classList.remove('active');
    loginScreen.classList.add('active');
});

// Login form handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // For demo purposes - replace with real authentication later
    alert(`Login attempt with: ${email}`);
    // In a real app, you would use Firebase authentication here
});

// Register form handling
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // For demo purposes - replace with real registration later
    alert(`Account creation for: ${name} (${email})`);
    // In a real app, you would use Firebase authentication here
});
