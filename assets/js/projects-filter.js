// Project filter: works for any `.filter-bar` on the page, matched to the
// nearest following `.projects-grid` inside the same section. This lets the
// same script power both the homepage's featured grid and the full
// /projects/ listing.
document.addEventListener('DOMContentLoaded', function () {
  const bars = Array.from(document.querySelectorAll('.filter-bar'));

  bars.forEach(function (bar) {
    const section = bar.closest('section') || document;
    const grid = section.querySelector('.projects-grid');
    const emptyMsg = section.querySelector('.filter-empty');
    if (!grid) return;

    const buttons = Array.from(bar.querySelectorAll('.filter-button'));
    const items = Array.from(grid.querySelectorAll('.project'));

    function normalize(s) {
      return (s || '').toString().trim();
    }

    function applyFilter(service) {
      buttons.forEach(function (btn) {
        const isActive = btn.dataset.filter === service;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      let visibleCount = 0;
      items.forEach(function (item) {
        if (!service || service === 'All') {
          item.classList.remove('is-hidden');
          visibleCount++;
          return;
        }
        const list = normalize(item.dataset.services)
          .split(',')
          .map(function (s) { return s.trim(); })
          .filter(Boolean);
        const match = list.indexOf(service) !== -1;
        item.classList.toggle('is-hidden', !match);
        if (match) visibleCount++;
      });

      if (emptyMsg) {
        emptyMsg.classList.toggle('is-visible', visibleCount === 0);
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter || 'All';
        applyFilter(filter);
        if (window.history && history.replaceState) {
          const url = new URL(window.location);
          if (filter === 'All') url.searchParams.delete('service');
          else url.searchParams.set('service', filter);
          history.replaceState(null, '', url);
        }
      });
    });

    const params = new URLSearchParams(window.location.search);
    const pre = params.get('service');
    if (pre) {
      const decoded = decodeURIComponent(pre);
      const found = buttons.find(function (b) { return b.dataset.filter === decoded; });
      applyFilter(found ? decoded : 'All');
    } else {
      applyFilter('All');
    }
  });
});
