import React from 'react';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import styles from './Skills.module.css';

// Las tecnologías se agrupan por lo que hacen, en palabras que entiende quien no programa.
const layers = [
  { id: 'frontend', title: ui.skillFrontTitle, hint: ui.skillFrontHint },
  { id: 'backend', title: ui.skillBackTitle, hint: ui.skillBackHint },
  { id: 'data', title: ui.skillDataTitle, hint: ui.skillDataHint },
  { id: 'mobile', title: ui.skillMobileTitle, hint: ui.skillMobileHint },
  { id: 'tools', title: ui.skillToolsTitle, hint: ui.skillToolsHint },
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
          {layers.map((layer) => {
            const items = orderedSkills.filter((tech) => tech.layer === layer.id);
            if (items.length === 0) return null;
            return (
              <article key={layer.id} className={`sheet ${styles.group}`}>
                <header className={styles.header}>
                  <h3 className={styles.title}>{t(layer.title)}</h3>
                  <p className={styles.hint}>{t(layer.hint)}</p>
                </header>
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
