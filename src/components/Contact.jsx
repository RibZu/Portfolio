import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import styles from './Contact.module.css';

export default function Contact() {
  const revealRef = useScrollReveal();

  return (
    <section id="contact" className={`section ${styles.contactSection} reveal-hidden`} ref={revealRef}>
      <div className="container">
        <h2 className={`section-title ${styles.title}`}>{t(ui.headingContact)}</h2>
        <div className={styles.content}>
          <div className={styles.emailWrapper}>
            <a href={`mailto:${profile.email}`} className={styles.primaryButton}>
              Email Me
            </a>
            <p className={styles.emailText}>{profile.email}</p>
          </div>
          <div className={styles.socialLinks}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
              GitHub <span className={styles.srOnly}>{t(ui.externalLink)}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
              LinkedIn <span className={styles.srOnly}>{t(ui.externalLink)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
