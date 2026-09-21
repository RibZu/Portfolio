import React, { useState } from 'react';
import { projects } from '../data/projects.js';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { filterProjects, visibleFilters, technologyCounts } from '../lib/derive.js';
import SectionHead from './SectionHead.jsx';
import { TechFilter } from './TechFilter.jsx';
import { ProjectCard } from './ProjectCard.jsx';
import styles from './Projects.module.css';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState(null);

  const counts = technologyCounts(projects);
  const visibleTechs = visibleFilters(projects, technologies);
  const filteredProjects = filterProjects(projects, activeFilter);

  // La referencia cruzada puede apuntar a un proyecto que el filtro oculta: se limpia el filtro primero.
  const jumpTo = (id) => {
    setActiveFilter(null);
    requestAnimationFrame(() => {
      document.getElementById(`project-${id}`)?.scrollIntoView({ block: 'center' });
    });
  };

  return (
    <section id="projects" className="block" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          title={t(ui.headingProjects)}
          meta={t(ui.resultCount, filteredProjects.length)}
        />

        <TechFilter
          technologies={visibleTechs}
          counts={counts}
          totalProjects={projects.length}
          active={activeFilter}
          onChange={setActiveFilter}
        />

        <div className="sr-only" aria-live="polite">
          {t(ui.resultCount, filteredProjects.length)}
        </div>

        {filteredProjects.length === 0 ? (
          <div className={styles.filterEmpty}>
            <p>{t(ui.filterEmpty)}</p>
            <button type="button" className={styles.resetBtn} onClick={() => setActiveFilter(null)}>
              {t(ui.filterAll)}
            </button>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onJump={jumpTo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
