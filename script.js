// Slider logic
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    document.querySelector('.slider-container').style.transform = `translateX(-${currentSlide * 100}%)`;
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
    console.log(`Searching for ${category} in ${location}`);
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

// Animate statistics when in view
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const current = parseInt(stat.innerText);
        const increment = target / 100;
        
        if (current < target) {
            stat.innerText = Math.ceil(current + increment);
            setTimeout(animateStats, 20);
        }
    });
}

// Start animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
});

observer.observe(document.querySelector('.impact-stats'));

// Active navigation link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
