import React, { useEffect, useMemo, useRef, useState } from 'react';
import { skills } from '../data/profile.js';
import { technologies } from '../data/technologies.js';
import { ui } from '../data/ui.js';
import { t } from '../lib/content.js';
import SectionHead from './SectionHead.jsx';
import { TechGlyph, hasTechIcon } from './TechIcon.jsx';
import styles from './Skills.module.css';

/*
 * Constelación: mismo vocabulario que el Hero (hexágono, anillo punteado, nodos que laten).
 * Cada tecnología es una estrella sobre un vértice; las que trabajan juntas se unen con una línea.
 * Hay dos disposiciones: apaisada para escritorio y vertical para celular.
 */
const LAYOUTS = {
  wide: {
    w: 900,
    h: 390,
    hub: [450, 195],
    hex: [[100, 195], [275, 55], [625, 55], [800, 195], [625, 335], [275, 335]],
    slots: { react: [100, 195], typescript: [275, 55], node: [625, 55], go: [800, 195] },
    spare: [[275, 335], [625, 335]],
    ring: { cx: 450, cy: 195, rx: 432, ry: 182 },
    inner: { rx: 330, ry: 132 },
    stars: [[40, 40], [130, 340], [210, 20], [370, 350], [540, 22], [700, 360], [860, 60], [870, 330], [60, 130], [450, 30]],
  },
  narrow: {
    w: 400,
    h: 480,
    hub: [200, 240],
    hex: [[200, 65], [335, 143], [335, 337], [200, 415], [65, 337], [65, 143]],
    slots: { typescript: [65, 143], react: [65, 337], node: [335, 143], go: [335, 337] },
    spare: [[200, 65], [200, 415]],
    ring: { cx: 200, cy: 240, rx: 192, ry: 222 },
    inner: { rx: 150, ry: 170 },
    stars: [[24, 30], [370, 40], [30, 250], [372, 260], [120, 455], [290, 458], [120, 40], [290, 30]],
  },
};

const EDGES = [
  ['javascript', 'typescript'],
  ['javascript', 'react'],
  ['javascript', 'node'],
  ['node', 'go'],
];

const orderedSkills = [...skills]
  .sort((a, b) => a.order - b.order)
  .map((skill) => technologies.find((tech) => tech.id === skill.technologyId))
  .filter(Boolean);

function place(layout) {
  const spare = [...layout.spare];
  const placed = [];
  orderedSkills.forEach((tech) => {
    if (tech.id === 'javascript') placed.push({ tech, pos: layout.hub, hub: true });
    else if (layout.slots[tech.id]) placed.push({ tech, pos: layout.slots[tech.id] });
    else if (spare.length) placed.push({ tech, pos: spare.shift() });
  });
  return placed;
}

const same = (a, b) => a[0] === b[0] && a[1] === b[1];
const useWide = () => {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 720px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 720px)');
    const update = () => setWide(media.matches);
    update();
    media.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return wide;
};

export default function Skills() {
  const wide = useWide();
  const layout = wide ? LAYOUTS.wide : LAYOUTS.narrow;
  const placed = useMemo(() => place(layout), [layout]);
  const edges = useMemo(() => {
    const byId = Object.fromEntries(placed.map((p) => [p.tech.id, p]));
    return EDGES.filter(([a, b]) => byId[a] && byId[b]).map(([a, b]) => [byId[a], byId[b]]);
  }, [placed]);
  const emptyVertices = layout.hex.filter((v) => !placed.some((p) => same(p.pos, v)));

  const svgRef = useRef(null);
  const nodeRefs = useRef({});
  const lineRefs = useRef([]);
  const sparkRefs = useRef([]);

  // Las estrellas flotan un poco y las líneas las siguen; una chispa viaja por cada unión.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    let running = false;
    const tick = (now) => {
      const time = now / 1000;
      const pos = {};
      placed.forEach((item, i) => {
        const amp = item.hub ? 3 : 6;
        const x = item.pos[0] + amp * Math.sin(time * (0.55 + i * 0.09) + i * 1.7);
        const y = item.pos[1] + amp * Math.cos(time * (0.47 + i * 0.07) + i * 2.3);
        pos[item.tech.id] = [x, y];
        nodeRefs.current[item.tech.id]?.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      });
      edges.forEach(([a, b], i) => {
        const [x1, y1] = pos[a.tech.id];
        const [x2, y2] = pos[b.tech.id];
        const line = lineRefs.current[i];
        line?.setAttribute('x1', x1.toFixed(2));
        line?.setAttribute('y1', y1.toFixed(2));
        line?.setAttribute('x2', x2.toFixed(2));
        line?.setAttribute('y2', y2.toFixed(2));
        const p = (time * 0.17 + i * 0.29) % 1;
        const spark = sparkRefs.current[i];
        spark?.setAttribute('cx', (x1 + (x2 - x1) * p).toFixed(2));
        spark?.setAttribute('cy', (y1 + (y2 - y1) * p).toFixed(2));
        spark?.setAttribute('opacity', (Math.sin(Math.PI * p) * 0.95).toFixed(2));
      });
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    // Solo se anima mientras la sección está en pantalla
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(svg);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [placed, edges]);

  const { w, h, ring, inner } = layout;

  return (
    <section id="skills" className="block" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={t(ui.headingSkills)} />
        <svg
          ref={svgRef}
          className={styles.map}
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={orderedSkills.map((tech) => tech.name).join(', ')}
        >
          {layout.stars.map(([x, y]) => (
            <circle key={`${x}-${y}`} className={styles.star} cx={x} cy={y} r="1.5" />
          ))}

          <ellipse className={styles.ring} cx={ring.cx} cy={ring.cy} rx={ring.rx} ry={ring.ry} />
          <ellipse className={styles.inner} cx={ring.cx} cy={ring.cy} rx={inner.rx} ry={inner.ry} />
          <polygon className={styles.hex} points={layout.hex.map((v) => v.join(',')).join(' ')} />

          {emptyVertices.map(([x, y], i) => (
            <circle
              key={`v-${x}-${y}`}
              className={`${styles.dot} ${i % 2 ? styles.dotPulse : ''}`}
              cx={x}
              cy={y}
              r={i % 2 ? 7 : 5}
            />
          ))}

          {edges.map(([a, b], i) => (
            <line
              key={`${a.tech.id}-${b.tech.id}`}
              ref={(el) => { lineRefs.current[i] = el; }}
              className={styles.link}
              x1={a.pos[0]}
              y1={a.pos[1]}
              x2={b.pos[0]}
              y2={b.pos[1]}
            />
          ))}
          {edges.map(([a, b], i) => (
            <circle
              key={`s-${a.tech.id}-${b.tech.id}`}
              ref={(el) => { sparkRefs.current[i] = el; }}
              className={styles.spark}
              r="2.6"
              opacity="0"
            />
          ))}

          {placed.map(({ tech, pos, hub }, i) => {
            const r = hub ? 36 : 28;
            return (
              <g
                key={tech.id}
                ref={(el) => { nodeRefs.current[tech.id] = el; }}
                className={styles.node}
                transform={`translate(${pos[0]} ${pos[1]})`}
              >
                <circle className={styles.halo} r={r} style={{ animationDelay: `${i * 0.7}s` }} />
                <circle className={hub ? styles.bodyHub : styles.body} r={r} />
                {hasTechIcon(tech.id) ? (
                  <TechGlyph id={tech.id} size={hub ? 30 : 24} className={styles.glyph} />
                ) : (
                  <text className={styles.initials} textAnchor="middle" dy="0.35em">{tech.name.slice(0, 2)}</text>
                )}
                <text className={styles.label} y={r + 20} textAnchor="middle">{tech.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
