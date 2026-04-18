/* ════════════════════════════════════════════════════
   MAIN JS — Pranay Rudra Portfolio
   ════════════════════════════════════════════════════ */

/* ── Progressive enhancement: mark JS as available ── */
/* This MUST run first — enables .js .fade-up animations in CSS */
document.documentElement.classList.add('js');

/* ── Scroll reveal ─────────────────────────────────── */
function revealAll() {
  document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: '0px 0px 0px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => {
  /* Stagger siblings: only direct-parent siblings, capped at 6 items */
  const siblings = [...el.parentElement.children].filter((c) =>
    c.classList.contains('fade-up')
  );
  if (siblings.length > 1) {
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = `${Math.min(idx, 6) * 70}ms`;
  }
  revealObserver.observe(el);
});

/* Hard fallback: if any element is still hidden after 1.2s, force-reveal it */
setTimeout(() => {
  document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => {
    el.classList.add('visible');
  });
}, 1200);

/* ── Navbar scroll state ───────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile burger ─────────────────────────────────── */
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.getElementById('navMobile');

burger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);

  const spans = burger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
    spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
    spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach((s) => (s.style.cssText = ''));
  }
});

mobileMenu?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
    burger.querySelectorAll('span').forEach((s) => (s.style.cssText = ''));
  });
});

/* ── Active nav link on scroll ─────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          )
        );
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ── Contact form ──────────────────────────────────── */
const form   = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn      = form.querySelector('button[type="submit"]');
  const original = btn.textContent;

  const fields = form.querySelectorAll('[required]');
  let valid = true;
  fields.forEach((f) => {
    f.classList.remove('error');
    if (!f.value.trim()) { f.classList.add('error'); valid = false; }
  });

  if (!valid) {
    status.textContent = 'Please fill in all fields.';
    status.style.color = 'var(--c-error)';
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    status.textContent = '✓ Message sent! I'll be in touch soon.';
    status.style.color = 'var(--c-success)';
    form.reset();
    btn.textContent = original;
    btn.disabled = false;
  }, 1400);
});

document.querySelectorAll('.form-group input, .form-group textarea').forEach((el) => {
  el.addEventListener('input', () => el.classList.remove('error'));
});

/* ── Smooth scroll for anchor links ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
      10
    ) || 64;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  });
});

/* ── Magnetic hover on CTA buttons ────────────────── */
document.querySelectorAll('.btn--primary, .btn--outline').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ── Dynamic styles for form errors + active nav ───── */
const sheet = document.createElement('style');
sheet.textContent = `
  .form-group input.error,
  .form-group textarea.error {
    border-color: var(--c-error);
    box-shadow: 0 0 0 3px rgba(220,38,38,.12);
  }
  .nav__links a.active { color: var(--c-text-1); }
  .nav__links a.active::after { transform: scaleX(1); }
`;
document.head.appendChild(sheet);

/* ── Respect prefers-reduced-motion ────────────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealAll();
}
