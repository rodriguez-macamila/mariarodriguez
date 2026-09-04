document.addEventListener('DOMContentLoaded', function () {
  // Build modal DOM once
  const modal = document.createElement('div');
  modal.className = 'pg-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="pg-inner" role="dialog" aria-modal="true">
      <button class="pg-btn pg-prev" aria-label="Previous image">&lt;</button>
      <div class="pg-image-wrap"><img src="" alt=""></div>
      <button class="pg-btn pg-next" aria-label="Next image">&gt;</button>
      <button class="pg-close" aria-label="Close">✕</button>
      <div class="pg-meta"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const imgEl = modal.querySelector('.pg-image-wrap img');
  const metaEl = modal.querySelector('.pg-meta');
  const prevBtn = modal.querySelector('.pg-prev');
  const nextBtn = modal.querySelector('.pg-next');
  const closeBtn = modal.querySelector('.pg-close');

  let currentImages = [];
  let currentIndex = 0;

  function openGallery(images, startIndex, title, projectUrl) {
    currentImages = images || [];
    currentIndex = startIndex || 0;
    updateImage();
    metaEl.innerHTML = `<span>${title || ''}</span> • <a href="${projectUrl || '#'}" style="color:inherit;text-decoration:underline;">Open project page</a>`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus management
    closeBtn.focus();
  }

  function closeGallery() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.src = '';
    currentImages = [];
    currentIndex = 0;
  }

  function updateImage() {
    if (!currentImages.length) return;
    const url = currentImages[currentIndex];
    imgEl.src = url;
    imgEl.alt = `${currentIndex + 1} of ${currentImages.length}`;
  }

  function nextImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
  }
  function prevImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
  }

  // Event handlers
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);
  closeBtn.addEventListener('click', closeGallery);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeGallery(); // click overlay closes
  });
  document.addEventListener('keydown', function (e) {
    if (modal.classList.contains('open')) {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });

  // Attach click handlers to project cards
  document.querySelectorAll('.projects-grid .project').forEach(function (article) {
    const script = article.querySelector('.project-images');
    if (!script) return;
    let images = [];
    try {
      images = JSON.parse(script.textContent || '[]*
