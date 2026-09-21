import React from 'react';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { projects } from '../data/projects.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { isDemonstrated } from '../lib/derive.js';

export default function Skills() {
  return (
    <section id="skills" className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4">{t(ui.headingSkills)}</h2>
        <div className="row g-4">
          {skills.map(skill => {
            const tech = technologies.find(t => t.id === skill.technologyId);
            if (!tech) return null;
            const demonstrated = isDemonstrated(tech.id, projects);
            return (
              <div key={skill.technologyId} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 card-title d-flex align-items-center gap-2">
                      {tech.name}
                      {demonstrated ? (
                        <span className="badge bg-primary text-light" style={{fontSize: '0.65em'}} title="Demonstrated in projects">
                          ✓
                        </span>
                      ) : (
                        <span className="badge bg-secondary text-light" style={{fontSize: '0.65em'}} title="Declared skill">
                          ○
                        </span>
                      )}
                    </h3>
                    <p className="card-text text-muted mb-0">
                      {t(tech.blurb)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
