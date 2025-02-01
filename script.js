// Slider logic
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const SLIDE_DURATION = 4000; // 4 seconds

function updateSlides(direction) {
    // Remove existing classes
    slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
    
    // Calculate new positions
    const nextSlide = (currentSlide + direction + slides.length) % slides.length;
    const prevSlide = (currentSlide - direction + slides.length) % slides.length;
    
    // Add new classes
    slides[prevSlide].classList.add('prev');
    slides[currentSlide].classList.add('active');
    slides[nextSlide].classList.add('next');
    
    // Update progress bar
    updateProgress();
}

function moveSlide(direction) {
    // Update dots
    dots[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    dots[currentSlide].classList.add('active');
    
    // Update slides
    updateSlides(direction);
    
    // Reset interval
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveSlide(1), SLIDE_DURATION);
}

// Add touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.hero').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.hero').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swipe left
            moveSlide(1);
        } else {
            // Swipe right
            moveSlide(-1);
        }
    }
}

// Add keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});

// Initialize slider
updateSlides(0);
dots[0].classList.add('active');

// Start auto-advance
let slideInterval = setInterval(() => moveSlide(1), SLIDE_DURATION);

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

// Slider functionality
let slideIndex = 0;
const slides = document.getElementsByClassName('slide');

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
    });
    
    slides[slideIndex].style.display = "block";
}

// Auto-advance slides
setInterval(() => moveSlide(1), 5000);

// Initialize first slide
showSlides(slideIndex);

// Update the stats animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const circles = document.querySelectorAll('.progress-ring-circle');
    
    stats.forEach((stat, index) => {
        const target = parseInt(stat.getAttribute('data-target'));
        const current = parseInt(stat.innerText);
        const increment = target / 100;
        
        if (current < target) {
            stat.innerText = Math.ceil(current + increment);
            
            // Animate the circle
            const circle = circles[index];
            const percentage = (current / target) * 100;
            const circumference = 339.292; // 2 * π * radius
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            
            setTimeout(() => animateStats(), 20);
        }
    });
}

// Start animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            entry.target.querySelectorAll('.progress-ring-circle').forEach(circle => {
                circle.style.strokeDashoffset = 0;
            });
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

// Initialize progress
updateProgress();
