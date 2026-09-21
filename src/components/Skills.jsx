import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { projects } from '../data/projects.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { isDemonstrated } from '../lib/derive.js';
import { currentLanguage } from '../lib/language.js';
import styles from './Skills.module.css';

export default function Skills() {
  const revealRef = useScrollReveal();

  return (
    <section id="skills" className="section reveal-hidden" ref={revealRef}>
      <div className="container">
        <span className="section-label">{currentLanguage === 'es' ? 'Tecnologías' : 'Technologies'}</span>
        <h2 className="section-heading">{t(ui.headingSkills)}</h2>

        <div className={styles.terminalWindow}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDot}></div>
            <div className={styles.terminalDot}></div>
            <div className={styles.terminalDot}></div>
          </div>
          <div className={styles.commandPrompt}>
            <span className={styles.commandUser}>guest@portfolio:~$</span>
            <span className={styles.commandText}>whoami --skills</span>
          </div>
          <ul className={styles.skillsOutput}>
            {skills.map(skill => {
              const tech = technologies.find(t => t.id === skill.technologyId);
              if (!tech) return null;
              const demonstrated = isDemonstrated(tech.id, projects);
              return (
                <li key={skill.technologyId} className={styles.skillItem}>
                  <span className={styles.skillName}>&gt; {tech.name}</span>
                  {demonstrated ? (
                    <span className={styles.badgeDemonstrated} title="Demonstrated in projects" aria-label="Demonstrated in projects">
                      [verified]
                    </span>
                  ) : (
                    <span className={styles.badgeDeclared} title="Declared skill" aria-label="Declared skill">
                      [learning]
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={styles.commandPrompt} style={{ marginTop: '1.5rem', marginBottom: '0' }}>
            <span className={styles.commandUser}>guest@portfolio:~$</span>
            <span className={styles.cursor}></span>
          </div>
        </div>
      </div>
    </section>
  );
}
