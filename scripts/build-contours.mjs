// Genera public/img/header-contours.svg: curvas de nivel que repiten sin costura en X.
// Uso: node scripts/build-contours.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const W = 1200;
const H = 80;
const CELL = 8;
const COLS = W / CELL;
const ROWS = H / CELL;
const LEVELS = [0.22, 0.32, 0.42, 0.5, 0.58, 0.68, 0.78];

// PRNG determinista (mulberry32)
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (t) => t * t * (3 - 2 * t);

// Ruido de valor periódico en X (período = nx celdas de la retícula)
function makeNoise(nx, ny, seed) {
  const r = rng(seed);
  const lattice = Array.from({ length: ny + 2 }, () => Array.from({ length: nx }, () => r()));
  return (x, y) => {
    const gx = (x / W) * nx;
    const gy = (y / H) * ny;
    const x0 = Math.floor(gx), y0 = Math.floor(gy);
    const fx = smooth(gx - x0), fy = smooth(gy - y0);
    const a = lattice[y0][x0 % nx], b = lattice[y0][(x0 + 1) % nx];
    const c = lattice[y0 + 1][x0 % nx], d = lattice[y0 + 1][(x0 + 1) % nx];
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
  };
}

const n1 = makeNoise(6, 2, 7);
const n2 = makeNoise(12, 4, 21);
const field = (x, y) => 0.7 * n1(x, y) + 0.3 * n2(x, y);

const grid = [];
for (let j = 0; j <= ROWS; j++) {
  const row = [];
  for (let i = 0; i <= COLS; i++) row.push(field((i % COLS) * CELL, j * CELL));
  grid.push(row);
}

// Marching squares con interpolación; los extremos se identifican por arista para poder encadenar.
function contour(level) {
  const segs = [];
  const edgePoint = (kind, i, j) => {
    if (kind === 'h') { // arista entre (i,j) y (i+1,j)
      const a = grid[j][i], b = grid[j][i + 1];
      return { key: `h${i},${j}`, x: (i + (level - a) / (b - a)) * CELL, y: j * CELL };
    }
    const a = grid[j][i], b = grid[j + 1][i]; // v: entre (i,j) y (i,j+1)
    return { key: `v${i},${j}`, x: i * CELL, y: (j + (level - a) / (b - a)) * CELL };
  };
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const tl = grid[j][i] >= level, tr = grid[j][i + 1] >= level;
      const bl = grid[j + 1][i] >= level, br = grid[j + 1][i + 1] >= level;
      const code = (tl << 3) | (tr << 2) | (br << 1) | bl;
      if (code === 0 || code === 15) continue;
      const top = () => edgePoint('h', i, j), bottom = () => edgePoint('h', i, j + 1);
      const left = () => edgePoint('v', i, j), right = () => edgePoint('v', i + 1, j);
      const table = {
        1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]],
        4: [[top, right]], 5: [[left, top], [bottom, right]], 6: [[top, bottom]],
        7: [[left, top]], 8: [[left, top]], 9: [[top, bottom]], 10: [[left, bottom], [top, right]],
        11: [[top, right]], 12: [[left, right]], 13: [[bottom, right]], 14: [[left, bottom]],
      };
      for (const [p, q] of table[code]) segs.push([p(), q()]);
    }
  }
  // Encadenar segmentos por clave de arista
  const byKey = new Map();
  segs.forEach((s, idx) => s.forEach((p) => {
    if (!byKey.has(p.key)) byKey.set(p.key, []);
    byKey.get(p.key).push(idx);
  }));
  const used = new Set();
  const paths = [];
  const walk = (start, first) => {
    const pts = [first];
    let cur = start, key = first.key;
    for (;;) {
      const next = (byKey.get(key) || []).find((k) => !used.has(k));
      if (next === undefined) break;
      used.add(next);
      const [a, b] = segs[next];
      const to = a.key === key ? b : a;
      pts.push(to);
      key = to.key;
      cur = next;
    }
    return pts;
  };
  segs.forEach((s, idx) => {
    if (used.has(idx)) return;
    used.add(idx);
    const forward = walk(idx, s[1]);
    const backward = walk(idx, s[0]).reverse();
    paths.push([...backward.slice(0, -1), s[0], ...forward]);
  });
  return paths;
}

const fmt = (v) => Math.round(v * 10) / 10;
let d = '';
for (const level of LEVELS) {
  for (const pts of contour(level)) {
    // el punto s[0] queda duplicado si backward está vacío; se filtran repetidos consecutivos
    const clean = pts.filter((p, i) => i === 0 || p.key !== pts[i - 1].key);
    if (clean.length < 2) continue;
    d += 'M' + clean.map((p) => `${fmt(p.x)} ${fmt(p.y)}`).join('L');
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="${d}" fill="none" stroke="#000" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round"/></svg>\n`;
mkdirSync('public/img', { recursive: true });
writeFileSync('public/img/header-contours.svg', svg);
console.log(`header-contours.svg: ${(svg.length / 1024).toFixed(1)} KB`);
