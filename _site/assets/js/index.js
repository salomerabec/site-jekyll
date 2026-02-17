// SCROLL ANIMATION

document.addEventListener("DOMContentLoaded", function () {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animation une seule fois
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach(section => {
    observer.observe(section);
  });
});
