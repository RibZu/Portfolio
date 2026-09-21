import React from 'react';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { projects } from '../data/projects.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import styles from './Skills.module.css';

const orderedProjects = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const orderedSkills = [...skills].sort((a, b) => a.order - b.order);

/* Cada tecnología es una escala: una marca por proyecto, alta si ese proyecto la usa. */
export default function Skills() {
  return (
    <section id="skills" className="block" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          id="skills-title"
          title={t(ui.headingSkills)}
          meta={t(ui.skillsMeta, orderedSkills.length)}
        />
        <ul className={styles.list}>
          {orderedSkills.map((skill) => {
            const tech = technologies.find((item) => item.id === skill.technologyId);
            if (!tech) return null;
            const usedIn = orderedProjects.filter((p) => p.technologies.includes(tech.id));
            return (
              <li key={tech.id} className={styles.row}>
                <div className={styles.who}>
                  <h3 className={styles.name}>{tech.name}</h3>
                  <p className={styles.blurb}>{t(tech.blurb)}</p>
                </div>
                <div className={styles.ruler} aria-hidden="true">
                  {orderedProjects.map((p) => (
                    <span
                      key={p.id}
                      className={`${styles.tick} ${p.technologies.includes(tech.id) ? styles.tickUsed : ''}`}
                    />
                  ))}
                </div>
                <p className={styles.status}>
                  {usedIn.length > 0 ? t(ui.resultCount, usedIn.length) : t(ui.skillLearning)}
                </p>
                <span className="sr-only">
                  {usedIn.length > 0
                    ? t(ui.skillUsedIn, usedIn.map((p) => p.name).join(', '))
                    : t(ui.skillNoProject)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
