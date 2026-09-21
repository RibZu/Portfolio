# Feature Specification: Unified Visual Identity — Full Portfolio Redesign

**Feature Branch**: `009-unified-visual-identity`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "me gusta el redsenio pero parecen todas cosas como pegadas como parches quiero que le des una identidad visual que arregles todo lo que esta ahora por que ni se por donde empezar proyectos necesita un rediseño completo al igual que todo el resto el negro en degradado del header es horrible el hecho que el idioma este en el header es horrible quiero un rediseño total en todo menos el hero con una identidad visual clara y concisa no esto que parecen todos pegotes, me gustaría que en el header haya una animación en el fondo que sea una pelotita que se vea como va rebotando en los bordes del header cuando voy bajando"

---

## Context & Problem Statement

The current portfolio has been redesigned in patches across multiple iterations. Each section was modified independently, resulting in a visual experience that feels incoherent — different design languages coexist without a unifying identity. The user wants a **ground-up redesign** with a single visual identity applied consistently across every section except the Hero (which is preserved as-is).

**Specific problems identified by the user:**
- The header gradient (dark-on-dark) looks generic and unappealing
- The language switcher inside the header pill is visually awkward and clutters navigation
- Every section looks like it was designed by a different person
- There is no visual thread connecting Navbar → Skills → Projects → Background → Contact

**What the user wants:** a cohesive, minimal, professional dark-UI portfolio where every section feels like it belongs to the same product — not a collection of individually styled widgets.

---

## Chosen Design Identity: "Obsidian with Neon Pulse"

A single design language applied across the entire page:

- **Surface hierarchy**: 3 levels — `#0f1015` (base page) → `#13141a` (subtle elevation) → `#1c1d26` (raised cards/panels)
- **Typography**: Clean, geometric, generous whitespace. Section headings are large and left-aligned with a thin accent underline. No uppercase noise except in small labels.
- **Accent**: `#d8b4e2` (lavender/purple) used sparingly and consistently as the single color with visual weight — on borders, highlights, key interactive states, and the animated ball
- **Borders**: `1px solid rgba(255,255,255,0.06)` as a universal subtle separator — not `--border` at full opacity everywhere
- **Sections**: each section has identical structural padding, a consistent max-width container, and matching heading anatomy (label + title pattern)
- **Language switch**: moved OUT of the header pill into a discreet fixed corner element or a small footer link — not inside the nav

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitor Sees a Cohesive Page at First Scroll (Priority: P1)

A visitor scrolls from the Hero downward. Every section they pass through feels like it was designed as one system: same spacing rhythm, same typographic scale, same accent treatment. No section feels like a "patch".

**Why this priority**: Visual cohesion is the core requirement of this spec. If this fails, nothing else matters.

**Independent Test**: A person unfamiliar with the site views it and can identify a consistent visual identity without being told one exists.

**Acceptance Scenarios**:

1. **Given** a visitor loads the page, **When** they scroll through all sections, **Then** every section uses the same surface colours, spacing scale, accent colour, and typographic style — there are no sections that visually clash with the rest.
2. **Given** a visitor looks at the page on mobile, **When** they scroll through, **Then** the same visual identity is maintained at smaller viewports with no layout breaking.

---

### User Story 2 — Navbar with Animated Bouncing Ball (Priority: P1)

The sticky pill navbar has an animated glowing ball visible inside or behind it that bounces between the left and right edges of the pill while the page is being scrolled or at all times. The ball is subtle — a visual accent, not a distraction. The language switcher is no longer inside the pill header.

**Why this priority**: This is an explicit design requirement from the user and transforms the navbar from a generic element into a signature interaction. Removing the language switcher from the pill is equally critical.

**Independent Test**: Load the page — the ball is visible and animated inside the header. Scroll down and the ball continues. The header contains only the 4 nav links. Language switch is accessible but outside the pill.

**Acceptance Scenarios**:

1. **Given** a visitor loads the page, **When** the header renders, **Then** a small glowing ball is visible bouncing between the left and right inner edges of the pill-shaped header, smoothly and continuously.
2. **Given** a visitor looks at the header, **When** they count the elements, **Then** the pill contains ONLY the 4 nav section links (Skills, Projects, Background, Contact) — no language switcher inside the pill.
3. **Given** the site is bilingual, **When** a visitor wants to switch language, **Then** a language switch element exists outside the pill (e.g., as a small discreet link near the header or in the footer) and remains accessible.
4. **Given** a visitor has `prefers-reduced-motion: reduce` enabled, **When** the header renders, **Then** the ball animation is paused or replaced with a static accent dot.
5. **Given** a mobile viewport, **When** the hamburger menu is closed, **Then** the ball is still visible and the pill shape is preserved. When the menu opens, the pill expands and the ball is hidden or paused.

---

### User Story 3 — Projects Section: Gallery Layout (Priority: P1)

The Projects section is rebuilt from scratch with a new layout that feels intentional and premium. Cards are dark-surface, spacious, with strong typographic hierarchy and clear interaction affordances. The tech filter is restyled to match the new identity.

**Why this priority**: Projects are the primary content recruiters look at. The current card design still feels inconsistent with the rest of the page.

**Independent Test**: A recruiter can browse all projects, read the descriptions, and click through to repos/demos without any visual confusion.

**Acceptance Scenarios**:

1. **Given** a visitor views the Projects section, **When** the page renders, **Then** project cards use the unified surface hierarchy (elevated panel look), with consistent padding, typographic scale, and accent colour usage.
2. **Given** a project has an image, **When** the card renders, **Then** the image is presented prominently without overwhelming the content below.
3. **Given** a visitor hovers a card, **When** the hover state activates, **Then** a smooth, unified interaction feedback occurs (e.g., subtle lift + accent border) consistent with the design system.
4. **Given** a visitor uses the tech filter, **When** they click a filter button, **Then** the active filter uses the accent colour and the transition is smooth.
5. **Given** no projects match the filter, **When** the empty state renders, **Then** a styled, friendly empty state message is shown.

---

### User Story 4 — Skills Section: Integrated Terminal (Priority: P2)

The terminal window in the Skills section is restyled as an integrated panel that feels like it belongs to the page — not a foreign widget dropped in. The terminal chrome (dots, command prompt) uses the unified identity's accent and surface colours.

**Why this priority**: The terminal concept is retained (user never objected to it), but it must participate in the design system.

**Independent Test**: A visitor can view the Skills section and immediately see that it shares the same visual DNA as the rest of the page.

**Acceptance Scenarios**:

1. **Given** a visitor views the Skills section, **When** the terminal renders, **Then** the window background, border, and chrome all use colours from the unified design system — no out-of-palette values.
2. **Given** the terminal renders, **When** a visitor reads skill names, **Then** they are clearly legible and styled with the accent colour system.
3. **Given** the cursor blinks, **When** it animates, **Then** the blink colour uses `var(--accent)`.

---

### User Story 5 — Background Section: Clean Timeline (Priority: P2)

The Background section presents experience and certifications in a visually clean layout. Section headings follow the same heading anatomy as all other sections. The LinkedIn button is restyled to match the unified identity.

**Why this priority**: Background adds credibility but must not look like a different app.

**Independent Test**: A visitor can scan the Background section and confirm it uses the same spacing, type scale, and accent colour as Projects and Contact.

**Acceptance Scenarios**:

1. **Given** a visitor views the Background section, **When** the section heading renders, **Then** it uses the same heading pattern as all other sections (label + title, or large title with accent underline) — no one-off styles.
2. **Given** work/education entries render, **When** a visitor reads them, **Then** the left accent bar colour, card surface, and typography all match the design system.
3. **Given** certification pills render, **When** visible, **Then** the pill shape, colour, and border all use system tokens.

---

### User Story 6 — Contact Section: Minimal CTA (Priority: P2)

The Contact section is the simplest and most spacious section. It has a large, clear heading, the email CTA button, and social links — all styled with the unified identity. No gradient card container. The design is open and inviting, not boxed in.

**Why this priority**: Contact is the conversion point. A cleaner, more open design is more inviting than a bordered card.

**Independent Test**: A visitor can click "Email Me" and reach GitHub/LinkedIn from the Contact section, and the section visually feels like a natural conclusion to the page.

**Acceptance Scenarios**:

1. **Given** a visitor views the Contact section, **When** it renders, **Then** there is NO bordered/gradient card container — the content sits directly on the page background with generous spacing.
2. **Given** the email CTA renders, **When** visible, **Then** it is a prominent pill button using the accent colour.
3. **Given** social links render, **When** visible, **Then** they are styled consistently — matching the button patterns used elsewhere in the page.
4. **Given** a visitor clicks "Email Me", **When** the action triggers, **Then** a mail client opens pre-addressed to the correct email.

---

### Edge Cases

- What happens when a project has no image? → Card must look complete with a styled dark placeholder, not a broken slot.
- What happens if the bouncing ball animation causes performance issues on low-end mobile? → The ball uses CSS `animation` only (no JS loop), respects `prefers-reduced-motion`, and pauses on mobile if performance is a concern.
- What happens with the language switcher when JS is disabled? → The language switch link outside the pill must be a plain `<a>` anchor that works without JS.
- How does the unified identity hold up on very wide screens (>1440px)? → All sections respect the existing 1126px container max-width — content does not stretch.
- What happens if the section headings need translation? → All heading text uses the existing `t()` helper — no hardcoded strings.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Hero section (`Hero.jsx`, `Hero.module.css`) MUST NOT be modified in any way.
- **FR-002**: The language switcher MUST be removed from the pill header and placed in an accessible alternative location (e.g., a discreet fixed element outside the pill, or a footer link).
- **FR-003**: The header pill MUST contain a continuously animated bouncing ball that travels between the left and right inner edges of the pill. The animation MUST be CSS-only (no requestAnimationFrame loop). The ball MUST be a small, glowing circle using the accent colour palette. The animation MUST be paused when `prefers-reduced-motion: reduce` is active.
- **FR-004**: Every section except Hero MUST use the same set of CSS custom property tokens from `src/index.css` for surfaces, borders, typography, and accent — no per-section hardcoded values.
- **FR-005**: Section headings across Skills, Projects, Background, and Contact MUST follow an identical heading pattern: a small uppercase label (e.g., "SKILLS", "PROJECTS") in `var(--text)` with letter-spacing, followed by a larger title in `var(--text-h)` with an accent underline or side mark.
- **FR-006**: Project cards MUST use the unified surface system: `background: var(--code-bg)`, `border: 1px solid rgba(255,255,255,0.06)`, `border-radius: 12px`. Tech badges MUST use `var(--accent)` text on a faint accent background. No Mac chrome. No Notion-style light theme.
- **FR-007**: The tech filter buttons MUST be restyled to match the unified identity: pill-shaped, transparent background, `rgba(255,255,255,0.06)` border, active state uses `var(--accent)` background.
- **FR-008**: The Skills terminal panel MUST be restyled as an integrated dark panel using `var(--code-bg)` with a `1px solid rgba(255,255,255,0.06)` border and `var(--accent)` for the command user text and cursor.
- **FR-009**: The Background section heading MUST follow the same heading pattern as other sections (FR-005). The LinkedIn button MUST be styled consistently with the secondary button pattern used in Contact (pill-shaped outline).
- **FR-010**: The Contact section MUST NOT use a gradient card container. Content MUST sit on the page background directly. The email CTA MUST be a pill-shaped button with `var(--accent)` background. Social links MUST be styled as outline pill buttons.
- **FR-011**: All interactive elements (buttons, links, nav items, filter pills, card hover states) MUST have consistent hover/focus treatment: accent colour on focus, subtle lift or background on hover — no per-section one-offs.
- **FR-012**: Every section MUST be fully responsive at ≥ 320px. Section padding, card layouts, and typography MUST adapt gracefully to mobile widths.
- **FR-013**: All animations and transitions MUST respect `prefers-reduced-motion`. The bouncing ball MUST stop. Card hovers MUST be reduced to colour-only changes.
- **FR-014**: No new external libraries, fonts, or frameworks may be introduced. Implementation MUST use CSS Modules and plain React (JSX) only, per the project constitution.
- **FR-015**: Color contrast for all text must meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text).

### Key Entities

- **DesignToken**: A CSS custom property defined in `src/index.css`. Every visual decision in this redesign MUST trace to a design token — no magic numbers.
- **SectionHeading**: The standardised heading component pattern (label + title + underline) applied to Skills, Projects, Background, and Contact.
- **BouncingBall**: A CSS-animated element inside the header pill, independent of JSX state, that travels horizontally between left and right edges.
- **LanguageSwitcher**: The bilingual toggle, relocated from inside the header pill to an accessible position outside it.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can scroll the full page and identify a single consistent visual identity — no section looks independently designed. (Qualitative: reviewable by anyone seeing the page)
- **SC-002**: The header pill contains exactly 4 navigation links and the bouncing ball — no language switcher inside the pill.
- **SC-003**: The bouncing ball animation runs continuously without visible jank on a mid-range desktop browser (Chrome, 60fps target).
- **SC-004**: All section headings use the same visual pattern — verifiable by visual inspection in under 10 seconds.
- **SC-005**: Project cards, Skills terminal, Background entries, and Contact CTA all use `var(--code-bg)` as their elevated surface — verifiable in DevTools computed styles.
- **SC-006**: The language switcher is accessible from outside the header pill on both desktop and mobile.
- **SC-007**: `npm run build` exits with code 0 after all changes.
- **SC-008**: Lighthouse scores for Performance, Accessibility, Best Practices, and SEO each remain at or above 90.
- **SC-009**: No horizontal overflow at 375px, 768px, 1024px, or 1280px viewport widths.

---

## Assumptions

- The existing CSS custom property system in `src/index.css` is kept exactly as-is. All token usage continues from that file.
- The Hero section (`Hero.jsx`, `Hero.module.css`) is completely frozen — zero modifications.
- The bilingual system (`t()`, `currentLanguage`, `setLanguagePreference`) is preserved and functional. Only the UI placement of the switcher changes, not its logic.
- The "bouncing ball" is a CSS-animated `<div>` or `<span>` element added inside the `<header>` JSX, positioned absolutely within the pill bounds, animated with `@keyframes` using `translateX` between the pill's inner left and right edges.
- The unified identity's accent colour (`#d8b4e2` / `var(--accent)`) remains the sole accent — no second accent colour is introduced.
- Section order in `App.jsx` (Header → Hero → Skills → Projects → Background → Contact) is preserved.
- The `data/` directory (projects, experience, profile, technologies, ui) is not modified — only presentational components.
- "Obsidian with Neon Pulse" is the working name for the design system; it does not need to appear in the UI.
