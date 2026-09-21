# UI Contract: Portfolio Redesign — Component Visual Interfaces

**Feature**: `008-complete-portfolio-redesign`
**Date**: 2026-09-21
**Type**: UI Component Contracts (CSS custom property usage + DOM structure)

This document defines the interface contract between each redesigned component and the shared design token system. It ensures all components consume the same tokens and that no hardcoded colors break the palette coherence.

---

## Shared Design Token Interface

All components MUST consume tokens from `src/index.css (:root)`. No hardcoded hex values may be introduced in any redesigned component except where a token does not exist and the value is derived directly from an existing token (document any such derivations below).

### Canonical Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0f1015` | Page background, button text on accent |
| `--text` | `#a0a0a0` | Body text, descriptions |
| `--text-h` | `#ffffff` | Headings, high-emphasis text |
| `--border` | `#2a2b36` | All borders, dividers |
| `--code-bg` | `#1c1d26` | Elevated surfaces (cards, terminal) |
| `--accent` | `#d8b4e2` | Primary accent (purple), CTA background |
| `--accent-bg` | `rgba(216,180,226,0.1)` | Accent-tinted backgrounds |
| `--accent-border` | `rgba(216,180,226,0.5)` | Accent-colored borders |
| `--glass-bg` | `rgba(15,16,21,0.6)` | Glass overlay |
| `--shadow` | (multi-shadow) | Elevated card shadows |

### Derived Values (not yet tokens, document here)

| Usage | Derived From | Value |
|-------|-------------|-------|
| Navbar gradient | `--bg` + `--accent` | `linear-gradient(135deg, rgba(216,180,226,0.06), rgba(15,16,21,0.92))` |
| Card hover border | `--accent-border` | `rgba(216,180,226,0.5)` |
| Cert pill bg | `--accent-bg` reduced | `rgba(216,180,226,0.08)` |
| Cert pill border | `--accent-border` reduced | `rgba(216,180,226,0.2)` |
| Contact gradient | `--accent-bg` + `--code-bg` | `linear-gradient(135deg, rgba(216,180,226,0.10), rgba(28,29,38,0.85))` |

---

## Component Contracts

### `Header.module.css` — Navbar

**DOM structure** (unchanged):
```
header.header
  div.container
    button.toggle (mobile only)
    nav.nav
      ul.navList
        li > a.navLink × 4
      div.langSwitch > a.navLink
```

**CSS Contract**:
- `.header::before` MUST use `linear-gradient` (no `background-image: url(...)`)
- `.header::before` MUST keep `filter: blur(10px)` or `backdrop-filter: blur(12px)` for the glass effect
- `.header::after` background: `var(--glass-bg)` — UNCHANGED
- All nav link colors: unchanged (`var(--color-text-secondary)` → hover `var(--color-accent-light)`)

---

### `ProjectCard.jsx` + `ProjectCard.module.css`

**DOM structure** (after redesign):
```
article.projectCard
  div.projectImageContainer        ← unchanged
    img.projectImage | div.projectImagePlaceholder
  div.projectContent               ← unchanged
    h3.projectTitle
    p.projectDescription
    div.projectTechnologies
      span.techBadge × N
      span.techBadge.techBadgeMore (optional)
    div.projectLinks
      a.projectLink × 1-2
```

**Removed from DOM**: `div.macTitleBar` and its children (`span.macDot × 3`)

**CSS Contract**:
- `.projectCard` background: `var(--code-bg)`
- `.projectCard` border: `1px solid var(--border)`
- `.projectCard` border-radius: `12px`
- `.projectImagePlaceholder` background: `var(--border)` (dark placeholder, not light gray)
- `.projectTitle` color: `var(--text-h)`
- `.projectDescription` color: `var(--text)`
- `.techBadge` background: `rgba(216,180,226,0.12)`, color: `var(--accent)`
- `.techBadgeMore` background: transparent, color: `var(--text)`, border: `1px solid var(--border)`
- `.projectLink` color: `var(--text-h)`, hover → color: `var(--accent)`
- `.projectCard:hover` → `border-color: var(--accent-border)`

---

### `Skills.module.css` — Terminal

**DOM structure**: unchanged

**CSS Contract**:
- `.terminalWindow` background-color: `var(--code-bg)` — REPLACES `#0c0c0c`
- `.terminalWindow` border: `1px solid rgba(216,180,226,0.15)` — REPLACES `1px solid #333`
- `.commandUser` color: `var(--accent)` — REPLACES `#55ff55`
- `.cursor` background-color: `var(--accent)` — REPLACES `#fff`
- `.skillName` color: `#4af626` — PRESERVED (terminal green aesthetic)
- `.badgeDemonstrated` color: `#00e5ff` — PRESERVED

---

### `Background.jsx` + `Background.module.css`

**DOM structure** (after redesign):
```
section#background
  div.container
    div.header
      h2.section-title
      a.linkButton → LinkedIn
    div.languagesSection
      h3.languagesTitle
      ul.languagesList
        li.languageItem × N
    h3.experienceSubheading   ← NEW: "Experiencia" / "Experience"
    div.experienceList
      div.experienceItem × N  (type: work | education only)
    div.certificationsSection  ← NEW
      h3.certificationsTitle  ← NEW
      div.certificationsPills  ← NEW
        span.certPill × N     ← NEW
```

**CSS Contract**:
- `.experienceList` removes `::before` vertical line and the zigzag `@media (min-width: 768px)` rules
- `.experienceList` layout: `flex-direction: column`, `gap: 0.75rem`, no `position: relative`
- `.experienceItem` width: `100%`, no `margin-left: 60px`, no `::before` dot
- `.experienceItem` gets a left accent bar via: `border-left: 3px solid var(--accent)`, `padding-left: 1rem`
- `.experienceItem` bg: `var(--code-bg)`, border: `1px solid var(--border)` (keep, remove `::before` dot)
- `.certificationsPills` display: `flex`, `flex-wrap: wrap`, `gap: 0.5rem`
- `.certPill` radius: `9999px`, padding: `4px 12px`, bg: `rgba(216,180,226,0.08)`, border: `1px solid rgba(216,180,226,0.2)`, font-size: `var(--font-size-xs)`, color: `var(--text-h)`
- `.languageItem` border: updated to `1px solid var(--accent-border)` from `var(--color-border)`

**JSX changes required**:
- Filter `sorted` array into two arrays: `mainEntries` (`type !== 'certification'`) and `certEntries` (`type === 'certification'`)
- Render `mainEntries` in `.experienceList` (existing structure, simplified)
- Render `certEntries` as a new `div.certificationsSection` with pill spans

---

### `Contact.module.css`

**DOM structure**: unchanged

**CSS Contract**:
- `.content` background: `linear-gradient(135deg, rgba(216,180,226,0.10), rgba(28,29,38,0.85))`
- `.content` border: `1px solid var(--accent-border)`
- `.content` border-radius: `16px`
- `.content` max-width: `480px`
- `.primaryButton` border-radius: `9999px` (pill shape), `font-weight: 600` — MODIFIES from `4px`
- `.secondaryButton` hover: `border-color: var(--accent-border)`, color: `var(--accent)` — UNCHANGED (already correct)
- `.title` gets `::after`: `display: block; width: 40px; height: 2px; background: var(--accent); margin: 0.5rem auto 0` (accent underline)
