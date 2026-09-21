import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';

const links = [
  { id: 'skills', label: ui.navSkills },
  { id: 'projects', label: ui.navProjects },
  { id: 'background', label: ui.navBackground },
  { id: 'contact', label: ui.navContact },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const headerRef = useRef(null);

  // El mapa avanza con el scroll y la cota inferior se rellena con el progreso de lectura.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty('--progress', max > 0 ? Math.min(1, Math.max(0, y / max)).toFixed(4) : '0');
      if (!reduceMotion) {
        el.style.setProperty('--map-far', `${(-y * 0.3).toFixed(1)}px`);
        el.style.setProperty('--map-near', `${(-y * 0.75).toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Sección visible: la que cruza el tercio superior de la ventana.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    links.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    const hero = document.getElementById('hero');
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveId(null);
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    if (hero) heroObserver.observe(hero);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header ref={headerRef} className={`${styles.header} ${isMenuOpen ? styles.headerOpen : ''}`}>
      <div className={styles.clip} aria-hidden="true">
        <span className={`${styles.map} ${styles.mapFar}`} />
        <span className={`${styles.map} ${styles.mapNear}`} />
        <span className={styles.progress} />
      </div>
      <div className={`container ${styles.container}`}>
        <button
          className={styles.toggle}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={t(ui.navToggle)}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.toggleIcon}></span>
        </button>
        <span className={styles.current} aria-hidden="true">
          {activeId ? t(links.find((l) => l.id === activeId).label) : null}
        </span>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.navLink}
                  aria-current={activeId === id ? 'true' : undefined}
                  onClick={closeMenu}
                >
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
