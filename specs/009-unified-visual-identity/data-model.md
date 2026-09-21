# Data Model: Unified Visual Identity

**Feature**: `009-unified-visual-identity`
**Date**: 2026-09-21

No new data entities. This is a purely presentational redesign. The model below documents the **design system tokens** and **visual component contracts** that constitute the unified identity.

---

## Design System Tokens (additions to `src/index.css`)

| Token | Value | Purpose |
|-------|-------|---------|
| `--surface` | `#13141a` | Middle elevation surface (between page bg and raised card) |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Universal card/panel border — replaces hardcoded values |

All existing tokens are preserved and continue to be used:

| Token | Value | Role in new design |
|-------|-------|--------------------|
| `--bg` | `#0f1015` | Page background, button text on accent |
| `--code-bg` | `#1c1d26` | Raised card/panel surface |
| `--surface` *(new)* | `#13141a` | Subtle hover backgrounds, section bg tint |
| `--text` | `#a0a0a0` | Body text, labels, secondary |
| `--text-h` | `#ffffff` | Headings, high-emphasis text |
| `--border` | `#2a2b36` | Strong borders (nav pill, `#root` sides) |
| `--border-subtle` *(new)* | `rgba(255,255,255,0.06)` | Card borders, panel separators |
| `--accent` | `#d8b4e2` | Primary accent — all interactive highlights |
| `--accent-bg` | `rgba(216,180,226,0.1)` | Accent-tinted backgrounds |
| `--accent-border` | `rgba(216,180,226,0.5)` | Accent-coloured borders (focus rings, active states) |

---

## Global Utility Classes (additions to `src/index.css`)

Three new utility classes added alongside existing `.section`, `.container`, `.section-title`:

```css
.section-label   /* Small uppercase label above a section heading */
.section-heading /* Large section title with accent underline */
```

### `.section-label`
```
font-size: 11px
font-weight: 600
text-transform: uppercase
letter-spacing: 2px
color: var(--accent)
margin-bottom: 8px
display: block
```

### `.section-heading`
```
font-size: clamp(1.75rem, 3vw, 2.5rem)
font-weight: 700
color: var(--text-h)
margin: 0 0 var(--spacing-6) 0
letter-spacing: -0.02em
position: relative
padding-bottom: 12px

::after {
  content: ''
  position: absolute
  bottom: 0
  left: 0
  width: 40px
  height: 2px
  background: var(--accent)
  border-radius: 2px
}
```

---

## Component Contracts

### `Header.jsx` + `Header.module.css`

**New DOM structure:**
```
header.header
  span.ball [aria-hidden="true"]   ← NEW: bouncing ball
  div.container
    button.toggle (mobile only)
    nav.nav
      ul.navList
        li > a.navLink × 4         ← navigation ONLY (no lang switch)
                                   ← lang switch REMOVED from here
```

**Ball contract:**
| Property | Value |
|----------|-------|
| Element | `<span aria-hidden="true" className={styles.ball} />` |
| Position | `absolute; top: 50%; transform: translateY(-50%); left: 10px` |
| Size | `10px × 10px; border-radius: 50%` |
| Color | `background: var(--accent)` |
| Glow | `box-shadow: 0 0 6px var(--accent), 0 0 12px rgba(216,180,226,0.4)` |
| Animation | `@keyframes ballBounce: 0%,100% { left: 10px } 50% { left: calc(100% - 20px) }` |
| Duration | `3s ease-in-out infinite` |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { animation: none }` |

**Header surface:**
| Property | Value |
|----------|-------|
| Background | `var(--surface)` = `#13141a` (solid, no gradient, no blur pseudo-element) |
| Border | `1px solid var(--border)` |
| Border-radius | `50px` (pill) |
| Backdrop blur | Removed — the `::before` with blur is removed entirely |

---

### `LanguageSwitch.jsx` (NEW micro-component)

**Purpose**: Replaces the `langSwitch` div inside `Header.jsx`. Rendered as a sibling alongside `<Header />` in `App.jsx` (or inside `Header.jsx` but outside the `<header>` element — not possible with semantic HTML; use `App.jsx`).

**DOM:**
```
a.langSwitchFixed   ← position: fixed; top: 20px; right: 20px; z-index: 999
  [ES | EN text]
```

**CSS contract:**
```
position: fixed
top: 20px
right: 20px
z-index: 999
padding: 4px 12px
border: 1px solid var(--border)
border-radius: 9999px
background: var(--surface)
color: var(--text)
font-size: 11px
font-weight: 600
letter-spacing: 1px
text-transform: uppercase
transition: border-color 0.2s, color 0.2s

:hover { border-color: var(--accent-border); color: var(--accent) }
```

---

### `Skills.jsx` + `Skills.module.css`

**Heading change:** Add `<span className="section-label">` before the terminal window. The hidden `h2` becomes a proper visible `h2.section-heading`.

**Terminal surface:**
| Property | Current | New |
|----------|---------|-----|
| Background | `var(--code-bg)` | `var(--code-bg)` ✅ keep |
| Border | `1px solid rgba(216,180,226,0.15)` | `1px solid var(--border-subtle)` |
| Terminal dot 1 | `#ff5f56` | `var(--accent)` |
| Terminal dot 2 | `#ffbd2e` | `rgba(216,180,226,0.4)` |
| Terminal dot 3 | `#27c93f` | `rgba(216,180,226,0.2)` |
| Command user | `var(--accent)` ✅ keep | `var(--accent)` |
| Skill name | `#4af626` (green) | `var(--text-h)` — unifies with design system |
| Skill name glow | `text-shadow: 0 0 8px rgba(74,246,38,0.4)` | Remove glow |
| `[verified]` badge | `#00e5ff` | `var(--accent)` |
| `[learning]` badge | `#888` | `var(--text)` |
| Cursor | `var(--accent)` ✅ keep | `var(--accent)` |

**Rationale for skill name change**: The bright green (`#4af626`) is an out-of-palette value that clashes with the `--accent` system. Changing to `var(--text-h)` keeps the terminal aesthetic (monospace, prompt-style) while staying within the design system.

---

### `ProjectCard.jsx` + `ProjectCard.module.css`

**Card surface:**
| Property | Current | New |
|----------|---------|-----|
| Background | `var(--code-bg)` | `var(--code-bg)` ✅ keep |
| Border | `1px solid var(--border)` | `1px solid var(--border-subtle)` |
| Border-radius | `12px` | `12px` ✅ keep |
| Hover border | `var(--accent-border)` | `var(--accent-border)` ✅ keep |
| Hover lift | `translateY(-4px)` | `translateY(-4px)` ✅ keep |

**Projects section heading:** `<span class="section-label">` + `<h2 class="section-heading">` in `Projects.jsx`.

**TechFilter buttons:**
| Property | Current | New |
|----------|---------|-----|
| Background | `transparent` | `transparent` |
| Border | `1px solid var(--color-border)` | `1px solid var(--border-subtle)` |
| Border-radius | `9999px` | `9999px` ✅ keep |
| Active bg | `var(--color-accent-base)` | `var(--accent-bg)` |
| Active border | `var(--color-accent-base)` | `var(--accent-border)` |
| Active color | `var(--color-surface)` | `var(--accent)` |

---

### `Background.jsx` + `Background.module.css`

**Section heading:** Replace the current `h2.section-title` inline-styled with `span.section-label` + `h2.section-heading` (new utility classes).

**Experience items:**
| Property | Current | New |
|----------|---------|-----|
| Border left | `3px solid var(--accent)` | `3px solid var(--accent)` ✅ keep |
| Background | `var(--code-bg)` | `var(--code-bg)` ✅ keep |
| Border | `1px solid var(--border)` | `1px solid var(--border-subtle)` |
| Hover border-left color | `var(--text-h)` | `var(--accent-border)` |
| Role font-size | `var(--font-size-base)` | `var(--font-size-base)` |

**LinkedIn button:** Styled as outline pill button: `border: 1px solid var(--border); border-radius: 9999px; color: var(--text-h); padding: 4px 16px`.

**Language section:** `.languageItem` border updated to `var(--border-subtle)`.

**Sub-labels** (EXPERIENCIA / CERTIFICACIONES): Use `section-label` class.

---

### `Contact.jsx` + `Contact.module.css`

**Major change**: Remove the gradient card container entirely. Content sits directly on the page background.

**New DOM structure:**
```
section#contact.contactSection
  div.container
    span.section-label
    h2.section-heading
    div.contactBody          ← replaces .content (no card border/bg)
      div.emailWrapper
        a.primaryButton      ← pill with accent bg
        p.emailText
      div.socialLinks
        a.secondaryButton × 2
```

| Property | Current | New |
|----------|---------|-----|
| `.content` container | Gradient card, `border-radius: 16px`, accent border | **Removed entirely** |
| `.contactBody` | — | `display: flex; flex-direction: column; align-items: center; gap: var(--spacing-5); max-width: 480px; margin: 0 auto` — no background, no border |
| `.primaryButton` | Pill, accent bg, `font-weight: 600` | ✅ keep — same style |
| `.secondaryButton` | `border-radius: 4px` | → `border-radius: 9999px` (pill) |
| `.title::after` accent line | `left: 0` | needs `left: 50%; transform: translateX(-50%)` since heading is centred |

---

## File Change Summary

| File | Type | Change category |
|------|------|----------------|
| `src/index.css` | **MODIFY** | Add `--surface`, `--border-subtle`, `.section-label`, `.section-heading` |
| `src/App.jsx` | **MODIFY** | Import + render `<LanguageSwitch />` as sibling before `<Header />` or after |
| `src/components/LanguageSwitch.jsx` | **NEW** | Micro-component — fixed-position language pill |
| `src/components/LanguageSwitch.module.css` | **NEW** | Fixed pill styles |
| `src/components/Header.jsx` | **MODIFY** | Add `<span className={styles.ball} aria-hidden="true"/>`, remove langSwitch div |
| `src/components/Header.module.css` | **MODIFY** | Ball animation, remove `::before` blur, solid `--surface` bg |
| `src/components/Skills.jsx` | **MODIFY** | Add section-label, show h2 |
| `src/components/Skills.module.css` | **MODIFY** | Border, dot colors, skill name color, badge colors |
| `src/components/Projects.jsx` | **MODIFY** | Add section-label + section-heading |
| `src/components/Projects.module.css` | **MODIFY** | Minor filter/section styling |
| `src/components/TechFilter.module.css` | **MODIFY** | Unify filter btn to border-subtle + accent active |
| `src/components/ProjectCard.module.css` | **MODIFY** | Border → border-subtle |
| `src/components/Background.jsx` | **MODIFY** | Heading pattern, LinkedIn btn class |
| `src/components/Background.module.css` | **MODIFY** | Border → border-subtle, linkButton → pill, sub-labels |
| `src/components/Contact.jsx` | **MODIFY** | Remove `.content` wrapper div, add section-label |
| `src/components/Contact.module.css` | **MODIFY** | Remove gradient container, secondaryButton → pill, fix title::after alignment |
