(() => {
  'use strict';

  const progressBar = document.getElementById('progress-bar');
  const year = document.getElementById('year');
  const reveals = [...document.querySelectorAll('.reveal')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = String(new Date().getFullYear());

  const updateProgress = () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressBar.style.width = `${(ratio * 100).toFixed(2)}%`;
  };

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach((element) => observer.observe(element));
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
})();
