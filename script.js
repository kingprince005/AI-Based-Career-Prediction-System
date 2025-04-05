// Quiz state management
let currentQuestion = 1;
const totalQuestions = 20;

// Questions data - all 20 questions
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
    {
        id: 11,
        text: "Do you prefer a structured or flexible work schedule?",
        options: [
            { value: "Structured", icon: "fa-calendar", text: "Structured and routine-based" },
            { value: "Flexible", icon: "fa-random", text: "Flexible and adaptable" }
        ]
    },
    {
        id: 12,
        text: "Which subject do you enjoy the most?",
        options: [
            { value: "Science", icon: "fa-atom", text: "Science & Technology" },
            { value: "Business", icon: "fa-chart-line", text: "Business & Economics" },
            { value: "Arts", icon: "fa-palette", text: "Arts & Humanities" },
            { value: "Social", icon: "fa-users", text: "Social Sciences & Psychology" }
        ]
    },
    {
        id: 13,
        text: "How do you handle failure or setbacks?",
        options: [
            { value: "Learn", icon: "fa-graduation-cap", text: "I learn from my mistakes and improve" },
            { value: "Discouraged", icon: "fa-frown", text: "I feel discouraged but try again" },
            { value: "Struggle", icon: "fa-exclamation-triangle", text: "I struggle to bounce back" },
            { value: "Avoid", icon: "fa-shield-alt", text: "I avoid taking risks to prevent failure" }
        ]
    },
    {
        id: 14,
        text: "What kind of work-life balance do you prefer?",
        options: [
            { value: "Long Hours", icon: "fa-business-time", text: "I don't mind long hours if I love my job" },
            { value: "Balanced", icon: "fa-balance-scale", text: "I prefer a balanced work-life routine" },
            { value: "Minimal Stress", icon: "fa-couch", text: "I want minimal work stress, even if the pay is low" }
        ]
    },
    {
        id: 15,
        text: "Which skill do you think is your strongest?",
        options: [
            { value: "Communication", icon: "fa-comments", text: "Communication & Public Speaking" },
            { value: "Logical", icon: "fa-brain", text: "Logical & Analytical Thinking" },
            { value: "Creativity", icon: "fa-lightbulb", text: "Creativity & Innovation" },
            { value: "Leadership", icon: "fa-crown", text: "Leadership & Management" }
        ]
    },
    {
        id: 16,
        text: "How do you approach decision-making?",
        options: [
            { value: "Logic", icon: "fa-calculator", text: "I rely on logic and data" },
            { value: "Intuition", icon: "fa-heart", text: "I follow my intuition" },
            { value: "Advice", icon: "fa-users", text: "I seek advice from others" },
            { value: "Struggle", icon: "fa-question-circle", text: "I struggle with making decisions" }
        ]
    },
    {
        id: 17,
        text: "Would you prefer working in a corporate office or starting your own business?",
        options: [
            { value: "Corporate", icon: "fa-building", text: "Corporate Office" },
            { value: "Entrepreneurship", icon: "fa-store", text: "Entrepreneurship" },
            { value: "Freelancing", icon: "fa-laptop-house", text: "Freelancing/Remote Work" },
            { value: "Not Sure", icon: "fa-question", text: "Not Sure" }
        ]
    },
    {
        id: 18,
        text: "How do you feel about working under pressure?",
        options: [
            { value: "Thrive", icon: "fa-fire", text: "I thrive under pressure" },
            { value: "Handle", icon: "fa-hand-rock", text: "I can handle it but prefer a relaxed environment" },
            { value: "Struggle", icon: "fa-frown", text: "I struggle with high-pressure situations" }
        ]
    },
    {
        id: 19,
        text: "What impact do you want to make in your career?",
        options: [
            { value: "Innovate", icon: "fa-lightbulb", text: "Create something innovative" },
            { value: "Help", icon: "fa-hands-helping", text: "Help and support others" },
            { value: "Wealth", icon: "fa-money-bill-wave", text: "Make a lot of money" },
            { value: "ProblemSolving", icon: "fa-puzzle-piece", text: "Solve complex problems" }
        ]
    },
    {
        id: 20,
        text: "Would you enjoy a career that requires continuous learning and upskilling?",
        options: [
            { value: "Yes", icon: "fa-book-open", text: "Yes, I love learning and improving" },
            { value: "Sometimes", icon: "fa-book", text: "I'll learn only when necessary" },
            { value: "No", icon: "fa-book-dead", text: "No, I prefer a stable skill set" }
        ]
    }
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
    
    // Analyze responses and show results
    analyzeResponses();
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

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeQuiz); 