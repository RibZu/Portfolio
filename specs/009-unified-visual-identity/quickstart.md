# Quickstart: Validating the Unified Visual Identity

**Feature**: `009-unified-visual-identity`
**Date**: 2026-09-21

---

## Prerequisites

```bash
npm install   # from h:/Portfolio
npm run dev   # opens http://localhost:5173
```

---

## S1 — Design System Tokens in DevTools

Open any element in Chrome DevTools → Computed tab.

**Pass**: `--surface: #13141a` and `--border-subtle: rgba(255,255,255,0.06)` are defined at `:root`.
**Pass**: `.section-label` and `.section-heading` classes are available globally.

---

## S2 — Navbar: Ball + No Language Switch Inside Pill

1. Look at the sticky header pill.
2. **Pass**: A small glowing purple ball is visible inside the pill, continuously moving left and right.
3. **Pass**: The pill contains ONLY 4 nav links. NO "English" / "Español" text inside the pill.
4. **Pass**: A small fixed pill element is visible in the top-right corner of the viewport (language switch).
5. Hover the language switch → **Pass**: border turns accent colour.
6. Enable `prefers-reduced-motion: reduce` in DevTools → Rendering → **Pass**: ball stops animating.

---

## S3 — Header Surface: No Blur, No Gradient

1. Inspect `<header>` in DevTools.
2. **Pass**: Background is `rgb(19, 20, 26)` (`--surface`). No gradient.
3. **Pass**: No `::before` or `::after` pseudo-elements with blur or gradient.
4. **Pass**: The pill is visible against the `#0f1015` page background with the `--border` border.

---

## S4 — Unified Section Headings

Scroll through all sections: Skills, Projects, Background, Contact.

**Pass for each section**: A small uppercase label (e.g., "TECNOLOGÍAS", "PROYECTOS") appears above the main section title.
**Pass for each section**: The main title has a `2px` accent underline on the left-bottom.
**Pass**: All labels use the same font size, weight, and accent colour — visually identical across sections.

---

## S5 — Skills Terminal: Unified Palette

1. Scroll to Skills.
2. **Pass**: Terminal background is `#1c1d26` (`--code-bg`) — same as project cards.
3. **Pass**: Terminal border is a subtle white-tinted border (not a solid purple/dark border).
4. **Pass**: The three terminal dots are: purple (accent), dim purple, dimmer purple — NOT red/yellow/green.
5. **Pass**: Skill names are white (`var(--text-h)`) — no green glow.
6. **Pass**: `[verified]` badge is accent purple colour. `[learning]` badge is grey.
7. **Pass**: Cursor blinks in accent purple.

---

## S6 — Projects: Unified Cards + Filter

1. Scroll to Projects.
2. **Pass**: Section label "PROYECTOS"/"PROJECTS" appears above the heading.
3. **Pass**: Filter buttons are pill-shaped with subtle border. Active filter has accent colour.
4. **Pass**: Cards have `var(--code-bg)` background with a very subtle border (barely visible on page bg).
5. Hover a card → **Pass**: border turns accent-coloured; card lifts subtly.
6. **Pass**: Tech badges use accent purple text on faint purple background.

---

## S7 — Background: Consistent Identity

1. Scroll to Background.
2. **Pass**: Section label "TRAYECTORIA"/"BACKGROUND" appears above the heading.
3. **Pass**: LinkedIn button is a pill-shaped outline button (not a coloured box).
4. **Pass**: Experience items have subtle border (not a solid dark border).
5. **Pass**: Sub-labels ("EXPERIENCIA", "CERTIFICACIONES") match the section-label style.
6. **Pass**: Certification pills match the style seen in Projects badges (same shape/colour system).

---

## S8 — Contact: Open Layout (No Card)

1. Scroll to Contact.
2. **Pass**: Section label "CONTACTO"/"CONTACT" appears above the heading.
3. **Pass**: There is NO visible card/panel container (no gradient box, no border box). Content sits directly on the page background.
4. **Pass**: "Email Me" is a pill-shaped accent button.
5. **Pass**: GitHub and LinkedIn buttons are pill-shaped outline buttons (consistent with Background LinkedIn button).
6. Click "Email Me" → **Pass**: mail client opens.
7. Click GitHub/LinkedIn → **Pass**: correct profiles open in new tab.

---

## S9 — Visual Cohesion Check

Scroll the full page from top to bottom in one pass.

**Pass**: Every section (Skills, Projects, Background, Contact) uses the same:
- Surface colour for raised elements (`var(--code-bg)`)
- Subtle border on cards (`var(--border-subtle)`)
- Accent colour only for interactive highlights
- Section label + heading pattern
- Pill-shaped buttons

**Fail indicator**: Any section that immediately looks "different" or uses a unique colour/border/button style not seen elsewhere.

---

## S10 — Responsive Check

Verify at:
| Width | Key checks |
|-------|-----------|
| 375px | Ball visible, language switch accessible, no overflow, cards stack to 1 col |
| 768px | Cards 2-col grid, Background timeline readable |
| 1024px | Cards 3-col grid, full layout |
| 1280px | Centred, max-width respected |

---

## S11 — Build Verification

```bash
npm run build
```
**Pass**: Exit code 0, no errors.

```bash
npm run preview
```
Repeat S2–S9 on `http://localhost:4173`.
