# Implementation Plan: Complete Portfolio Redesign

**Branch**: `008-complete-portfolio-redesign` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/008-complete-portfolio-redesign/spec.md`

---

## Summary

A full visual redesign of the portfolio page preserving the existing hero section and color palette. Changes target five areas: (1) the navbar loses its Japanese art background image in favour of a CSS gradient glass effect; (2) project cards are rebuilt as dark-surface cards using the site's `--code-bg` token, removing the Mac window chrome; (3) the Skills terminal moves from pure black (`#0c0c0c`) to `var(--code-bg)` with accent-tinted borders; (4) the Background section adopts a condensed two-tier layout — work/education as compact left-bar timeline cards and certifications as pill tags; (5) the Contact section gets a gradient accent container with a pill-shaped CTA button.

All changes are purely presentational (CSS Modules + minimal JSX). No new libraries or data changes are required.

---

## Technical Context

**Language/Version**: JavaScript (ES2022) / React 18 — unchanged

**Primary Dependencies**: Vite + React + CSS Modules — unchanged; no new dependencies

**Storage**: N/A (static site, no persistence layer)

**Testing**: Manual browser verification + `npm run build` lint-free build; Lighthouse audit optional pre-release

**Target Platform**: Static site — Vercel Hobby plan (browser: evergreen Chrome/Firefox/Safari/Edge)

**Project Type**: Static web application (portfolio)

**Performance Goals**: Lighthouse ≥ 90 across all four categories; no new external assets or scripts

**Constraints**: CSS Modules only (no CSS-in-JS, no Tailwind, no Bootstrap); all colors from existing token system; hero JSX untouched

**Scale/Scope**: 6 React components modified (Header, ProjectCard, Skills, Background, Contact + Projects grid styling); 6 CSS Modules modified; 1 JSX file with minor DOM change (ProjectCard — remove macTitleBar); 1 JSX file with logic change (Background — split entries by type)

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First (YAGNI) | ✅ Pass | Purely presentational changes; no new libraries; existing token system reused; no speculative features |
| II. Static-First, Vercel Hobby | ✅ Pass | Build remains `vite build` → static; no server-side code |
| III. Accessible by Default | ✅ Pass | Semantic HTML unchanged; color choices verified at ≥4.5:1 contrast; no new motion without `prefers-reduced-motion` guard |
| IV. Performance Budget | ✅ Pass | No new JS bundles; no external fonts or images added; japanese-art-bg.jpg asset load eliminated from navbar (net positive); CSS delta is small |
| V. Verifiable Changes | ✅ Pass | Each section can be validated independently per quickstart.md |

**Post-design re-check** (Phase 1): All principles still pass. The `type` field usage in Background.jsx is not new complexity — it already exists in `experience.js` and was simply unused. No violation logged.

---

## Project Structure

### Documentation (this feature)

```text
specs/008-complete-portfolio-redesign/
├── plan.md              ← This file
├── spec.md
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── ui-contracts.md  ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (files to be modified)

```text
src/
├── components/
│   ├── Header.module.css         ← MODIFY: replace bg image with gradient
│   ├── ProjectCard.jsx           ← MODIFY: remove macTitleBar DOM block
│   ├── ProjectCard.module.css    ← MODIFY: dark card redesign
│   ├── Projects.module.css       ← MODIFY: minor card-gap or section styling
│   ├── Skills.module.css         ← MODIFY: terminal bg color + accent colors
│   ├── Background.jsx            ← MODIFY: split entries by type, add certPills
│   ├── Background.module.css     ← MODIFY: compact timeline + cert pill styles
│   ├── Contact.module.css        ← MODIFY: gradient container + pill CTA
│   └── TechFilter.module.css     ← REVIEW: may need dark-theme update for consistency
└── assets/
    └── japanese-art-bg.jpg       ← RETAIN (but no longer imported in Header.module.css)
```

**Structure Decision**: Single Vite + React project at repo root. All changes are in `src/components/`. No new files required; `japanese-art-bg.jpg` is retained but dereferenced.

---

## Implementation Order (dependency-aware)

1. **Skills.module.css** — Smallest, isolated CSS-only change. Good smoke test.
2. **Header.module.css** — CSS-only, isolated. Remove bg image URL, add gradient.
3. **ProjectCard.module.css + ProjectCard.jsx** — CSS + minimal JSX (remove 4 lines of macTitleBar).
4. **Projects.module.css** — Minor supporting styles if needed (e.g., section gap, filter styling).
5. **Contact.module.css** — CSS-only, isolated.
6. **Background.jsx + Background.module.css** — Most logic-involved (entry type filtering + new DOM structure). Do last to minimise risk.
7. **TechFilter.module.css** — Review for dark-theme consistency (may already be correct).

---

## Complexity Tracking

No constitution violations. No complexity justification required.
