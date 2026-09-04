---
layout: default
---

<section class="hero">
  <h2>Maria Rodriguez — Architecture & Design</h2>
  <p class="lead">Architect, designer and researcher working at the intersection of built form, publishing, and visual culture.</p>
</section>

<section id="featured" class="featured-projects">
  <h3>Featured Projects</h3>

  <!-- Filter bar -->
  <div class="filter-bar" role="toolbar" aria-label="Filter projects by service">
    <button class="filter-button active" data-filter="All" aria-pressed="true">All</button>
    {% for s in site.services %}
      <button class="filter-button" data-filter="{{ s | escape }}">{{ s }}</button>
    {% endfor %}
  </div>

  <div class="projects-grid" id="featuredGrid" role="list">
    {% assign featured = site.projects | sort: 'featuredOrder' | slice: 0,6 %}
    {% for project in featured %}
      {% if project.title and project.published != false %}
      <article class="project" role="listitem" data-services="{{ project.services | join: ',' }}">
        <a href="{{ site.baseurl }}{{ project.url }}">
          <div class="thumb">
            <img src="{{ site.baseurl }}{{ project.coverImage | default: '/assets/images/placeholder-project.jpg' }}" alt="{{ project.title }}">
          </div>
        </a>
        <h4><a href="{{ site.baseurl }}{{ project.url }}">{{ project.title }}</a></h4>
        <p class="tags">
          {% if project.services %}
            {% for tag in project.services %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          {% endif %}
        </p>
      </article>
      {% endif %}
    {% endfor %}
  </div>

  <!-- Projects filter logic -->
  <script src="{{ site.baseurl }}/assets/js/projects-filter.js" defer></script>
</section>

<section id="services" class="services">
  <h3>Services</h3>
  <div class="services-grid">
    {% for s in site.services %}
    <div class="service-card">
      <h4>{{ s }}</h4>
      {% if s == "Editorial design" %}
      <p>Editorial design — I craft considered layouts and typographic systems for editorial projects, from catalogs to research publications, ensuring each piece communicates its ideas clearly and beautifully.</p>
      {% elsif s == "Research & writing" %}
      <p>Research & writing — I investigate and write on the cultural and philosophical dimensions of architecture, exploring its history and semiotics and how built environments shape everyday life and the arts.</p>
      {% elsif s == "Illustration" %}
      <p>Illustration — I produce digital illustrations of buildings, objects, and architectural scenes that complement design work and help visualize concepts with clarity and character.</p>
      {% else %}
      <p>Designed and delivered services for projects across architecture, interiors, and visual communication.</p>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</section>

<section id="reviews" class="reviews">
  <h3>Reviews</h3>
  <div class="reviews-grid">
    {% for r in site.data.reviews %}
    <div class="review">
      <blockquote>"{{ r.text }}"</blockquote>
      <cite>{{ r.name }}{% if r.role %}, {{ r.role }}{% endif %}</cite>
    </div>
    {% endfor %}
  </div>
</section>

<section class="cta">
  <p>Interested in working together? <a href="mailto:hello@example.com">Contact me</a></p>
</section>
