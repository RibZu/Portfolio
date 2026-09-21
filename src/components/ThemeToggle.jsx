import React, { useEffect, useState } from 'react';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';
import styles from './ThemeToggle.module.css';

const readTheme = () => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const follow = (e) => {
      try {
        if (localStorage.getItem('theme')) return;
      } catch (err) {
        // Sin storage: seguir al sistema igualmente
      }
      const next = e.matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      setTheme(next);
    };
    media.addEventListener('change', follow);
    return () => media.removeEventListener('change', follow);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (err) {
      // Ignore error if storage is blocked
    }
    setTheme(next);
  };

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={t(isLight ? ui.themeToDark : ui.themeToLight)}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        {isLight ? (
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
          </>
        )}
      </svg>
    </button>
  );
}
