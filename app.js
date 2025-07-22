// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const contactForm = document.getElementById('contact-form');

/* =============================
   MOBILE NAVIGATION
   ============================= */
if (navToggle) {
  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

/* =============================
   HEADER SCROLL EFFECT & ACTIVE LINK UPDATE
   ============================= */
window.addEventListener('scroll', () => {
  // Add shadow once scrolled
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Highlight active nav link
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const offset = header ? header.offsetHeight + 50 : 100;
  const currentPos = window.scrollY + offset;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (!link) return;

    if (currentPos >= top && currentPos < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* =============================
   SMOOTH SCROLLING - FIXED
   ============================= */
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (!element) {
    console.log('Element not found:', target);
    return;
  }

  const headerHeight = header ? header.offsetHeight : 80;
  const y = element.offsetTop - headerHeight - 20;
  
  window.scrollTo({ 
    top: y, 
    behavior: 'smooth' 
  });
}

// Fix navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      console.log('Navigating to:', href);
      smoothScroll(href);
    }
  });
});

/* =============================
   HERO BUTTONS - FIXED
   ============================= */
document.addEventListener('DOMContentLoaded', () => {
  const heroCta = document.querySelector('.hero__cta');
  const heroContact = document.querySelector('.hero__contact');
  
  if (heroCta) {
    heroCta.addEventListener('click', (e) => { 
      e.preventDefault();
      console.log('Hero CTA clicked');
      smoothScroll('#projects'); 
    });
  }
  
  if (heroContact) {
    heroContact.addEventListener('click', (e) => { 
      e.preventDefault();
      console.log('Hero contact clicked');
      smoothScroll('#contact'); 
    });
  }
});

/* =============================
   CONTACT FORM - FIXED
   ============================= */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const message = formData.get('message')?.trim() || '';

    console.log('Form submission attempt:', { name, email, message });

    // Validation
    if (!name) {
      alert('Please enter your name.');
      return;
    }
    
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    if (!message) {
      alert('Please enter a message.');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';

    // Simulate form submission with success feedback
    setTimeout(() => {
      alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
      console.log('Form submitted successfully');
    }, 1500);
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* =============================
   RESUME DOWNLOAD - FIXED
   ============================= */
function initResumeDownload() {
  const resumeBtn = document.querySelector('.resume__download');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Resume download clicked');
      
      // Show immediate feedback
      const originalText = resumeBtn.innerHTML;
      resumeBtn.innerHTML = '<span class="resume__download-icon">⏳</span>Preparing...';
      resumeBtn.style.opacity = '0.7';
      
      setTimeout(() => {
        alert('📄 Resume download is ready!\n\nTo enable the actual download, please:\n1. Upload Resume-Pratik.pdf to your server\n2. Update the download link in the HTML\n\nFor now, you can contact Pratik directly at ps175581@gmail.com for his resume.');
        resumeBtn.innerHTML = originalText;
        resumeBtn.style.opacity = '1';
      }, 1000);
    });
  }
}

/* =============================
   SCROLL ANIMATIONS
   ============================= */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.skill-card, .project-card, .experience__item, .education__item');
  
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
  });

  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  animatedElements.forEach((el) => observer.observe(el));
}

/* =============================
   TYPING EFFECT FOR HERO SUBTITLE
   ============================= */
function initTypingEffect() {
  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle && !subtitle.dataset.typed) {
    subtitle.dataset.typed = 'true';
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);
  }
}

/* =============================
   SKILL CARD HOVER EFFECTS
   ============================= */
function initSkillCardEffects() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    const items = card.querySelectorAll('.skill-card__item');
    
    card.addEventListener('mouseenter', () => {
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'scale(1.05)';
        }, index * 50);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      items.forEach(item => {
        item.style.transform = 'scale(1)';
      });
    });
  });
}

/* =============================
   PROJECT CARD INTERACTIONS
   ============================= */
function initProjectCardInteractions() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const techTags = card.querySelectorAll('.tech-tag');
    
    card.addEventListener('mouseenter', () => {
      techTags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-2px)';
          tag.style.boxShadow = '0 4px 8px rgba(30, 58, 138, 0.3)';
        }, index * 100);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      techTags.forEach(tag => {
        tag.style.transform = 'translateY(0)';
        tag.style.boxShadow = 'none';
      });
    });
  });
}

/* =============================
   SCROLL PROGRESS BAR
   ============================= */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progressBar);

  const progressFill = progressBar.querySelector('.scroll-progress-bar');

  // Add styles for progress bar
  const progressStyles = document.createElement('style');
  progressStyles.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(30, 58, 138, 0.1);
      z-index: 9999;
    }
    .scroll-progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #1e3a8a, #0ea5e9);
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(progressStyles);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
    progressFill.style.width = scrollPercent + '%';
  });
}

/* =============================
   EXPERIENCE TIMELINE ANIMATION
   ============================= */
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.experience__item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 200);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
  });
}

/* =============================
   EDUCATION CARD ANIMATIONS
   ============================= */
function initEducationAnimations() {
  const educationCards = document.querySelectorAll('.education__item');
  
  educationCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
  });
}

/* =============================
   DYNAMIC GREETING BASED ON TIME
   ============================= */
function initDynamicGreeting() {
  const heroDescription = document.querySelector('.hero__description');
  if (heroDescription) {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
      greeting = 'Good morning! ';
    } else if (hour < 17) {
      greeting = 'Good afternoon! ';
    } else {
      greeting = 'Good evening! ';
    }
    
    const originalText = heroDescription.textContent;
    heroDescription.textContent = greeting + originalText;
  }
}

/* =============================
   KEYBOARD ACCESSIBILITY
   ============================= */
function initKeyboardAccessibility() {
  // Enable keyboard navigation for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.style.transform = 'translateY(-8px)';
        setTimeout(() => {
          card.style.transform = '';
        }, 200);
      }
    });
  });

  // Enable keyboard navigation for skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.setAttribute('tabindex', '0');
  });
}

/* =============================
   INITIALIZATION
   ============================= */
function init() {
  console.log('🚀 Pratik Shinde\'s Portfolio Initializing...');
  
  // Initialize all features
  initTypingEffect();
  initScrollAnimations();
  initSkillCardEffects();
  initProjectCardInteractions();
  initScrollProgress();
  initResumeDownload();
  initTimelineAnimation();
  initEducationAnimations();
  initDynamicGreeting();
  initKeyboardAccessibility();
  
  // Set initial active nav link
  setTimeout(updateActiveNavLink, 100);
  
  console.log('✅ All features loaded successfully');
}

/* =============================
   PAGE LOAD EVENT
   ============================= */
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden - pausing animations');
  } else {
    console.log('Page visible - resuming animations');
  }
});

/* =============================
   PERFORMANCE MONITORING
   ============================= */
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`⚡ Portfolio loaded in ${Math.round(loadTime)}ms`);
});

/* =============================
   ERROR HANDLING
   ============================= */
window.addEventListener('error', (e) => {
  console.error('Portfolio error:', e.error);
});

/* =============================
   EASTER EGG
   ============================= */
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    console.log('🎉 Konami Code activated! You found Pratik\'s easter egg!');
    document.body.style.transform = 'rotate(360deg)';
    document.body.style.transition = 'transform 2s ease';
    setTimeout(() => {
      document.body.style.transform = '';
      alert('🎮 Congratulations! You found the secret code. Pratik loves attention to detail - just like you!');
    }, 2000);
    konamiCode = [];
  }
});