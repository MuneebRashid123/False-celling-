// ========== AUTO SLIDER FOR HERO ==========
const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;
let slideInterval;
const totalSlides = slides.length;
const dotsContainer = document.getElementById('sliderDots');
let autoSlideActive = true;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  if (dotsContainer) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  currentSlide = index;
}

function nextSlide() { showSlide((currentSlide + 1) % totalSlides); }
function prevSlide() { showSlide((currentSlide - 1 + totalSlides) % totalSlides); }

function startAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    if (autoSlideActive) nextSlide();
  }, 5000);
}

function resetAutoSlide() {
  if (!autoSlideActive) return;
  clearInterval(slideInterval);
  startAutoSlide();
}

// Create dots
if (dotsContainer) {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      autoSlideActive = true;
      resetAutoSlide();
      showSlide(i);
    });
    dotsContainer.appendChild(dot);
  }
}

// Arrow controls
const prevBtn = document.getElementById('slidePrev');
const nextBtn = document.getElementById('slideNext');
if (prevBtn) prevBtn.addEventListener('click', () => { autoSlideActive = true; resetAutoSlide(); prevSlide(); });
if (nextBtn) nextBtn.addEventListener('click', () => { autoSlideActive = true; resetAutoSlide(); nextSlide(); });

// Pause on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => { autoSlideActive = false; clearInterval(slideInterval); });
heroSection.addEventListener('mouseleave', () => { autoSlideActive = true; startAutoSlide(); });

showSlide(0);
startAutoSlide();

// ========== GALLERY & LIGHTBOX ==========
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&auto=format", cat: "Luxury POP Design" },
  { src: "https://images.unsplash.com/photo-1616486338812-3badae4b4ace?w=700&auto=format", cat: "Modern Gypsum Ceiling" },
  { src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=700&auto=format", cat: "Office LED Integration" },
  { src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=700&auto=format", cat: "Residential 3D Ceiling" },
  { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=700&auto=format", cat: "Contemporary Villa" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&auto=format", cat: "Layered POP + Light" }
];
let currentLightboxIndex = 0;
const galleryContainer = document.getElementById('galleryGrid');
function buildGallery() {
  galleryContainer.innerHTML = '';
  galleryImages.forEach((img, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${img.src}" alt="${img.cat}" loading="lazy"><div class="gallery-caption">${img.cat}</div>`;
    div.addEventListener('click', () => openLightbox(idx));
    galleryContainer.appendChild(div);
  });
}
buildGallery();

const lightbox = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const closeLb = document.querySelector('.close-lightbox');
const prevLb = document.querySelector('.prev-arrow');
const nextLb = document.querySelector('.next-arrow');
function openLightbox(index) { currentLightboxIndex = index; updateLightboxImage(); lightbox.classList.add('active'); document.body.style.overflow = 'hidden'; }
function updateLightboxImage() { lightboxImg.src = galleryImages[currentLightboxIndex].src; lightboxImg.alt = galleryImages[currentLightboxIndex].cat; }
function nextImage() { currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length; updateLightboxImage(); }
function prevImage() { currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length; updateLightboxImage(); }
function closeLightboxFn() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
closeLb.addEventListener('click', closeLightboxFn);
prevLb.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
nextLb.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightboxFn(); });
document.addEventListener('keydown', (e) => { if (!lightbox.classList.contains('active')) return; if (e.key === 'Escape') closeLightboxFn(); if (e.key === 'ArrowLeft') prevImage(); if (e.key === 'ArrowRight') nextImage(); });

// ========== IMPROVED MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

function closeMenu() {
  navLinks.classList.remove('active');
  if (menuOverlay) menuOverlay.classList.remove('active');
  document.body.classList.remove('menu-open');
}

function openMenu() {
  navLinks.classList.add('active');
  if (menuOverlay) menuOverlay.classList.add('active');
  document.body.classList.add('menu-open');
}

if (menuToggle) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', closeMenu);
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 920 && navLinks.classList.contains('active')) {
    closeMenu();
  }
});

// ========== SMOOTH SCROLL (offset for fixed header) ==========
const offset = 80;
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('emailId').value.trim();
    const msg = document.getElementById('projectMsg').value.trim();
    if (!name || !email || !msg) {
      alert("Please fill all fields.");
      return;
    }
    alert(`Thank you ${name}! Your message has been sent. Our team will contact you shortly via WhatsApp or email.`);
    contactForm.reset();
  });
}

// ========== BACK TO TOP ==========
const backTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backTop.classList.add('show');
  else backTop.classList.remove('show');
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== ACTIVE NAVIGATION ON SCROLL ==========
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 90;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute("id");
    }
  });
  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});