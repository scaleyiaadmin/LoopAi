/* =====================================================
   LOOP AI — Scroll Animations & Interactions
   ===================================================== */

// ─── AOS (Animate On Scroll) ─────────────────────────
(function () {
  const animatedEls = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach((el) => observer.observe(el));
})();

// ─── NAVBAR SCROLL ───────────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 32) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ─── MOBILE MENU ─────────────────────────────────────
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

// ─── SMOOTH SCROLL OFFSET (fixed nav) ────────────────
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ─── COUNTER ANIMATION ────────────────────────────────
(function () {
  const counters = document.querySelectorAll('[data-counter]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const duration = 1800;
    const step = (target / duration) * 16;
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('pt-BR');
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target.toLocaleString('pt-BR');
      }
    }, 16);
  };

  if (counters.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((c) => obs.observe(c));
  }
})();

// ─── CTA BUTTON MICRO-INTERACTION ────────────────────
(function () {
  const primaryBtns = document.querySelectorAll('.btn-primary');

  primaryBtns.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      btn.style.letterSpacing = '0.01em';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.letterSpacing = '';
    });
  });
})();

// ─── WHATSAPP MOCKUP AUTO-SCROLL ─────────────────────
(function () {
  const msgs = document.querySelector('.wapp-messages');
  if (!msgs) return;
  setTimeout(() => {
    msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
  }, 1200);
})();

// ─── ACTIVE NAV LINK HIGHLIGHT ────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
})();
