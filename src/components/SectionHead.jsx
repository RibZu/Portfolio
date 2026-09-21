import React from 'react';
import styles from './SectionHead.module.css';

/* Título con línea de cota: la cota termina en un dato real de la sección. */
export default function SectionHead({ id, title, meta }) {
  return (
    <div className={styles.head}>
      <h2 id={id} className={styles.title}>{title}</h2>
      <span className={styles.dimension} aria-hidden="true" />
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
  );
}
