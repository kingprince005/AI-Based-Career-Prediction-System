// Quiz state management
let currentQuestion = 1;
const totalQuestions = 10; // Updated to match actual questions count

// Questions data
const questions = [
    {
        id: 1,
        text: "Which field excites you the most?",
        options: [
            { value: "IT", icon: "fa-laptop-code", text: "Technology & Coding" },
            { value: "Finance", icon: "fa-chart-line", text: "Finance & Investments" },
            { value: "Marketing", icon: "fa-bullhorn", text: "Marketing & Sales" },
            { value: "Healthcare", icon: "fa-heartbeat", text: "Healthcare & Medicine" },
            { value: "Engineering", icon: "fa-cogs", text: "Engineering" },
            { value: "Creative", icon: "fa-paint-brush", text: "Creative & Arts" },
            { value: "Education", icon: "fa-graduation-cap", text: "Teaching & Research" }
        ]
    },
    {
        id: 2,
        text: "How do you rate your problem-solving skills?",
        options: [
            { value: "Poor", icon: "fa-thumbs-down", text: "Poor" },
            { value: "Average", icon: "fa-minus", text: "Average" },
            { value: "Good", icon: "fa-thumbs-up", text: "Good" },
            { value: "Excellent", icon: "fa-star", text: "Excellent" }
        ]
    },
    {
        id: 3,
        text: "Do you prefer working alone or in a team?",
        options: [
            { value: "Alone", icon: "fa-user", text: "Alone" },
            { value: "Team", icon: "fa-users", text: "In a team" },
            { value: "Both", icon: "fa-user-plus", text: "Both" }
        ]
    },
    {
        id: 4,
        text: "Which work environment suits you best?",
        options: [
            { value: "Corporate", icon: "fa-building", text: "Corporate Office" },
            { value: "Remote", icon: "fa-home", text: "Remote/Freelancing" },
            { value: "Field", icon: "fa-car", text: "Field Work" },
            { value: "Creative", icon: "fa-paint-brush", text: "Creative Work (Design, Media)" },
            { value: "Technical", icon: "fa-flask", text: "Technical Lab/Engineering" }
        ]
    },
    {
        id: 5,
        text: "How do you handle deadlines?",
        options: [
            { value: "Struggle", icon: "fa-exclamation-circle", text: "I struggle with deadlines" },
            { value: "Manageable", icon: "fa-meh", text: "I manage but get stressed" },
            { value: "Good", icon: "fa-smile", text: "I handle them well" },
            { value: "Thriving", icon: "fa-rocket", text: "I thrive under pressure" }
        ]
    },
    {
        id: 6,
        text: "What is your biggest passion?",
        options: [
            { value: "Technology", icon: "fa-laptop-code", text: "Technology & Coding" },
            { value: "Numbers", icon: "fa-calculator", text: "Finance & Data Analysis" },
            { value: "Helping", icon: "fa-hands-helping", text: "Helping People (Healthcare, Teaching)" },
            { value: "Creativity", icon: "fa-palette", text: "Creative Arts & Media" },
            { value: "Entrepreneurship", icon: "fa-briefcase", text: "Starting My Own Business" },
            { value: "Sports", icon: "fa-running", text: "Sports & Fitness" }
        ]
    },
    {
        id: 7,
        text: "Are you comfortable with public speaking?",
        options: [
            { value: "No", icon: "fa-times-circle", text: "No, I avoid it" },
            { value: "Sometimes", icon: "fa-question-circle", text: "Sometimes, if necessary" },
            { value: "Yes", icon: "fa-check-circle", text: "Yes, I enjoy speaking to an audience" }
        ]
    },
    {
        id: 8,
        text: "Do you enjoy working with numbers and data?",
        options: [
            { value: "Hate", icon: "fa-thumbs-down", text: "Not at all" },
            { value: "Neutral", icon: "fa-minus", text: "Neutral" },
            { value: "Love", icon: "fa-thumbs-up", text: "Yes, I love analyzing data" }
        ]
    },
    {
        id: 9,
        text: "How important is creativity in your work?",
        options: [
            { value: "Not Important", icon: "fa-battery-empty", text: "Not important" },
            { value: "Somewhat", icon: "fa-battery-half", text: "Somewhat important" },
            { value: "Very Important", icon: "fa-battery-full", text: "Very important" }
        ]
    },
    {
        id: 10,
        text: "How do you handle stress?",
        options: [
            { value: "Poorly", icon: "fa-sad-tear", text: "I struggle with stress" },
            { value: "Manageable", icon: "fa-meh", text: "I manage but feel overwhelmed" },
            { value: "Good", icon: "fa-smile", text: "I handle stress well" }
        ]
    },
    
    
];

// Initialize quiz
function initializeQuiz() {
    generateQuestions();
    setupEventListeners();
    updateProgress();
}

// Generate question HTML
function generateQuestions() {
    const container = document.querySelector('.questions-container');
    container.innerHTML = ''; // Clear existing questions

    // Create all question elements at once
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = `question ${index === 0 ? 'active' : ''}`;
        questionDiv.setAttribute('data-question', question.id);
        
        questionDiv.innerHTML = `
            <h3>${question.text}</h3>
            <div class="options">
                ${question.options.map(option => `
                    <div class="option-card" data-value="${option.value}">
                        <i class="fas ${option.icon}"></i>
                        <span>${option.text}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(questionDiv);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Option card click handlers
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from siblings
            this.parentElement.querySelectorAll('.option-card').forEach(sibling => {
                sibling.classList.remove('active');
            });
            // Add active class to clicked card
            this.classList.add('active');
        });
    });

    // Form submission
    document.getElementById('quiz-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showResults();
    });
}

function startQuiz() {
    document.getElementById('landing').classList.remove('active-section');
    document.getElementById('landing').classList.add('hidden-section');
    document.getElementById('quiz-section').classList.remove('hidden-section');
    document.getElementById('quiz-section').classList.add('active-section');
    updateProgress();
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = currentQuestion;
}

function nextQuestion() {
    // First check if an option is selected
    const currentQuestionElement = document.querySelector(`.question[data-question="${currentQuestion}"]`);
    if (!currentQuestionElement.querySelector('.option-card.active')) {
        alert('Please select an option before proceeding.');
        return;
    }

    if (currentQuestion < totalQuestions) {
        // Hide current question
        currentQuestionElement.classList.remove('active');
        
        // Increment question counter
        currentQuestion++;
        
        // Show next question
        const nextQuestionElement = document.querySelector(`.question[data-question="${currentQuestion}"]`);
        if (nextQuestionElement) {
            nextQuestionElement.classList.add('active');
            updateProgress();

            // Show submit button on last question
            if (currentQuestion === totalQuestions) {
                document.querySelector('.btn-next').style.display = 'none';
                document.querySelector('.btn-submit').style.display = 'block';
            }
        } else {
            console.error(`Question ${currentQuestion} not found`);
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        // Hide current question
        document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.remove('active');
        
        // Decrement question counter
        currentQuestion--;
        
        // Show previous question
        document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active');
        updateProgress();

        // Make sure next button is visible and submit is hidden when going back
        document.querySelector('.btn-next').style.display = 'block';
        document.querySelector('.btn-submit').style.display = 'none';
    }
}

function showResults() {
    // Collect all responses
    const responses = collectResponses();
    
    // Check if all questions are answered
    if (Object.keys(responses).length < totalQuestions) {
        alert(`Please answer all ${totalQuestions} questions before submitting.`);
        return;
    }
    
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.remove('active-section');
    document.getElementById('quiz-section').classList.add('hidden-section');
    document.getElementById('results-section').classList.remove('hidden-section');
    document.getElementById('results-section').classList.add('active-section');
    
    // Analyze and display results
    analyzeResponses(responses);
}

// Collect all responses from the quiz
function collectResponses() {
    const responses = {};
    document.querySelectorAll('.question').forEach(question => {
        const questionId = question.dataset.question;
        const selectedOption = question.querySelector('.option-card.active');
        if (selectedOption) {
            responses[questionId] = selectedOption.dataset.value;
        }
    });
    return responses;
}

function retakeQuiz() {
    location.reload();
}

function saveResults() {
    const results = {
        timestamp: new Date().toISOString(),
        responses: collectResponses(),
        matches: findBestMatches(calculateCareerScores(collectResponses()))
    };
    
    // Save to localStorage
    const savedResults = JSON.parse(localStorage.getItem('careerQuizResults') || '[]');
    savedResults.push(results);
    localStorage.setItem('careerQuizResults', JSON.stringify(savedResults));
    
    alert('Results saved successfully! You can view them in your browser\'s local storage.');
}

// Add missing functions
function analyzeResponses(responses) {
    const scores = calculateCareerScores(responses);
    const matches = findBestMatches(scores);
    
    // Display results in results section
    const resultsContainer = document.querySelector('#results-section .results-container');
    resultsContainer.innerHTML = `
        <h2>Your Top Career Matches</h2>
        <div class="matches-container">
            ${matches.map(match => `
                <div class="match-card">
                    <h3>${match.career}</h3>
                    <p>Match Score: ${match.score}%</p>
                    <p>${match.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function calculateCareerScores(responses) {
    // Career scoring logic
    const scores = {
        'Technology': 0,
        'Finance': 0,
        'Healthcare': 0,
        'Creative': 0,
        'Education': 0,
        'Engineering': 0
    };
    
    // Calculate scores based on responses
    Object.entries(responses).forEach(([questionId, answer]) => {
        // Add points based on answers
        switch(answer) {
            case 'IT':
            case 'Technology':
                scores.Technology += 10;
                break;
            case 'Finance':
            case 'Numbers':
                scores.Finance += 10;
                break;
            case 'Healthcare':
            case 'Helping':
                scores.Healthcare += 10;
                break;
            // Add more scoring logic
        }
    });
    
    return scores;
}

function findBestMatches(scores) {
    // Convert scores to array and sort by value
    const sortedScores = Object.entries(scores)
        .map(([career, score]) => ({
            career,
            score: Math.round(score),
            description: getCareerDescription(career)
        }))
        .sort((a, b) => b.score - a.score);
    
    // Return top 3 matches
    return sortedScores.slice(0, 3);
}

function getCareerDescription(career) {
    const descriptions = {
        'Technology': 'A career in technology involves developing software, managing systems, and solving complex technical problems.',
        'Finance': 'Financial careers focus on managing money, analyzing markets, and helping businesses make financial decisions.',
        'Healthcare': 'Healthcare professionals work to improve people\'s health and well-being through medical care and support.',
        'Creative': 'Creative careers allow you to express artistic talents through design, writing, or other creative mediums.',
        'Education': 'Educators shape future generations through teaching, mentoring, and developing educational content.',
        'Engineering': 'Engineers design and build solutions to technical problems across various industries.'
    };
    return descriptions[career] || 'Career path focusing on professional growth and development.';
}

// User authentication - Single instance
document.addEventListener('DOMContentLoaded', function() {
    const userSection = document.getElementById('userSection');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        userSection.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="dropdown">
                    <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        ${currentUser.fullName || currentUser.email}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        userSection.innerHTML = `
            <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
            <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
        `;
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeQuiz);
    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                        <div class="d-flex align-items-center">
                            <div class="avatar-small me-2">
                                <i class="fas fa-user"></i>
                            </div>
                            ${currentUser.name || currentUser.email}
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                    </ul>
                </li>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="register.html">Register</a>
                </li>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // User is logged in - show avatar and name
            userSection.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link text-white dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            ${currentUser.fullName || currentUser.email}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // User is not logged in - show login/register buttons
            userSection.innerHTML = `
                <button class="uiverse-button login-button" onclick="window.location.href='login.html'">Login</button>
                <button class="uiverse-button signup-button" onclick="window.location.href='register.html'">Sign Up</button>
            `;
        }
    });

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.reload();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const userSection = document.getElementById('userSection');
        
        function updateUserSection() {
            try {
                const currentUser = localStorage.getItem('currentUser');
                
                if (currentUser) {
                    const user = JSON.parse(currentUser);
                    const firstLetter = user.email.charAt(0).toUpperCase();
                    
                    userSection.innerHTML = `
                        <div class="d-flex align-items-center">
                            <div style="width: 40px; height: 40px; background-color: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; cursor: pointer;" 
                                 title="${user.email}">
                                ${firstLetter}
                            </div>
                            <button onclick="handleLogout()" class="btn btn-outline-light btn-sm ms-2">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    `;
                } else {
                    userSection.innerHTML = `
                        <a href="login.html"><button class="uiverse-button login-button me-3">Log In</button></a>
                        <a href="signup.html"><button class="uiverse-button signup-button">Sign Up</button></a>
                    `;
                }
            } catch (error) {
                console.error('Error updating user section:', error);
                userSection.innerHTML = `
                    <a href="login.html"><button class="uiverse-button login-button me-3">Log In</button></a>
                    <a href="signup.html"><button class="uiverse-button signup-button">Sign Up</button></a>
                `;
            }
        }

        function handleLogout() {
            localStorage.removeItem('currentUser');
            updateUserSection();
            window.location.href = 'index.html';
        }

        // Initial update
        updateUserSection();

        // Make handleLogout available globally
        window.handleLogout = handleLogout;
    });

