# Data Model: Complete Portfolio Redesign

**Feature**: `008-complete-portfolio-redesign`
**Date**: 2026-09-21

This is a pure presentational redesign. No new data entities are introduced and no data schema changes. All existing data structures in `src/data/` remain unchanged. The model documented here describes the **visual/UI contracts** each component must satisfy after the redesign.

---

## Visual Component Contracts

### Header (Navbar)

| Property | Current | After Redesign |
|----------|---------|----------------|
| Shape | Pill (`border-radius: 50px`) | ✅ Preserved |
| Sticky | `position: sticky; top: 20px` | ✅ Preserved |
| Background treatment | `::before` with `japanese-art-bg.jpg` + `blur(10px)` | `::before` with CSS gradient (`linear-gradient(135deg, rgba(216,180,226,0.08), rgba(15,16,21,0.9))`) + `backdrop-filter: blur(12px)` |
| Overlay | `::after` with `var(--glass-bg)` | ✅ Preserved |
| Nav links | Uppercase, `--color-text-secondary` | ✅ Preserved |
| Language switch | Absolute right | ✅ Preserved |
| Mobile toggle | Hamburger, 991px breakpoint | ✅ Preserved |

**Change summary**: Remove `background-image: url('../assets/japanese-art-bg.jpg')` from `.header::before`. Replace with a CSS gradient. Asset `japanese-art-bg.jpg` is retained in `src/assets/` but no longer referenced.

---

### ProjectCard

| Property | Current | After Redesign |
|----------|---------|----------------|
| Background | `#ffffff` (light) | `var(--code-bg)` = `#1c1d26` |
| Border | `rgba(55,53,47,0.09)` | `1px solid var(--border)` = `#2a2b36` |
| Border radius | `8px` | `12px` |
| Mac title bar | Present (red/yellow/green dots) | **Removed** |
| Image container | `aspect-ratio: 16/9`, light placeholder | ✅ Preserved layout; placeholder: `background: var(--border)` |
| Project title | `color: #37352f` (dark on light) | `color: var(--color-display)` = white-ish |
| Description | `color: #787774` (gray on light) | `color: var(--text)` = `#a0a0a0` |
| Tech badge bg | `rgba(227,226,224,0.5)` (light) | `rgba(216,180,226,0.12)` (purple tint) |
| Tech badge color | `#37352f` | `var(--accent)` = `#d8b4e2` |
| Tech badge `+N` | Light gray | `color: var(--text)`, `border: 1px solid var(--border)` |
| Links | `color: #37352f` | `color: var(--text-h)`, hover: accent color |
| Hover state | `translateY(-5px) rotateX(2deg)` — light shadow | `translateY(-4px)` + `box-shadow: 0 8px 24px rgba(0,0,0,0.4)` + border becomes `var(--accent-border)` |

**JSX changes**: Remove the `<div className={styles.macTitleBar}>` block (lines 19-23 of `ProjectCard.jsx`). No other JSX changes needed.

---

### Skills (Terminal Window)

| Property | Current | After Redesign |
|----------|---------|----------------|
| Terminal bg | `#0c0c0c` (pure black) | `var(--code-bg)` = `#1c1d26` |
| Terminal border | `1px solid #333` | `1px solid rgba(216,180,226,0.15)` |
| Skill name color | `#4af626` (green glow) | ✅ Preserved (user only objected to background color) |
| Command user color | `#55ff55` | `var(--accent)` = `#d8b4e2` |
| Command text | `#fff` | ✅ Preserved |
| Cursor | `background: #fff` | `background: var(--accent)` |
| `[verified]` badge | `#00e5ff` | ✅ Preserved |
| `[learning]` badge | `#888` | ✅ Preserved |
| Max-width | `800px` | ✅ Preserved |

**JSX changes**: None. Only CSS Module changes.

---

### Background Section

**New two-tier layout:**

#### Tier 1 — Work & Education (rendered as compact timeline cards)

| Property | Spec |
|----------|------|
| Layout | Vertical flex column, `gap: 1rem` |
| Left accent bar | `::before` pseudo on each item: `width: 3px`, `background: var(--accent)`, `border-radius: 2px` |
| Card bg | `var(--code-bg)` |
| Card border | `1px solid var(--border)` |
| Card border-radius | `8px` |
| Card padding | `1rem 1.25rem` |
| Role | `font-weight: 600`, `color: var(--color-display)`, `font-size: var(--font-size-base)` |
| Organisation | `color: var(--accent)`, `font-size: var(--font-size-sm)` |
| Period | Pill: `background: rgba(216,180,226,0.1)`, `color: var(--text)`, `font-size: var(--font-size-xs)`, `border-radius: 9999px`, `padding: 2px 8px` |
| Description | `color: var(--text)`, `font-size: var(--font-size-sm)`, `line-height: 1.6`, optional (only rendered if `entry.description` exists) |
| No zigzag | The alternating left/right timeline at ≥768px is **removed**; all items are left-aligned in a single column |

#### Tier 2 — Certifications (pill row)

| Property | Spec |
|----------|------|
| Subheading | "Certificaciones" / "Certifications", `font-size: var(--font-size-sm)`, `color: var(--text)`, `text-transform: uppercase`, `letter-spacing: 1px` |
| Pills | `display: flex; flex-wrap: wrap; gap: 0.5rem` |
| Pill shape | `border-radius: 9999px`, `padding: 4px 12px` |
| Pill bg | `rgba(216,180,226,0.08)` |
| Pill border | `1px solid rgba(216,180,226,0.2)` |
| Pill text | `font-size: var(--font-size-xs)`, `color: var(--text-h)` |
| Pill content | `{role.es/en} · {period.from}` (e.g., "First Certificate B2 · 2025") |

#### Languages block

| Property | Spec |
|----------|------|
| Styling | Existing pill pattern retained but border updated to `var(--accent-border)` |
| Placement | Above Tier 1 (same as now) |

**Layout structure** (rendered order):
1. Section heading (h2)
2. LinkedIn link button
3. Languages pills
4. `<h3>` "Experiencia" / "Experience" (new subheading separating the tiers visually)
5. Work + Education cards (Tier 1, filtered by `type !== 'certification'`)
6. `<h3>` "Certifications" label + pill row (Tier 2)

---

### Contact Section

| Property | Current | After Redesign |
|----------|---------|----------------|
| Container bg | `var(--code-bg)` with `1px solid var(--border)` | `linear-gradient(135deg, rgba(216,180,226,0.10), rgba(28,29,38,0.85))` with `1px solid var(--accent-border)` |
| Container border-radius | `8px` | `16px` |
| Container max-width | `600px` | `480px` |
| Email button | `background: var(--accent)`, `color: var(--bg)` | ✅ Preserved; width `100%`, `border-radius: 9999px`, `font-weight: 600` |
| Email address display | `font-family: mono`, `background: var(--bg)` | ✅ Preserved (minor: `border-radius: 8px`) |
| Social buttons | Plain `border: 1px solid var(--border)` | `border: 1px solid var(--border)` → hover: `border-color: var(--accent-border)`, `color: var(--accent)` |
| Section title | Plain `h2` | `h2` + subtle divider or accent underline via `::after` |

**JSX changes**: None. Only CSS Module changes.

---

## Entities (Unchanged Data Model)

| Entity | Source File | Fields Used in Redesign |
|--------|-------------|------------------------|
| `Project` | `src/data/projects.js` | `id`, `name`, `description`, `technologies`, `image`, `imageWidth`, `imageHeight`, `repo`, `demo` |
| `ExperienceEntry` | `src/data/experience.js` | `id`, `type` (**new usage** for tier filtering), `role`, `organisation`, `period`, `description` |
| `Technology` | `src/data/technologies.js` | `id`, `name` |
| `Skill` | `src/data/profile.js#skills` | `technologyId` |
| `SpokenLanguage` | `src/data/profile.js#profile.spokenLanguages` | `name`, `level` |

> **Note on `type` field**: `ExperienceEntry.type` (`"work"`, `"education"`, `"certification"`) already exists in the data. The Background component will use it for the first time to split Tier 1 from Tier 2. No data changes required.
