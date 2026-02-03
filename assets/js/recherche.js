(function () {

  var searchBar = document.getElementById("searchBar");
  var filterTags = document.getElementById("filterTags");
  var grid = document.getElementById("projectsGrid");
  var noResults = document.getElementById("noResults");
  var projects = Array.prototype.slice.call(grid.getElementsByClassName("project"));

  function normalize(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function filterProjects() {
    var rawQuery = searchBar.value || "";
    var rawTag = filterTags.value || "all";

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
    if (visibleCount === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  }

  var timer = null;
  function debouncedFilter() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(filterProjects, 120);
  }

  searchBar.addEventListener("input", debouncedFilter);
  filterTags.addEventListener("change", filterProjects);

  document.addEventListener("DOMContentLoaded", filterProjects);

})();
