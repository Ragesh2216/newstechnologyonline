/* =========================================
   NEWS TECHNOLOGY - Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 1900);
    });
    // Fallback
    setTimeout(() => preloader && preloader.classList.add('hidden'), 3000);
  }

  // ---- Navbar scroll effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ---- Mobile nav toggle ----
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- Home Dropdown ----
  const homeDropdown = document.getElementById('homeDropdown');
  const homeDropdownTrigger = document.getElementById('homeDropdownTrigger');
  if (homeDropdown && homeDropdownTrigger) {
    homeDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      homeDropdown.classList.toggle('open');
    });
    // Close when clicking a link inside dropdown
    homeDropdown.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => homeDropdown.classList.remove('open'));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!homeDropdown.contains(e.target)) {
        homeDropdown.classList.remove('open');
      }
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') homeDropdown.classList.remove('open');
    });
  }

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 80}ms`;
      revealObserver.observe(el);
    });
  }

  // ---- Scroll to top ----
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Accordion / FAQ ----
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.classList.contains('open');
      // Close all in same group
      header.closest('.accordion-list')?.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('open');
        h.nextElementSibling?.classList.remove('open');
      });
      if (!isOpen) {
        header.classList.add('open');
        body?.classList.add('open');
      }
    });
  });

  // ---- Filter tabs ----
  document.querySelectorAll('.filter-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        const grid = tabGroup.closest('section')?.querySelector('.cards-grid') ||
          tabGroup.nextElementSibling?.querySelector('.cards-grid') ||
          document.querySelector('.cards-grid');
        if (grid && filter) {
          grid.querySelectorAll('.card-item').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });

  // ---- Category pills ----
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // ---- Animated counters ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString() + suffix;
            if (current >= target) clearInterval(timer);
          }, 16);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObserver.observe(el));
  }

  // ---- Newsletter form ----
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        newsletterForm.innerHTML = `<p style="color:var(--accent2);font-weight:600;font-size:1rem;">🎉 Thank you for subscribing! Welcome to the future of tech news.</p>`;
      }
    });
  }

  // ---- Contact form (generic fallback — contact.html has its own full handler) ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm && !document.getElementById('contactName')) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, var(--accent2), #059669)';
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; }, 4000);
    });
  }
});

// ---- Login/Signup toggle (auth page) ----
function initAuth() {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');

  function showLogin() {
    loginTab?.classList.add('active'); signupTab?.classList.remove('active');
    loginForm?.classList.add('form-active'); signupForm?.classList.remove('form-active');
    loginForm.style.animation = 'slideInLeft 0.4s ease';
  }
  function showSignup() {
    signupTab?.classList.add('active'); loginTab?.classList.remove('active');
    signupForm?.classList.add('form-active'); loginForm?.classList.remove('form-active');
    signupForm.style.animation = 'slideInRight 0.4s ease';
  }

  loginTab?.addEventListener('click', showLogin);
  signupTab?.addEventListener('click', showSignup);
  switchToSignup?.addEventListener('click', showSignup);
  switchToLogin?.addEventListener('click', showLogin);

  // Password strength
  const pwdInput = document.getElementById('signupPassword');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  if (pwdInput && strengthBar) {
    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      let strength = 0;
      if (val.length >= 6) strength++;
      if (val.length >= 10) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;

      const pct = (strength / 5) * 100;
      strengthBar.style.width = pct + '%';
      const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
      const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
      strengthBar.style.background = colors[Math.min(strength - 1, 4)] || '#666';
      if (strengthText) strengthText.textContent = strength > 0 ? labels[Math.min(strength - 1, 4)] : '';
    });
  }

  // Login form validation
  const loginFormEl = document.getElementById('loginFormEl');
  if (loginFormEl) {
    loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginFormEl.querySelector('#loginEmail');
      const pwd = loginFormEl.querySelector('#loginPassword');
      let valid = true;
      [email, pwd].forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'var(--accent)';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (pwd && pwd.value.length < 6) {
        pwd.style.borderColor = 'var(--accent)';
        valid = false;
      }
      if (valid) {
        const btn = loginFormEl.querySelector('[type="submit"]');
        btn.textContent = '✓ Logged in!';
        btn.style.background = 'linear-gradient(135deg, var(--accent2), #059669)';
      }
    });
  }
}

if (document.getElementById('loginTab')) initAuth();
