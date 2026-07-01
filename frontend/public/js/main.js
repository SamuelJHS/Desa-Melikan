// Main JavaScript untuk website publik

// Auto-hide flash messages
setTimeout(() => {
  document.querySelectorAll('[data-testid^="flash-"]').forEach((el) => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
  });
}, 4000);
