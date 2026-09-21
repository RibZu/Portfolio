import React from 'react';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import styles from './Skills.module.css';

const orderedSkills = [...skills].sort((a, b) => a.order - b.order);

export default function Skills() {
  return (
    <section id="skills" className="block" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={t(ui.headingSkills)} />
        <ul className={styles.list}>
          {orderedSkills.map((skill) => {
            const tech = technologies.find((item) => item.id === skill.technologyId);
            return tech ? (
              <li key={tech.id} className={styles.cell}>{tech.name}</li>
            ) : null;
          })}
        </ul>
      </div>
    </section>
  );
}
