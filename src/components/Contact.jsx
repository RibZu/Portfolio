import React from 'react';
import { profile } from '../data/profile.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import styles from './Contact.module.css';

const bareUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export default function Contact() {
  const channels = [
    { label: t(ui.contactEmail), value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: 'GitHub', value: bareUrl(profile.github), href: profile.github, external: true },
    { label: 'LinkedIn', value: bareUrl(profile.linkedin), href: profile.linkedin, external: true },
  ];

  return (
    <section id="contact" className="block" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead
          id="contact-title"
          title={t(ui.headingContact)}
          meta={t(ui.contactMeta)}
        />
        <p className={styles.lead}>{t(ui.contactLead)}</p>
        <ul className={styles.channels}>
          {channels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                className={styles.row}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.label}>{channel.label}</span>
                <span className={styles.value}>{channel.value}</span>
                {channel.external && <span className="sr-only">{t(ui.externalLink)}</span>}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.footer}>© {new Date().getFullYear()} {profile.name} Zunino</p>
      </div>
    </section>
  );
}
