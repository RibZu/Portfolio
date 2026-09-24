import React from 'react';
import styles from './Hero.module.css';
import { profile } from '../data/profile.js';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Hero() {
  const heroRef = useScrollReveal();

  return (
    <section id="hero" className={`section reveal-hidden ${styles.hero}`} ref={heroRef}>
      <div className={`container ${styles.splitContainer}`}>
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>{profile.name}</h1>
          <h2 className={styles.subtitle}>{t(profile.title)}</h2>
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
        <div className={styles.rightColumn}>
          <div className={styles.visualContainer}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.abstractSvg} aria-hidden="true" focusable="false">
              {/* Abstract decorative elements */}
              <circle cx="200" cy="200" r="160" stroke="var(--color-accent-base)" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
              <circle cx="200" cy="200" r="120" stroke="var(--color-accent-light)" strokeWidth="2" opacity="0.3" />
              
              {/* Hexagon / Data structure */}
              <path d="M200 60 L321 130 L321 270 L200 340 L79 270 L79 130 Z" stroke="var(--color-border)" strokeWidth="1.5" fill="rgba(89, 128, 166, 0.05)" />
              
              {/* Code brackets < / > */}
              <path d="M170 170 L140 200 L170 230" stroke="var(--color-display)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={styles.svgFloat1} />
              <path d="M230 170 L260 200 L230 230" stroke="var(--color-display)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={styles.svgFloat1} />
              <path d="M215 150 L185 250" stroke="var(--color-accent-light)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={styles.svgFloat2} />
              
              {/* Connecting Nodes */}
              <circle cx="200" cy="60" r="6" fill="var(--color-accent-light)" className={styles.svgPulse} />
              <circle cx="321" cy="130" r="5" fill="var(--color-text-secondary)" />
              <circle cx="321" cy="270" r="7" fill="var(--color-border)" className={styles.svgPulse} style={{ animationDelay: '1s' }} />
              <circle cx="200" cy="340" r="5" fill="var(--color-accent-base)" />
              <circle cx="79" cy="270" r="6" fill="var(--color-accent-light)" />
              <circle cx="79" cy="130" r="5" fill="var(--color-text-primary)" className={styles.svgPulse} style={{ animationDelay: '0.5s' }} />
              
              {/* Abstract code lines */}
              <rect x="130" y="270" width="40" height="4" rx="2" fill="var(--color-accent-light)" opacity="0.5" />
              <rect x="130" y="285" width="80" height="4" rx="2" fill="var(--color-border)" opacity="0.3" />
              <rect x="130" y="300" width="60" height="4" rx="2" fill="var(--color-accent-base)" opacity="0.4" />
              
              <rect x="230" y="80" width="60" height="4" rx="2" fill="var(--color-accent-light)" opacity="0.5" />
              <rect x="250" y="95" width="40" height="4" rx="2" fill="var(--color-border)" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
