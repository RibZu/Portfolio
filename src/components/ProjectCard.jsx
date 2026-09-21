import React from 'react';
import { technologies } from '../data/technologies.js';
import { projects } from '../data/projects.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import styles from './ProjectCard.module.css';

const techName = (id) => technologies.find((tech) => tech.id === id)?.name ?? id;

/* Una lámina: dibujo (si hay), descripción y cajetín con los datos de consulta. */
export function ProjectCard({ project, onJump }) {
  const related = project.relatedTo ? projects.find((p) => p.id === project.relatedTo) : null;

  return (
    <article id={`project-${project.id}`} className={styles.sheet}>
      {project.image && (
        <img
          src={project.image}
          alt={project.name}
          width={project.imageWidth}
          height={project.imageHeight}
          className={styles.image}
          loading="lazy"
        />
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{project.name}</h3>
        <p className={styles.description}>{t(project.description)}</p>
      </div>
      <dl className={styles.titleBlock}>
        <div className={`${styles.cell} ${styles.cellTech}`}>
          <dt>{t(ui.sheetTech)}</dt>
          <dd>{project.technologies.map(techName).join(', ')}</dd>
        </div>
        {project.repo && (
          <div className={`${styles.cell} ${styles.cellLink}`}>
            <dt>{t(ui.sheetCode)}</dt>
            <dd>
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                {t(ui.sheetOpenRepo)}
                <span className="sr-only"> {project.name} {t(ui.externalLink)}</span>
              </a>
            </dd>
          </div>
        )}
        {project.demo && (
          <div className={`${styles.cell} ${styles.cellLink}`}>
            <dt>{t(ui.sheetDemo)}</dt>
            <dd>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                {t(ui.sheetOpenDemo)}
                <span className="sr-only"> {project.name} {t(ui.externalLink)}</span>
              </a>
            </dd>
          </div>
        )}
        {related && (
          <div className={`${styles.cell} ${styles.cellLink}`}>
            <dt>{t(ui.sheetSeeAlso)}</dt>
            <dd>
              <a
                href={`#project-${related.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onJump(related.id);
                }}
              >
                {related.name}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}
