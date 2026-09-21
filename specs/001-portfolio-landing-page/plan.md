# Implementation Plan: Portfolio Landing Page

**Branch**: `001-portfolio-landing-page` | **Date**: 2026-09-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-landing-page/spec.md`

## Summary

A single-page bilingual portfolio for Simón Riberi Zunino that sits between his GitHub and his
LinkedIn: identity and availability above the fold, projects grouped and filterable by
technology with recruiter-readable descriptions, a condensed professional background, and
contact. Built as a static Vite + React site and deployed to Vercel's free plan.

The design decision that shapes everything else: **the site ships as two static HTML entry
points, `index.html` in Spanish and `en/index.html` in English**, rather than one page that
switches language in the browser. The spec left this open (FR-038, FR-041); the constitution
closes it. Principle II requires page metadata to live in `index.html`, and client-side language
switching cannot put real per-language metadata in an HTML file that a crawler reads without
running JavaScript. Two entry points also remove the need for a router, which the constitution
forbids, and for a Vercel rewrite rule. One decision satisfies three constraints at once.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 19, Node.js 20 LTS or later for the build only

**Primary Dependencies**: Vite 7 (build), React + React DOM, `react-bootstrap` with the
`bootstrap` stylesheet. Dev-only: Vitest for the logic and content-integrity tests. No runtime
dependency beyond these, per constitution Principle I.

**Storage**: None. All content lives in JavaScript modules under `src/data/`, bundled at build
time. No database, no API, no `localStorage` except the visitor's language preference (FR-036).

**Testing**: Vitest for pure functions and content integrity. Manual browser verification at
mobile and desktop widths per constitution Principle V. Lighthouse and an accessibility checker
against the deployed preview URL, not localhost (FR-050).

**Target Platform**: Static site on Vercel Hobby. Browsers released within roughly the last two
years, mobile-first from 320px.

**Project Type**: Static single-page web application, built twice, once per language.

**Performance Goals**: Lighthouse at 90 or above in all four categories (SC-005). First screen
readable within 2 seconds on a mid-range phone (SC-004). Cumulative layout shift at or below 0.1
(SC-008).

**Constraints**: Initial JavaScript at or below 200 kB gzipped (constitution Principle IV).
WCAG 2.1 AA with zero violations (SC-006). No horizontal scroll from 320px to 2560px (SC-007).
`#5980a6` never used for normal-size text (FR-027). No server-side runtime, no secrets (FR-043,
FR-049).

**Scale/Scope**: One page in two languages. Four sections. Eight projects today, designed for a
set the owner keeps extending. Roughly 10 components and 5 data modules.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

Gates derived from `.specify/memory/constitution.md` v2.0.0.

### Pre-Phase 0 evaluation

| Gate | Requirement | Status | Notes |
|------|-------------|--------|-------|
| **I. Simplicity (YAGNI)** | Every dependency justified; no speculative features | ⚠️ **Pass with note** | React and `react-bootstrap` are mandated by the constitution itself, but the design needs only one interactive Bootstrap component. See Complexity Tracking. |
| **II. Static-First / Vercel** | Static `vite build`, no server runtime, metadata in `index.html` | ✅ Pass | Two static entry points; metadata authored directly in each HTML file. No rewrite rule needed. |
| **III. Accessible by Default** | Semantic HTML, heading order, alt text, keyboard, WCAG AA, reduced motion | ✅ Pass | Drives the filter design (FR-028: not colour alone; `aria-pressed` plus a live region) and the palette restriction in FR-027. |
| **IV. Performance Budget** | ≤200 kB gzipped JS, optimised images, third-party justified, Lighthouse ≥90 | ✅ Pass | Estimated ~75 kB gzipped JS, well inside budget. One self-hosted webfont, justified in research.md. |
| **V. Verifiable Changes** | Build passes, browser-verified, logic tested, no broken links | ✅ Pass | Vitest covers the filter derivations and content integrity; link check and Lighthouse run against a deployed URL. |

**Forbidden-list check**: no extra UI library, no state manager, no router, no CSS-in-JS, no
TypeScript, no SSR, no backend, no Bootstrap JavaScript bundle, no jQuery, no Create React App.
Vitest is a development dependency for testing, which Principle V calls for and the forbidden
list does not cover.

**Result**: PASS. Proceed to Phase 0.

### Post-Phase 1 re-evaluation

| Gate | Status | What the design changed |
|------|--------|-------------------------|
| **I. Simplicity** | ⚠️ Pass with note | Design uses `react-bootstrap` only for `Navbar`; everything else is custom. The note in Complexity Tracking stands and is now more precise, not worse. |
| **II. Static-First** | ✅ Pass | Confirmed: two entry points, no router, no `vercel.json` needed. Language redirect is a 15-line inline script, not a server rule. |
| **III. Accessible** | ✅ Pass | Filter contract specifies `aria-pressed`, `aria-live="polite"` result count, and a text marker on the active filter so colour is never the sole signal. |
| **IV. Performance** | ✅ Pass | One webfont, subset, preloaded. Project images converted to WebP with explicit dimensions. No code splitting needed at this size; `React.lazy` would add complexity for no gain. |
| **V. Verifiable** | ✅ Pass | `tests/content.test.js` enforces FR-032 mechanically: a missing translation fails the build, rather than shipping a half-translated page. |

**Result**: PASS. No new violations introduced by the design.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-landing-page/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── content-schema.md  # Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
index.html                   # Spanish entry: lang="es", full metadata, hreflang alternates
en/
└── index.html               # English entry: lang="en", full metadata, hreflang alternates

public/
├── fonts/                   # self-hosted subset woff2
├── img/projects/            # project screenshots, WebP
└── og/                      # social preview images, one per language

src/
├── main.jsx                 # single entry for both pages; reads language from <html lang>
├── App.jsx                  # section composition
├── components/
│   ├── Header.jsx           # react-bootstrap Navbar + language switch
│   ├── Hero.jsx             # name, title, location, availability, summary, primary action
│   ├── Skills.jsx           # declared stack, ordered languages-first (FR-006)
│   ├── Projects.jsx         # owns filter state, renders counts and results
│   ├── TechFilter.jsx       # filter controls + live region
│   ├── ProjectCard.jsx      # one project entry
│   ├── Background.jsx       # experience, education, certifications, languages
│   └── Contact.jsx
├── data/
│   ├── profile.js           # identity, links, summary per language
│   ├── projects.js          # the project set; descriptions keyed by language
│   ├── technologies.js      # curated groupings with plain-language blurbs
│   ├── experience.js        # work, education, certifications
│   └── ui.js                # interface strings per language
├── lib/
│   ├── content.js           # language resolution and string lookup
│   ├── derive.js            # counts, filtering, demonstrated-skill flags
│   └── language.js          # preference storage and first-visit redirect
└── styles/
    ├── tokens.css           # palette and type scale — the single source for FR-026
    └── app.css              # layout and components

tests/
├── derive.test.js           # filtering, counting, demonstrated flags
└── content.test.js          # content integrity: both languages present, references valid

vite.config.js               # multi-page build: index.html + en/index.html
package.json
```

**Structure Decision**: A single Vite project with two HTML entry points. `src/` is shared
between them; the only difference is the `lang` attribute and the metadata in each HTML file,
from which the React application reads the active language at startup. Content is separated from
presentation under `src/data/` so that the owner adds a project by editing one file (FR-014,
FR-016, SC-009) without touching a component. Derivations live in `src/lib/derive.js` as pure
functions so they are testable without rendering, which is what makes SC-009 and FR-016
verifiable rather than merely asserted.

## Complexity Tracking

> Filled because the Constitution Check carries a standing note under Principle I.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| `react-bootstrap` + full `bootstrap` stylesheet (~30 kB gzipped CSS) for a design that uses one of its components | The constitution mandates this stack in Technology & Deployment Constraints, and the owner chose it deliberately so the portfolio demonstrates React. The design uses `Navbar` for its accessible mobile collapse behaviour. | **Not rejected on merit — mandated.** Recording the cost honestly: a minimalist, custom-designed page overrides most of Bootstrap's visual layer, so most of that CSS ships unused. Plain CSS with a hand-written navbar would be smaller and equally accessible. This is a constitution-level question, not a plan-level one; if the owner wants it revisited, it is an amendment to Technology & Deployment Constraints, not a deviation here. The plan keeps the cost at its minimum by using Bootstrap for the navbar, reset, and grid only, and writing every other style by hand against the FR-026 tokens. |
| One self-hosted webfont | Constitution IV requires justification for any font. The banner's identity rests on a condensed bold display face; a system stack cannot reproduce it, and the page's purpose is to look deliberate (FR-025, "original"). | Using only system fonts was considered and rejected for identity reasons. The cost is held down by self-hosting one subset woff2, preloaded, with system stacks for body and monospace text. Two webfonts were rejected: the technical labels are reproduced with a system monospace stack plus letter-spacing at no byte cost. |
