import React from 'react';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';

export default function Contact() {
  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4">{t(ui.headingContact)}</h2>
        <div className="d-flex flex-column align-items-center gap-3">
          <div>
            <a href={`mailto:${profile.email}`} className="btn btn-primary btn-lg mb-2">
              Email Me
            </a>
            <p className="text-muted user-select-all mb-0">{profile.email}</p>
          </div>
          <div className="d-flex gap-3 mt-3">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
              GitHub <span className="visually-hidden">{t(ui.externalLink)}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
              LinkedIn <span className="visually-hidden">{t(ui.externalLink)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
