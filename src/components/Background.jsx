import React from 'react';
import { experience } from '../data/experience.js';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import { sortExperience } from '../lib/derive.js';
import SectionHead from './SectionHead.jsx';
import styles from './Background.module.css';

const sorted = sortExperience(experience);
const mainEntries = sorted.filter((e) => e.type !== 'certification');
const certEntries = sorted.filter((e) => e.type === 'certification');
const firstYear = Math.min(...experience.map((e) => Number(e.period.from)));

export default function Background() {
  return (
    <section id="background" className="block" aria-labelledby="background-title">
      <div className="container">
        <SectionHead
          id="background-title"
          title={t(ui.headingBackground)}
          meta={t(ui.backgroundMeta, firstYear)}
        />

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
                    <h3 className={styles.role}>{t(entry.role)}</h3>
                    <p className={styles.organisation}>
                      {entry.url ? (
                        <a href={entry.url} target="_blank" rel="noopener noreferrer">
                          {entry.organisation}
                          <span className="sr-only"> {t(ui.externalLink)}</span>
                        </a>
                      ) : (
                        entry.organisation
                      )}
                    </p>
                    {entry.description && <p className={styles.description}>{t(entry.description)}</p>}
                  </li>
                );
              })}
            </ol>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
              {t(ui.linkedinFull)}
              <span className="sr-only"> {t(ui.externalLink)}</span>
            </a>
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
