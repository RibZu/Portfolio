# Research: Unified Visual Identity

**Feature**: `009-unified-visual-identity`
**Date**: 2026-09-21

---

## 1. Bouncing Ball — CSS-only technique

**Decision**: Use a single `<span className={styles.ball}/>` inside `<header>`, absolutely positioned, animated with `@keyframes bounce` that alternates `translateX` between `calc(var(--ball-min))` and `calc(var(--ball-max))`. The pill has `overflow: hidden` already — the ball stays clipped inside without any JS.

```
@keyframes ballBounce {
  0%, 100% { transform: translateX(8px); }
  50%       { transform: translateX(calc(100% - 8px - ball-diameter)); }
}
```

The header pill's inner width is the travel range. The ball is `10px × 10px`, `border-radius: 50%`, `background: var(--accent)`, with a `box-shadow: 0 0 8px var(--accent)` glow. It sits at `top: 50%; transform: translateY(-50%)` to stay vertically centred. `animation-timing-function: ease-in-out` gives a natural bounce feel. `animation-duration: 3s` is slow enough to be ambient, not distracting.

**Rationale**: Pure CSS, no JS, no performance cost. The pill's `overflow: hidden` does the clipping for free. `prefers-reduced-motion` guard: `animation: none` on the ball.

**Problem with `translateX` and container width**: The pill's computed width changes at breakpoints. Using `100%` in `translateX` refers to the element's own width, not the parent. Instead, the `right` property animates better for this case:

```css
@keyframes ballBounce {
  0%, 100% { left: 10px;   }
  50%       { left: calc(100% - 20px); } /* 100% = parent width, 20px = ball diameter + margin */
}
```

This uses `left` animation between fixed left-edge and right-edge values. `left: calc(100% - 20px)` positions the ball 10px from the right edge of the pill. This works correctly at all pill widths.

**Alternatives considered**:
- JS `requestAnimationFrame` bounce: Rejected — JS overhead, complex, breaks `prefers-reduced-motion` cleanly only with extra code. Constitution principle I: simpler.
- CSS `animation-direction: alternate` with `translateX`: Rejected — `translateX(100%)` is the element's own width, not parent width. `left` approach is cleaner.

---

## 2. Language Switch — Relocation Strategy

**Decision**: The `<div className={styles.langSwitch}>` block is removed from inside the `<nav>` in `Header.jsx`. It is moved to a new `<div className={styles.langFloating}>` that sits **outside** the `<header>` element entirely, rendered as a sibling in `App.jsx` or as a position-fixed pill-shaped link in the top-right corner of the viewport.

Implementation: In `App.jsx`, render a `<LanguageSwitch />` micro-component positioned `position: fixed; top: 20px; right: 20px; z-index: 999` as a small pill (`ES / EN` or current → opposite toggle) that does not interfere with the nav pill.

**Rationale**: The nav pill contains only navigation links — clean, purposeful. Language is a global preference, not a navigation action. Placing it as a fixed corner element mirrors patterns used by major portfolios and SaaS sites. It remains accessible at all scroll positions.

**Accessibility**: The fixed element is a standard `<a>` anchor pointing to the opposite-language URL (existing `getOppositePath()` + `setLanguagePreference()` logic). No change to the bilingual logic.

**Alternatives considered**:
- Language switch in footer: Less discoverable, not visible during scrolling.
- Language switch below the pill (sibling, not fixed): Works on desktop but hard to reach on mobile while scrolling.

---

## 3. Unified Section Heading Pattern

**Decision**: All sections (Skills, Projects, Background, Contact) use the same two-line heading structure implemented as CSS classes only — no new JSX component needed:

```html
<div class="sectionLabel">SKILLS</div>   <!-- small uppercase label -->
<h2 class="sectionTitle">Mis Tecnologías</h2>  <!-- large title -->
```

The `sectionLabel` class is defined in a **new shared stylesheet** `src/styles/design-system.css` (imported in `main.jsx`) that holds the universal classes: `.sectionLabel`, `.sectionTitle`, `.sectionDivider`. This is the only new file.

Wait — the constitution forbids global CSS pollution. **Revised approach**: Each component's CSS Module defines `.sectionLabel` and `.sectionTitle` locally, but with identical values copy-pasted. Alternatively, add utility classes to the existing `index.css` under a comment block "Design System Utilities". The latter is simpler (Principle I) and already has precedent (`.section`, `.container`, `.section-title` exist in `index.css`).

**Final decision**: Extend `src/index.css` with 3 new utility classes:
- `.section-label`: the small uppercase label
- `.section-heading`: replaces `.section-title` with the new unified style
- `.section-accent-line`: a 2px accent underline block element

**Rationale**: Reusing the existing global utility pattern already in `index.css` is the simplest, most constitution-compliant approach.

---

## 4. Token Addition — Surface Middle Level

**Decision**: Add one new CSS custom property to `src/index.css`:
```css
--surface: #13141a;
```

This provides the "middle elevation" surface distinct from `--bg` (page) and `--code-bg` (raised card). Used for subtle section backgrounds, hover states, and the language switch pill background.

**Rationale**: `--bg` and `--code-bg` already exist. The missing middle level was causing sections to either look flat (using `--bg`) or over-elevated (using `--code-bg`). One new token solves this cleanly. Constitution Principle I: adding one token is simpler than hardcoding `#13141a` in six places.

**Alternatives considered**:
- Using `rgba(19,20,26,1)` inline: Would be repeated 6+ times — harder to maintain.
- Not adding any middle level: Design system would feel flat.

---

## 5. Unified Border Token

**Decision**: Add one new CSS custom property:
```css
--border-subtle: rgba(255,255,255,0.06);
```

This replaces the current `--border` (`#2a2b36`) in most component contexts. `--border` is kept for places that need a stronger border (e.g., the nav pill itself, `#root` side borders). `--border-subtle` is used for card borders and panel separators.

**Rationale**: The "patches" feeling comes partly from some borders being `--border` (dark, hard) and others being different hardcoded values. A universal subtle border at 6% white opacity reads the same across all surface levels.

---

## 6. Consistent Button System

**Decision**: All interactive buttons across the site follow 2 patterns:
- **Primary**: `background: var(--accent); color: var(--bg); border-radius: 9999px; font-weight: 600` — used for main CTAs (Email Me)
- **Outline**: `background: transparent; border: 1px solid var(--border); color: var(--text-h); border-radius: 9999px` — used for secondary actions (GitHub, LinkedIn, language switch)

Hover for both: `transform: translateY(-2px); opacity: 0.9`.

---

## Constitution Check: Pre-Research Gate

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First (YAGNI) | ✅ Pass | 2 new tokens only (`--surface`, `--border-subtle`); 1 new tiny JSX component (`LanguageSwitch`); all other changes are CSS Module edits |
| II. Static-First, Vercel Hobby | ✅ Pass | No server-side code; pure CSS/JSX static build |
| III. Accessible by Default | ✅ Pass | Language switch remains keyboard-accessible; bouncing ball is decorative (`aria-hidden="true"`); section headings are semantic |
| IV. Performance Budget | ✅ Pass | CSS `@keyframes` has near-zero CPU cost; no new JS; no new external assets |
| V. Verifiable Changes | ✅ Pass | Each section verifiable independently in browser |
