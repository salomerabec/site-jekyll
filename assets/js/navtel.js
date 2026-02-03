
// menu téléphone
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("open");
    overlay.classList.add("show");
    mobileMenu.setAttribute("aria-hidden", "false");
  });

  overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("show");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});


