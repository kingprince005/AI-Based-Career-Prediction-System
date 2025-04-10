/**
 * AI Career Prediction System - Results Processor
 */

// Career data for each category
const careerData = [
    {
        // TECHNICAL (index 0)
        title: "Technology & Engineering",
        description: "You have a strong analytical mind and excel at solving complex technical problems. Your logical thinking and attention to detail make you well-suited for technology-focused careers.",
        roles: ["Software Developer", "Data Scientist", "Systems Analyst", "IT Consultant", "Network Engineer", "AI Specialist", "Cybersecurity Expert", "Cloud Architect"],
        skills: ["Programming", "System Analysis", "Logical Thinking", "Problem Solving", "Technical Documentation", "Data Analysis"]
    },
    {
        // CREATIVE (index 1)
        title: "Creative & Design",
        description: "Your creative thinking and innovative approach make you perfect for careers that value originality and artistic expression. You enjoy finding unique solutions and thinking outside the box.",
        roles: ["UX/UI Designer", "Content Creator", "Marketing Specialist", "Graphic Designer", "Product Designer", "Creative Director", "Digital Media Specialist", "Brand Strategist"],
        skills: ["Design Thinking", "Visual Communication", "Creative Problem Solving", "Storyboarding", "Multimedia Production", "User Research"]
    },
    {
        // BUSINESS (index 2)
        title: "Business & Management",
        description: "You have a natural talent for organization, planning, and execution. Your methodical approach and attention to detail make you ideal for business and administrative roles.",
        roles: ["Project Manager", "Business Analyst", "Operations Manager", "Financial Advisor", "Risk Analyst", "Compliance Specialist", "Supply Chain Manager", "Management Consultant"],
        skills: ["Strategic Planning", "Data Analysis", "Financial Management", "Project Coordination", "Process Optimization", "Business Communication"]
    },
    {
        // SOCIAL (index 3)
        title: "Social & Healthcare",
        description: "You have strong interpersonal skills and genuinely care about helping others. Your empathy and communication abilities make you well-suited for people-oriented professions.",
        roles: ["Healthcare Administrator", "Human Resources Specialist", "Social Worker", "Educational Consultant", "Customer Experience Manager", "Counselor", "Corporate Trainer", "Public Relations Specialist"],
        skills: ["Active Listening", "Empathy", "Conflict Resolution", "Team Leadership", "Client Relationship Management", "Cultural Awareness"]
    }
];

// Hybrid career paths that combine two categories
const hybridPaths = {
    "0_1": [
        { title: "UX/UI Developer", description: "Combine technical coding abilities with design skills to create beautiful and functional interfaces" },
        { title: "Creative Technologist", description: "Bridge the gap between technology and creative design for innovative digital experiences" }
    ],
    "0_2": [
        { title: "Technical Product Manager", description: "Lead technical products with both business acumen and deep technical understanding" },
        { title: "Technology Consultant", description: "Advise businesses on optimal technical solutions for their specific challenges" }
    ],
    "0_3": [
        { title: "Health Informatics Specialist", description: "Apply technology solutions in healthcare settings to improve patient outcomes" },
        { title: "Educational Technology Specialist", description: "Develop and implement technology solutions for learning environments" }
    ],
    "1_2": [
        { title: "Marketing Manager", description: "Combine creative vision with business strategy to develop effective marketing campaigns" },
        { title: "Brand Strategist", description: "Develop creative brand identities while considering business goals and market positioning" }
    ],
    "1_3": [
        { title: "Instructional Designer", description: "Create engaging learning materials and experiences that effectively educate" },
        { title: "User Experience Researcher", description: "Study how people interact with products and services to improve their experience" }
    ],
    "2_3": [
        { title: "Healthcare Administrator", description: "Manage healthcare facilities with both operational efficiency and patient-centered care" },
        { title: "HR Business Partner", description: "Connect human resources strategies with business objectives while supporting employee needs" }
    ]
};

// Function to get hybrid career suggestions
function getHybridCareers(primaryIndex, secondaryIndex) {
    // Sort indices to match our object keys
    const key = [primaryIndex, secondaryIndex].sort().join('_');
    return hybridPaths[key] || [
        { 
            title: "Interdisciplinary Specialist", 
            description: "Create a unique career path that combines your diverse strengths across different fields"
        }
    ];
}

// Main function to analyze quiz results and generate career recommendations
function analyzeCareers(userAnswers) {
    if (!userAnswers || !userAnswers.length) {
        return null;
    }
    
    // Count answers by category
    const categoryCounts = [0, 0, 0, 0]; // Tech, Creative, Business, Social
    
    userAnswers.forEach(answer => {
        if (answer !== null) {
            categoryCounts[answer]++;
        }
    });
    
    // Calculate percentages
    const totalAnswers = userAnswers.length;
    const percentages = categoryCounts.map(count => Math.round((count / totalAnswers) * 100));
    
    // Find primary and secondary career types
    let primaryIndex = 0;
    let primaryPercentage = percentages[0];
    let secondaryIndex = 1;
    let secondaryPercentage = percentages[1];
    
    for (let i = 1; i < percentages.length; i++) {
        if (percentages[i] > primaryPercentage) {
            secondaryIndex = primaryIndex;
            secondaryPercentage = primaryPercentage;
            primaryIndex = i;
            primaryPercentage = percentages[i];
        } else if (percentages[i] > secondaryPercentage && i !== primaryIndex) {
            secondaryIndex = i;
            secondaryPercentage = percentages[i];
        }
    }
    
    // Get career data
    const primaryCareer = careerData[primaryIndex];
    const secondaryCareer = careerData[secondaryIndex];
    const hybridOptions = getHybridCareers(primaryIndex, secondaryIndex);
    
    // Return comprehensive results
    return {
        primary: {
            index: primaryIndex,
            percentage: percentages[primaryIndex],
            title: primaryCareer.title,
            description: primaryCareer.description,
            roles: primaryCareer.roles,
            skills: primaryCareer.skills
        },
        secondary: {
            index: secondaryIndex,
            percentage: percentages[secondaryIndex],
            title: secondaryCareer.title,
            description: secondaryCareer.description,
            roles: secondaryCareer.roles.slice(0, 4) // Just show top 4 roles
        },
        hybrid: hybridOptions,
        allScores: percentages
    };
}

// This function would be called when the quiz is submitted
function processQuizResults(userAnswers) {
    // Return detailed career analysis
    return analyzeCareers(userAnswers);
}

// Display the results in the result container
function displayResults(resultContent, prediction) {
    if (!prediction) {
        resultContent.innerHTML = '<div class="alert alert-danger">Error processing your results. Please try again.</div>';
        return;
    }
    
    // Create primary result section
    const primarySection = document.createElement('div');
    primarySection.className = 'result-section primary-result';
    primarySection.innerHTML = `
        <h3 class="result-title">Your Primary Career Path: ${prediction.primary.title}</h3>
        <div class="result-details">
            <h4>Match: ${prediction.primary.percentage}%</h4>
            <p>${prediction.primary.description}</p>
            <div class="result-subsection">
                <h5>Recommended Roles</h5>
                <ul class="role-list">
                    ${prediction.primary.roles.map(role => `<li>${role}</li>`).join('')}
                </ul>
            </div>
            <div class="result-subsection">
                <h5>Key Skills to Develop</h5>
                <div class="skill-tags">
                    ${prediction.primary.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Create secondary result section
    const secondarySection = document.createElement('div');
    secondarySection.className = 'result-section secondary-result';
    secondarySection.innerHTML = `
        <h3 class="result-title">Your Secondary Career Path: ${prediction.secondary.title}</h3>
        <div class="result-details">
            <h4>Match: ${prediction.secondary.percentage}%</h4>
            <p>${prediction.secondary.description}</p>
            <div class="result-subsection">
                <h5>Alternative Roles to Consider</h5>
                <ul class="role-list">
                    ${prediction.secondary.roles.map(role => `<li>${role}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Create hybrid career section
    const hybridSection = document.createElement('div');
    hybridSection.className = 'result-section hybrid-result';
    hybridSection.innerHTML = `
        <h3 class="result-title">Hybrid Career Paths</h3>
        <p class="hybrid-intro">Based on your combined strengths, you might excel in these interdisciplinary roles:</p>
        <div class="hybrid-options">
            ${prediction.hybrid.map(option => 
                `<div class="hybrid-option">
                    <h4>${option.title}</h4>
                    <p>${option.description}</p>
                </div>`
            ).join('')}
        </div>
    `;
    
    // Create score breakdown section
    const scoreSection = document.createElement('div');
    scoreSection.className = 'result-section score-breakdown';
    scoreSection.innerHTML = `
        <h3 class="result-title">Your Career Aptitude Profile</h3>
        <div class="score-chart">
            <div class="score-bar-container">
                <div class="score-label">Technology & Engineering</div>
                <div class="score-bar-wrapper">
                    <div class="score-bar tech-bar" style="width: ${prediction.allScores[0]}%"></div>
                    <span class="score-value">${prediction.allScores[0]}%</span>
                </div>
            </div>
            <div class="score-bar-container">
                <div class="score-label">Creative & Design</div>
                <div class="score-bar-wrapper">
                    <div class="score-bar creative-bar" style="width: ${prediction.allScores[1]}%"></div>
                    <span class="score-value">${prediction.allScores[1]}%</span>
                </div>
            </div>
            <div class="score-bar-container">
                <div class="score-label">Business & Management</div>
                <div class="score-bar-wrapper">
                    <div class="score-bar business-bar" style="width: ${prediction.allScores[2]}%"></div>
                    <span class="score-value">${prediction.allScores[2]}%</span>
                </div>
            </div>
            <div class="score-bar-container">
                <div class="score-label">Social & Healthcare</div>
                <div class="score-bar-wrapper">
                    <div class="score-bar social-bar" style="width: ${prediction.allScores[3]}%"></div>
                    <span class="score-value">${prediction.allScores[3]}%</span>
                </div>
            </div>
        </div>
    `;
    
    // Create next steps section
    const nextStepsSection = document.createElement('div');
    nextStepsSection.className = 'result-section next-steps';
    nextStepsSection.innerHTML = `
        <h3 class="result-title">Recommended Next Steps</h3>
        <ol class="steps-list">
            <li>Explore courses and learning opportunities in ${prediction.primary.title}</li>
            <li>Connect with professionals in your recommended career paths on LinkedIn</li>
            <li>Research entry-level or internship positions in these fields</li>
            <li>Develop the key skills highlighted in your primary career path</li>
            <li>Consider how you might combine your primary and secondary strengths in a unique role</li>
        </ol>
    `;
    
    // Add all sections to the result content with animation delays
    resultContent.appendChild(primarySection);
    resultContent.appendChild(secondarySection);
    resultContent.appendChild(hybridSection);
    resultContent.appendChild(scoreSection);
    resultContent.appendChild(nextStepsSection);
    
    // Add animations with delay for each section
    setTimeout(() => { primarySection.classList.add('fadeInUp'); }, 100);
    setTimeout(() => { secondarySection.classList.add('fadeInUp'); }, 300);
    setTimeout(() => { hybridSection.classList.add('fadeInUp'); }, 500);
    setTimeout(() => { scoreSection.classList.add('fadeInUp'); }, 700);
    setTimeout(() => { nextStepsSection.classList.add('fadeInUp'); }, 900);
}
