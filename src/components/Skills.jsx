import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { projects } from '../data/projects.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { isDemonstrated } from '../lib/derive.js';
import styles from './Skills.module.css';

export default function Skills() {
  const revealRef = useScrollReveal();

  return (
    <section id="skills" className="section reveal-hidden" ref={revealRef}>
      <div className="container">
        <h2 className="section-title">{t(ui.headingSkills)}</h2>
        <ul className={styles.skillsGrid}>
          {skills.map(skill => {
            const tech = technologies.find(t => t.id === skill.technologyId);
            if (!tech) return null;
            const demonstrated = isDemonstrated(tech.id, projects);
            return (
              <li key={skill.technologyId} className={styles.skillItem}>
                <span className={styles.skillName}>{tech.name}</span>
                {demonstrated ? (
                  <span className={styles.badgeDemonstrated} title="Demonstrated in projects" aria-label="Demonstrated in projects">
                    ✓
                  </span>
                ) : (
                  <span className={styles.badgeDeclared} title="Declared skill" aria-label="Declared skill">
                    ○
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
