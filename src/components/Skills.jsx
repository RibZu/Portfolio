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

const nodes = layers
  .map((layer) => ({ ...layer, items: orderedSkills.filter((tech) => tech.layer === layer.id) }))
  .filter((layer) => layer.items.length > 0);

/* Un diagrama de sistema: la pantalla le pide datos al servidor y el servidor responde. */
function Link() {
  return (
    <div className={styles.link} aria-hidden="true">
      <span className={`${styles.arrow} ${styles.arrowForward}`}>
        <em>{t(ui.skillAsks)}</em>
      </span>
      <span className={`${styles.arrow} ${styles.arrowBack}`}>
        <em>{t(ui.skillReplies)}</em>
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="block" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={t(ui.headingSkills)} />
        <div className={styles.flow}>
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              {index > 0 && <Link />}
              <article className={`sheet ${styles.node}`}>
                <header className={styles.header}>
                  <h3 className={styles.title}>{t(node.title)}</h3>
                  <p className={styles.hint}>{t(node.hint)}</p>
                </header>
                <ul className={styles.list}>
                  {node.items.map((tech) => (
                    <li key={tech.id} className={styles.item}>{tech.name}</li>
                  ))}
                </ul>
              </article>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
