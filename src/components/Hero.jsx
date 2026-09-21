import React from 'react';
import styles from './Hero.module.css';
import { profile } from '../data/profile.js';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';

export default function Hero() {
  return (
    <section id="hero" className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>{profile.name}</h1>
          <h2 className={styles.subtitle}>{t(profile.title)}</h2>
          <p className={styles.location}>{t(profile.location)}</p>
          <div className={styles.availabilityWrapper}>
            <span className={styles.availabilityBadge}>
              {t(profile.availability)}
            </span>
          </div>
          <p className={styles.summary}>
            {t(profile.summary)}
          </p>
          <div className={styles.actions}>
            <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>
              {t(ui.navContact)}
            </a>
            <a href={profile.github} className={`${styles.btn} ${styles.btnSecondary}`} target="_blank" rel="noopener noreferrer">
              GitHub <span className={styles.visuallyHidden}>{t(ui.externalLink)}</span>
            </a>
            <a href={profile.linkedin} className={`${styles.btn} ${styles.btnSecondary}`} target="_blank" rel="noopener noreferrer">
              LinkedIn <span className={styles.visuallyHidden}>{t(ui.externalLink)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
