---
layout: default
---

<section class="hero wrap">
  <h2>Maria Rodriguez &mdash; Architecture &amp; Design</h2>
  <p class="lead">Architect, designer and researcher working at the intersection of built form, publishing, and visual culture.</p>
</section>

<section id="featured" class="featured-projects wrap">
  <h3>Featured Projects</h3>

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
            <img src="{{ site.baseurl }}{{ project.coverImage | default: '/assets/images/placeholder-project.svg' }}" alt="{{ project.title }}">
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

  <p class="filter-empty">No projects tagged with this service yet.</p>

  <p class="see-all"><a href="{{ site.baseurl }}/projects/" class="filter-button" data-filter="__none__">See all projects</a></p>
</section>

<section id="services" class="services wrap">
  <h3>Services</h3>
  <div class="services-grid">
    {% for s in site.services %}
    <div class="service-card">
      <h4>{{ s }}</h4>
      {% if s == "Editorial design" %}
      <p>Editorial design &mdash; I craft considered layouts and typographic systems for editorial projects, from catalogs to research publications, ensuring each piece communicates its ideas clearly and beautifully.</p>
      {% elsif s == "Research & writing" %}
      <p>Research &amp; writing &mdash; I investigate and write on the cultural and philosophical dimensions of architecture, exploring its history and semiotics and how built environments shape everyday life and the arts.</p>
      {% elsif s == "Illustration" %}
      <p>Illustration &mdash; I produce digital illustrations of buildings, objects, and architectural scenes that complement design work and help visualize concepts with clarity and character.</p>
      {% else %}
      <p>Designed and delivered services for projects across architecture, interiors, and visual communication.</p>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</section>

<section id="reviews" class="reviews wrap">
  <h3>Reviews</h3>
  {% if site.data.reviews and site.data.reviews.size > 0 %}
  <div class="reviews-grid">
    {% for r in site.data.reviews %}
    <div class="review">
      <blockquote>&ldquo;{{ r.text }}&rdquo;</blockquote>
      <cite>{{ r.name }}{% if r.role %}, {{ r.role }}{% endif %}</cite>
    </div>
    {% endfor %}
  </div>
  {% else %}
  <p class="reviews-empty">Client reviews coming soon &mdash; add them to <code>_data/reviews.yml</code>.</p>
  {% endif %}
</section>

<section class="cta wrap">
  <p>Interested in working together? <a href="mailto:hello@mariarodriguez.pro">Contact me</a></p>
</section>
