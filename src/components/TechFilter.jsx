import React from 'react';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';

export function TechFilter({ technologies, counts, totalProjects, active, onChange }) {
  return (
    <div 
      className="tech-filters" 
      role="group" 
      aria-label={t(ui.filterGroupLabel)}
    >
      <button
        type="button"
        className="filter-btn"
        aria-pressed={active === null}
        onClick={() => onChange(null)}
      >
        <span className="filter-name">{t(ui.filterAll)}</span>
        <span className="filter-count">({totalProjects})</span>
      </button>
      
      {technologies.map(tech => {
        const count = counts[tech.id] || 0;
        return (
          <button
            key={tech.id}
            type="button"
            className="filter-btn"
            aria-pressed={active === tech.id}
            onClick={() => onChange(tech.id)}
          >
            <span className="filter-name">{tech.name}</span>
            <span className="filter-count">({count})</span>
          </button>
        );
      })}
    </div>
  );
}
