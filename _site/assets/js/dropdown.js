// Dropdown menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
  const dropdownButtons = document.querySelectorAll('nav button.dropbtn');
  let closeTimeout;
  
  // Toggle dropdown on button click
  dropdownButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const menuId = btn.getAttribute('aria-controls');
      const menu = document.getElementById(menuId);
      
      if (!menu) return;
      
      const isHidden = menu.hasAttribute('hidden');
      
      // Close all other dropdowns
      dropdownButtons.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          const otherId = otherBtn.getAttribute('aria-controls');
          const otherMenu = document.getElementById(otherId);
          if (otherMenu) {
            otherMenu.setAttribute('hidden', '');
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
      
      // Toggle current dropdown
      if (isHidden) {
        menu.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        menu.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Add hover behavior to dropdown containers
  const dropdownContainers = document.querySelectorAll('.dropdown');
  dropdownContainers.forEach(function (dropdown) {
    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(closeTimeout);
    });
    
    dropdown.addEventListener('mouseleave', function () {
      const btn = dropdown.querySelector('button.dropbtn');
      const menuId = btn.getAttribute('aria-controls');
      const menu = document.getElementById(menuId);
      
      // Wait 200ms before closing to allow user to move from button to menu
      closeTimeout = setTimeout(function () {
        menu.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }, 200);
    });
  });
  
  // Close dropdown when a link is clicked
  const dropdownLinks = document.querySelectorAll('.dropdown-content a');
  dropdownLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      dropdownButtons.forEach(function (btn) {
        const menuId = btn.getAttribute('aria-controls');
        const menu = document.getElementById(menuId);
        if (menu) {
          menu.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    const nav = document.querySelector('nav:not(#mobile-menu)');
    if (!nav || !nav.contains(e.target)) {
      dropdownButtons.forEach(function (btn) {
        const menuId = btn.getAttribute('aria-controls');
        const menu = document.getElementById(menuId);
        if (menu) {
          menu.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
});
