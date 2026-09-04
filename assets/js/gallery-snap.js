// Minimal helper to snap to next/previous slide on wheel events (improves desktop UX)
(function () {
  const viewport = document.querySelector('.gallery-viewport');
  if (!viewport) return;

  let isThrottled = false;
  let lastDeltaY = 0;

  function findSlides() {
    return Array.from(viewport.querySelectorAll('.gallery-slide'));
  }

  function currentSlideIndex() {
    const slides = findSlides();
    const scrollTop = viewport.scrollTop;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].offsetTop >= scrollTop - 2) return i;
    }
    return 0;
  }

  function snapTo(index) {
    const slides = findSlides();
    index = Math.max(0, Math.min(slides.length - 1, index));
    viewport.scrollTo({ top: slides[index].offsetTop, behavior: 'smooth' });
  }

  function onWheel(e) {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, 250);

    // direction: positive deltaY -> down (next slide)
    const idx = currentSlideIndex();
    if (e.deltaY > 0) snapTo(idx + 1);
    else if (e.deltaY < 0) snapTo(idx - 1);
  }

  // Prevent the page from scrolling while in gallery viewport on wheel
  viewport.addEventListener('wheel', function (e) {
    // Only when the viewport is actually scrollable
    if (viewport.scrollHeight <= viewport.clientHeight) return;
    e.preventDefault();
    onWheel(e);
  }, { passive: false });

  // Keyboard navigation
  window.addEventListener('keydown', function (e) {
    if (document.activeElement && ['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
    const idx = currentSlideIndex();
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault(); snapTo(idx + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault(); snapTo(idx - 1);
    }
  });
})();
