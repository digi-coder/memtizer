// small enhancements: smooth scroll + simple form feedback
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if(a){
    e.preventDefault();
    const id = a.getAttribute('href');
    if(id && id.length>1){
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
  }
});

// optional: show a simple message after submit (works if form POST returns to same page)
// If you use Formspree / Getform you can follow their AJAX method — below is a tiny progressive enhancement.
const form = document.getElementById('quoteForm');
if(form){
  form.addEventListener('submit', (ev) => {
    // Basic client-side validation can be extended
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    // Let the form submit normally — you can swap to fetch() for AJAX.
    setTimeout(()=> {
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

      // Optional: close all others
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

