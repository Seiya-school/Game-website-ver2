const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      el.classList.add('show');

      // Only apply transitionend logic to .slow_left or .slow_right
      if (el.classList.contains('slow_left') || el.classList.contains('slow_right')) {
        el.addEventListener('transitionend', () => {
          el.classList.add('visible');
          el.classList.remove('show', 'hidden');
        }, { once: true });
      }

    } else {
      el.classList.remove('show');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});
// Start observing all hidden elements once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});

// Prevent janky transitions during window resize
let resizing = false;

window.addEventListener('resize', () => {
  if (!resizing) {
    resizing = true;

    const affectedElements = document.querySelectorAll('.slow_left, .slow_right');
    affectedElements.forEach(el => el.style.transitionDuration = '0s');

    setTimeout(() => {
      affectedElements.forEach(el => el.style.transitionDuration = '');
      resizing = false;
    }, 300); // Customize delay if needed
  }
});