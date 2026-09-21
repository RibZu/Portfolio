# Contract: Content Modules and Interactive Components

**Date**: 2026-09-20 | **Data model**: [../data-model.md](../data-model.md)

This site exposes two kinds of interface. The first is the content modules the owner edits to
update the site — the contract that matters most, because it is used by a person, repeatedly,
for years. The second is the behavioural contract of the interactive parts, which is what the
accessibility requirements actually bind.

---

## Part 1: Content modules

Each module is a plain ES module exporting one value. The shapes are validated by
`tests/content.test.js`; a violation fails the build rather than reaching a visitor.

### `src/data/profile.js`

```js
export const profile = {
  name: "Simón Riberi Zunino",
  title: { es: "Desarrollador de Software", en: "Software Developer" },
  location: { es: "San Luis, Argentina", en: "San Luis, Argentina" },
  availability: { es: "…", en: "…" },
  summary: { es: "…", en: "…" },            // 60 words max per language
  email: "simonriberizunino@gmail.com",
  github: "https://github.com/RibZu",
  linkedin: "https://www.linkedin.com/in/simon-riberi-5a28bb238/",
  spokenLanguages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "B2 (FCE)", en: "B2 (FCE)" } },
  ],
  ogImage: { es: "/og/og-es.png", en: "/og/og-en.png" },
};

export const skills = [
  { technologyId: "go", order: 1 },
  { technologyId: "javascript", order: 2 },
  { technologyId: "typescript", order: 3 },
  { technologyId: "react", order: 4 },
  { technologyId: "node", order: 5 },
];
```

### `src/data/technologies.js`

```js
export const technologies = [
  {
    id: "go",
    name: "Go",
    category: "language",
    blurb: {
      es: "Lenguaje de Google, usado para servicios rápidos que atienden muchos pedidos a la vez.",
      en: "Google's language, used for fast services that handle many requests at once.",
    },
  },
  // …
];
```

`category` is one of `language`, `framework`, `database`, `platform`, `tooling`.

**The `blurb` is the contract's real payload.** It is written for someone who does not know what
the technology is. "Framework MVC para PHP" fails this contract; "la base sobre la que se arma
una aplicación web en PHP, para no escribir todo desde cero" satisfies it.

### `src/data/projects.js`

```js
export const projects = [
  {
    id: "api-digesto",
    name: "API Digesto",
    description: {
      es: "…",   // what it does and what problem it solves, in plain language
      en: "…",
    },
    technologies: ["go", "docker"],
    repo: "https://github.com/RibZu/API-DIGESTO",
    demo: "https://api-concursos-gilt.vercel.app",
    featured: true,
    order: 1,
  },
  {
    id: "my-car-app",
    name: "MyCarApp",
    description: { es: "…", en: "…" },
    technologies: ["php", "mysql", "javascript"],
    repo: "https://github.com/RibZu/MyCarApp",
    image: "/img/projects/my-car-app.webp",
    imageWidth: 1200,
    imageHeight: 750,
    relatedTo: "my-car-app-mobile",
  },
];
```

**Adding a project** is appending one object. Nothing else is edited: the technology groupings,
the counts, the filters, and the ordering all derive from this array. If adding a project
requires a second edit anywhere, the implementation has broken FR-014 and SC-009.

**Rules enforced by the test**:

- `id` unique across the array
- every string in `technologies` exists in `technologies.js`, and the array is non-empty
- `repo` and `demo`, where present, begin with `https://`
- `imageWidth` and `imageHeight` present whenever `image` is
- `relatedTo`, where present, names another existing project, not itself
- `description` present in both languages, non-empty, and containing no placeholder marker

### `src/data/experience.js`

```js
export const experience = [
  {
    id: "lacis",
    type: "work",                            // work | education | certification
    role: { es: "Desarrollador Web (PTS)", en: "Web Developer (Supervised Practice)" },
    organisation: "LaCiS — Universidad Nacional de San Luis",
    period: { from: "2026", to: null },      // null means current
    description: { es: "…", en: "…" },
    url: "https://lacis.unsl.edu.ar/",
  },
];
```

### `src/data/ui.js`

```js
export const ui = {
  navProjects: { es: "Proyectos", en: "Projects" },
  filterAll: { es: "Todas", en: "All" },
  filterGroupLabel: { es: "Filtrar por tecnología", en: "Filter by technology" },
  filterEmpty: { es: "No hay proyectos con esta tecnología.", en: "No projects use this technology." },
  resultCount: {
    es: (n) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`,
    en: (n) => `${n} ${n === 1 ? "project" : "projects"}`,
  },
  externalLink: { es: "(se abre en una pestaña nueva)", en: "(opens in a new tab)" },
  // …
};
```

A value may be a string or a function of one argument, for counts and other interpolations.
Pluralisation lives in the content module, not in the component, because the two languages do
not pluralise the same way and a component should not encode that.

---

## Part 2: HTML entry points

`index.html` and `en/index.html` are near-identical shells. They differ in exactly five places,
and drift between them is a defect:

| | `index.html` | `en/index.html` |
|---|---|---|
| `<html lang>` | `es` | `en` |
| `<title>`, `<meta name="description">` | Spanish | English |
| Open Graph and Twitter tags | Spanish, `og:image` per language | English |
| `<link rel="alternate" hreflang>` | `es` self, `en` → `/en/`, `x-default` self | `en` self, `es` → `/`, `x-default` → `/` |
| Inline language-redirect script | **present** | **absent** |

Both load the same `/src/main.jsx`. Neither contains content: the application reads its language
from `document.documentElement.lang` and takes everything else from `src/data/`.

**The redirect script contract** (Spanish page only):

- Runs synchronously in `<head>`, before any render
- Reads `localStorage` key `lang`; if it holds `en`, replace to `/en/` and stop
- If it holds `es`, do nothing, ever — an explicit choice is final
- If it is absent, consult `navigator.language`; replace to `/en/` only when it does not indicate
  Spanish
- Uses `location.replace` so the back button still works
- Wrapped in `try/catch`: a browser with `localStorage` blocked must still render the page

---

## Part 3: Interactive component contracts

These are the behavioural requirements the accessibility criteria bind to. They are contracts
because a change that breaks them breaks SC-006, whatever the component looks like.

### `TechFilter`

**Props**: `technologies` (visible filters, already ordered), `counts`, `active` (id or `null`),
`onChange`.

**Contract**:

- Renders a `<button>` per technology plus an "all" button, inside an element labelled by
  `ui.filterGroupLabel`
- Each button carries `aria-pressed` reflecting whether it is active
- Each button shows its technology name and its project count as text (FR-010: counts visible
  before interaction)
- The active state is conveyed by at least one non-colour signal — a shape, a border, or a text
  marker (FR-028)
- Every button is reachable by `Tab` in visual order, with a focus indicator that meets contrast
  (FR-030)
- `onChange` is called with a technology id, or `null` for "all"

### `Projects`

**Contract**:

- Owns `activeFilter` state; nothing else on the page does
- Renders an `aria-live="polite"` region containing the current result count, updated on every
  filter change (spec User Story 2, scenario 7)
- When the filter yields nothing, renders `ui.filterEmpty` rather than an empty region
  (Edge Cases)
- Filtering never changes the URL and never scrolls the page

### `Header`

**Contract**:

- Uses `react-bootstrap`'s `Navbar`, imported individually
- Section links are same-document anchors using language-neutral ids: `#projects`, `#skills`,
  `#background`, `#contact`. Identical in both languages, so the language switch can carry the
  current hash across (FR-034)
- The language switch is an `<a>` to the other document, not a button: it navigates
- The switch writes `localStorage.lang` before navigating
- The switch announces the language it leads to in that language — "English" on the Spanish page,
  "Español" on the English page — so a visitor who cannot read the current page can still find it

### External links, everywhere

- `target="_blank"` with `rel="noopener noreferrer"`
- Accompanied by `ui.externalLink` text, visually hidden, so assistive technology announces the
  new tab (FR-024)
