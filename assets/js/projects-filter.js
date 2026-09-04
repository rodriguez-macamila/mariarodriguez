// Projects filter: toggles project tiles based on data-services attribute
document.addEventListener('DOMContentLoaded', function () {
  const buttons = Array.from(document.querySelectorAll('.filter-button'));
  const grid = document.getElementById('featuredGrid');
  if (!grid || buttons.length === 0) return;

  const items = Array.from(grid.querySelectorAll('.project'));

  function normalize(s) {
    return (s || '').toString().trim();
  }

  function applyFilter(service) {
    // update button states
    buttons.forEach(btn => {
      const isActive = (btn.dataset.filter === service) || (service === 'All' && btn.dataset.filter === 'All');
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // show/hide items
    items.forEach(item => {
      const services = normalize(item.dataset.services);
      if (!service || service === 'All') {
        item.classList.remove('hidden');
      } else {
        // match exact service name within comma-separated list
        const list = services.split(',').map(s => s.trim()).filter(Boolean);
        const match = list.indexOf(service) !== -1;
        if (match) item.classList.remove('hidden');
        else item.classList.add('hidden');
      }
    });
  }

  // click handlers
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter || 'All';
      applyFilter(filter);
      // update URL param (no reload)
      if (history && history.replaceState) {
        const url = new URL(window.location);
        if (filter === 'All') url.searchParams.delete('service');
        else url.searchParams.set('service', filter);
        history.replaceState(null, '', url);
      }
    });
  });

  // apply filter on load if provided via ?service=Name
  const params = new URLSearchParams(window.location.search);
  const pre = params.get('service');
  if (pre) {
    // try to unescape service name
    const decoded = decodeURIComponent(pre);
    // Find a matching button (case-sensitive as labels are exact)
    const found = buttons.find(b => b.dataset.filter === decoded);
    if (found) applyFilter(decoded);
    else applyFilter('All');
  } else {
    applyFilter('All');
  }
});
