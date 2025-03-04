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

// DOM Elements - Login/Register
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const assessmentScreen = document.getElementById('assessment-screen');
const mainScreen = document.getElementById('main-screen');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// DOM Elements - Assessment
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentQuestionEl = document.getElementById('current-question');
const progressBar = document.getElementById('assessment-progress');
const questions = document.querySelectorAll('.question');

// DOM Elements - Main Screen
const userName = document.getElementById('user-name');
const personalGoal = document.getElementById('personal-goal');
const saveGoalBtn = document.getElementById('save-goal');
const challengeText = document.getElementById('challenge-text');
const affirmationText = document.getElementById('affirmation-text');
const completeBtn = document.getElementById('complete-btn');
const voiceContainer = document.getElementById('voice-container');
const playAffirmationBtn = document.getElementById('play-affirmation');
const streakCount = document.getElementById('streak-count');
const teamStreakCount = document.getElementById('team-streak-count');

// App State
let currentUser = null;
let currentQuestion = 1;
let assessmentAnswers = {};
let challenges = {
    growth: [
        {
            text: "Skill Stretch: Spend 20 minutes learning one small aspect of a new skill.",
            affirmation: "By expanding my knowledge, I create new possibilities for growth."
        },
        {
            text: "Feedback Loop: Ask someone you trust for specific feedback on a recent project.",
            affirmation: "Through feedback, I discover new paths for development and improvement."
        },
        {
            text: "Micro Goal: Set and complete one small but challenging goal today.",
            affirmation: "Each small victory builds the foundation for greater achievements."
        }
    ],
    presence: [
        {
            text: "Sensory Reset: Take a 3-minute break to notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
            affirmation: "As I engage my senses, I experience the richness of the present moment."
        },
        {
            text: "Single-Task Focus: Choose one routine activity and perform it with complete attention to the sensory experience.",
            affirmation: "When I give my full attention to each experience, I discover joy in simplicity."
        },
        {
            text: "Tech Boundary: Set a specific 2-hour period today where you'll keep your phone in another room.",
            affirmation: "By creating boundaries with technology, I reclaim my attention and presence."
        }
    ],
    clarity: [
        {
            text: "Decision Journal: Make one decision today with deliberate clarity, writing down your reasoning and alternatives considered.",
            affirmation: "Each deliberate decision strengthens my confidence and clarity."
        },
        {
            text: "Assertion Practice: In your next conversation, express one opinion without qualifying language or unnecessary apologies.",
            affirmation: "When I speak with conviction, I inspire trust in myself and others."
        },
        {
            text: "Priority Declaration: Write down the three most important tasks for tomorrow and commit to completing them first.",
            affirmation: "Clear priorities create a path through complexity toward what truly matters."
        }
    ],
    connection: [
        {
            text: "Curiosity Conversation: Ask someone an unexpected question that goes beyond small talk, and listen to understand.",
            affirmation: "Through genuine curiosity, I create space for authentic connection."
        },
        {
            text: "Vulnerability Exchange: Share something slightly personal with someone you trust.",
            affirmation: "When I open up, I create bridges for deeper connection."
        },
        {
            text: "Appreciation Expression: Send a specific, thoughtful message to someone explaining how they've positively impacted your life.",
            affirmation: "Expressing gratitude strengthens the bonds that sustain us."
        }
    ]
};

// Screen navigation
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllScreens();
    registerScreen.classList.add('active');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllScreens();
    loginScreen.classList.add('active');
});

// Login form handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // For demo purposes - replace with real authentication later
    simulateLogin(email);
});

// Register form handling
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // For demo purposes - replace with real registration later
    simulateRegistration(name, email);
});

// Assessment navigation
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 1) {
        showQuestion(currentQuestion - 1);
    }
});

nextBtn.addEventListener('click', () => {
    const currentQuestionRadio = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    
    if (currentQuestionRadio) {
        assessmentAnswers[`q${currentQuestion}`] = currentQuestionRadio.value;
        
        if (currentQuestion < 4) {
            showQuestion(currentQuestion + 1);
        } else {
            // Assessment complete
            completeAssessment();
        }
    } else {
        alert('Please select an option before continuing.');
    }
});

// Challenge completion
completeBtn.addEventListener('click', () => {
    completeBtn.style.display = 'none';
    voiceContainer.style.display = 'block';
    
    // Update streak
    streakCount.textContent = parseInt(streakCount.textContent) + 1;
    
    // In a real app, you would save this to the database
});

// Play affirmation
playAffirmationBtn.addEventListener('click', () => {
    // In a real app, this would play an audio file
    alert('In the real app, this would play a voice affirmation');
});

// Save personal goal
saveGoalBtn.addEventListener('click', () => {
    alert(`Personal goal saved: ${personalGoal.value}`);
    // In a real app, you would save this to the database
});

// Helper functions
function hideAllScreens() {
    loginScreen.classList.remove('active');
    registerScreen.classList.remove('active');
    assessmentScreen.classList.remove('active');
    mainScreen.classList.remove('active');
}

function simulateLogin(email) {
    // Simulated login for demo purposes
    currentUser = {
        name: email.split('@')[0],
        email: email,
        primaryElement: null,
        streak: 3,
        teamStreak: 2
    };
    
    if (currentUser.primaryElement) {
        showMainScreen();
    } else {
        showAssessmentScreen();
    }
}

function simulateRegistration(name, email) {
    // Simulated registration for demo purposes
    currentUser = {
        name: name,
        email: email,
        primaryElement: null,
        streak: 0,
        teamStreak: 0
    };
    
    showAssessmentScreen();
}

function showAssessmentScreen() {
    hideAllScreens();
    resetAssessment();
    assessmentScreen.classList.add('active');
}

function showMainScreen() {
    hideAllScreens();
    mainScreen.classList.add('active');
    
    // Update UI with user data
    userName.textContent = currentUser.name;
    streakCount.textContent = currentUser.streak;
    teamStreakCount.textContent = currentUser.teamStreak;
    
    // Set a random challenge based on user's primary element
    setRandomChallenge();
}

function showQuestion(questionNumber) {
    // Hide all questions
    questions.forEach(q => q.style.display = 'none');
    
    // Show requested question
    document.querySelector(`.question[data-question="${questionNumber}"]`).style.display = 'block';
    
    // Update current question indicator
    currentQuestion = questionNumber;
    currentQuestionEl.textContent = currentQuestion;
    
    // Update progress bar
    progressBar.style.width = `${(currentQuestion / 4) * 100}%`;
    
    // Update navigation button states
    prevBtn.disabled = currentQuestion === 1;
    nextBtn.textContent = currentQuestion === 4 ? 'Finish' : 'Next';
}

function resetAssessment() {
    currentQuestion = 1;
    assessmentAnswers = {};
    showQuestion(1);
    
    // Clear any previously selected options
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

function completeAssessment() {
    // Calculate primary element based on answers
    const elementCounts = {
        growth: 0,
        presence: 0,
        clarity: 0,
        connection: 0
    };
    
    for (const question in assessmentAnswers) {
        elementCounts[assessmentAnswers[question]]++;
    }
    
    // Find element with highest count
    let maxCount = 0;
    let primaryElement = 'growth'; // Default
    
    for (const element in elementCounts) {
        if (elementCounts[element] > maxCount) {
            maxCount = elementCounts[element];
            primaryElement = element;
        }
    }
    
    // Save result and show main screen
    currentUser.primaryElement = primaryElement;
    
    // Show element result before going to main screen
    alert(`Your primary element is: ${primaryElement.toUpperCase()}`);
    
    showMainScreen();
}

function setRandomChallenge() {
    if (!currentUser.primaryElement) return;
    
    const elementChallenges = challenges[currentUser.primaryElement];
    const randomIndex = Math.floor(Math.random() * elementChallenges.length);
    const challenge = elementChallenges[randomIndex];
    
    challengeText.textContent = challenge.text;
    affirmationText.textContent = challenge.affirmation;
    
    // Reset challenge state
    completeBtn.style.display = 'block';
    voiceContainer.style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start with login screen
    hideAllScreens();
    loginScreen.classList.add('active');
});
