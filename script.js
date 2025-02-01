// Slider logic
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const SLIDE_DURATION = 4000; // 4 seconds

function updateSlides(direction) {
    // Remove existing classes
    slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
    
    // Calculate indices
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    const nextSlide = (currentSlide + 1) % slides.length;
    
    // Add classes
    slides[prevSlide].classList.add('prev');
    slides[currentSlide].classList.add('active');
    slides[nextSlide].classList.add('next');
    
    // Update progress bar
    updateProgress();
}

function moveSlide(direction) {
    // Clear previous interval
    clearInterval(slideInterval);
    
    // Update dots
    dots[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Update dot indicators
    dots[currentSlide].classList.add('active');
    
    // Update slides
    updateSlides(direction);
    
    // Reset interval
    slideInterval = setInterval(() => moveSlide(1), SLIDE_DURATION);
}

// Add click event listeners to arrow buttons
document.querySelector('.prev-slide').addEventListener('click', (e) => {
    e.preventDefault();
    moveSlide(-1);
});

document.querySelector('.next-slide').addEventListener('click', (e) => {
    e.preventDefault();
    moveSlide(1);
});

// Update the goToSlide function
function goToSlide(index) {
    if (index === currentSlide) return;
    
    const direction = index > currentSlide ? 1 : -1;
    
    // Clear previous interval
    clearInterval(slideInterval);
    
    // Update dots
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    dots[currentSlide].classList.add('active');
    
    // Update slides
    updateSlides(direction);
    
    // Reset interval
    slideInterval = setInterval(() => moveSlide(1), SLIDE_DURATION);
}

// Initialize slider
updateSlides(0);
let slideInterval = setInterval(() => moveSlide(1), SLIDE_DURATION);

// Add touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.hero').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
});

document.querySelector('.hero').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    slideInterval = setInterval(() => moveSlide(1), SLIDE_DURATION);
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        moveSlide(difference > 0 ? 1 : -1);
    }
}

// Pause on hover
document.querySelector('.hero').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.hero').addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => moveSlide(1), SLIDE_DURATION);
});

// Add keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});

// Add progress indicator
function updateProgress() {
    const progressBar = document.querySelector('.slide-progress-bar');
    if (progressBar) {
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 50);
    }
}

// Popup logic
function showPopup(id) {
    document.getElementById(id).style.display = "block";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

// Search Bar logic
function searchLocation() {
    const location = document.getElementById('location-search').value;
    const category = document.getElementById('category-filter').value;
    
    // Log the search parameters (replace with actual search functionality)
    console.log(`Searching for ${category || 'all categories'} in ${location}`);
    
    // You can add specific handling for financial support searches here
    if (category === 'financial') {
        // Handle financial support search
        console.log('Searching for financial support opportunities');
    }
}

// Modal functionality
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeBtns = document.getElementsByClassName('close');

loginBtn.onclick = () => loginModal.style.display = "block";
signupBtn.onclick = () => signupModal.style.display = "block";

Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    }
});

window.onclick = function(event) {
    if (event.target == loginModal || event.target == signupModal) {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    }
}

// Update the stats animation
function animateStats() {
    const circles = document.querySelectorAll('.progress-ring-circle');
    
    circles.forEach((circle, index) => {
        const circumference = 339.292; // 2 * π * radius
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            circle.style.strokeDashoffset = 0;
        }, index * 200);
    });
}

// Start animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.impact-stats'));

// Active navigation link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 5000,
    },
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Category filter animation
const categoryFilter = document.getElementById('category-filter');
categoryFilter.addEventListener('change', function() {
    const searchBox = document.querySelector('.search-box');
    searchBox.classList.add('animate__animated', 'animate__pulse');
    
    setTimeout(() => {
        searchBox.classList.remove('animate__animated', 'animate__pulse');
    }, 1000);
});

// Add hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.card-content').style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.card-content').style.transform = 'translateY(0)';
    });
});

// Add dynamic counter for stats
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function updateCauseStats() {
    const stats = document.querySelectorAll('.cause-stats span');
    stats.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('$')) {
            const value = parseInt(text.replace(/[^0-9]/g, ''));
            stat.textContent = '$0';
            animateValue(stat, 0, value, 2000);
        }
    });
}

// Add smooth scroll for buttons
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add dynamic background effect
function initializeBackgroundEffect() {
    const causes = document.querySelector('.featured-causes');
    let offset = 0;
    
    window.addEventListener('scroll', () => {
        offset = window.pageYOffset;
        causes.style.backgroundPosition = `50% ${offset * 0.05}px`;
    });
}

// Initialize all dynamic features
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    initializeSmoothScroll();
    initializeBackgroundEffect();
});
