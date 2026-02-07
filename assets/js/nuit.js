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
      transition: none !important; /* pas d'animation au chargement */
    }
  `;
  document.head.appendChild(style);

  // Supprime le style temporaire une fois que tout est chargé
  // Si le script s'exécute dans le <head>, le <body> n'existe peut-être pas encore;
  // on ajoute la classe `nuit` sur le <body> à DOMContentLoaded si besoin.
  document.addEventListener('DOMContentLoaded', () => {
    if (isNuit && document.body) {
      document.body.classList.add('nuit');
    }
    style.remove();
  });
})();

// fonction pour mettre à jour l'affichage des icônes selon le mode
function updateModeNuitIcon() {
  const luneIconDesktop = document.getElementById('luneIconDesktop');
  const luneIconMobile = document.getElementById('luneIconMobile');
  const soleilIcon = document.getElementById('soleilIcon');

  if (!luneIconDesktop || !luneIconMobile || !soleilIcon) {
    return; // éléments pas encore dans le DOM
  }

  const isNuit = (document.body && document.body.classList && document.body.classList.contains('nuit'))
    || document.documentElement.classList.contains('nuit')
    || localStorage.getItem('modeNuit') === 'true';
  
  if (isNuit) {
    // Mode nuit : affiche le soleil
    luneIconDesktop.style.display = 'none';
    luneIconMobile.style.display = 'none';
    soleilIcon.style.display = 'inline';
  } else {
    // Mode jour : affiche la lune appropriée
    luneIconDesktop.style.display = window.innerWidth > 768 ? 'inline' : 'none';
    luneIconMobile.style.display = window.innerWidth <= 768 ? 'inline' : 'none';
    soleilIcon.style.display = 'none';
  }
}

// Met à jour les icônes de contact (mail, link, git, location) en fonction du mode
function updateThemeIcons() {
  var ids = ['mail', 'link', 'git', 'location'];
  var isNuit = (document.body && document.body.classList && document.body.classList.contains('nuit'))
    || document.documentElement.classList.contains('nuit')
    || localStorage.getItem('modeNuit') === 'true';

  ids.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el || !el.src) return;

    try {
      // calcule un nom alternatif en ajoutant '2' avant l'extension (ex: mail.svg -> mail2.svg)
      var src = el.getAttribute('src');
      // ignore data URLs
      if (src.indexOf('data:') === 0) return;

      var parts = src.split('/');
      var filename = parts.pop();
      var dir = parts.join('/') + '/';
      var altFilename = filename.replace(/(\.\w+)$/, '2$1');
      var altSrc = dir + altFilename;

      if (isNuit) {
        // basculer vers la variante nuit si elle existe (on tente quand même)
        el.setAttribute('src', altSrc);
      } else {
        // revenir à la variante de jour (en retirant le '2' si présent)
        var normalFilename = filename.replace(/2(\.\w+)$/, '$1');
        var normalSrc = dir + normalFilename;
        // si filename contient '2' (p.ex. mail2.svg), on remet normalSrc
        if (/2\.\w+$/.test(filename)) {
          el.setAttribute('src', normalSrc);
        } else {
          // si l'attribut src avait été modifié précédemment, essayer de restaurer
          // on vérifie si current src endsWith '2.ext' and replace
          if (/2(\.\w+)$/.test(src)) {
            el.setAttribute('src', src.replace(/2(\.\w+)$/, '$1'));
          }
        }
      }
    } catch (e) {
      // silencieux en cas d'erreur
      console.warn('updateThemeIcons:', e);
    }
  });
}

// Applique ou retire la classe 'nuit' sur les éléments de la page
function applyNightToElements(actif) {
  var selectorList = [
    '.section',
    '.project',
    '.cv-button',
    '.contact-form',
    '.form-group button',
    '.additional-content'
  ];

  var els = Array.prototype.slice.call(document.querySelectorAll(selectorList.join(', ')));
  els.forEach(function (el) {
    try {
      if (actif) el.classList.add('nuit');
      else el.classList.remove('nuit');
    } catch (e) {
      // ignoré
    }
  });
}

// Affiche le logo DÈS QUE LE DOM EST CHARGÉ (pas attendre le load complet)
document.addEventListener('DOMContentLoaded', () => {
  // Détermine le mode effectif à partir du body/html/localStorage
  var initialNuit = (document.body && document.body.classList && document.body.classList.contains('nuit'))
    || document.documentElement.classList.contains('nuit')
    || localStorage.getItem('modeNuit') === 'true';

  // Applique le mode sur les éléments ciblés et les icônes
  applyNightToElements(initialNuit);
  updateModeNuitIcon();
  updateThemeIcons();

  // === BOUTON MODE NUIT ===
  const modeNuitButton = document.getElementById('modeNuitButton');
  if (modeNuitButton) {
    modeNuitButton.addEventListener('click', () => {
      var nouveau = !((document.body && document.body.classList && document.body.classList.contains('nuit')) || document.documentElement.classList.contains('nuit'));
      // bascule sur html + body
      if (nouveau) {
        document.documentElement.classList.add('nuit');
        if (document.body) document.body.classList.add('nuit');
      } else {
        document.documentElement.classList.remove('nuit');
        if (document.body) document.body.classList.remove('nuit');
      }

      // mémoriser le choix dans localStorage
      localStorage.setItem('modeNuit', document.body.classList.contains('nuit'));

      // mettre à jour l'icône
      // Applique le changement aussi aux éléments et icônes
      applyNightToElements(nouveau);
      updateModeNuitIcon();
      updateThemeIcons();
    });

    // mettre à jour l'icône si la fenêtre est redimensionnée
    window.addEventListener('resize', updateModeNuitIcon);
  }
});

// Écoute les changements de localStorage (autres onglets) et applique le thème
window.addEventListener('storage', function (e) {
  if (e.key === 'modeNuit') {
    var actif = e.newValue === 'true';
    if (actif) {
      document.documentElement.classList.add('nuit');
      if (document.body) document.body.classList.add('nuit');
    } else {
      document.documentElement.classList.remove('nuit');
      if (document.body) document.body.classList.remove('nuit');
    }
    applyNightToElements(actif);
    updateModeNuitIcon();
    updateThemeIcons();
  }
});

// Cleanup au load pour enlever le focus initial
window.addEventListener('load', () => {
  document.activeElement.blur();
});
