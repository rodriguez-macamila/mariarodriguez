---
layout: default
---

# Projects

Browse all projects. Click a project to see details. Use the tags to filter projects by service.

<div class="projects-grid">
  {% for project in site.projects %}
  <article class="project">
    <a href="{{ project.url }}"><img src="{{ project.image | default: '/assets/images/placeholder-project.jpg' }}" alt="{{ project.title }}"></a>
    <h4><a href="{{ project.url }}">{{ project.title }}</a></h4>
    <p class="tags">{% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</p>
  </article>
  {% endfor %}
</div>
