// Initialise le script uniquement après que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function () {
  var searchBar = document.getElementById("searchBar");
  var filterTags = document.getElementById("filterTags");
  var grid = document.getElementById("projectsGrid");
  var noResults = document.getElementById("noResults");
  var projects = [];

  function normalize(str) {
    return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function filterProjects() {
    var rawQuery = (searchBar && searchBar.value) || "";
    var rawTag = (filterTags && filterTags.value) || "all";

    var query = normalize(rawQuery.trim());
    var tag = normalize(rawTag);

    var visibleCount = 0;

    projects.forEach(function (p) {
      var tags = normalize(p.dataset.tags || "");
      var text = normalize(p.textContent || "");

      var tagMatch = (tag === "all") || tags.indexOf(tag) !== -1;
      var searchMatch = (query.length === 0) || text.indexOf(query) !== -1;

      if (tagMatch && searchMatch) {
        p.style.display = "block";
        visibleCount++;
      } else {
        p.style.display = "none";
      }
    });

    // Affichage ou non du message "projets à venir"
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }
    }
  }

  // Récupère les éléments seulement si le conteneur existe
  if (grid) {
    // support both old `.project` and new `.project-card` class names
    projects = Array.prototype.slice.call(grid.querySelectorAll('.project, .project-card'));
  }

  var timer = null;
  function debouncedFilter() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(filterProjects, 120);
  }

  if (searchBar) searchBar.addEventListener("input", debouncedFilter);
  if (filterTags) filterTags.addEventListener("change", filterProjects);

  // Lancer un premier filtrage au chargement du DOM
  filterProjects();
});
