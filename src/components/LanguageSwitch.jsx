import React from 'react';
import { currentLanguage, setLanguagePreference, getOppositePath } from '../lib/language.js';
import styles from './LanguageSwitch.module.css';

export default function LanguageSwitch() {
  const switchLang = currentLanguage === 'es' ? 'en' : 'es';
  const oppositePath = getOppositePath();
  const switchLabel = switchLang === 'en' ? 'EN' : 'ES';
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  const handleClick = () => {
    setLanguagePreference(switchLang);
  };

  return (
    <a
      href={`${oppositePath}${hash}`}
      onClick={handleClick}
      className={styles.langSwitch}
      aria-label={switchLang === 'en' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {switchLabel}
    </a>
  );
}
