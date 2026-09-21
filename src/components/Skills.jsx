import React from 'react';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import TechIcon, { hasTechIcon } from './TechIcon.jsx';
import styles from './Skills.module.css';

const orderedSkills = [...skills]
  .sort((a, b) => a.order - b.order)
  .map((skill) => technologies.find((tech) => tech.id === skill.technologyId))
  .filter(Boolean);

/* Cadena de cotas: una sola línea de dimensión, con un tramo y un logo por tecnología. */
export default function Skills() {
  return (
    <section id="skills" className="block" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={t(ui.headingSkills)} />
        <ul className={styles.chain}>
          {orderedSkills.map((tech) => (
            <li key={tech.id} className={styles.span} tabIndex={0}>
              {hasTechIcon(tech.id) && <TechIcon id={tech.id} className={styles.icon} />}
              <span className={hasTechIcon(tech.id) ? styles.name : styles.nameOnly}>{tech.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
