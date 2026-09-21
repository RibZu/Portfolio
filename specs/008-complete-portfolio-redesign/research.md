# Research: Complete Portfolio Redesign

**Feature**: `008-complete-portfolio-redesign`
**Date**: 2026-09-21

---

## 1. Navbar Background Replacement

**Decision**: Replace `japanese-art-bg.jpg` with a pure CSS gradient/noise effect using only palette colors, while keeping the `backdrop-filter: blur()` for the frosted-glass look.

**Rationale**: The navbar already has a `::before` pseudo-element with the image and a `::after` with the glass overlay. Simply removing the `background-image` and replacing it with a `linear-gradient` or radial gradient using `--bg` and a faint purple tint (`rgba(216, 180, 226, 0.08)`) achieves a cohesive dark-with-accent look without any external asset. The `overflow: hidden` + `backdrop-filter` on the container already blurs what's behind it, so the "glass" effect is preserved.

**Alternatives considered**:
- SVG noise texture via `url("data:image/svg+xml,...")`: Valid, but the gradient approach is simpler (Principle I) and avoids an encoded asset in CSS.
- Keeping a different image: Rejected — introduces another external asset that may need updating.

---

## 2. ProjectCard — New Dark-Palette Card Design

**Decision**: Replace the light Notion-style card (white background, `#ffffff`) with a dark glass-effect card: `background: var(--code-bg)` (`#1c1d26`) with a `1px` border using `var(--border)`, subtle accent-purple glow on hover, image on top with preserved `16/9` ratio, dark text using `var(--text-h)` for title and `var(--text)` for description.

**Rationale**: The current card is rendered with `background-color: #ffffff` and `color: #37352f` — a Notion-inspired light theme that is completely incongruous with the site's `#0f1015` dark background. The new design keeps the same data structure (image → title → description → badges → links) but uses the site's established dark surface color (`--code-bg #1c1d26`) and rounds corners to `12px` for a modern feel. Tech badges get `background: rgba(216,180,226,0.12)` and `color: var(--accent)` to use the purple accent naturally. The Mac title bar (`.macTitleBar`, `.macDot`) is removed entirely.

**Alternatives considered**:
- Full glassmorphism (`background: rgba(28,29,38,0.5)` + `backdrop-filter`): Valid aesthetic but adds rendering cost on low-end devices; the solid surface approach is simpler, performant, and still looks great.
- Image-only hero card (image filling full card, text overlay): Too complex for the amount of content per card; risks legibility issues.

---

## 3. Skills Terminal — Non-Black Background Color

**Decision**: Change `background-color: #0c0c0c` to `background-color: var(--code-bg)` (`#1c1d26`) and add a `1px` solid border of `rgba(216, 180, 226, 0.15)` (faint purple accent border) instead of the current `#333` border. Command user color changes from `#55ff55` to `var(--accent)` (`#d8b4e2`) to tie the terminal to the site palette while preserving the "terminal" concept. The blinking cursor becomes `var(--accent)` as well.

**Rationale**: `#1c1d26` is already used for `--code-bg` across the site and is the established "elevated surface" color — clearly distinguishable from the `#0f1015` page background without being jarring. Reusing an existing token avoids introducing a new color (Principle I: YAGNI). The green text (`#4af626`) for skill names can be kept or shifted to `var(--accent)` — keeping green preserves the "terminal" metaphor which the user did not object to, only the black background was rejected.

**Alternatives considered**:
- Tinted purple background (`rgba(216,180,226,0.05)` over `#0f1015`): Almost indistinguishable from the page background; not enough contrast.
- Fully purple terminal: Too strong a departure from the terminal metaphor.

---

## 4. Background Section — Condensed Tiered Layout

**Decision**: Use a **two-tier layout** within one section:
- **Tier 1 — Work & Education** (5 entries): Vertical list of compact cards with a left accent bar (2px purple) instead of the complex zigzag timeline. Each card shows role (bold, `--color-display`), organisation (`--color-accent-light`), and period pill. The existing background color is `--color-surface`; keeping that with a `--border` border and `8px` border-radius is retained.
- **Tier 2 — Certifications** (4 entries): Displayed as a horizontal wrap of pill-shaped tags below a "Certifications" subheading. Each pill shows the cert name and year. This collapses 4 full cards into one compact pill row.
- **Languages**: Already displayed as pills (`.languageItem`) — keep that pattern, refine the styling to use `var(--accent-border)` for the border.

**Rationale**: The current zigzag timeline (alternating left/right at ≥768px) creates excessive complexity for only 5 work/education entries and adds visual noise. A clean left-aligned list with a colored left border is an established, elegant pattern for timelines in portfolios. Certification entries as pill tags reduce vertical height from ~4 full cards (≈ 400px) to a single row (≈ 50px), dramatically improving scannability.

**Alternatives considered**:
- Tabbed interface (Work / Education / Certs tabs): Hides content behind clicks — users may miss certifications entirely.
- Accordion collapse: Adds JS complexity for minimal gain (Principle I).
- Keeping all entries as full cards: Explicitly rejected by user.

---

## 5. Contact Section — Accent-Led Redesign

**Decision**: Replace the current bordered card (`background: --code-bg`, `border: 1px solid --border`) with a **split layout**:
- Large centered heading "Get In Touch" or equivalent translated string.
- A prominent gradient CTA block: `background: linear-gradient(135deg, rgba(216,180,226,0.12), rgba(28,29,38,0.8))`, `border: 1px solid var(--accent-border)`, `border-radius: 16px`.
- Inside: Email button as a full-width pill with `background: var(--accent)` and `color: var(--bg)`.
- Below: GitHub + LinkedIn as icon-text buttons with `border: 1px solid var(--border)`.
- Max-width: 480px, centered.

**Rationale**: The current design is functional but anonymous — it looks like a generic card. The gradient container with an accent border immediately reads as "contact area" and draws the eye. The pill CTA button is a common, accessible pattern for primary actions. All changes are CSS-only, no new dependencies.

**Alternatives considered**:
- Two-column layout (left: email; right: social): At mobile widths stacks awkwardly; single column is simpler and more elegant.
- Icon-only social buttons: Reduces accessibility; labeled buttons are required by WCAG.

---

## Constitution Check: Pre-Research Gate

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First (YAGNI) | ✅ Pass | All changes are CSS Module modifications; no new libraries, no speculative features |
| II. Static-First, Vercel Hobby | ✅ Pass | No server-side code introduced; pure CSS/JSX changes deploy as static |
| III. Accessible by Default | ✅ Pass | All color decisions verified against WCAG AA; semantic HTML unchanged |
| IV. Performance Budget | ✅ Pass | No new JS, no new external assets; terminal color change is 1 CSS line; net CSS diff is minimal |
| V. Verifiable Changes | ✅ Pass | Each section can be verified independently in browser at 375px, 768px, 1280px |
