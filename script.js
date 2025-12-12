// Smooth scroll for in-page anchors
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    const id = a.getAttribute('href');
    // Ignore plain "#" links
    if (id && id.length > 1) {
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
});

// Simple form feedback on submit (quote form)
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (ev) => {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    // Let the form submit normally; this is just a visual fallback
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Request';
    }, 4000);
  });
}

// FAQ accordion toggle
const faqButtons = document.querySelectorAll('.faq-question');

if (faqButtons.length) {
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqButtons.forEach((b) => {
        if (b !== btn) {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) {
            b.nextElementSibling.hidden = true;
          }
          const otherIcon = b.querySelector('.faq-icon');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Toggle this one
      btn.setAttribute('aria-expanded', String(!expanded));
      if (btn.nextElementSibling) {
        btn.nextElementSibling.hidden = expanded;
      }
      const icon = btn.querySelector('.faq-icon');
      if (icon) icon.textContent = expanded ? '+' : '–';
    });
  });
}

// Navbar hide-on-scroll behavior
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  const delta = 5;        // minimum scroll difference before acting
  const hideOffset = 120; // don't hide until user has scrolled this far

  function onScroll() {
    const currentY = window.scrollY;
    const diff = currentY - lastScrollY;

    // Ignore tiny jitter (especially on trackpads)
    if (Math.abs(diff) < delta) return;

    if (currentY > hideOffset && diff > 0) {
      // Scrolling down past threshold -> hide header
      header.classList.add('site-header--hidden');
    } else if (diff < 0) {
      // Scrolling up -> show header
      header.classList.remove('site-header--hidden');
    }

    // Always show at very top
    if (currentY <= 0) {
      header.classList.remove('site-header--hidden');
    }

    lastScrollY = currentY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
});
