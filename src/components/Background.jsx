import React from 'react';
import { experience } from '../data/experience.js';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { sortExperience } from '../lib/derive.js';
import { currentLanguage } from '../lib/language.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import styles from './Background.module.css';

export default function Background() {
  const revealRef = useScrollReveal();
  const sorted = sortExperience(experience);
  const langTitle = currentLanguage === 'es' ? 'Idiomas' : 'Languages';
  const presentText = currentLanguage === 'es' ? 'Presente' : 'Present';
  const mainEntries = sorted.filter(e => e.type !== 'certification');
  const certEntries = sorted.filter(e => e.type === 'certification');

  return (
    <section id="background" className="section reveal-hidden" ref={revealRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title" style={{marginBottom: 0}}>{t(ui.headingBackground)}</h2>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
            LinkedIn <span className={styles.srOnly}>{t(ui.externalLink)}</span>
          </a>
        </div>
        
        <div className={styles.languagesSection}>
          <h3 className={styles.languagesTitle}>{langTitle}</h3>
          <ul className={styles.languagesList}>
            {profile.spokenLanguages.map((lang, i) => (
              <li key={i} className={styles.languageItem}>
                <strong>{t(lang.name)}:</strong> {t(lang.level)}
              </li>
            ))}
          </ul>
        </div>

        <h3 className={styles.experienceSubheading}>
          {currentLanguage === 'es' ? 'Experiencia' : 'Experience'}
        </h3>

        <div className={styles.experienceList}>
          {mainEntries.map(entry => (
            <div key={entry.id} className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <h4 className={styles.role}>{t(entry.role)}</h4>
                <span className={styles.period}>
                  {entry.period.from} - {entry.period.to || presentText}
                </span>
              </div>
              <h5 className={styles.organisation}>{entry.organisation}</h5>
              {entry.description && (
                <p className={styles.description}>{t(entry.description)}</p>
              )}
            </div>
          ))}
        </div>

        <div className={styles.certificationsSection}>
          <h3 className={styles.certificationsTitle}>
            {currentLanguage === 'es' ? 'Certificaciones' : 'Certifications'}
          </h3>
          <div className={styles.certificationsPills}>
            {certEntries.map(entry => (
              <span key={entry.id} className={styles.certPill}>
                {t(entry.role)} · {entry.period.from}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
