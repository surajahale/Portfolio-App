// ================= NAVBAR ACTIVE LINKS =================
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) current = section.getAttribute('id');
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ================= BURGER MENU =================
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('nav ul');
burger.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active');
});

// ================= SCROLL ANIMATIONS =================
const faders = document.querySelectorAll(
    '.fade-in, .slide-in, .fade-in-left, .fade-in-right, .timeline-item, .project-card'
);

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (entry.target.classList.contains('fade-in-left')) {
            entry.target.classList.add('in-view-left');
        } else if (entry.target.classList.contains('fade-in-right')) {
            entry.target.classList.add('in-view-right');
        } else {
            entry.target.classList.add('in-view');
        }
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(el => appearOnScroll.observe(el));

// ================= SKILL BAR ANIMATION =================
// Skills progress bar animation
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const span = bar.querySelector('span');
                const percent = bar.getAttribute('data-percent');

                span.style.width = percent + '%';

                // Stop observing after animation
                skillObserver.unobserve(bar);
            }
        });
    },
    { threshold: 0.5 }
);

skillBars.forEach(bar => skillObserver.observe(bar));


// ================= DARK / LIGHT MODE =================
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent =
        document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// ================= TYPING EFFECT =================
const typingElements = document.querySelectorAll('.typing-text');
typingElements.forEach(el => {
    const text = el.getAttribute('data-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
});

// ================= HERO PARTICLES =================
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#00ffd5', '#00a89f', '#00ffea'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// ================= PROJECT CAROUSEL (ADDED) =================
const carousel = document.getElementById('projectCarousel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (carousel && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });

    // DRAG / SWIPE SUPPORT
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => isDown = false);
    carousel.addEventListener('mouseup', () => isDown = false);

    carousel.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// Certification scroll animation
const certCards = document.querySelectorAll(".cert-card");

const certObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

certCards.forEach(card => certObserver.observe(card));
// Certificate Image Popup
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".cert-modal .close");

document.querySelectorAll(".cert-card img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = () => modal.style.display = "none";

