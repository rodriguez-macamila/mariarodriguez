---
layout: default
---

<section class="hero">
  <h2>Maria Rodriguez — Architecture & Design</h2>
  <p class="lead">Architect, designer and researcher working at the intersection of built form, publishing, and visual culture.</p>
</section>

<section id="featured" class="featured-projects">
  <h3>Featured Projects</h3>
  <div class="projects-grid">
    {% for project in site.projects limit:6 %}
    <article class="project">
      <a href="{{ project.url }}"><img src="{{ project.image | default: '/assets/images/placeholder-project.jpg' }}" alt="{{ project.title }}"></a>
      <h4><a href="{{ project.url }}">{{ project.title }}</a></h4>
      <p class="tags">{% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</p>
    </article>
    {% endfor %}
  </div>
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
