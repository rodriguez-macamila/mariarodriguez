---
layout: default
---

# Projects

Browse all projects. Click a project to see details. Use the tags to filter projects by service.

<div class="projects-grid">
 {% if site.projects and site.projects.size > 0 %}
  {% assign projects_list = site.projects | sort: 'featuredOrder' %}
  {% for project in projects_list %}
  <article class="project" data-project-url="{{ site.baseurl }}{{ project.url }}">
    ...
  </article>
  {% endfor %}
{% else %}
  <p>No projects found.</p>
{% endif %}
  {% for project in projects_list %}
  <article class="project" data-project-url="{{ site.baseurl }}{{ project.url }}">
    <a href="{{ site.baseurl }}{{ project.url }}" class="project-link" aria-label="Open {{ project.title }} page">
      <div class="thumb">
        <img
          src="{{ site.baseurl }}{{ project.coverImage | default: '/assets/images/placeholder-project.jpg' }}"
          alt="{{ project.title }}"
          loading="lazy"
        >
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

    <!-- Embedded gallery JSON for JS (hidden) -->
    <script type="application/json" class="project-images">
    [
      {% for item in project.gallery %}
        "{{ site.baseurl }}{{ item.src }}"{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
    </script>
  </article>
  {% endfor %}
</div>
