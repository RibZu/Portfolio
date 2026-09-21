# UI Contracts: Unified Visual Identity

**Feature**: `009-unified-visual-identity`
**Date**: 2026-09-21

---

## Design System Rules (enforced across ALL components)

1. **Surface levels**: Use `var(--bg)` for page, `var(--surface)` for subtle elevation, `var(--code-bg)` for raised cards.
2. **Card borders**: Always `1px solid var(--border-subtle)` — never `var(--border)` on cards/panels.
3. **Strong borders**: `var(--border)` only for structural dividers (nav pill outer border, `#root` side borders).
4. **Accent usage**: `var(--accent)` only — no secondary accent, no per-section colours.
5. **Section headings**: Always `span.section-label` + `h2.section-heading` — identical in every section.
6. **Buttons**: 2 variants only — Primary pill (accent fill) and Outline pill (transparent + border). No square buttons anywhere.
7. **Transitions**: `0.2s ease` for colour/border transitions; `0.25s ease` for transforms. No per-section custom timings.

---

## Token Interface Table

| Token | Hex/Value | Used in |
|-------|-----------|---------|
| `--bg` | `#0f1015` | Page bg, primary button text |
| `--surface` | `#13141a` | Header background, language switch bg, hover backgrounds |
| `--code-bg` | `#1c1d26` | All raised cards (Project cards, terminal, experience items) |
| `--text` | `#a0a0a0` | Body copy, descriptions, `section-label` fallback |
| `--text-h` | `#ffffff` | All headings, high-emphasis text, outlined button text |
| `--border` | `#2a2b36` | Nav pill border, root side borders ONLY |
| `--border-subtle` | `rgba(255,255,255,0.06)` | All card borders, panel separators |
| `--accent` | `#d8b4e2` | section-label text, underlines, ball, verified badge, active states, CTA bg |
| `--accent-bg` | `rgba(216,180,226,0.1)` | Active filter bg, tech badge bg |
| `--accent-border` | `rgba(216,180,226,0.5)` | Focus rings, active filter border, card hover border, hover on outline btns |

---

## Component-Level Contracts

### `src/index.css` — Global Utilities

```css
/* New tokens */
--surface: #13141a;
--border-subtle: rgba(255,255,255,0.06);

/* New utility classes */
.section-label { ... }
.section-heading { ... }
```

Full values in data-model.md. These classes are consumed directly in JSX.

---

### Header — Ball + Surface

```
.header
  background: var(--surface)            ← solid, no blur
  border: 1px solid var(--border)
  border-radius: 50px
  position: sticky; top: 20px
  overflow: hidden
  ::before REMOVED
  ::after REMOVED

.ball
  position: absolute
  top: 50%; transform: translateY(-50%)
  width: 10px; height: 10px
  border-radius: 50%
  background: var(--accent)
  box-shadow: 0 0 6px var(--accent), 0 0 12px rgba(216,180,226,0.4)
  animation: ballBounce 3s ease-in-out infinite
  pointer-events: none
  aria-hidden: true

@keyframes ballBounce
  0%, 100%: left: 10px
  50%: left: calc(100% - 20px)

@media (prefers-reduced-motion: reduce)
  .ball: animation: none; opacity: 0.4
```

---

### LanguageSwitch — Fixed Pill (NEW)

```
a.langSwitchFixed
  position: fixed
  top: 20px; right: 20px
  z-index: 999
  padding: 4px 12px
  border: 1px solid var(--border)
  border-radius: 9999px
  background: var(--surface)
  color: var(--text)
  font-size: 11px; font-weight: 600
  letter-spacing: 1px; text-transform: uppercase
  transition: border-color 0.2s, color 0.2s
  text-decoration: none

  :hover → border-color: var(--accent-border); color: var(--accent)
```

---

### Skills — Terminal + Heading

```
section#skills
  span.section-label → "TECNOLOGÍAS" / "TECHNOLOGIES"
  h2.section-heading → content from ui.headingSkills

.terminalWindow
  background: var(--code-bg)
  border: 1px solid var(--border-subtle)
  border-radius: 10px

.terminalDot:nth-child(1) → background: var(--accent)
.terminalDot:nth-child(2) → background: rgba(216,180,226,0.4)
.terminalDot:nth-child(3) → background: rgba(216,180,226,0.2)

.skillName → color: var(--text-h); NO glow text-shadow
.badgeDemonstrated → color: var(--accent)
.badgeDeclared → color: var(--text)
```

---

### Projects — Heading + Filter + Cards

```
section#projects
  span.section-label → "PROYECTOS" / "PROJECTS"
  h2.section-heading → content from ui.headingProjects

.filterBtn
  border: 1px solid var(--border-subtle)
  border-radius: 9999px
  [aria-pressed="true"]:
    background: var(--accent-bg)
    border-color: var(--accent-border)
    color: var(--accent)

.projectCard
  background: var(--code-bg)
  border: 1px solid var(--border-subtle)  ← was var(--border)
  border-radius: 12px
  :hover → border-color: var(--accent-border)
```

---

### Background — Heading + Items + Buttons

```
section#background
  span.section-label → "TRAYECTORIA" / "BACKGROUND"
  h2.section-heading → content from ui.headingBackground
                       (the LinkedIn button moves BELOW the heading, not beside it)

.linkButton (LinkedIn)
  border: 1px solid var(--border)
  border-radius: 9999px
  color: var(--text-h)
  padding: 6px 16px

.experienceItem
  border: 1px solid var(--border-subtle)  ← was var(--border)
  border-left: 3px solid var(--accent)

.experienceSubheading, .certificationsTitle
  → use .section-label class (or mirror its styles locally)

.languageItem
  border: 1px solid var(--border-subtle)
```

---

### Contact — Open Layout (No Card)

```
section#contact
  span.section-label → "CONTACTO" / "CONTACT"
  h2.section-heading → content from ui.headingContact

.contactBody (replaces .content)
  NO background, NO border, NO border-radius
  display: flex; flex-direction: column; align-items: center
  gap: var(--spacing-5); max-width: 480px; margin: 0 auto

.primaryButton
  background: var(--accent)
  color: var(--bg)
  border-radius: 9999px
  font-weight: 600
  padding: var(--spacing-3) var(--spacing-6)
  width: 100%; max-width: 300px

.secondaryButton
  border: 1px solid var(--border)
  border-radius: 9999px  ← was 4px
  color: var(--text-h)
  :hover → border-color: var(--accent-border); color: var(--accent)

.title::after (section-heading already has underline via ::after)
  → REMOVE from Contact.module.css (the global .section-heading handles this)
```
