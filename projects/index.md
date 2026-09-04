---
layout: default
---

# Projects

Browse all projects. Click a project to see details. Use the tags to filter projects by service.

<div class="projects-grid">
  {% assign projects_list = site.projects | sort: 'featuredOrder' %}
  {% for project in projects_list %}
    {% if project.title and project.published != false %}
    <article class="project">
      <a href="{{ project.url }}">
        <div class="thumb">
          <img
            src="{{ site.baseurl }}{{ project.coverImage | default: '/assets/images/placeholder-project.jpg' }}"
            alt="{{ project.title }}"
            loading="lazy"
          >
        </div>
      </a>
      <h4><a href="{{ project.url }}">{{ project.title }}</a></h4>
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
