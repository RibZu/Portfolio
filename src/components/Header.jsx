import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';
import Controls from './Controls.jsx';

const links = [
  { id: 'skills', label: ui.navSkills },
  { id: 'projects', label: ui.navProjects },
  { id: 'background', label: ui.navBackground },
  { id: 'contact', label: ui.navContact },
];

// Sección activa: la última cuyo borde superior ya pasó el tercio superior de la ventana.
// Al llegar al final de la página gana la última, aunque sea demasiado corta para alcanzar ese punto.
function currentSection(scrollY) {
  const atBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
  if (atBottom) return links[links.length - 1].id;
  let current = null;
  links.forEach(({ id }) => {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
  });
  return current;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const headerRef = useRef(null);

  // El mapa avanza con el scroll, la cota inferior se rellena con el progreso y se marca la sección activa.
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
      setActiveId(currentSection(y));
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
        <Controls />
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
