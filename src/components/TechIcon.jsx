import React from 'react';
import {
  siAndroid,
  siDocker,
  siGo,
  siJavascript,
  siMysql,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siTypescript,
} from 'simple-icons';

// Logos oficiales (simple-icons, dominio público), dibujados en un solo color.
const icons = {
  go: siGo,
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  node: siNodedotjs,
  php: siPhp,
  'java-android': siAndroid,
  postgresql: siPostgresql,
  mysql: siMysql,
  docker: siDocker,
};

// El logo de Go es un texto apaisado: se recorta a su caja para poder mostrarlo más ancho.
const tightViewBox = { go: '0 7.5 24 9' };

export function hasTechIcon(id) {
  return Boolean(icons[id]);
}

export default function TechIcon({ id, className }) {
  const icon = icons[id];
  if (!icon) return null;
  return (
    <svg
      className={className}
      data-wide={tightViewBox[id] ? '' : undefined}
      viewBox={tightViewBox[id] ?? '0 0 24 24'}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
