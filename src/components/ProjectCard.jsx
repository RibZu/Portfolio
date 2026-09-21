import React from 'react';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }) {
  const TECH_LIMIT = 3;
  const visibleTechs = project.technologies.slice(0, TECH_LIMIT);
  const hiddenCount = project.technologies.length - TECH_LIMIT;
  
  const getTechName = (id) => {
    const tech = technologies.find(t => t.id === id);
    return tech ? tech.name : id;
  };

  return (
    <article className={styles.projectCard}>
      <div className={styles.projectImageContainer}>
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.name} 
            width={project.imageWidth} 
            height={project.imageHeight} 
            className={styles.projectImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.projectImagePlaceholder} aria-hidden="true"></div>
        )}
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.name}</h3>
        <p className={styles.projectDescription}>{t(project.description)}</p>
        <div className={styles.projectTechnologies}>
          {visibleTechs.map(techId => (
            <span key={techId} className={styles.techBadge}>{getTechName(techId)}</span>
          ))}
          {hiddenCount > 0 && (
            <span className={`${styles.techBadge} ${styles.techBadgeMore}`}>+{hiddenCount}</span>
          )}
        </div>
        <div className={styles.projectLinks}>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
              {t(ui.sourceCode)}
              <span className={styles.visuallyHidden}>{t(ui.externalLink)}</span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
              {t(ui.liveDemo)}
              <span className={styles.visuallyHidden}>{t(ui.externalLink)}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
