# Quickstart: Validating the Portfolio Redesign

**Feature**: `008-complete-portfolio-redesign`
**Date**: 2026-09-21

This guide describes how to validate that the redesign is complete and correct. It does not contain implementation code — refer to `tasks.md` and the source files for that.

---

## Prerequisites

- Node.js ≥ 18 installed
- Dependencies installed: `npm install` (from repo root `h:/Portfolio`)
- A modern browser (Chrome recommended for DevTools)

---

## Start Dev Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Validation Scenarios

### ✅ S1 — Hero Section Unchanged

1. Load the page.
2. Verify the owner's name appears in large type with the correct animated SVG to the right.
3. **Pass**: Name, subtitle, summary, CTA buttons, and SVG animation are all visually identical to the pre-redesign state.
4. **Fail**: Any visual difference in the hero area.

---

### ✅ S2 — Navbar: No Japanese Art Image

1. Inspect the `<header>` element in DevTools.
2. Find the `::before` pseudo-element.
3. **Pass**: `background-image` is `none` or absent; a CSS gradient is shown instead.
4. **Pass**: The pill shape, sticky behavior, and blur/glass effect are still present.
5. Resize to 991px width and tap the hamburger toggle.
6. **Pass**: Menu expands cleanly.
7. **Fail**: The Japanese art image appears in any form.

---

### ✅ S3 — Project Cards: Dark Design, No Mac Chrome

1. Scroll to the Projects section.
2. **Pass**: All cards have a dark background (`#1c1d26` or similar dark surface — not white or light gray).
3. **Pass**: No red/yellow/green dots (Mac title bar) are visible on any card.
4. **Pass**: Project title, description, tech badges, and link buttons are all readable with good contrast.
5. **Pass**: Tech badges use the purple accent color palette.
6. Hover over a card.
7. **Pass**: Card lifts (`translateY`) and its border shifts toward the accent color.
8. **Fail**: Any card with a white/light background.
9. **Fail**: Any Mac dots visible.

---

### ✅ S4 — Skills Terminal: Non-Black Background

1. Scroll to the Skills section.
2. **Pass**: The terminal container background is clearly NOT pure black. It should appear as a dark blue-gray (`#1c1d26`).
3. **Pass**: The command prompt user label (`guest@portfolio:~$`) appears in purple/accent color (not green).
4. **Pass**: Skill names still appear in green (`#4af626`).
5. **Pass**: `[verified]` badges appear in cyan, `[learning]` in gray.
6. **Pass**: The blinking cursor is purple/accent colored.
7. **Fail**: Terminal background is `#0c0c0c` (pure black) — verifiable in DevTools computed styles.

---

### ✅ S5 — Background Section: Condensed & Tiered

1. Scroll to the Background section.
2. **Pass**: Work and education entries (LaCiS, Freelance, Asistente IT, Técnico Universitario, Secundaria) appear as compact cards with a colored left accent bar. No zigzag layout.
3. **Pass**: Certification entries (FCE, React, Golang, SQL) appear as small pill tags in a horizontal row — NOT as full-height cards.
4. **Pass**: Languages appear as pill tags in their own block.
5. **Pass**: Section fits in noticeably less vertical space than before.
6. Resize to 375px width.
7. **Pass**: All cards and pills remain readable and do not overflow horizontally.
8. **Fail**: Any certification entry rendered as a full card equal in size to a work experience card.

---

### ✅ S6 — Contact Section: Accent-Led Design

1. Scroll to the Contact section.
2. **Pass**: The contact container has a gradient background with a visible purple/accent border (not a plain dark box with a gray border).
3. **Pass**: The "Email Me" button is a pill-shaped button using the accent color as background.
4. Click "Email Me".
5. **Pass**: A mail client opens pre-addressed to the correct email.
6. Click GitHub and LinkedIn buttons.
7. **Pass**: Each opens the correct profile in a new tab.
8. **Fail**: Contact section looks identical to the pre-redesign state.

---

### ✅ S7 — Responsive Check (all sections)

Resize the browser to these widths and confirm no horizontal overflow, broken layout, or missing elements:

| Width | Sections to check |
|-------|-------------------|
| 375px | All sections, navbar hamburger |
| 768px | Cards grid (2 columns), Background timeline |
| 1024px | Cards grid (3 columns), full-width layout |
| 1280px | Max-width container centered |

---

### ✅ S8 — Reduced Motion

1. In Chrome DevTools → Rendering → Emulate CSS media feature: `prefers-reduced-motion: reduce`.
2. **Pass**: No new animations play in Skills, Contact, or Background sections.
3. **Pass**: Hero SVG animations (float, pulse) are suppressed (existing behavior).

---

### ✅ S9 — Accessibility Color Contrast

Use the DevTools Accessibility panel or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify:

| Element | Foreground | Background | Required Ratio | Expected |
|---------|-----------|-----------|----------------|----------|
| Body text | `#a0a0a0` | `#0f1015` | 4.5:1 | ✅ ~5.2:1 |
| Card title | `#ffffff` | `#1c1d26` | 4.5:1 | ✅ ~17:1 |
| Tech badge | `#d8b4e2` | `rgba(216,180,226,0.12)` on `#1c1d26` | 4.5:1 | ✅ verify |
| Nav links | `var(--color-text-secondary)` | gradient overlay | 4.5:1 | verify |
| Cert pills | `#ffffff` | `rgba(216,180,226,0.08)` on `#0f1015` | 4.5:1 | verify |

---

## Build Verification

```bash
npm run build
```

**Pass**: Build completes with exit code 0 and no errors.

```bash
npm run preview
```

Open `http://localhost:4173` and repeat key scenarios above on the production build.

---

## Lighthouse (optional, pre-release)

Run Lighthouse on the production preview URL:
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90
