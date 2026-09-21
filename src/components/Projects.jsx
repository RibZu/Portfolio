import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { projects } from '../data/projects.js';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { currentLanguage } from '../lib/language.js';
import { filterProjects, visibleFilters, technologyCounts } from '../lib/derive.js';
import { TechFilter } from './TechFilter.jsx';
import { ProjectCard } from './ProjectCard.jsx';
import styles from './Projects.module.css';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState(null);
  const revealRef = useScrollReveal();
  
  const counts = technologyCounts(projects);
  const visibleTechs = visibleFilters(projects, technologies);
  const filteredProjects = filterProjects(projects, activeFilter);

  return (
    <section id="projects" className={`${styles.sectionProjects} reveal-hidden`} ref={revealRef}>
      <div className="container">
      <span className="section-label">{currentLanguage === 'es' ? 'Proyectos' : 'Projects'}</span>
      <h2 className="section-heading">{t(ui.headingProjects || ui.navProjects)}</h2>

      <TechFilter
        technologies={visibleTechs} 
        counts={counts} 
        totalProjects={projects.length}
        active={activeFilter} 
        onChange={setActiveFilter} 
      />
      
      <div className={styles.visuallyHidden} aria-live="polite">
        {t(ui.resultCount, filteredProjects.length)}
      </div>

      {filteredProjects.length === 0 ? (
        <p className={styles.filterEmpty}>{t(ui.filterEmpty)}</p>
      ) : (
        <div className={styles.projectsGrid}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
