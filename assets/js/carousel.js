// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.carousel').forEach(carousel => {

    const slides = carousel.querySelectorAll('.slides .slide');
    const thumbnails = carousel.querySelectorAll('.thumbnails .thumb');
    const slidesContainer = carousel.querySelector('.slides');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    let currentIndex = 0;

    function showSlide(index) {
      // Assure que l'index est valide
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      // Déplace le slider
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;

      // Active la miniature correcte (si elle existe)
      thumbnails.forEach(t => t.classList.remove('active'));
      if (thumbnails[index]) {
        thumbnails[index].classList.add('active');
      }
    }

    // CLIC SUR MINIATURE
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.dataset.index, 10);
        showSlide(index);
      });
    });

    // CLAVIER SUR MINIATURE
    thumbnails.forEach(thumb => {
      thumb.addEventListener('keydown', e => {
        // ENTER ou SPACE
        if (e.key === 'Enter' || e.key === ' ') {
          const index = parseInt(thumb.dataset.index, 10);
          showSlide(index);
          e.preventDefault();
        }
      });
    });

    // BOUTON PRÉCÉDENT
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
      });
    }

    // BOUTON SUIVANT
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
      });
    }

    // Initialise le carousel au premier slide et active le premier bouton
    showSlide(0);
  });
});

