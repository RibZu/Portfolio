# Feature Specification: Complete Portfolio Redesign

**Feature Branch**: `008-complete-portfolio-redesign`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "quiero un redisenio total de mi pagina lo unico que me gusta son los colores y mi presentacion, donde dice mi nombre y la animacion, me gustaria un redisenio total siguiendo los colores, la navbar me gusta la forma que tiene pero la imagen que tiene de fondo no, en proyectos no me gusta ni el diseño de las tarjetas ni nada, en la parte de mis tecnologias me gustaría que no sea de color negro a ser posible me gustaría que tuviera otro color esa consola y desde ahi para abajo contactos y demas no me gusta nada quiero un rediseño completo"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor Explores the Portfolio Home (Priority: P1)

A recruiter or potential collaborator lands on the portfolio for the first time. They immediately see the hero section with the owner's name and the animated SVG visual — which they already like and which is preserved as-is. The page feels fresh, modern, and coherent.

**Why this priority**: The first impression is the most critical. The hero + name animation is a key identity element the owner wants to keep; the rest of the page must harmonize with it.

**Independent Test**: Can be fully tested by loading the home page on both desktop and mobile and verifying the hero section is unchanged and the overall page feels visually cohesive.

**Acceptance Scenarios**:

1. **Given** a visitor loads the page, **When** the page fully renders, **Then** the hero section (owner name, title, summary, animated SVG, action buttons) appears identical to the current design.
2. **Given** a visitor scrolls past the hero, **When** they view the redesigned navbar, projects, skills, background, and contact sections, **Then** all sections use the existing color palette (dark background `#0f1015`, accent purple `#d8b4e2`, text grays) and feel visually unified.

---

### User Story 2 - Visitor Navigates via the Navbar (Priority: P1)

The visitor uses the sticky floating navbar to jump between sections. The navbar keeps its current pill/rounded shape and frosted-glass structure, but the Japanese art background image behind it is replaced with a different visual treatment that fits the color palette.

**Why this priority**: Navigation is always-visible and essential. The shape was explicitly liked; only the background image is rejected.

**Independent Test**: Can be fully tested by clicking each nav link on desktop and mobile and confirming the pill shape, sticky behavior, and glass effect work correctly without the old background image.

**Acceptance Scenarios**:

1. **Given** the page is scrolled down, **When** the visitor looks at the header, **Then** the navbar is sticky, pill-shaped, and its background is a frosted-glass or gradient effect derived from the color palette (no Japanese art image).
2. **Given** the visitor clicks a nav link, **When** the page scrolls, **Then** the correct section comes into view and the active link is visually distinguishable.
3. **Given** a mobile viewport, **When** the hamburger toggle is tapped, **Then** the menu expands cleanly without visual glitches.

---

### User Story 3 - Visitor Browses Project Cards (Priority: P2)

The visitor scrolls to the Projects section and sees a completely redesigned card layout. The old "Mac window chrome" cards and the current grid composition are replaced with a new visual design that better showcases each project (image, name, description, tech badges, links).

**Why this priority**: Projects are the core content recruiters look at. The current card design was explicitly rejected in full.

**Independent Test**: Can be fully tested by reviewing the Projects section with mock project data on desktop and mobile.

**Acceptance Scenarios**:

1. **Given** a visitor views the Projects section, **When** they look at the cards, **Then** no Mac-style title bar (red/yellow/green dots) is visible; instead a modern, palette-consistent card design is shown.
2. **Given** a project has an image, **When** the card renders, **Then** the image is displayed prominently and attractively within the new card layout.
3. **Given** a project has tech badges, **When** the card renders, **Then** badges are legible, styled with the accent color, and limited appropriately (e.g., up to 3 visible with a count for the rest).
4. **Given** a project has a repo or demo link, **When** the visitor clicks either link, **Then** the correct external URL opens in a new tab.

---

### User Story 4 - Visitor Views Skills / Technologies (Priority: P2)

The visitor reaches the Skills section and sees the terminal-style console with a color other than pure black (`#0c0c0c`). The terminal concept and interactive command-prompt aesthetic can be kept or evolved, but the background must not be pure black — it should integrate with the site's dark-but-colored palette.

**Why this priority**: The terminal concept was not rejected — only the stark black color was. The fix is targeted.

**Independent Test**: Can be fully tested by inspecting the Skills section and confirming the terminal container color is no longer `#0c0c0c` / pure black but instead a hue-consistent dark color.

**Acceptance Scenarios**:

1. **Given** a visitor views the Skills section, **When** the terminal window renders, **Then** its background color is derived from the existing dark palette (e.g., using `--bg`, `--code-bg`, or a subtle purple-tinted dark) rather than pure black.
2. **Given** a skill is verified in projects, **When** it renders, **Then** the `[verified]` badge is visibly styled with a color from the accent palette.
3. **Given** a skill is being learned, **When** it renders, **Then** the `[learning]` badge is legible and consistent with the overall color scheme.

---

### User Story 5 - Visitor Reads Background at a Glance (Priority: P3)

The visitor reaches the Background section and gets a clean, at-a-glance overview of the owner's experience, education, and certifications. The section is redesigned to feel lighter and less cluttered: information is curated so the section does not feel like a dense wall of content. Secondary entries (certifications, older roles) are visually condensed or grouped.

**Why this priority**: The background section adds credibility but is lower priority than navigation, projects, and skills. Its value comes from quick scannability — a recruiter should grasp the career story in seconds.

**Independent Test**: Can be tested by reviewing the Background section on desktop and mobile; a first-time viewer should be able to scan all content in under 15 seconds.

**Acceptance Scenarios**:

1. **Given** a visitor views the Background section, **When** the section renders, **Then** experience entries are displayed in a visually distinct layout (timeline, compact cards, or tabbed groups) — not a plain unstyled list.
2. **Given** there are multiple entry types (work, education, certifications), **When** rendered, **Then** entries are visually grouped or differentiated by type so the visitor is not overwhelmed by 9+ identical-looking cards.
3. **Given** certification entries (e.g., React Course, Golang, SQL) are present, **When** rendered, **Then** they are visually condensed (e.g., small pill tags, inline row, or collapsed group) rather than full-size cards equal to work/education entries.
4. **Given** experience entries have a role, organisation, and period, **When** rendered, **Then** all three are clearly visible with appropriate typographic hierarchy.
5. **Given** spoken languages are listed, **When** rendered, **Then** they appear in a compact, styled block (pill tags or inline list) clearly separated from work/education entries.
6. **Given** a visitor is on mobile, **When** the section renders, **Then** the condensed layout remains readable and does not overflow or require horizontal scrolling.

---

### User Story 6 - Visitor Uses the Contact Section (Priority: P3)

The visitor reaches the Contact section and finds a completely redesigned layout. The existing card-in-center approach with a plain border is replaced with a more visually engaging contact area using the accent palette.

**Why this priority**: Contact is the conversion endpoint of the portfolio but its redesign is a pure aesthetic improvement.

**Independent Test**: Can be tested by visiting the Contact section and verifying all links (email, GitHub, LinkedIn) work and the layout is visually consistent with the rest of the redesign.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the Contact section, **When** it renders, **Then** the layout uses the site's accent color prominently and does not look like a plain bordered box on a dark background.
2. **Given** a visitor clicks "Email Me", **When** the link activates, **Then** a mail client opens pre-addressed to the correct email address.
3. **Given** a visitor clicks the GitHub or LinkedIn buttons, **When** clicked, **Then** the correct profile opens in a new tab.

---

### Edge Cases

- What happens when a project has no image? → The card must render gracefully with a styled placeholder that matches the new card design.
- What happens when the skills list is very long? → The terminal/grid layout must remain readable and not overflow its container.
- How does the redesign behave on very small screens (< 375px)? → All sections must remain usable; text must not overflow its container.
- What happens with `prefers-reduced-motion` enabled? → All new animations and transitions must be suppressed or minimized per the constitution.
- How does the navbar render if no scroll has occurred (page top)? → The pill-shaped header must still look correct without the Japanese art image.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The hero section (name, title, summary, animated SVG, CTA buttons) MUST remain visually unchanged.
- **FR-002**: The navbar MUST retain its pill shape, sticky positioning, and frosted-glass blur effect; the `japanese-art-bg.jpg` background image MUST be removed and replaced with a palette-derived visual treatment (e.g., a dark gradient or subtle noise texture).
- **FR-003**: The Projects section MUST display project cards in a completely new design — without Mac window chrome (no red/yellow/green dots title bar); the new design MUST show the project image, title, description, tech badges, and links in a visually appealing layout.
- **FR-004**: The Skills terminal window background color MUST NOT be pure black (`#0c0c0c`); it MUST use a color derived from the site's established dark palette variables (`--bg`, `--code-bg`, or an accent-tinted dark).
- **FR-005**: The Background section MUST present experience entries in a visually structured layout (e.g., timeline or styled cards) rather than a plain list.
- **FR-006**: The Contact section MUST be redesigned with a layout that incorporates the accent color palette, replacing the current plain-bordered card approach.
- **FR-007**: All redesigned sections MUST use the existing CSS custom properties and color tokens: background `#0f1015`, accent `#d8b4e2`, text grays, border `#2a2b36`, and `--code-bg #1c1d26`.
- **FR-008**: All interactive elements (buttons, links, nav items) MUST have clear hover/focus states consistent with the color palette.
- **FR-009**: Every section MUST be fully responsive across mobile (≥ 320px) and desktop (up to the current 1126px container width).
- **FR-010**: All animations and transitions in new sections MUST respect `prefers-reduced-motion`.
- **FR-011**: Color contrast for all text against its background MUST meet WCAG 2.1 AA (minimum 4.5:1 for normal text, 3:1 for large text).
- **FR-012**: No external UI frameworks (Bootstrap, Tailwind, Material UI) may be introduced; implementation MUST use CSS Modules and custom CSS only, consistent with the project constitution.
- **FR-013**: The Background section MUST visually differentiate entry types (work, education, certifications); certification entries specifically MUST be presented in a condensed format (e.g., pill tags or compact inline list) rather than as full-size cards; work and education entries MAY retain more detail but MUST be scannable at a glance.

### Key Entities

- **Section**: A full-width page section (Hero, Header/Navbar, Projects, Skills, Background, Contact); each has its own JSX component and CSS Module file.
- **ProjectCard**: A visual card unit representing a single project, with image, title, description, tech badges, and action links.
- **SkillItem**: A row within the terminal/skills display representing a single technology, with its name and a verified/learning badge.
- **ExperienceEntry**: A single work/education record with role, organisation, period, and optional description.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify the owner's name and role within 3 seconds of the page loading (hero preserved).
- **SC-002**: The navbar background no longer shows the Japanese art image; all five navigation links remain functional on desktop and mobile.
- **SC-003**: Project cards display all project data (image, title, description, badges, links) without any Mac-style chrome elements.
- **SC-004**: The Skills terminal container color is visually distinguishable from pure black when compared side-by-side.
- **SC-005**: The Background section renders with at least two visually distinct layouts for entry types — work/education entries have clear role + organisation + period hierarchy, and certification entries are condensed into a compact format (pills, tags, or inline list) occupying significantly less vertical space than a full card.
- **SC-006**: The Contact section renders with at least one accent-colored prominent call-to-action and all three contact channels (email, GitHub, LinkedIn) are functional.
- **SC-007**: Lighthouse scores for Performance, Accessibility, Best Practices, and SEO each remain at or above 90 after the redesign.
- **SC-008**: No layout overflow, broken elements, or missing assets are present on Chrome at 375px, 768px, and 1280px viewport widths.

---

## Assumptions

- The color palette (`--bg`, `--accent`, `--text-h`, `--border`, `--code-bg`, etc.) defined in `src/index.css` is kept entirely as-is; no new colors are introduced unless they are derived from or harmonize with the existing palette.
- The hero section JSX (`Hero.jsx` and `Hero.module.css`) and its animated SVG are **not modified** in this feature.
- The data layer (`src/data/`, `src/lib/`) is not modified; only presentational components and their CSS Modules are changed.
- The `App.jsx` structure (component order: Header → Hero → Skills → Projects → Background → Contact) is preserved; section order does not change.
- The site remains bilingual (Spanish/English) via the existing `t()` translation helper; no copy or i18n changes are included in this redesign.
- The `japanese-art-bg.jpg` asset can be retained in `src/assets/` for now (it may be referenced elsewhere or be useful later); it is simply no longer used in the navbar CSS.
- Mobile breakpoint is 991px (existing) for the navbar toggle, and 1024px for general layout breakpoints, consistent with current CSS.
- The redesign targets a "modern minimalist dark UI with subtle purple accent" aesthetic — clean, spacious, and professional — matching the existing hero and color system.
