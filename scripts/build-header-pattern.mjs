// Genera public/img/header-pattern.svg: retícula hexagonal con aristas faltantes y nodos.
// Repite sin costura en X (1200px = 20 columnas de hexágonos). Uso: node scripts/build-header-pattern.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const W = 1200;
const H = 80;
const S = 40; // radio del hexágono
const COLS = W / (1.5 * S); // 20
const ROW_H = Math.sqrt(3) * S;
const KEEP_EDGE = 0.62;
const NODE_CHANCE = 0.16;

// Hash determinista a [0, 1) a partir de una clave
function hash(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

const wrap = (x) => ((Math.round(x * 10) / 10) % W + W) % W;
const edges = new Map();
const nodes = new Map();

for (let c = 0; c < COLS; c++) {
  for (let r = -1; r <= 2; r++) {
    const cx = c * 1.5 * S;
    const cy = r * ROW_H + (c % 2) * (ROW_H / 2);
    const verts = Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 3) * k;
      return [cx + S * Math.cos(a), cy + S * Math.sin(a)];
    });
    for (let k = 0; k < 6; k++) {
      const [x1, y1] = verts[k];
      const [x2, y2] = verts[(k + 1) % 6];
      const key = `${wrap((x1 + x2) / 2)},${Math.round((y1 + y2) * 5)}`;
      if (!edges.has(key)) edges.set(key, [x1, y1, x2, y2]);
      const nodeKey = `${wrap(x1)},${Math.round(y1)}`;
      if (!nodes.has(nodeKey)) nodes.set(nodeKey, [x1, y1]);
    }
  }
}

const fmt = (v) => Math.round(v * 10) / 10;
let d = '';
for (const [key, [x1, y1, x2, y2]] of edges) {
  if (hash(key) > KEEP_EDGE) continue;
  // Cada arista se dibuja también desplazada un período para que el borde del tile encaje
  for (const off of [0, W]) {
    d += `M${fmt(x1 + off)} ${fmt(y1)}L${fmt(x2 + off)} ${fmt(y2)}`;
  }
}

let dots = '';
for (const [key, [x, y]] of nodes) {
  if (hash(`n${key}`) > NODE_CHANCE) continue;
  for (const off of [0, W]) dots += `<circle cx="${fmt(x + off)}" cy="${fmt(y)}" r="2.6"/>`;
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
  `<path d="${d}" fill="none" stroke="#000" stroke-width="1.1" stroke-linecap="round"/>` +
  `<g fill="#000">${dots}</g></svg>\n`;

mkdirSync('public/img', { recursive: true });
writeFileSync('public/img/header-pattern.svg', svg);
console.log(`header-pattern.svg: ${(svg.length / 1024).toFixed(1)} KB`);
