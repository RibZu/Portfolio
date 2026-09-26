import React from 'react';
import { experience } from '../data/experience.js';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { sortExperience } from '../lib/derive.js';
import SectionHead from './SectionHead.jsx';
import styles from './Background.module.css';

const sorted = sortExperience(experience);
// La cronología muestra solo los tres trabajos más recientes; el resto se lee en LinkedIn.
const TIMELINE_LIMIT = 3;
const mainEntries = sorted.filter((e) => e.type === 'work').slice(0, TIMELINE_LIMIT);
const degreeEntries = sorted.filter((e) => e.degree);
const certEntries = sorted.filter((e) => e.type === 'certification');

export default function Background() {
  return (
    <section id="background" className="block" aria-labelledby="background-title">
      <div className="container">
        <SectionHead id="background-title" title={t(ui.headingBackground)} />

        <div className={styles.layout}>
          <div>
            <ol className={styles.timeline}>
              {mainEntries.map((entry) => {
                const current = entry.period.to === null;
                return (
                  <li key={entry.id} className={`${styles.entry} ${current ? styles.entryCurrent : ''}`}>
                    <p className={styles.period}>
                      {entry.period.from} – {entry.period.to || t(ui.present)}
                    </p>
                    <div className={styles.roleRow}>
                      <h3 className={styles.role}>{t(entry.role)}</h3>
                      {entry.team && <span className={styles.teamTag}>{t(ui.teamWork)}</span>}
                    </div>
                    <p className={styles.organisation}>{entry.organisation}</p>
                    {entry.url && (
                      <p className={styles.url}>
                        <a href={entry.url} target="_blank" rel="noopener noreferrer">
                          {entry.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          <span className="sr-only"> {t(ui.externalLink)}</span>
                        </a>
                      </p>
                    )}
                    {entry.description &&<p className={styles.description}>{t(entry.description)}</p>}
                  </li>
                );
              })}
            </ol>
            <div className={styles.links}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                {t(ui.linkedinFull)}
                <span className="sr-only"> {t(ui.externalLink)}</span>
              </a>
              <div className={styles.cvGroup}>
                {profile.cv.map((cv) => {
                  const downloadLabel = `${t(ui.cvDownload)} ${t(cv.name)} (PDF)`;
                  return (
                    <div key={cv.id} className={styles.cvPair}>
                      <a href={cv.href} target="_blank" rel="noopener noreferrer" className={styles.cvBtn}>
                        {t(ui.cvView)} · {cv.label}
                        <span className="sr-only"> {t(cv.name)}, PDF {t(ui.externalLink)}</span>
                      </a>
                      <a href={cv.href} download={cv.file} className={styles.cvDownload} aria-label={downloadLabel} title={downloadLabel}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                        </svg>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className={styles.side}>
            <section>
              <h3 className={styles.sideTitle}>{t(ui.languagesTitle)}</h3>
              <dl className={styles.rows}>
                {profile.spokenLanguages.map((lang) => (
                  <div key={lang.name.en} className={styles.rowItem}>
                    <dt>{t(lang.name)}</dt>
                    <dd>{t(lang.level)}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h3 className={styles.sideTitle}>{t(ui.degreesTitle)}</h3>
              <ul className={styles.certs}>
                {degreeEntries.map((entry) => (
                  <li key={entry.id} className={styles.cert}>
                    <span className={styles.certYear}>{entry.period.to ?? entry.period.from}</span>
                    <span>
                      {t(entry.role)}
                      <span className={styles.certOrg}>{entry.organisation}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className={styles.sideTitle}>{t(ui.certificationsTitle)}</h3>
              <ul className={styles.certs}>
                {certEntries.map((entry) => (
                  <li key={entry.id} className={styles.cert}>
                    <span className={styles.certYear}>{entry.period.from}</span>
                    <span>
                      {t(entry.role)}
                      <span className={styles.certOrg}>{entry.organisation}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
