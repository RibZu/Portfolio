import React from 'react';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';

export function ProjectCard({ project }) {
  const TECH_LIMIT = 3;
  const visibleTechs = project.technologies.slice(0, TECH_LIMIT);
  const hiddenCount = project.technologies.length - TECH_LIMIT;
  
  const getTechName = (id) => {
    const tech = technologies.find(t => t.id === id);
    return tech ? tech.name : id;
  };

  return (
    <article className="project-card">
      <div className="project-image-container">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.name} 
            width={project.imageWidth} 
            height={project.imageHeight} 
            className="project-image"
            loading="lazy"
          />
        ) : (
          <div className="project-image-placeholder" aria-hidden="true"></div>
        )}
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.name}</h3>
        <p className="project-description">{t(project.description)}</p>
        <div className="project-technologies">
          {visibleTechs.map(techId => (
            <span key={techId} className="tech-badge">{getTechName(techId)}</span>
          ))}
          {hiddenCount > 0 && (
            <span className="tech-badge tech-badge-more">+{hiddenCount}</span>
          )}
        </div>
        <div className="project-links">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
              {t(ui.sourceCode)}
              <span className="visually-hidden">{t(ui.externalLink)}</span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo-link">
              {t(ui.liveDemo)}
              <span className="visually-hidden">{t(ui.externalLink)}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
