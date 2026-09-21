import React, { useState } from 'react';
import styles from './Header.module.css';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.headerOpen : ''}`}>
      <span className={styles.ball} aria-hidden="true" />
      <div className={`container ${styles.container}`}>
        <button
          className={styles.toggle}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.toggleIcon}></span>
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><a href="#skills" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navSkills)}</a></li>
            <li><a href="#projects" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navProjects)}</a></li>
            <li><a href="#background" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navBackground)}</a></li>
            <li><a href="#contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navContact)}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
