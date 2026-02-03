
(function() {
  const isNuit = localStorage.getItem('modeNuit') === 'true';

  if (isNuit) {
    document.documentElement.classList.add('nuit');
    document.body?.classList?.add('nuit');
  }

  // style temporaire (juste pendant le chargement)
  const style = document.createElement('style');
  style.innerHTML = `
    html, body {
      background-color: ${isNuit ? '#000d2b' : '#fff'} !important;
      color: ${isNuit ? 'white' : 'black'} !important;
      transition: none !important; /* pas d’animation au chargement */
    }
  `;
  document.head.appendChild(style);

  // Supprime le style temporaire une fois que tout est chargé
  window.addEventListener('DOMContentLoaded', () => style.remove());
})();

window.addEventListener('load', () => {
  document.activeElement.blur(); // enlève tout focus initial
});
