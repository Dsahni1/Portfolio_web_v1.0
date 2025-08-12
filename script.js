// Ensure profile image loads correctly
function ensureProfileImageLoads() {
    const profileImg = document.querySelector('.profile-photo');
    const placeholder = document.querySelector('.profile-placeholder');
    
    if (!profileImg) return;
    
    // Use the correct image URL from the HTML
    const imageUrl = 'https://mywebsbucket.s3.us-east-1.amazonaws.com/portfolio_images/2.jpg?v=1.0';
    
    // Create a test image to verify it loads
    const testImg = new Image();
    testImg.crossOrigin = 'anonymous';
    
    testImg.onload = function() {
        console.log('✅ Profile image verified and loaded successfully');
        // Image loaded successfully, make sure it's displayed
        profileImg.style.display = 'block';
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    };
    
    testImg.onerror = function() {
        console.error('❌ Failed to load profile image, showing placeholder');
        // Show placeholder if image fails
        if (placeholder) {
            profileImg.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    };
    
    // Set the source to trigger the load test
    testImg.src = imageUrl;
    
    // Also ensure the main image has the correct source
    profileImg.src = imageUrl;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Ensure profile image loads correctly
    ensureProfileImageLoads();
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    // Add click event listener to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link has a hash (internal link)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Add active navigation highlight on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Remove active class from all links and add to current
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animate skill items on scroll
    const observeElements = (selector, className = 'animate') => {
        const elements = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Observe skill items and project cards
    observeElements('.skill-item');
    observeElements('.project-card');
    
    // Add typing effect to hero subtitle (optional enhancement)
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };
    
    // Initialize typing effect for hero description
    const heroDescription = document.querySelector('.hero-content p');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        setTimeout(() => {
            typeWriter(heroDescription, originalText, 50);
        }, 1000);
    }
    
    // Form submission handling (if you add a contact form later)
    const handleFormSubmission = (formId) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Add form submission logic here
                console.log('Form submitted');
            });
        }
    };
    
    // Navbar background opacity on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Additional CSS for mobile menu (to be added via JavaScript)
const addMobileMenuStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: white;
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                padding: 2rem 0;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .hamburger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
            
            .nav-link.active {
                color: #2c5282;
                font-weight: 600;
            }
        }
        
        .skill-item.animate,
        .project-card.animate {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
};

// Add mobile styles when DOM is loaded
document.addEventListener('DOMContentLoaded', addMobileMenuStyles);
