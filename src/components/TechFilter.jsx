import React from 'react';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import styles from './TechFilter.module.css';

export function TechFilter({ technologies, counts, totalProjects, active, onChange }) {
  return (
    <div
      className={styles.techFilters}
      role="group"
      aria-label={t(ui.filterGroupLabel)}
    >
      <button
        type="button"
        className={styles.filterBtn}
        aria-pressed={active === null}
        onClick={() => onChange(null)}
      >
        <span>{t(ui.filterAll)}</span>
        <span className={styles.filterCount}>{totalProjects}</span>
      </button>

      {technologies.map((tech) => (
        <button
          key={tech.id}
          type="button"
          className={styles.filterBtn}
          aria-pressed={active === tech.id}
          onClick={() => onChange(tech.id)}
        >
          <span>{tech.name}</span>
          <span className={styles.filterCount}>{counts[tech.id] || 0}</span>
        </button>
      ))}
    </div>
  );
}
