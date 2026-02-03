document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-passions');
  const menu = document.getElementById('menu-passions');
  if (!btn || !menu) { console.error('btn/menu manquant'); return; }

  const openMenu = () => {
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    // optionnel : focus sur 1er lien
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

  // clic souris
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // clavier : Entrée, Espace, FlecheBas, Echap
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
      e.preventDefault(); // évite le scroll
      toggleMenu();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (menu.hidden) openMenu();
      menu.querySelector('a')?.focus();
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      closeMenu();
    }
  });

  // fermer si clic en dehors
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

// Fermer si clic en dehors du menu
document.addEventListener('click', (e) => {
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    closeMenu();
  }
});


window.addEventListener("load", () => {
  // Enlève tout focus automatique au démarrage
  if (document.activeElement) {
    document.activeElement.blur();
  }
}

  // Optionnel : empêche le focus visuel sur le bouton au tout début
  const btn = document.getElementById("btn-passions");
  if (btn) {
    btn.blur();
  }
});
