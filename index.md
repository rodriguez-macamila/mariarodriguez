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
    {% for service in site.data.services %}
    <div class="service-card">
      <h4>{{ service.name }}</h4>
      <p>{{ service.description }}</p>
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
      <div class="review-stars" aria-label="{{ r.rating | default: 5 }} out of 5 stars">
        {% assign stars = r.rating | default: 5 %}
        {% for i in (1..stars) %}&#9733;{% endfor %}
      </div>
      <blockquote>&ldquo;{{ r.text }}&rdquo;</blockquote>
      <cite>{{ r.name }}{% if r.company %}, {{ r.company }}{% endif %}{% if r.year %} &middot; {{ r.year }}{% endif %}</cite>
    </div>
    {% endfor %}
  </div>
  {% else %}
  <p class="reviews-empty">Client reviews coming soon &mdash; add them to <code>_data/reviews.yml</code>.</p>
  {% endif %}
</section>

<section class="cta wrap">
  <!-- TODO (Maria): confirm this is the email you want listed, or change it —
       the old placeholder was hello@example.com. -->
  <p>Interested in working together? <a href="mailto:info@mariarodriguez.pro">Contact me</a></p>
</section>
