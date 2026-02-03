document.addEventListener("DOMContentLoaded", function () {
  // --- RÉCUPÉRATION DES ÉLÉMENTS ---
  const body = document.body;
  const modeNuitButton = document.getElementById("modeNuitButton");
  const luneIcon = document.getElementById("luneIcon");
  const loc = document.getElementById("location");
  const link = document.querySelector('a[href*="linkedin"] img');
  const mail = document.querySelector('a[href^="mailto"] img');
  const git = document.querySelector('a[href*="github"] img');
  const latex = document.getElementById("latexlogo");
  const isabelle = document.getElementById("isabellelogo");

  // Tous les éléments susceptibles d’avoir un style nuit
  const elements = [
    ...document.querySelectorAll(
      ".section, .project, .cv-button, .contact-form, .form-group button"
    ),
    document.querySelector(".additional-content"),
  ].filter(Boolean); // retire les null éventuels

  if (localStorage.getItem("modeNuit") === "true") {
    document.documentElement.classList.add("nuit");
  }

  // --- FONCTIONS UTILES ---


const mobile = window.innerWidth <= 768; // <= 768px = mobile
const desktop = window.innerWidth > 768;  // > 768px = desktop

if (desktop) {



  // Appliquer ou retirer le mode nuit
  function appliquerModeNuit(actif) {
    if (actif) {
      body.classList.add("nuit");
      elements.forEach((el) => el.classList.add("nuit"));
    } else {
      body.classList.remove("nuit");
      elements.forEach((el) => el.classList.remove("nuit"));
    }

    // Spécifique à certaines pages (ex: jardin, patisserie, etc.)
    if (body.classList.contains("jardin")) {
      actif ? body.classList.add("nuit") : body.classList.remove("nuit");
    }

    // Mettre à jour les icônes
    luneIcon.src = actif ? "sun.svg" : "moon.svg";
    if (link) link.src = actif ? "link2.svg" : "link.svg";
    if (mail) mail.src = actif ? "mail2.svg" : "mail.svg";
    if (git) git.src = actif ? "git2.svg" : "git.svg";
    if (loc) loc.src = actif ? "location2.svg" : "location.svg";
    if (latex) latex.src = actif ? "latex2.svg" : "latex.svg";
    if (isabelle) isabelle.src = actif ? "isabelle2.svg" : "isabelle.svg";

    // Sauvegarder l’état
    localStorage.setItem("modeNuit", actif.toString());

    // Forcer le curseur à suivre le thème
    document.querySelectorAll(".cursor").forEach((c) => {
      c.style.backgroundColor = "";
      c.style.outline = "";
    });
  }

  // --- INITIALISATION ---
  const modeNuitActif = localStorage.getItem("modeNuit") === "true";
  appliquerModeNuit(modeNuitActif);

  // --- GESTION DU BOUTON ---
  if (modeNuitButton) {
    modeNuitButton.addEventListener("click", function () {
      const nouveauMode = !body.classList.contains("nuit");
      appliquerModeNuit(nouveauMode);
    });
  }

}

if (mobile) {








  // Appliquer ou retirer le mode nuit
  function appliquerModeNuit(actif) {
    if (actif) {
      body.classList.add("nuit");
      elements.forEach((el) => el.classList.add("nuit"));
    } else {
      body.classList.remove("nuit");
      elements.forEach((el) => el.classList.remove("nuit"));
    }

    // Spécifique à certaines pages (ex: jardin, patisserie, etc.)
    if (body.classList.contains("jardin")) {
      actif ? body.classList.add("nuit") : body.classList.remove("nuit");
    }

    // Mettre à jour les icônes
    luneIcon.src = actif ? "sun.svg" : "moon.svg";
    if (link) link.src = actif ? "link2.svg" : "link.svg";
    if (mail) mail.src = actif ? "mail2.svg" : "mail.svg";
    if (git) git.src = actif ? "git2.svg" : "git.svg";
    if (loc) loc.src = actif ? "location2.svg" : "location.svg";
    if (latex) latex.src = actif ? "latex2.svg" : "latex.svg";
    if (isabelle) isabelle.src = actif ? "isabelle2.svg" : "isabelle.svg";

    // Sauvegarder l’état
    localStorage.setItem("modeNuit", actif.toString());

    // Forcer le curseur à suivre le thème
    document.querySelectorAll(".cursor").forEach((c) => {
      c.style.backgroundColor = "";
      c.style.outline = "";
    });
  }

  // --- INITIALISATION ---
  const modeNuitActif = localStorage.getItem("modeNuit") === "true";
  appliquerModeNuit(modeNuitActif);

  // --- GESTION DU BOUTON ---
  if (modeNuitButton) {
    modeNuitButton.addEventListener("click", function () {
      const nouveauMode = !body.classList.contains("nuit");
      appliquerModeNuit(nouveauMode);
    });
  }












}


  // --- ANNÉE AUTOMATIQUE ---
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
});
