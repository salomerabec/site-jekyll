document.querySelectorAll('.carousel').forEach(carousel => {

  const slides = carousel.querySelectorAll('.slides .slide');
  const thumbnails = carousel.querySelectorAll('.thumbnails .thumb');
  const slidesContainer = carousel.querySelector('.slides');

  function showSlide(index) {
    // Déplace le slider
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    // Active la miniature correcte
    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnails[index].classList.add('active');
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

});
