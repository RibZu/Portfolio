import React from 'react';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import styles from './Skills.module.css';

// Los grupos salen de la categoría de cada tecnología, así agregar una skill no requiere tocar el diseño.
const groups = [
  { id: 'languages', title: ui.skillGroupLanguages, categories: ['language'] },
  { id: 'tools', title: ui.skillGroupTools, categories: ['framework', 'platform', 'tooling'] },
  { id: 'databases', title: ui.skillGroupDatabases, categories: ['database'] },
];

const orderedSkills = [...skills]
  .sort((a, b) => a.order - b.order)
  .map((skill) => technologies.find((tech) => tech.id === skill.technologyId))
  .filter(Boolean);

export default function Skills() {
  return (
    <section id="skills" className="block" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={t(ui.headingSkills)} />
        <div className={styles.grid}>
          {groups.map((group) => {
            const items = orderedSkills.filter((tech) => group.categories.includes(tech.category));
            if (items.length === 0) return null;
            return (
              <article key={group.id} className={`sheet ${styles.group}`}>
                <h3 className={styles.title}>{t(group.title)}</h3>
                <ul className={styles.list}>
                  {items.map((tech) => (
                    <li key={tech.id} className={styles.item}>{tech.name}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
