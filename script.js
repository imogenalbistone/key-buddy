// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation link functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scroll to top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Contact form functionality
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simple form validation
            const requiredFields = ['name', 'phone', 'email', 'service', 'urgency'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!formObject[field] || formObject[field].trim() === '') {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e8dcc0';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = this.querySelector('[name="email"]');
            if (!emailRegex.test(formObject.email)) {
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showMessage('Thank you for your request! We will contact you shortly to discuss your locksmith needs.', 'success');
                
                // Reset form
                this.reset();
                
                // Log form data (in a real application, this would be sent to a server)
                console.log('Form submitted:', formObject);
            } else {
                showMessage('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
            font-weight: 600;
            text-align: center;
            ${type === 'success' ? 
                'background: rgba(46, 125, 50, 0.1); color: #2e7d32; border: 1px solid #4caf50;' : 
                'background: rgba(211, 47, 47, 0.1); color: #d32f2f; border: 1px solid #f44336;'
            }
        `;
        
        // Insert message after form
        const form = document.querySelector('.contact-form');
        form.parentNode.insertBefore(messageDiv, form.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add loading animation for external links
    document.querySelectorAll('.external-link').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Enhanced form interactions
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Add validation styling
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e8dcc0';
            }
        });
        
        // Real-time validation for email
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#f39c12';
                } else {
                    this.style.borderColor = '#e8dcc0';
                }
            });
        }
        
        // Phone number formatting
        if (input.type === 'tel') {
            input.addEventListener('input', function() {
                // Remove non-numeric characters
                let value = this.value.replace(/\D/g, '');
                
                // Format as (XXX) XXX-XXXX
                if (value.length >= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                } else if (value.length >= 3) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                }
                
                this.value = value;
            });
        }
    });

    // Add hover effects to service items and features
    const hoverElements = document.querySelectorAll('.service-item, .feature');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-item, .feature, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add print functionality
    function addPrintStyles() {
        const printStyles = `
            @media print {
                .navbar, .hamburger, .footer { display: none !important; }
                .main-article, .content-wrapper { 
                    box-shadow: none !important; 
                    background: white !important; 
                }
                body { background: white !important; }
                .section { display: block !important; page-break-after: always; }
                .section:last-child { page-break-after: avoid; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = printStyles;
        document.head.appendChild(styleSheet);
    }
    
    addPrintStyles();

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add CSS for keyboard navigation
    const keyboardStyles = `
        .keyboard-navigation *:focus {
            outline: 2px solid #d4af37 !important;
            outline-offset: 2px !important;
        }
    `;
    
    const keyboardStyleSheet = document.createElement('style');
    keyboardStyleSheet.textContent = keyboardStyles;
    document.head.appendChild(keyboardStyleSheet);
});