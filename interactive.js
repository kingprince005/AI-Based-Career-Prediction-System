// Interactive Elements for Homepage

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add scroll animations
    initScrollAnimations();
    
    // Add interactive buttons
    initInteractiveButtons();
    
    // Add interactive cards
    initInteractiveCards();
    
    // Add typing effect
    initTypingEffect();
    
    // Add counters
    initCounters();
    
    // Add smooth scrolling
    initSmoothScrolling();
});

// Initialize Animations
function initAnimations() {
    // Add animation classes to hero elements
    document.querySelector('.hero-section h1').classList.add('slide-left');
    document.querySelector('.hero-section p').classList.add('slide-left', 'delay-200');
    document.querySelector('.hero-buttons').classList.add('fade-in', 'delay-400');
    
    // Add floating animation to hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('float');
    }
    
    // Add pulse animation to CTA buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.classList.add('btn-interactive');
    });
    
    // Add animation to feature icons
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.classList.add('icon-animated');
    });
}

// Initialize Scroll Animations
function initScrollAnimations() {
    // Add 'animate-on-scroll' class to elements
    const elementsToAnimate = [
        '.about-content',
        '.about-card',
        '.testimonial-card',
        '.cta-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
    
    // Make feature cards always visible
    document.querySelectorAll('.feature-card').forEach(card => {
        card.classList.add('visible');
    });
    
    // Make career cards always visible
    document.querySelectorAll('.career-card').forEach(card => {
        card.classList.add('visible');
    });
    
    // Check if elements are visible on scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

// Check element visibility for animations
function checkVisibility() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Initialize Interactive Buttons
function initInteractiveButtons() {
    // Add 3D effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('btn-3d');
        
        // Add click effect
        btn.addEventListener('mousedown', function() {
            this.classList.add('active');
        });
        
        btn.addEventListener('mouseup', function() {
            this.classList.remove('active');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
    
    // Add special effects to Take Quiz button
    const quizButtons = document.querySelectorAll('.take-quiz-btn, a[href="quiz.html"]');
    quizButtons.forEach(btn => {
        btn.classList.add('pulse');
    });
}

// Initialize Interactive Cards
function initInteractiveCards() {
    // Make cards interactive
    const cardSelectors = [
        '.feature-card',
        '.career-card',
        '.testimonial-card',
        '.step-card'
    ];
    
    cardSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(card => {
            card.classList.add('interactive-card');
        });
    });
    
    // Add zoom effect to images
    document.querySelectorAll('.about-card, .testimonial-image').forEach(container => {
        container.classList.add('img-hover-zoom');
    });
}

// Initialize Typing Effect for Hero Headline
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingSpeed = 50; // milliseconds
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Initialize Number Counters
function initCounters() {
    // Animate counters when visible
    const counters = document.querySelectorAll('.counter');
    let started = false;
    
    function startCounters() {
        if (started) return;
        
        const counterSection = document.querySelector('.counter-section');
        if (!counterSection) return;
        
        const counterPosition = counterSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (counterPosition < windowHeight - 100) {
            started = true;
            
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                const increment = target / 100;
                
                const updateCounter = () => {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', startCounters);
}

// Initialize Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
} 