# Feature Specification: Portfolio Redesign (No Bootstrap)

**Feature Branch**: `[002-portfolio-redesign]`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "el disneio actual de mi pagina es una basura mantienedo los colores y sacando boostrap quisera que me redisenes mi porfolio de la manera mas profesional posible"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Remove Bootstrap and Establish Custom Layout System (Priority: P1)

The portfolio must operate independently of Bootstrap, relying entirely on a modern custom layout system (Flexbox/Grid) while preserving the established color palette tokens.

**Why this priority**: Removing the framework is the core technical requirement and must be done first to unblock any visual redesign.

**Independent Test**: Can be fully tested by verifying that `react-bootstrap` and `bootstrap` are uninstalled, yet the application still compiles and renders a basic structured layout.

**Acceptance Scenarios**:

1. **Given** the user visits the site, **When** they inspect the network or source, **Then** no Bootstrap CSS or JS is loaded.
2. **Given** the site renders, **When** viewed on mobile or desktop, **Then** the layout adapts responsively without breaking.

---

### User Story 2 - Professional Typography and Spacing Redesign (Priority: P2)

The text content across all sections (Hero, Skills, Experience, Projects) must be styled with professional typography (using the existing `Display Condensed` font for headings and standard sans-serif for body), generous whitespace, and clear visual hierarchy.

**Why this priority**: A "professional" look relies heavily on typography, alignment, and whitespace to guide the reader's eye effectively.

**Independent Test**: Can be fully tested by verifying that headings stand out clearly from body text, sections have consistent padding, and the content is highly legible.

**Acceptance Scenarios**:

1. **Given** a site visitor reads the Hero section, **When** they scan the text, **Then** the name and title instantly draw attention due to scale and weight contrast.
2. **Given** the user scrolls down, **When** they transition between sections, **Then** consistent vertical rhythms (spacing) clearly separate distinct areas.

---

### User Story 3 - Modern Card and Interactive Element Styling (Priority: P3)

The Projects and Experience sections must use a highly polished, custom card design with subtle hover effects, refined borders, and modern interactive feedback, replacing the default Bootstrap card look.

**Why this priority**: Interactive elements and data presentation (cards) are where design polish is most evident and critical for a professional portfolio.

**Independent Test**: Can be fully tested by hovering over project cards and technology filters to observe smooth, deliberate interactive states.

**Acceptance Scenarios**:

1. **Given** the user views the Projects grid, **When** they hover over a project card, **Then** a subtle, smooth visual feedback (like a slight lift or color shift) occurs.
2. **Given** the user interacts with technology filters, **When** they select a filter, **Then** the active state is clearly and elegantly distinguished from inactive states.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST completely remove `bootstrap` and `react-bootstrap` dependencies.
- **FR-002**: System MUST retain and utilize all existing CSS variables defined in `src/styles/tokens.css` for colors, fonts, and spacing.
- **FR-003**: System MUST implement a custom responsive grid/flexbox layout for the Projects section that adapts from 1 column on mobile to multiple columns on desktop.
- **FR-004**: System MUST implement a custom navigation bar that sticks to the top of the viewport and highlights the active section.
- **FR-005**: System MUST ensure all interactive elements (buttons, links, cards) have defined `:hover` and `:focus-visible` states for accessibility and polish.
- **FR-006**: System MUST maintain the bilingual functionality without relying on Bootstrap's dropdowns for the language switcher.
- **FR-007**: System MUST use CSS Modules (e.g., `ComponentName.module.css`) for all custom component styling to ensure styles are scoped and maintainable without global conflicts.

### Key Entities

- **Custom Components**: Re-implemented UI components (`Header`, `ProjectCard`, `TechFilter`, etc.) using native HTML elements and custom CSS classes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0% of Bootstrap CSS or JS remains in the final production bundle.
- **SC-002**: Lighthouse Design/Performance score remains at or above 90 on mobile devices.
- **SC-003**: Lighthouse Accessibility score remains at 100, ensuring the custom interactive elements meet WCAG AA standards (focus rings, contrast).
- **SC-004**: Zero horizontal scrolling occurs on any viewport width from 320px to 2560px.

## Assumptions

- We will implement the design using pure custom CSS (or CSS modules) to keep the project lightweight, as no replacement framework (like Tailwind) was requested.
- The redesign will aim for a "modern minimalist" aesthetic—clean lines, high contrast utilizing the existing blue/accent tokens, and ample whitespace.
- Existing data structures (`profile.js`, `projects.js`, etc.) do not need to be modified for this redesign.
