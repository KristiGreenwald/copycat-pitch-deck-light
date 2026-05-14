/* ========================================
   COPY CAT — PITCH DECK NAVIGATION
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 1;

  const counterCurrent = document.querySelector('.nav-current');
  const counterTotal = document.querySelector('.nav-total');
  const progressFill = document.querySelector('.progress-fill');
  const prevBtn = document.querySelector('.nav-btn--prev');
  const nextBtn = document.querySelector('.nav-btn--next');

  counterTotal.textContent = totalSlides;

  function goToSlide(n) {
    if (n < 1 || n > totalSlides) return;

    const oldSlide = currentSlide;
    currentSlide = n;

    slides.forEach((slide, i) => {
      const slideNum = i + 1;
      slide.classList.remove('active', 'prev');

      if (slideNum === currentSlide) {
        slide.classList.add('active');
      } else if (slideNum < currentSlide) {
        slide.classList.add('prev');
      }
    });

    counterCurrent.textContent = currentSlide;
    progressFill.style.width = `${(currentSlide / totalSlides) * 100}%`;

    prevBtn.style.opacity = currentSlide === 1 ? '0.3' : '1';
    nextBtn.style.opacity = currentSlide === totalSlides ? '0.3' : '1';
  }

  function nextSlide() {
    if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (currentSlide > 1) goToSlide(currentSlide - 1);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
    }
  });

  // Button navigation
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Touch/swipe support
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // Click on slide area to advance (but not on interactive elements)
  document.querySelector('.deck').addEventListener('click', (e) => {
    if (e.target.closest('.nav-controls, button, a, input')) return;

    const x = e.clientX / window.innerWidth;
    if (x > 0.5) nextSlide();
    else prevSlide();
  });

  // Initialize
  goToSlide(1);
});
