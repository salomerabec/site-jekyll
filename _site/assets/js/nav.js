document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-btn'); // anciennement btn-passions
  const menu = document.getElementById('mobile-menu'); // anciennement menu-passions
  if (!btn || !menu) { console.error('btn/menu manquant'); return; }

  const openMenu = () => {
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    menu.querySelector('a')?.focus();
  };
  const closeMenu = () => {
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    btn.focus();
  };
  const toggleMenu = () => {
    if (btn.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
      e.preventDefault();
      toggleMenu();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (menu.hidden) openMenu();
      menu.querySelector('a')?.focus();
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      closeMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

  // Ajout classe active sur nav
  const navLinks = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});

// Effet scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.style.height = "60px";
  } else {
    nav.style.height = "70px";
  }
});

// Focus au load
window.addEventListener("load", () => {
  if (document.activeElement) document.activeElement.blur();
  const btn = document.getElementById("menu-btn"); // adapté au nouvel ID
  if (btn) btn.blur();
});