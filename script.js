// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initCounters();
    initProjectFilter();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffects();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Close mobile menu when clicking on a link (solo si no es dropdown)
    if (navLinks.length > 0 && hamburger && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // No cerrar si es un dropdown
                const parentItem = this.closest('.nav-item');
                if (parentItem && parentItem.classList.contains('dropdown')) {
                    return;
                }
                
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active navigation link highlighting
    if (navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Click activo: mueve el subrayado dorado al link clickeado
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Solo aplica a links internos (href con #) o de la misma página
                navLinks.forEach(l => l.classList.remove('is-active'));
                this.classList.add('is-active');
            });
        });
    }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for different elements
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                } else if (entry.target.classList.contains('about-card')) {
                    animateAboutCard(entry.target);
                } else if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .about-card, .project-card, .contact-card, .section-header'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Animate service cards with stagger effect
function animateServiceCard(card) {
    const cards = document.querySelectorAll('.service-card');
    const index = Array.from(cards).indexOf(card);
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
}

// Animate about cards
function animateAboutCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'translateX(0)';
}

// Animate project cards
function animateProjectCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
}

// Quality badges animation for hero stats
function initCounters() {
    const statItems = document.querySelectorAll('.hero-stats .stat-item');
    
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatItem(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => {
        statObserver.observe(item);
    });
}

function animateStatItem(item) {
    const icon = item.querySelector('.stat-icon');
    const label = item.querySelector('.stat-label');
    
    // Initial state
    icon.style.transform = 'scale(0) rotate(-180deg)';
    label.style.opacity = '0';
    label.style.transform = 'translateY(20px)';
    
    // Animate icon
    setTimeout(() => {
        icon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        icon.style.transform = 'scale(1) rotate(0deg)';
    }, 200);
    
    // Animate label
    setTimeout(() => {
        label.style.transition = 'all 0.5s ease';
        label.style.opacity = '1';
        label.style.transform = 'translateY(0)';
    }, 400);
}

// Project filtering functionality
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Simulate form submission
                submitForm();
            }
        });
    }

    // Add input animations
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function validateForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;

    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (input && (!data[field] || data[field].trim() === '')) {
            showFieldError(input, 'Este campo es requerido');
            isValid = false;
        } else if (input) {
            clearFieldError(input);
        }
    });

    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError(document.getElementById('email'), 'Ingrese un email válido');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    if (!input) return;
    
    clearFieldError(input);
    input.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    if (input.parentElement) {
        input.parentElement.appendChild(errorDiv);
    }
}

function clearFieldError(input) {
    if (!input) return;
    
    input.style.borderColor = '#e9ecef';
    if (input.parentElement) {
        const existingError = input.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
}

function submitForm() {
    const submitBtn = document.querySelector('button[type="submit"]');
    const form = document.getElementById('contactForm');
    if (!submitBtn || !form) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    const data = new FormData(form);

    fetch('contacto.php', { method: 'POST', body: data })
        .then(r => r.json())
        .then(res => {
            if (res.ok) {
                showNotification('¡Mensaje enviado! Nos pondremos en contacto pronto.', 'success');
                form.reset();
            } else {
                showNotification('Error al enviar. Intenta de nuevo.', 'error');
            }
        })
        .catch(() => showNotification('Error de conexión. Intenta de nuevo.', 'error'))
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects - desactivado (movimiento tosco en hero)
function initParallaxEffects() {
    // sin efecto parallax
}

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Initialize loading animations
    initLoadingAnimations();
    
    // Add scroll to top button
    // addScrollToTopButton();
});

function addCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .about-card, .project-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initLoadingAnimations() {
    // Add initial states for animations
    const animatedElements = document.querySelectorAll('.service-card, .about-card, .project-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
    });
}

/* function addScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #2c5aa0, #1e3f73);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9998;
        box-shadow: 0 8px 30px rgba(44, 90, 160, 0.4);
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
        this.style.boxShadow = '0 12px 40px rgba(44, 90, 160, 0.6)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 8px 30px rgba(44, 90, 160, 0.4)';
    });
} */

// Advanced Interactive Features for Indusalca

// Particle system for hero background
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Advanced product card interactions
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
        
        // Click ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(44, 90, 160, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const titleSpans = document.querySelectorAll('.hero-title .animate-text');
    
    titleSpans.forEach((span, index) => {
        const text = span.textContent;
        span.textContent = '';
        span.style.opacity = '1';
        
        setTimeout(() => {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                span.textContent += text[charIndex];
                charIndex++;
                
                if (charIndex >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 800);
    });
}

// Advanced scroll animations with GSAP-like effects
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('timeline-item')) {
                    animateTimelineItem(element);
                } else if (element.classList.contains('metric-card')) {
                    animateMetricCard(element);
                } else if (element.classList.contains('product-card')) {
                    animateProductCard(element);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.timeline-item, .metric-card, .product-card').forEach(el => {
        observer.observe(el);
    });
}

function animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    const icon = item.querySelector('.timeline-icon');
    
    content.style.transform = 'translateX(-50px)';
    content.style.opacity = '0';
    icon.style.transform = 'scale(0) rotate(-180deg)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        content.style.transform = 'translateX(0)';
        content.style.opacity = '1';
        
        icon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        icon.style.transform = 'scale(1) rotate(0deg)';
    }, 100);
}

function animateMetricCard(card) {
    card.style.transform = 'translateY(30px) scale(0.9)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
    }, Math.random() * 200);
}

function animateProductCard(card) {
    const icon = card.querySelector('.product-icon');
    
    card.style.transform = 'translateY(50px)';
    card.style.opacity = '0';
    
    if (icon) {
        icon.style.transform = 'scale(0) rotate(180deg)';
    }
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        if (icon) {
            setTimeout(() => {
                icon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }
    }, Math.random() * 300);
}

// Interactive background elements
function initInteractiveBackground() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Quality badges animation


// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initParticleSystem();
        initProductCardEffects();
        initTypingAnimation();
        initAdvancedScrollAnimations();
        initInteractiveBackground();
    }, 1000);
});

// Add CSS for ripple animation
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Video functionality
function playVideo() {
    const video = document.getElementById('indusalca-video');
    const overlay = document.querySelector('.video-overlay');
    
    if (video && overlay) {
        video.play();
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        
        video.addEventListener('pause', () => {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        });
        
        video.addEventListener('ended', () => {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        });
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for new navigation items
    const newNavLinks = document.querySelectorAll('a[href="#values"], a[href="#industries"], a[href="#order"]');
    newNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// WhatsApp floating button functionality
function closeWhatsAppMessage() {
    const message = document.getElementById('whatsapp-message');
    if (message) {
        message.classList.add('hidden');
    }
}

// Auto-hide message after 10 seconds
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const message = document.getElementById('whatsapp-message');
        if (message && !message.classList.contains('hidden')) {
            message.classList.add('hidden');
        }
    }, 10000);
    
    // Show message again on hover
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', () => {
            const message = document.getElementById('whatsapp-message');
            if (message) {
                message.classList.remove('hidden');
            }
        });
    }
});
// Product Carousel functionality
window.carousels = {};

window.initCarousels = function() {
    document.querySelectorAll('.product-carousel').forEach(carousel => {
        const carouselId = carousel.getAttribute('data-carousel');
        const track = carousel.querySelector('.carousel-track');
        const images = track.querySelectorAll('img');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        window.carousels[carouselId] = {
            currentIndex: 0,
            totalImages: images.length,
            track: track
        };
        
        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => window.goToSlide(carouselId, index));
            dotsContainer.appendChild(dot);
        });
        
        window.updateCarousel(carouselId);
    });
}

window.moveCarousel = function(carouselId, direction) {
    const carousel = window.carousels[carouselId];
    if (!carousel) return;
    
    carousel.currentIndex += direction;
    
    if (carousel.currentIndex < 0) {
        carousel.currentIndex = carousel.totalImages - 1;
    } else if (carousel.currentIndex >= carousel.totalImages) {
        carousel.currentIndex = 0;
    }
    
    window.updateCarousel(carouselId);
}

window.goToSlide = function(carouselId, index) {
    if (!window.carousels[carouselId]) return;
    window.carousels[carouselId].currentIndex = index;
    window.updateCarousel(carouselId);
}

window.updateCarousel = function(carouselId) {
    const carousel = window.carousels[carouselId];
    if (!carousel) return;
    
    const track = carousel.track;
    const offset = -carousel.currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const carouselElement = document.querySelector(`[data-carousel="${carouselId}"]`);
    if (carouselElement) {
        const dots = carouselElement.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === carousel.currentIndex);
        });
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.initCarousels();
});

// Accordion functionality
function toggleAccordion(element) {
    const accordionItem = element.closest('.accordion-item');
    const allItems = document.querySelectorAll('.accordion-item');
    
    // Close all other accordion items
    allItems.forEach(item => {
        if (item !== accordionItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current accordion item
    accordionItem.classList.toggle('active');
}

// Catálogos de productos por sector, organizados por marca
// Estructura: { sector: { marca: [ productos ] } }
const productCatalogs = {
    agroindustria: {
        'monte-blanco': [
            { name: 'SAL RECRISTALIZADA MONTE BLANCO', description: 'SACOS 20KG · SACOS 5KG · BIG BAG', image: 'catalogo/granos/mb recristalizada.jpeg' }
        ],
        'cruz-de-oro': [
            { name: 'SAL REFINADA CRUZ DE ORO', description: 'SACOS 20KG · SACOS 5KG · BIG BAG', image: 'catalogo/granos/co refinada.jpeg' }
        ],
        'condor': [
            { name: 'SAL MARINA GRUESA EL CÓNDOR', description: '1X12 UNIDADES: SALERO 500 GR', image: 'catalogo/granos/condor.jpeg' }
        ]
    },
    hogar: {
        'monte-blanco': [
            { name: 'SAL COMESTIBLE RECRISTALIZADA FINA MONTE BLANCO', description: 'PACAS 20 X 1KG · PACAS 20 X 1/2KG · 1X12 UNIDADES: SALERO 500 gr', image: 'catalogo/granos/mb recristalizada.jpeg' },
            { name: 'ADOBO COMPLETO MONTE BLANCO', description: '12/170GR — POTE 170GR', image: 'catalogo/granos/adobo.jpeg' }
        ],
        'cruz-de-oro': [
            { name: 'SAL COMESTIBLE REFINADA FINA CRUZ DE ORO', description: 'PACAS 20 X 1KG · PACAS 20 X 1/2KG', image: 'catalogo/granos/co refinada.jpeg' }
        ],
        'condor': [
            { name: 'SAL MARINA GRUESA EL CÓNDOR', description: '1X12 UNIDADES: SALERO 500 GR', image: 'catalogo/granos/condor.jpeg' }
        ]
    },
    quesera: {
        'monte-blanco': [
            { name: 'SAL RECRISTALIZADA MONTE BLANCO', description: 'SACOS 20KG · SACOS 5KG · BIG BAG', image: 'catalogo/granos/mb recristalizada.jpeg' }
        ],
        'cruz-de-oro': [
            { name: 'SAL REFINADA CRUZ DE ORO', description: 'SACOS 20KG · SACOS 5KG · BIG BAG', image: 'catalogo/granos/co refinada.jpeg' },
            { name: 'SAL REFINADA CRUZ DE ORO SELLO AZUL', description: 'SACOS 20KG', image: 'catalogo/granos/sello azul.jpeg' }
        ]
    },
    industria: {
        'monte-blanco': [
            { name: 'SAL INDUSTRIAL MONTE BLANCO', description: 'SACOS 20KG', image: 'catalogo/granos/Mb Industrial.jpeg' }
        ]
    },
    textil: {
        'cruz-de-oro': [
            { name: 'SAL REFINADA CRUZ DE ORO SELLO AZUL', description: 'SACOS 20KG', image: 'catalogo/granos/sello azul.jpeg' }
        ]
    },
    aguas: {
        'monte-blanco': [
            { name: 'SAL INDUSTRIAL MONTE BLANCO', description: 'SACOS 20KG', image: 'catalogo/granos/Mb Industrial.jpeg' }
        ]
    },
    agraria: {
        'cruz-de-oro': [
            { name: 'SAL MOLIDA PARA CONSUMO ANIMAL CRUZ DE ORO', description: 'SACOS 20KG', image: 'catalogo/granos/Mb Industrial.jpeg' }
        ]
    },
    piscinas: {
        'monte-blanco': [
            { name: 'SAL INDUSTRIAL MONTE BLANCO', description: 'SACOS 20KG', image: 'catalogo/granos/Mb Industrial.jpeg' }
        ]
    },
    farmaceutica: {
        'monte-blanco': [
            { name: 'SAL INDUSTRIAL MONTE BLANCO', description: 'SACOS 20KG', image: 'catalogo/granos/Mb Industrial.jpeg' }
        ]
    },
    petrolera: {
        'monte-blanco': [
            { name: 'SALT ML/MEDIA MONTE BLANCO', description: 'SACOS 20KG · BIG BAG', image: 'catalogo/granos/mb recristalizada.jpeg' },
            { name: 'SALT ROCK PREMIUM MONTE BLANCO', description: 'SACOS 20KG · BIG BAG', image: 'catalogo/granos/Mb Industrial.jpeg' },
            { name: 'SAL ULTRA FINA MICRONIZADA MONTE BLANCO', description: 'SACOS 20KG · BIG BAG', image: 'catalogo/granos/micronizada.jpeg' }
        ]
    },
    salmuera: {
        'monte-blanco': [
            { name: 'BRINE 10 LPG 0/100 MB', description: 'Salmuera preparada con grano grueso', image: 'catalogo/salmueras/brine 10.png' },
            { name: 'BRINE 10 LPG 0/20 MB',  description: 'Salmuera tratada', image: 'catalogo/salmueras/brine 20.png' },
            { name: 'BRINE 10 LPG 0/10 MB',  description: 'Salmuera preparada con grano fino', image: 'catalogo/salmueras/brine 100.png' }
        ]
    }
};

// Títulos de sectores
const sectorTitles = {
    industria: 'Industria',
    petrolera: 'Industria Petrolera',
    agroindustria: 'Agroindustria',
    quesera: 'Industria Quesera',
    textil: 'Industria Textil',
    farmaceutica: 'Industria Farmacéutica',
    agraria: 'Consumo Animal',
    hogar: 'Hogar - Consumo Masivo',
    aguas: 'Tratamiento de Aguas',
    piscinas: 'Poul Salt',
    salmuera: 'Salmuera'
};

// Configuración de marcas
const brandConfig = {
    'cruz-de-oro': { label: 'Cruz de Oro', logo: 'catalogo/logos_svg/CRUZ DE ORO EDITABLE FINAL-01.svg' },
    'monte-blanco': { label: 'Monte Blanco', logo: 'catalogo/logos_svg/MONTE BLANCO ADOBO-01.svg' },
    'condor': { label: 'Cóndor', logo: 'catalogo/logos_svg/CONDOR LOGO_Mesa de trabajo 1.svg' }
};

// Abrir modal — paso 1: selección de marca
function openProductModal(sector) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = sectorTitles[sector] || sector;

    const sectorData = productCatalogs[sector] || {};
    const BRAND_ORDER = ['monte-blanco', 'cruz-de-oro', 'condor'];
    const brands = BRAND_ORDER.filter(b => sectorData[b]);

    let brandBtns = '';
    brands.forEach(brandKey => {
        const brand = brandConfig[brandKey];
        if (!brand) return;
        brandBtns += `
            <button class="brand-logo-btn" onclick="goToProductPage('${sector}', '${brandKey}')">
                <img src="${brand.logo}" alt="${brand.label}">
                <span>${brand.label}</span>
            </button>`;
    });

    modalBody.innerHTML = `
        <div class="book-flipper" id="bookFlipper">
            <div class="book-page book-front">
                <div class="brand-selector">
                    <p class="brand-selector-hint">Selecciona una marca para ver sus productos</p>
                    <div class="brand-logos-row">${brandBtns}</div>
                </div>
            </div>
            <div class="book-page book-back">
                <button class="book-back-btn" onclick="flipToFront()">
                    <i class="fas fa-arrow-left"></i> Volver a marcas
                </button>
                <div id="brandProductsPanel"></div>
            </div>
        </div>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Nueva función: redirige a la página de productos filtrada
function goToProductPage(sector, brandKey) {
    closeProductModal();
    window.location.href = `productos-sector.html?sector=${sector}&marca=${brandKey}`;
}

/* ============================================================
   LEGACY — Sistema anterior de flip 3D dentro del modal
   Se conserva documentado para reimplementar si se desea.
   Para restaurar: reemplazar goToProductPage() por showBrandProducts()
   en los botones de marca dentro de openProductModal().
   ============================================================

// Flip hacia la cara de productos (LEGACY)
function showBrandProducts_LEGACY(sector, brandKey, btnEl) {
    document.querySelectorAll('.brand-logo-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    const products = (productCatalogs[sector] || {})[brandKey] || [];
    const panel = document.getElementById('brandProductsPanel');
    const brand = brandConfig[brandKey];

    if (!products.length) {
        panel.innerHTML = '<p class="no-products">No hay productos registrados para esta marca en este sector.</p>';
    } else {
        let html = `<h3 class="brand-products-title">
            <img src="${brand.logo}" alt="${brand.label}" class="brand-products-logo">
            ${brand.label}
        </h3><ul class="product-list">`;
        products.forEach((product, idx) => {
            const uid = `prod-${sector}-${brandKey}-${idx}`;
            const specs = getTechnicalDetails(product);
            html += `
            <li class="product-list-item">
                <div class="product-list-row">
                    <img src="${product.image}" alt="${product.name}" class="product-list-thumb">
                    <div class="product-list-info">
                        <span class="product-list-name">${product.name}</span>
                        <span class="product-list-desc">${product.description}</span>
                    </div>
                    <button class="product-sheet-toggle" onclick="toggleSheet('${uid}')" aria-expanded="false" aria-controls="${uid}">
                        <i class="fas fa-chevron-down"></i> Ficha técnica
                    </button>
                </div>
                <div class="product-sheet" id="${uid}" hidden>
                    <table class="specs-table">
                        ${specs.map(s => `<tr><td class="spec-label">${s.label}</td><td class="spec-value">${s.value}</td></tr>`).join('')}
                    </table>
                </div>
            </li>`;
        });
        html += `</ul>`;
        panel.innerHTML = html;
    }

    const flipper = document.getElementById('bookFlipper');
    flipper.classList.add('flipped');
    setTimeout(() => { panel.parentElement.scrollTop = 0; }, 350);
}

// Flip de vuelta a marcas (LEGACY)
function flipToFront_LEGACY() {
    const flipper = document.getElementById('bookFlipper');
    flipper.classList.remove('flipped');
    document.querySelectorAll('.brand-logo-btn').forEach(b => b.classList.remove('active'));
}
============================================================ */

// Toggle ficha técnica inline
function toggleSheet(uid) {
    const sheet = document.getElementById(uid);
    const btn = sheet.previousElementSibling.querySelector('.product-sheet-toggle');
    const isOpen = !sheet.hidden;
    sheet.hidden = isOpen;
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.querySelector('i').className = isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
}

// Cerrar modal de productos
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Ver imagen ampliada del producto
function viewProductImage(imageSrc, productName) {
    const imageModal = document.createElement('div');
    imageModal.className = 'image-modal';
    imageModal.innerHTML = `
        <div class="image-modal-overlay" onclick="this.parentElement.remove()">
            <div class="image-modal-content" onclick="event.stopPropagation()">
                <button class="image-modal-close" onclick="this.closest('.image-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="image-zoom-container">
                    <img src="${imageSrc}" alt="${productName}" id="zoomImage">
                    <div class="zoom-lens"></div>
                </div>
                <h3>${productName}</h3>
            </div>
        </div>
    `;
    document.body.appendChild(imageModal);
    setTimeout(() => {
        imageModal.classList.add('active');
        initImageZoom();
    }, 10);
}

// Inicializar zoom de imagen
function initImageZoom() {
    const img = document.getElementById('zoomImage');
    const lens = document.querySelector('.zoom-lens');
    
    if (!img || !lens) return;
    
    const container = img.parentElement;
    let isZooming = false;
    
    // Configuración del zoom
    const zoomLevel = 2.5;
    
    container.addEventListener('mouseenter', function() {
        lens.style.display = 'block';
        isZooming = true;
    });
    
    container.addEventListener('mouseleave', function() {
        lens.style.display = 'none';
        isZooming = false;
    });
    
    container.addEventListener('mousemove', function(e) {
        if (!isZooming) return;
        
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Posicionar la lupa
        const lensSize = 150;
        let lensX = x - lensSize / 2;
        let lensY = y - lensSize / 2;
        
        // Limitar la lupa dentro de la imagen
        lensX = Math.max(0, Math.min(lensX, rect.width - lensSize));
        lensY = Math.max(0, Math.min(lensY, rect.height - lensSize));
        
        lens.style.left = lensX + 'px';
        lens.style.top = lensY + 'px';
        
        // Calcular la posición del zoom
        const bgX = (lensX + lensSize / 2) * zoomLevel;
        const bgY = (lensY + lensSize / 2) * zoomLevel;
        
        lens.style.backgroundImage = `url('${img.src}')`;
        lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
        lens.style.backgroundPosition = `-${bgX - lensSize / 2}px -${bgY - lensSize / 2}px`;
    });
    
    // Para dispositivos táctiles
    let touchZoom = false;
    
    container.addEventListener('touchstart', function(e) {
        touchZoom = !touchZoom;
        if (touchZoom) {
            lens.style.display = 'block';
            img.style.cursor = 'zoom-out';
        } else {
            lens.style.display = 'none';
            img.style.cursor = 'zoom-in';
        }
    });
    
    container.addEventListener('touchmove', function(e) {
        if (!touchZoom) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const lensSize = 150;
        let lensX = x - lensSize / 2;
        let lensY = y - lensSize / 2;
        
        lensX = Math.max(0, Math.min(lensX, rect.width - lensSize));
        lensY = Math.max(0, Math.min(lensY, rect.height - lensSize));
        
        lens.style.left = lensX + 'px';
        lens.style.top = lensY + 'px';
        
        const bgX = (lensX + lensSize / 2) * zoomLevel;
        const bgY = (lensY + lensSize / 2) * zoomLevel;
        
        lens.style.backgroundImage = `url('${img.src}')`;
        lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
        lens.style.backgroundPosition = `-${bgX - lensSize / 2}px -${bgY - lensSize / 2}px`;
    });
}

// Ver detalles técnicos del producto (compatibilidad con llamadas externas)
function viewProductDetails(sector, brandKey, productIndex) {
    const sectorData = productCatalogs[sector] || {};
    // Soporte para llamada con 2 args (sector, index) — busca en todas las marcas
    let product;
    if (productIndex === undefined) {
        // brandKey es en realidad el índice global
        const allProducts = Object.values(sectorData).flat();
        product = allProducts[brandKey];
    } else {
        product = (sectorData[brandKey] || [])[productIndex];
    }
    if (!product) return;
    
    // Detalles técnicos genéricos basados en el tipo de producto
    const technicalDetails = getTechnicalDetails(product);
    
    const detailsModal = document.createElement('div');
    detailsModal.className = 'details-modal';
    detailsModal.innerHTML = `
        <div class="details-modal-overlay" onclick="this.parentElement.remove()">
            <div class="details-modal-content" onclick="event.stopPropagation()">
                <div class="details-modal-header">
                    <h3>Ficha Técnica</h3>
                    <button class="details-modal-close" onclick="this.closest('.details-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="details-modal-body">
                    <div class="product-detail-header">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h4>${product.name}</h4>
                            <p class="product-detail-size">${product.description}</p>
                        </div>
                    </div>
                    <div class="technical-specs">
                        <h5>Especificaciones Técnicas</h5>
                        <table class="specs-table">
                            ${technicalDetails.map(detail => `
                                <tr>
                                    <td class="spec-label">${detail.label}</td>
                                    <td class="spec-value">${detail.value}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(detailsModal);
    setTimeout(() => detailsModal.classList.add('active'), 10);
}

// Obtener detalles técnicos según el producto
function getTechnicalDetails(product) {
    const isEvaporada = product.name.includes('EVAPORADA');
    const isRefinada = product.name.includes('REFINADA');
    const isRecristalizada = product.name.includes('RECRISTALIZADA');
    const isIndustrial = product.name.includes('INDUSTRIAL');
    const isCruzDeOro = product.name.includes('CRUZ DE ORO');
    const isMonteBlanco = product.name.includes('MONTE BLANCO');
    const isCondor = product.name.includes('CÓNDOR');
    const isSalero = product.name.includes('SALERO');
    const isAdobo = product.name.includes('ADOBO');
    const isSaco = product.description.includes('SACOS');
    const isBigBag = product.description.includes('BIG BAG');
    const isPaca = product.description.includes('PACAS');
    const isCaja = product.description.includes('CAJA');
    
    let details = [
        { label: 'Producto', value: product.name },
        { label: 'Presentación', value: product.description }
    ];

    // Especificaciones para BRINE 10 LPG 0/10 MB
    if (product.name.includes('BRINE 10 LPG 0/10')) {
        details.push(
            { label: 'Descripción', value: 'Salmuera constituida principalmente por cloruro de sodio (NaCl) y otros componentes en mínima proporción como carbonatos y sulfatos. La materia prima pasa por lavado, molienda en húmedo y disolución en agua a densidad de 10 LPG, manteniendo niveles bajos de turbidez y dureza total.' },
            { label: 'Densidad (20°C) (LPG)', value: 'Máximo 10' },
            { label: 'Cloruros (ppm)', value: 'Mínimo 180.000 ppm' },
            { label: 'Turbidez (NTU)', value: 'Máximo 10' },
            { label: 'pH', value: 'Máximo 8' },
            { label: 'Aspecto', value: 'Cristalino' },
            { label: 'Color', value: 'Cristalino' },
            { label: 'Sabor', value: 'Salado' },
            { label: 'Olor', value: 'Característico' }
        );
        return details;
    }

    // Especificaciones para BRINE 10 LPG 0/20 MB
    if (product.name.includes('BRINE 10 LPG 0/20')) {
        details.push(
            { label: 'Descripción', value: 'Salmuera constituida principalmente por cloruro de sodio (NaCl) y otros componentes en mínima proporción como carbonatos, sulfatos y dureza total. Clarificada mediante proceso fisicoquímico en piscinas de sedimentación y tratada con compuestos de coagulación y floculación, removiendo los contaminantes provenientes de las salinas de extracción.' },
            { label: 'Densidad (20°C) (LPG)', value: 'Máximo 10' },
            { label: 'Cloruros (ppm)', value: 'Mínimo 180.000 ppm' },
            { label: 'Turbidez (NTU)', value: 'Máximo 20' },
            { label: 'pH', value: 'Máximo 10' },
            { label: 'Aspecto', value: 'Cristalino' },
            { label: 'Color', value: 'Cristalino' },
            { label: 'Sabor', value: 'Salado' },
            { label: 'Olor', value: 'Característico' }
        );
        return details;
    }

    // Especificaciones para BRINE 10 LPG 0/100 MB
    if (product.name.includes('BRINE 10 LPG 0/100')) {
        details.push(
            { label: 'Descripción', value: 'Salmuera constituida principalmente por cloruro de sodio (NaCl) y otros componentes en mínima proporción como carbonatos y sulfatos, a una densidad de 10 LPG. Materia prima extraída de salinas naturales, sometida a lavado continuo para remover impurezas.' },
            { label: 'Densidad (20°C) (LPG)', value: 'Máximo 10' },
            { label: 'Cloruros (ppm)', value: 'Mínimo 180.000 ppm' },
            { label: 'Turbidez (NTU)', value: 'Máximo 100' },
            { label: 'pH', value: 'Máximo 8.5' },
            { label: 'Aspecto', value: 'Ligeramente turbio' },
            { label: 'Sabor', value: 'Salado' },
            { label: 'Olor', value: 'Característico' }
        );
        return details;
    }

    // Especificaciones para SAL MOLIDA PARA CONSUMO ANIMAL
    if (product.name.includes('CONSUMO ANIMAL') || product.name.includes('MOLIDA PARA CONSUMO')) {
        details.push(
            { label: 'Humedad', value: 'Máximo 1%' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 97%' },
            { label: 'Sulfatos', value: 'Máximo 0.3%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Carbonatos de Calcio', value: 'Máximo 0.15%' },
            { label: 'Material Insoluble', value: 'Máximo 0.1%' },
            { label: 'Aspecto', value: 'Cristalino' },
            { label: 'Color', value: 'Marrón claro o color rojiza dependiendo de las especificaciones del cliente (adición o no de óxido férrico)' },
            { label: 'Sabor', value: 'Salado' },
            { label: 'Olor', value: 'Característico' }
        );
        return details;
    }

    // Especificaciones para SALT ULTRA FINA MICRONIZADA
    if (product.name.includes('ULTRA FINA MICRONIZADA')) {
        details.push(
            { label: 'Descripción', value: 'Sal refinada, evaporada y recristalizada, constituida principalmente por cloruro de sodio (NaCl), extraída de fuentes naturales al aire libre (Salinas), sometida a purificación y recristalización al vacío. Sin yodo ni flúor.' },
            { label: 'Proceso', value: 'Única industria en Venezuela con proceso de recristalización. Planta de seis efectos con tecnología Americana, Alemana, Suiza y Japonesa. Cumple normas ISO 9001-2015.' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 98%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener máximo 0%; malla mesh 70 retiene máximo 7%' },
            { label: 'Aspecto', value: 'Granuloso' },
            { label: 'Color', value: 'Blanco' },
            { label: 'Sabor', value: 'Salado' },
            { label: 'Olor', value: 'Inodoro' }
        );
        return details;
    }

    // Especificaciones para SALT ML/MEDIA
    if (product.name.includes('SALT ML/MEDIA')) {
        details.push(
            { label: 'Descripción', value: 'Fabricada con proceso de Molienda en Húmedo, única en Venezuela. Planta construida con tecnología Americana, Alemana, Suiza y Japonesa. Cumple normas ISO 9001-2015.' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 98%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener máximo 12%; malla mesh 70 pasa máximo 12%' },
            { label: 'Aspecto', value: 'Granuloso' },
            { label: 'Color', value: 'Blanco' },
            { label: 'Sabor', value: 'Salado' },
            { label: 'Olor', value: 'Inodoro' }
        );
        return details;
    }

    // Especificaciones para SALT ROCK PREMIUM
    if (product.name.includes('SALT ROCK PREMIUM')) {
        details.push(
            { label: 'Descripción', value: 'Sal constituida principalmente por cloruro de sodio (NaCl) y otros componentes como carbonatos, sulfatos y cloruros. Extraída de fuentes naturales al aire libre (salinas), sin secado artificial.' },
            { label: 'Humedad', value: 'Máximo 5%' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 98%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.5%' },
            { label: 'Sulfatos', value: 'Máximo 1.5%' },
            { label: 'Calcio', value: 'Máximo 0.30%' },
            { label: 'Magnesio', value: 'Máximo 0.20%' },
            { label: 'Carbonatos', value: 'Máximo 0.15%' },
            { label: 'Carbonato de Calcio', value: 'Máximo 0.25%' },
            { label: 'Aspecto', value: 'Cristalino' },
            { label: 'Color', value: 'Blanco con ligera tonalidad amarillenta' },
            { label: 'Sabor', value: 'Salado' },
            { label: 'Olor', value: 'Característico' }
        );
        return details;
    }

    // Especificaciones para SAL PARA SALMUERA PETROLERA
    if (product.name.includes('SALMUERA PETROLERA')) {
        details.push(
            { label: 'Tipo', value: 'Sal para Salmuera - Sector Petrolero' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 99.5%' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos (SO₄)', value: 'Máximo 0.6%' },
            { label: 'Calcio (Ca)', value: 'Máximo 0.1%' },
            { label: 'Magnesio (Mg)', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) retiene Máximo 2%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (210 µ) retiene Máximo 19%' },
            { label: 'Aplicación', value: 'Preparación de salmueras para fluidos de perforación y completación de pozos petroleros' },
            { label: 'Presentación', value: 'Sacos de 25 kg' }
        );
        return details;
    }

    // Especificaciones detalladas para Cruz de Oro en sacos o big bag (excepto Sello Azul)
    if (isCruzDeOro && (isSaco || isBigBag) && !product.name.includes('SELLO AZUL')) {
        details.push(
            { label: 'Tipo', value: 'Sal Refinada' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 99%' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.15%' },
            { label: 'Anticompactante (Ferrocianuro de Potasio o Sodio)', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener Máximo 12%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (841 µ) debe retener Máximo 19%' },
            { label: 'Yodato', value: '40-70 ppm' },
            { label: 'Fluoruro', value: '200-220 ppm' }
        );
    }
    // Especificaciones detalladas para Cruz de Oro Sello Azul
    else if (isCruzDeOro && (isSaco || isBigBag) && product.name.includes('SELLO AZUL')) {
        details.push(
            { label: 'Tipo', value: 'Sal Refinada' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 95%' },
            { label: 'Humedad', value: 'Máximo 5%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante (Ferrocianuro de Potasio o Sodio)', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener Máximo 12%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (841 µ) debe retener Máximo 19%' },
            { label: 'Yodato', value: '40-70 ppm' },
            { label: 'Fluoruro', value: '200-220 ppm' }
        );
    }
    // Especificaciones para Industrial (debe ir antes de Monte Blanco en sacos)
    else if (isIndustrial) {
        details.push(
            { label: 'Tipo', value: 'Sal Industrial' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 97%' },
            { label: 'Humedad', value: 'Máximo 5%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.5%' },
            { label: 'Sulfatos', value: 'Máximo 1.5%' },
            { label: 'Calcio', value: 'Máximo 0.30%' },
            { label: 'Magnesio', value: 'Máximo 0.20%' },
            { label: 'Carbonatos', value: 'Máximo 0.15%' },
            { label: 'Carbonato de Calcio', value: 'Máximo 0.25%' },
            { label: 'Uso', value: 'Industrial y piscinas' }
        );
    }
    // Especificaciones para SALMUERA PARA INDUSTRIA PETROLERA
    else if (product.name.includes('SALMUERA PARA INDUSTRIA PETROLERA')) {
        details.push(
            { label: 'Tipo', value: 'Salmuera - Sector Petrolero' },
            { label: 'Composición', value: 'Cloruro sódico (NaCl) disuelto en agua' },
            { label: 'Usos', value: 'Fluidos de perforación, completación y workover de pozos petroleros' },
            { label: 'Proceso de Elaboración', value: 'Se obtiene diluyendo sal recristalizada de alta pureza con agua tratada, almacenada en decantadores y filtrada antes de su despacho.' },
            { label: 'Envasado y Transporte', value: 'En contenedores o cisternas.' },
            { label: 'Parámetros Físicos - Medida', value: 'Grados Baumé' },
            { label: 'Parámetros Físicos - Rango', value: 'Desde 0° (mín.) hasta 24.5° (máx.)' },
            { label: 'Densidad', value: 'Hasta 1.197 g/cm³ (salmuera saturada)' },
            { label: 'Parámetros Organolépticos', value: 'Producto inodoro y sabor salino.' },
            { label: 'Cloruro sódico en materia seca', value: '≥ 97%' },
            { label: 'Magnesio como MgO', value: '≤ 20 000 mg/kg' },
            { label: 'Residuo insoluble en agua', value: '≤ 0.5%' },
            { label: 'pH', value: '< 7' },
            { label: 'Arsénico', value: '≤ 0.5 mg/kg' },
            { label: 'Cadmio', value: '≤ 0.5 mg/kg' },
            { label: 'Cobre', value: '≤ 2 mg/kg' },
            { label: 'Mercurio', value: '≤ 0.1 mg/kg' },
            { label: 'Plomo', value: '≤ 2 mg/kg' },
            { label: 'Aditivos', value: 'NO CONTIENE' },
            { label: 'Conservación', value: 'Se recomienda conservación en envase cerrado, alejado de contaminantes.' }
        );
    }
    // Especificaciones para SALMUERA INDUSTRIAL
    else if (product.name.includes('SALMUERA')) {
        details.push(
            { label: 'Composición', value: 'Cloruro sódico (NaCl) con agua' },
            { label: 'Usos', value: 'Industrias Alimenticias y Petrolera' },
            { label: 'Proceso de Elaboración', value: 'Se obtiene diluyendo sal con agua y a continuación se almacena en unos decantadores durante un tiempo determinado, pasando a continuación al tanque de Deposito.' },
            { label: 'Envasado y Transporte', value: 'En contenedores.' },
            { label: 'Parámetros Físicos - Medida', value: 'Grados Baumé' },
            { label: 'Parámetros Físicos - Rango', value: 'Desde 0° (mín.) hasta 24.5° (máx.)' },
            { label: 'Parámetros Organolépticos', value: 'Producto inodoro y sabor salino.' },
            { label: 'Cloruro sódico en materia seca', value: '≥ 97 %' },
            { label: 'Magnesio como MgO', value: '≤ 20 000mg/kg' },
            { label: 'Nitrógeno Total', value: '≤ 20 mg/kg' },
            { label: 'Residuo insoluble en agua', value: '≤ 0,5 %' },
            { label: 'pH', value: '< 7' },
            { label: 'Arsénico', value: '≤ 0,5 mg/kg' },
            { label: 'Cadmio', value: '≤ 0,5 mg/kg' },
            { label: 'Cobre', value: '≤ 2 mg/kg' },
            { label: 'Mercurio', value: '≤ 0,1 mg/kg' },
            { label: 'Plomo', value: '≤ 2 mg/kg' },
            { label: 'Listeria monocitogens', value: '< 100 ufc/ml' },
            { label: 'Clostridium Perfringens', value: 'ausencia/ ml' },
            { label: 'Alérgenos', value: 'Nuestras materias primas y de envasado no contienen alérgenos. En nuestros procesos no manipulamos alérgenos, por lo que no hay posibilidad de contaminación cruzada ni presencia de trazas.' },
            { label: 'Aditivos', value: 'NO CONTIENE' },
            { label: 'Conservación', value: 'Se recomienda su conservación en envase cerrado' }
        );
    }
    // Especificaciones detalladas para Monte Blanco en sacos o big bag
    else if (isMonteBlanco && (isSaco || isBigBag)) {
        details.push(
            { label: 'Tipo', value: 'Sal Recristalizada' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 99.5%' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener Máximo 2%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (841 µ) debe retener Máximo 19%' },
            { label: 'Yodato', value: '40-70 ppm' },
            { label: 'Fluoruro', value: '200-220 ppm' }
        );
    }
    // Especificaciones detalladas para Cruz de Oro en pacas (1kg y 500gr)
    else if (isCruzDeOro && isPaca) {
        details.push(
            { label: 'Tipo', value: 'Sal Evaporada/Refinada' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 98.5%' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener Máximo 2%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (841 µ) debe retener Máximo 19%' },
            { label: 'Yodato', value: '40-70 ppm' },
            { label: 'Fluoruro', value: '200-220 ppm' }
        );
    }
    // Especificaciones detalladas para Monte Blanco en pacas (1kg y 500gr)
    else if (isMonteBlanco && isPaca) {
        details.push(
            { label: 'Tipo', value: 'Sal Recristalizada' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 99%' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.15%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener Máximo 2%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (841 µ) debe retener Máximo 19%' },
            { label: 'Yodato', value: '40-70 ppm' },
            { label: 'Fluoruro', value: '200-220 ppm' }
        );
    }
    // Especificaciones para Cóndor
    else if (isCondor) {
        details.push(
            { label: 'Tipo', value: 'Sal Marina Molida' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Material Insoluble', value: 'Máximo 0.1%' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 99%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/kg' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Yodo', value: '40 – 70 ppm' },
            { label: 'Flúor', value: '200 – 220 ppm' }
        );
    }
    // Especificaciones detalladas para Saleros Monte Blanco 500gr
    else if (isSalero && isCaja) {
        details.push(
            { label: 'Tipo', value: 'Sal Recristalizada' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 98.5%' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener Máximo 2%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (841 µ) debe retener Máximo 19%' },
            { label: 'Yodato', value: '40-70 ppm' },
            { label: 'Fluoruro', value: '200-220 ppm' }
        );
    }
    // Especificaciones para Adobo
    else if (isAdobo) {
        details.push(
            { label: 'Tipo', value: 'Condimento con Sal' },
            { label: 'Cloruro de Sodio (NaCl)', value: 'Mínimo 98.5%' },
            { label: 'Humedad', value: 'Máximo 0.3%' },
            { label: 'Materia Insoluble', value: 'Máximo 0.1%' },
            { label: 'Sulfatos', value: 'Máximo 0.6%' },
            { label: 'Calcio', value: 'Máximo 0.1%' },
            { label: 'Magnesio', value: 'Máximo 0.1%' },
            { label: 'Carbonatos', value: 'Máximo 0.1%' },
            { label: 'Anticompactante', value: 'Máximo 10 mg/Kg' },
            { label: 'Granulometría', value: 'Tamiz N 20 (841 µ) debe retener Máximo 2%' },
            { label: 'Granulometría', value: 'Tamiz N 70 (841 µ) debe retener Máximo 19%' },
            { label: 'Yodato', value: '40-70 ppm' },
            { label: 'Fluoruro', value: '200-220 ppm' },
            { label: 'Ingredientes', value: 'Sal fina, comino, orégano, pimienta, ajo en polvo, cebolla en polvo, glutamato monosódico, dióxido de silicio' }
           
        );
    }
    // Especificaciones generales para Evaporada o Refinada
    else if (isEvaporada || isRefinada) {
        details.push(
            { label: 'Tipo', value: 'Sal Evaporada' },
            { label: 'Pureza (NaCl)', value: 'Mínimo 98%' },
            { label: 'Humedad', value: 'Máximo 5%' },
            { label: 'Granulometría', value: 'Fina y uniforme' },
            { label: 'Color', value: 'Blanco cristalino' }
        );
    }
    // Especificaciones generales para Recristalizada
    else if (isRecristalizada) {
        details.push(
            { label: 'Tipo', value: 'Sal Recristalizada' },
            { label: 'Pureza (NaCl)', value: 'Mínimo 99.0%' },
            { label: 'Humedad', value: 'Máximo 1.0%' },
            { label: 'Granulometría', value: 'Media' },
            { label: 'Color', value: 'Blanco' }
        );
    }
    
    details.push(
        { label: 'Marca', value: isCruzDeOro ? 'Cruz de Oro' : isMonteBlanco ? 'Monte Blanco' : isCondor ? 'Cóndor' : 'Indusalca' },
        { label: 'Origen', value: 'Venezuela' },
        { label: 'Almacenamiento', value: 'Lugar fresco y seco' }
    );
    
    return details;
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductModal();
    }
});

// Abrir acordeón específico desde el navbar
function openAccordionFromNav(section) {
    // Esperar a que la página haga scroll a la sección
    setTimeout(() => {
        const accordionId = `accordion-${section}`;
        const accordionItem = document.getElementById(accordionId);
        
        if (accordionItem) {
            // Cerrar todos los acordeones
            const allItems = document.querySelectorAll('.accordion-item');
            allItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir el acordeón específico
            accordionItem.classList.add('active');
            
            // Scroll suave al acordeón
            setTimeout(() => {
                accordionItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, 500);
}

// Abrir sector específico con modal desde el navbar
function openSectorFromNav(sector) {
    // Esperar a que la página haga scroll a la sección
    setTimeout(() => {
        // Abrir el modal de productos
        openProductModal(sector);
    }, 500);
}

// Manejar dropdowns en móvil
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    // Envolver el texto de los nav-links en un span para mejor control de flex
    document.querySelectorAll('.nav-link').forEach(link => {
        // Solo procesar si no tiene el span ya
        if (!link.querySelector('.nav-text')) {
            const icon = link.querySelector('.dropdown-icon');
            const textContent = Array.from(link.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .join(' ');
            
            if (textContent) {
                // Limpiar nodos de texto
                Array.from(link.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        node.remove();
                    }
                });
                
                // Crear span para el texto
                const textSpan = document.createElement('span');
                textSpan.className = 'nav-text';
                textSpan.textContent = textContent;
                
                // Insertar antes del icono dropdown si existe
                if (icon) {
                    link.insertBefore(textSpan, icon);
                } else {
                    link.appendChild(textSpan);
                }
            }
        }
    });
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            // Solo en móvil
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Toggle active class
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            }
        });
    });
    
    // Cerrar dropdown al hacer clic en un enlace del menú
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Cerrar dropdown
            const dropdown = this.closest('.nav-item.dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.querySelector('.navbar');
        
        if (navMenu && navMenu.classList.contains('active')) {
            // Si el clic no fue dentro del navbar
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Cerrar todos los dropdowns
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        }
    });
});

// Resaltar card de valor cuando se navega desde el navbar
document.addEventListener('DOMContentLoaded', function() {
    // Detectar si la URL tiene un hash de valor
    const hash = window.location.hash;
    if (hash && hash.startsWith('#value-')) {
        setTimeout(() => {
            const valueCard = document.querySelector(hash);
            if (valueCard) {
                valueCard.classList.add('highlight');
                valueCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remover el resaltado después de 2 segundos
                setTimeout(() => {
                    valueCard.classList.remove('highlight');
                }, 2000);
            }
        }, 500);
    }
});

// Agregar resaltado al hacer clic en enlaces de valores
document.querySelectorAll('a[href^="#value-"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetCard = document.querySelector(targetId);
        
        if (targetCard) {
            setTimeout(() => {
                targetCard.classList.add('highlight');
                
                setTimeout(() => {
                    targetCard.classList.remove('highlight');
                }, 2000);
            }, 500);
        }
    });
});

// Función para hacer scroll a una marca específica
function scrollToBrand(brandId) {
    const brandCard = document.getElementById(brandId);
    if (brandCard) {
        // Esperar un momento para que el scroll a la sección se complete
        setTimeout(() => {
            const offsetTop = brandCard.offsetTop - 100; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Agregar efecto de resaltado
            brandCard.classList.add('highlight');
            
            // Remover el resaltado después de 2 segundos
            setTimeout(() => {
                brandCard.classList.remove('highlight');
            }, 2000);
        }, 500);
    }
}

// Agregar clase de resaltado cuando se navega a una marca
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash;
    if (hash && (hash === '#monte-blanco' || hash === '#cruz-de-oro' || hash === '#condor')) {
        setTimeout(() => {
            const brandCard = document.querySelector(hash);
            if (brandCard) {
                brandCard.classList.add('highlight');
                brandCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                setTimeout(() => {
                    brandCard.classList.remove('highlight');
                }, 2000);
            }
        }, 500);
    }
    
    // Inicializar efectos interactivos de marcas
    initBrandInteractions();
});

// Efectos interactivos avanzados para las tarjetas de marca
function initBrandInteractions() {
    const brandCards = document.querySelectorAll('.brand-card');
    
    console.log('🚀 Inicializando interacciones de marca, cards encontrados:', brandCards.length);
    
    if (brandCards.length === 0) {
        console.warn('⚠️ No se encontraron cards de marca');
        return;
    }
    
    brandCards.forEach((card, index) => {
        let particleInterval = null;
        
        console.log(`✅ Card ${index} configurado:`, card);
        
        // Efecto de partículas al hacer hover
        card.addEventListener('mouseenter', () => {
            console.log(`🎯 Mouse entró en card ${index}`);
            
            // Crear partículas inmediatamente
            createBrandParticles(card);
            
            // Continuar creando partículas cada 500ms mientras el mouse esté sobre la tarjeta
            particleInterval = setInterval(() => {
                console.log(`🔄 Generando más partículas para card ${index}`);
                createBrandParticles(card);
            }, 500);
        });
        
        card.addEventListener('mouseleave', () => {
            console.log(`👋 Mouse salió de card ${index}`);
            // Detener la creación de partículas
            if (particleInterval) {
                clearInterval(particleInterval);
                particleInterval = null;
                console.log(`⏹️ Intervalo de partículas detenido para card ${index}`);
            }
        });

        // Click: navegar a la página de la marca
        card.addEventListener('click', () => {
            const brandKey = card.getAttribute('data-brand');
            if (brandKey) window.location.href = `marca.html?marca=${brandKey}`;
        });
        card.style.cursor = 'pointer';
    });
    
    // Animación de entrada para las tarjetas de marca
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    console.log('📍 Card visible en viewport:', entry.target);
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    brandCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
    
    console.log('✨ Inicialización de marcas completada');
}

// Crear partículas decorativas al hacer hover en las marcas - VERSIÓN ULTRA VISIBLE
function createBrandParticles(card) {
    const allCards = document.querySelectorAll('.brand-card');
    const idx = Array.from(allCards).indexOf(card);

    const configs = {
        0: { count: 18, size: 7,  colors: ['rgba(255,255,255,0.85)', 'rgba(210,235,255,0.8)', 'rgba(180,215,255,0.75)'] },
        1: { count: 16, size: 9,  colors: ['rgba(255,215,0,0.85)',   'rgba(255,240,100,0.8)', 'rgba(255,255,255,0.8)'] },
        2: { count: 12, size: 16, colors: ['rgba(255,140,0,0.85)',   'rgba(200,160,80,0.8)', 'rgba(255,200,50,0.75)'] }
    };

    const cfg = configs[idx] ?? configs[0];

    // Genera un clip-path poligonal irregular aleatorio
    function randomPolygon() {
        const pts = 6;
        const points = [];
        for (let i = 0; i < pts; i++) {
            const angle = (i / pts) * 360;
            const r = 35 + Math.random() * 30; // radio 35-65%
            const a = angle + (Math.random() - 0.5) * 30; // ángulo con jitter
            const rad = a * Math.PI / 180;
            const x = Math.round(50 + r * Math.cos(rad));
            const y = Math.round(50 + r * Math.sin(rad));
            points.push(`${x}% ${y}%`);
        }
        return `polygon(${points.join(', ')})`;
    }

    for (let i = 0; i < cfg.count; i++) {
        const particle = document.createElement('div');
        const color    = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
        const startX   = Math.random() * 80 + 10;
        const startY   = Math.random() * 80 + 10;
        const moveX    = (Math.random() - 0.5) * 120;
        const moveY    = (Math.random() - 0.5) * 120 - 40;
        const duration = Math.random() * 1.5 + 1.5;
        const rot      = Math.random() * 45;

        let shapeStyle;
        if (idx === 0) {
            // Monte Blanco: cubo perfecto
            shapeStyle = `border-radius: ${cfg.size * 0.1}px; border: 1px solid rgba(255,255,255,0.45); box-shadow: inset 0 0 ${cfg.size * 0.6}px rgba(255,255,255,0.2);`;
        } else if (idx === 1) {
            // Cruz de Oro: border-radius asimétrico aleatorio
            const r = () => Math.round(Math.random() * 50 + 10);
            shapeStyle = `border-radius: ${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%; border: 1px solid rgba(255,255,255,0.35); box-shadow: inset 0 0 ${cfg.size * 0.5}px rgba(255,255,255,0.15);`;
        } else {
            // Cóndor: polígono irregular con clip-path
            shapeStyle = `clip-path: ${randomPolygon()}; border: none; box-shadow: 0 0 ${cfg.size * 0.4}px ${color};`;
        }

        particle.style.cssText = `
            position: absolute;
            width: ${cfg.size}px;
            height: ${cfg.size}px;
            background: ${color};
            ${shapeStyle}
            left: ${startX}%;
            top: ${startY}%;
            pointer-events: none;
            z-index: 99999;
            opacity: 0;
            transform: rotate(${rot}deg);
            transition: all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform, opacity;
        `;

        card.appendChild(particle);
        particle.offsetHeight;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                particle.style.opacity = '1';
                particle.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rot + 45}deg) scale(0.5)`;
            });
        });

        setTimeout(() => {
            if (particle.parentNode) {
                particle.style.opacity = '0';
                setTimeout(() => { if (particle.parentNode) particle.remove(); }, 300);
            }
        }, duration * 1000);
    }
}
