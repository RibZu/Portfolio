import React from 'react';
import { profile } from '../data/profile.js';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';

export default function Hero() {
  return (
    <section id="hero" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4 fw-bold">{profile.name}</h1>
            <h2 className="h3 text-muted">{t(profile.title)}</h2>
            <p className="lead mt-3 mb-1">{t(profile.location)}</p>
            <p className="mb-4">
              <span className="badge bg-primary px-3 py-2 rounded-pill">
                {t(profile.availability)}
              </span>
            </p>
            <p className="mb-4" style={{ maxWidth: '600px' }}>
              {t(profile.summary)}
            </p>
            <div className="d-flex gap-3">
              <a href="#contact" className="btn btn-primary btn-lg">
                {t(ui.navContact)}
              </a>
              <a href={profile.github} className="btn btn-outline-secondary btn-lg" target="_blank" rel="noopener noreferrer">
                GitHub <span className="visually-hidden">{t(ui.externalLink)}</span>
              </a>
              <a href={profile.linkedin} className="btn btn-outline-secondary btn-lg" target="_blank" rel="noopener noreferrer">
                LinkedIn <span className="visually-hidden">{t(ui.externalLink)}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
