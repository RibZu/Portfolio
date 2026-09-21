import React from 'react';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import styles from './Contact.module.css';

const lastSegment = (url) => url.replace(/\/$/, '').split('/').pop();
// LinkedIn agrega un identificador al final del usuario; se omite para mostrar solo el nombre.
const linkedinHandle = (url) => lastSegment(url).replace(/-[0-9a-z]{8,}$/, '');

/* Cajetín de cierre: la identidad del plano y los canales de contacto, en una sola lámina. */
export default function Contact() {
  const channels = [
    { label: t(ui.contactEmail), value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: 'GitHub', value: lastSegment(profile.github), href: profile.github, external: true },
    { label: 'LinkedIn', value: linkedinHandle(profile.linkedin), href: profile.linkedin, external: true },
  ];

  return (
    <section id="contact" className="block" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead id="contact-title" title={t(ui.headingContact)} />
        <div className={`sheet ${styles.titleBlock}`}>
          <div className={styles.identity}>
            <p className={styles.name}>{profile.name} Zunino</p>
            <p className={styles.role}>{t(profile.title)}, {new Date().getFullYear()}</p>
          </div>
          <ul className={styles.channels}>
            {channels.map((channel) => (
              <li key={channel.label} className={styles.item}>
                <a
                  href={channel.href}
                  className={styles.cell}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.label}>{channel.label}</span>
                  <span className={styles.value}>{channel.value}</span>
                  {channel.external && <span className="sr-only"> {t(ui.externalLink)}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
