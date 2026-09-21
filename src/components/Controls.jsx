import React from 'react';
import LanguageSwitch from './LanguageSwitch.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import styles from './Controls.module.css';

export default function Controls() {
  return (
    <div className={styles.controls}>
      <LanguageSwitch />
      <ThemeToggle />
    </div>
  );
}
