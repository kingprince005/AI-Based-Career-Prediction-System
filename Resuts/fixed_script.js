// Quiz Data
const quizQuestions = [
    {
        question: "Which of these work environments do you prefer?",
        options: [
            "A structured corporate environment with clear processes",
            "A creative and flexible startup culture",
            "Working independently with minimal supervision",
            "A collaborative team-based environment"
        ]
    },
    {
        question: "How do you prefer to solve problems?",
        options: [
            "Using logical analysis and data",
            "By thinking creatively and finding innovative solutions",
            "Following established methods and best practices",
            "Collaborating with others to find solutions"
        ]
    },
    {
        question: "Which of these activities would you enjoy most in your free time?",
        options: [
            "Reading about new scientific discoveries",
            "Creating art or music",
            "Organizing and planning events",
            "Volunteering or helping others"
        ]
    },
    {
        question: "What type of tasks do you enjoy most?",
        options: [
            "Technical and analytical tasks",
            "Creative and design-focused tasks",
            "Organizational and administrative tasks",
            "People-oriented and communication tasks"
        ]
    },
    {
        question: "How do you prefer to make decisions?",
        options: [
            "Based on facts and logical analysis",
            "Based on intuition and what feels right",
            "By weighing the pros and cons methodically",
            "By considering how it affects people"
        ]
    },
    {
        question: "What motivates you the most at work?",
        options: [
            "Solving complex problems and intellectual challenges",
            "Creative freedom and the ability to innovate",
            "Stability and clear expectations",
            "Making a positive impact on others"
        ]
    },
    {
        question: "Which skill would you most like to develop?",
        options: [
            "Technical or analytical skills",
            "Creative or artistic skills",
            "Leadership and management skills",
            "Interpersonal and communication skills"
        ]
    },
    {
        question: "How do you handle deadlines and pressure?",
        options: [
            "I create a logical plan and follow it step-by-step",
            "I work in bursts of inspiration and creativity",
            "I organize my work carefully to ensure everything is done on time",
            "I draw on support from colleagues and work collaboratively"
        ]
    },
    {
        question: "What type of recognition do you value most?",
        options: [
            "Recognition for technical expertise or problem-solving ability",
            "Recognition for creative ideas and innovation",
            "Recognition for reliability and attention to detail",
            "Recognition for teamwork and helping others"
        ]
    },
    {
        question: "What is your preferred way of learning?",
        options: [
            "Through structured courses and reading materials",
            "By experimenting and hands-on practice",
            "Following step-by-step instructions and guides",
            "By discussing and collaborating with others"
        ]
    }
];

// Global variables
let currentQuestionIndex = 0;
let userAnswers = [];

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

// Initialize the quiz
function initializeQuiz() {
    // Set up the total questions count
    document.getElementById('total-questions').textContent = quizQuestions.length;
    
    // Initialize answers array
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // Load the first question
    loadQuestion(currentQuestionIndex);
    
    // Set up button event listeners
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
    
    // Result section buttons
    document.getElementById('retake-btn').addEventListener('click', retakeQuiz);
    document.getElementById('home-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Add animation classes
    document.querySelector('.quiz-container').classList.add('fadeIn');
    document.querySelector('.progress-container').classList.add('fadeIn');
}

// Get appropriate icon for option based on question and option index
function getOptionIcon(questionIndex, optionIndex) {
    // Define icon mappings for each option type
    const iconMappings = [
        // Environment preferences (Q1)
        ['fa-building', 'fa-lightbulb', 'fa-user', 'fa-users'],
        // Problem solving (Q2)
        ['fa-chart-line', 'fa-palette', 'fa-list-check', 'fa-people-group'],
        // Free time activities (Q3)
        ['fa-book', 'fa-paintbrush', 'fa-calendar', 'fa-hand-holding-heart'],
        // Task preferences (Q4)
        ['fa-laptop-code', 'fa-pen-fancy', 'fa-clipboard-list', 'fa-comments'],
        // Decision making (Q5)
        ['fa-calculator', 'fa-heart', 'fa-balance-scale', 'fa-handshake'],
        // Work motivation (Q6)
        ['fa-puzzle-piece', 'fa-lightbulb', 'fa-shield', 'fa-seedling'],
        // Skill development (Q7)
        ['fa-code', 'fa-palette', 'fa-user-tie', 'fa-people-arrows'],
        // Handling deadlines (Q8)
        ['fa-list-ol', 'fa-bolt', 'fa-calendar', 'fa-hands-helping'],
        // Recognition value (Q9)
        ['fa-award', 'fa-lightbulb', 'fa-check-double', 'fa-hands'],
        // Learning style (Q10)
        ['fa-book', 'fa-flask', 'fa-diagram-project', 'fa-chalkboard-user'],
        // Job importance (Q11)
        ['fa-brain', 'fa-palette', 'fa-balance-scale', 'fa-heart'],
        // Project approach (Q12)
        ['fa-magnifying-glass', 'fa-wand-magic', 'fa-sitemap', 'fa-comments'],
        // Team role (Q13)
        ['fa-wrench', 'fa-lightbulb', 'fa-list-check', 'fa-handshake'],
        // Results importance (Q14)
        ['fa-check-double', 'fa-scale-balanced', 'fa-hourglass', 'fa-circle-question'],
        // Risk comfort (Q15)
        ['fa-chart-pie', 'fa-running', 'fa-shield-alt', 'fa-hand-holding-heart'],
        // Public speaking (Q16)
        ['fa-microphone', 'fa-smile', 'fa-eye', 'fa-hands-helping'],
        // Values (Q17)
        ['fa-rocket', 'fa-palette', 'fa-anchor', 'fa-heart'],
        // Conflict approach (Q18)
        ['fa-magnifying-glass', 'fa-lightbulb', 'fa-gavel', 'fa-handshake'],
        // Feedback preference (Q19)
        ['fa-comment-dots', 'fa-star', 'fa-map', 'fa-hand-holding'],
        // Values alignment (Q20)
        ['fa-brain', 'fa-palette', 'fa-balance-scale', 'fa-heart']
    ];
    
    // Use default icons if question index is out of range
    const defaultIcons = ['fa-laptop-code', 'fa-paintbrush', 'fa-briefcase', 'fa-heart'];
    
    if (questionIndex < iconMappings.length) {
        return iconMappings[questionIndex][optionIndex] || defaultIcons[optionIndex];
    }
    
    return defaultIcons[optionIndex];
}

// Get option color based on option index
function getOptionColor(optionIndex) {
    const colors = [
        '#4285F4', // Technical - Blue
        '#DB4437', // Creative - Red
        '#F4B400', // Business - Yellow
        '#0F9D58'  // Social - Green
    ];
    
    return colors[optionIndex];
}

// Load a question by index
function loadQuestion(index) {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const currentQuestionSpan = document.getElementById('current-question');
    const progressBar = document.querySelector('.progress-bar');
    
    // Update question text with animation
    questionElement.classList.remove('fadeIn');
    void questionElement.offsetWidth; // Trigger reflow
    questionElement.classList.add('fadeIn');
    questionElement.textContent = quizQuestions[index].question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add new options with visual elements
    quizQuestions[index].options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[index] === optionIndex) {
            optionDiv.classList.add('selected');
        }
        
        const color = getOptionColor(optionIndex);
        const icon = getOptionIcon(index, optionIndex);
        
        optionDiv.innerHTML = `
            <div class="option-text">${option}</div>
        `;
        
        optionDiv.addEventListener('click', function() {
            selectOption(index, optionIndex);
        });
        
        optionsContainer.appendChild(optionDiv);
        
        // Add staggered animation
        setTimeout(() => {
            optionDiv.classList.add('fadeIn');
        }, 100 * optionIndex);
    });
    
    // Update progress indicators
    currentQuestionSpan.textContent = index + 1;
    const progressPercentage = ((index + 1) / quizQuestions.length) * 100;
    
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    
    // Update button states
    updateButtonStates();
}

// Select an option
function selectOption(questionIndex, optionIndex) {
    // Save the answer
    userAnswers[questionIndex] = optionIndex;
    
    // Update visual selection
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    const selectedOption = options[optionIndex];
    selectedOption.classList.add('selected');
    
    // Add pulse animation to selected option
    selectedOption.classList.remove('pulse');
    void selectedOption.offsetWidth; // Trigger reflow
    selectedOption.classList.add('pulse');
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

// Go to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        // Add exit animation
        const quizContainer = document.querySelector('.question-container');
        quizContainer.classList.add('slideOutRight');
        
        setTimeout(() => {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            quizContainer.classList.remove('slideOutRight');
            quizContainer.classList.add('slideInLeft');
            
            setTimeout(() => {
                quizContainer.classList.remove('slideInLeft');
            }, 500);
        }, 300);
    }
}

// Go to next question
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] !== null) {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            // Add exit animation
            const quizContainer = document.querySelector('.question-container');
            quizContainer.classList.add('slideOutLeft');
            
            setTimeout(() => {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
                quizContainer.classList.remove('slideOutLeft');
                quizContainer.classList.add('slideInRight');
                
                setTimeout(() => {
                    quizContainer.classList.remove('slideInRight');
                }, 500);
            }, 300);
        }
    } else {
        // Show notification if no answer selected
        const notification = document.createElement('div');
        notification.className = 'alert alert-warning alert-dismissible fade show';
        notification.innerHTML = `
            <strong>Please select an answer!</strong> You need to choose an option before proceeding.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.querySelector('.quiz-container').prepend(notification);
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Update navigation button states
function updateButtonStates() {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');
    
    // Previous button
    prevButton.disabled = currentQuestionIndex === 0;
    
    // Next/Submit buttons
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextButton.classList.add('d-none');
        submitButton.classList.remove('d-none');
    } else {
        nextButton.classList.remove('d-none');
        submitButton.classList.add('d-none');
        nextButton.disabled = userAnswers[currentQuestionIndex] === null;
    }
}

// Submit the quiz
function submitQuiz() {
    // Note: This function has been modified and is now just a validation function
    // The actual submission logic is handled by showLoadingOverlay
    
    // Validate all questions are answered
    const unansweredQuestions = userAnswers.findIndex(answer => answer === null);
    
    if (unansweredQuestions !== -1) {
        // Show error and jump to first unanswered question
        alert(`Please answer all questions before submitting. You have ${userAnswers.filter(a => a === null).length} unanswered questions.`);
        currentQuestionIndex = unansweredQuestions;
        loadQuestion(currentQuestionIndex);
        return false;
    }
    
    return true;
}

// Process and display quiz results
function processResults() {
    const resultContent = document.getElementById('result-content');
    
    // Clear previous results
    resultContent.innerHTML = '';
    
    // Get the prediction from the analyzeCareers function
    const prediction = processQuizResults(userAnswers);
    
    // Display the results by calling displayResults from prediction.js
    displayResults(resultContent, prediction);
}

// Retake the quiz
function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // Hide result container
    const resultContainer = document.getElementById('result-container');
    resultContainer.classList.add('fadeOut');
    
    setTimeout(() => {
        resultContainer.classList.add('d-none');
        resultContainer.classList.remove('fadeOut');
        
        // Clear result content for next time
        document.getElementById('result-content').innerHTML = '';
        
        // Show quiz containers
        const quizContainer = document.querySelector('.quiz-container');
        const progressContainer = document.querySelector('.progress-container');
        
        quizContainer.classList.remove('d-none', 'fadeOut');
        progressContainer.classList.remove('d-none', 'fadeOut');
        
        quizContainer.classList.add('fadeIn');
        progressContainer.classList.add('fadeIn');
        
        // Reset to first question
        loadQuestion(0);
    }, 500);
}


function storeQuizAttempt(answers, result) {
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        console.error('No user logged in');
        return;
    }

    // Get existing attempts or initialize new array
    const quizAttempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
    
    // Create new attempt object
    const attempt = {
        email: currentUser.email,
        timestamp: new Date().toISOString(),
        answers: answers,
        result: result
    };
    
    // Add new attempt to array
    quizAttempts.push(attempt);
    
    // Store updated attempts
    localStorage.setItem('quizAttempts', JSON.stringify(quizAttempts));
}

// Modify the submit handler to store the attempt
function handleQuizSubmit() {
    if (validateQuiz()) {
        // Store the attempt before showing results
        storeQuizAttempt(userAnswers, calculateResult());
        showLoadingOverlay();
    }
}

// Submit button functionality
const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleQuizSubmit();
    });
}