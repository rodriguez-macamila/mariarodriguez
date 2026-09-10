// Gallery lightbox for project detail pages. Reads images directly from
// the .gallery-grid markup (src + alt already on the page), so there's no
// separate JSON data island to keep in sync.
document.addEventListener('DOMContentLoaded', function () {
  const grids = document.querySelectorAll('.gallery-grid');
  if (!grids.length) return;

  // Build the lightbox DOM once.
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML =
    '<div class="lightbox-inner" role="dialog" aria-modal="true" aria-label="Image viewer">' +
      '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous image">&lsaquo;</button>' +
      '<div class="lightbox-image-wrap"><img src="" alt=""></div>' +
      '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next image">&rsaquo;</button>' +
      '<div class="lightbox-counter"></div>' +
    '</div>';
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector('.lightbox-image-wrap img');
  const counterEl = lightbox.querySelector('.lightbox-counter');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  let images = [];
  let index = 0;
  let triggerEl = null;

  function updateImage() {
    if (!images.length) return;
    const item = images[index];
    imgEl.src = item.src;
    imgEl.alt = item.alt || '';
    counterEl.textContent = (index + 1) + ' / ' + images.length;
  }

  function open(list, startIndex, trigger) {
    images = list;
    index = startIndex;
    triggerEl = trigger || null;
    updateImage();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.src = '';
    images = [];
    if (triggerEl) triggerEl.focus();
  }

  function next() {
    if (!images.length) return;
    index = (index + 1) % images.length;
    updateImage();
  }

  function prev() {
    if (!images.length) return;
    index = (index - 1 + images.length) % images.length;
    updateImage();
  }

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Wire up every gallery grid on the page (a project page has exactly one,
  // but this supports more if needed later).
  grids.forEach(function (grid) {
    const items = Array.from(grid.querySelectorAll('.gallery-item'));
    if (!items.length) return;

    const list = items.map(function (btn) {
      const img = btn.querySelector('img');
      return { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' };
    });

    items.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        open(list, i, btn);
      });
    });
  });
});
