import React from 'react';
import { experience } from '../data/experience.js';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { sortExperience } from '../lib/derive.js';
import { currentLanguage } from '../lib/language.js';

export default function Background() {
  const sorted = sortExperience(experience);
  const langTitle = currentLanguage === 'es' ? 'Idiomas' : 'Languages';
  const presentText = currentLanguage === 'es' ? 'Presente' : 'Present';
  
  return (
    <section id="background" className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{t(ui.headingBackground)}</h2>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
            LinkedIn <span className="visually-hidden">{t(ui.externalLink)}</span>
          </a>
        </div>
        
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="h5 mb-3">{langTitle}</h3>
            <ul className="list-inline">
              {profile.spokenLanguages.map((lang, i) => (
                <li key={i} className="list-inline-item me-4 border rounded px-3 py-2 bg-light">
                  <strong>{t(lang.name)}:</strong> {t(lang.level)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row g-4">
          {sorted.map(entry => (
            <div key={entry.id} className="col-12 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="h5 mb-0">{t(entry.role)}</h4>
                    <span className="badge bg-secondary">
                      {entry.period.from} - {entry.period.to || presentText}
                    </span>
                  </div>
                  <h5 className="h6 text-muted mb-3">{entry.organisation}</h5>
                  {entry.description && (
                    <p className="card-text mb-0">{t(entry.description)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
