/* ============================================================
   ОСКОЛКИ ВОЗДУХА — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Бургер-меню ── */
  const burger  = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function toggleMenu(open) {
    if (!burger || !mobileNav) return;
    const state = open !== undefined ? open : !burger.classList.contains('is-active');
    burger.classList.toggle('is-active', state);
    mobileNav.classList.toggle('is-open', state);
    document.body.style.overflow = state ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', () => toggleMenu());
  }

  // Закрытие по клику на ссылку в мобильном меню
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  /* ── Активная ссылка навигации при скролле ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

  function setActiveLink() {
    const scrollY = window.scrollY + 80;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ── Добавляем стиль активной ссылки через JS (чтобы не захламлять CSS) ── */
  const styleActive = document.createElement('style');
  styleActive.textContent = '.nav__links a.is-active { color: #fff; border-bottom-color: #C00000; }';
  document.head.appendChild(styleActive);

})();
