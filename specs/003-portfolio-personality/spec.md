# Feature Specification: Portfolio Personality and Polish

**Feature Branch**: `[003-portfolio-personality]`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "quita esto San Luis, Argentina Disponible para nuevos desafíos Pone solo Simon Riberi en mi nombre saca mi nombre del header y quiero que sigas redisenando me gusta pero sigo pensandoq u eto notien perosnlidad que todo est amuy vcio y que parece todo muy viejo en sierta manera a las habilidaddes y proyectos busquemos las formas de redisenarlos para que no se ven tan mal me gustariq eu el ehader excetuando el diioma estuvieran centardos"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Profile Data Refinement (Priority: P1)

The portfolio must display a concise identity: removing the location, removing the availability status, and shortening the displayed name to "Simón Riberi". The name must also be removed from the Header.

**Why this priority**: Correcting personal information and identity display is the most critical fix.

**Independent Test**: Verify in `profile.js` and the rendered UI that the location and availability are gone, and the name is updated.

**Acceptance Scenarios**:

1. **Given** the user views the Hero, **When** they read the name, **Then** it says "Simón Riberi".
2. **Given** the user views the Header, **When** they look at the brand area, **Then** the name is absent.

---

### User Story 2 - Header Layout Adjustments (Priority: P2)

The navigation links within the header must be perfectly centered, while the language switcher remains appropriately positioned (e.g., on the right).

**Why this priority**: Layout fixes to the core navigation improve structural balance.

**Independent Test**: Verify the header flexbox layout centers the main navigation items while keeping the language toggle accessible.

**Acceptance Scenarios**:

1. **Given** a desktop view, **When** viewing the header, **Then** the links are in the exact center of the screen.

---

### User Story 3 - Visual Personality Injection (Priority: P3)

The Skills and Projects sections must be redesigned to look modern, vibrant, and full of personality (overcoming the "empty/old" feeling). This includes adding dynamic borders, subtle gradients, engaging icons, or modern card styling without relying on heavy frameworks.

**Why this priority**: Elevating the visual design addresses the core feedback about the site feeling "empty and old".

**Independent Test**: Visually inspect the Skills and Projects sections for modern UI patterns (e.g., glassmorphism, subtle gradients, improved spacing, or dynamic hover states).

**Acceptance Scenarios**:

1. **Given** the user scrolls to Skills, **When** they view the list, **Then** it feels modern and engaging (e.g., pill-shaped tags, modern grids).
2. **Given** the user views Projects, **When** they interact with cards, **Then** the design feels fresh, layered, and full of personality.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Update `profile.name` to "Simón Riberi".
- **FR-002**: Remove location and availability rendering from the Hero component.
- **FR-003**: Remove the name/brand text from the Header component.
- **FR-004**: Update Header CSS to center the navigation list (`ul`) absolutely or using flex-grow tricks, while keeping the language button on the right.
- **FR-005**: Redesign `Skills.jsx` and `Skills.module.css` to use a modern aesthetic (e.g., rounded pills, subtle background highlights, or grid layouts).
- **FR-006**: Redesign `ProjectCard.jsx` to have more personality (e.g., subtle gradient borders, modern shadows, more engaging image presentation).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Name is exactly "Simón Riberi" across the site.
- **SC-002**: Header navigation items are mathematically centered in the viewport on desktop screens.
- **SC-003**: The design utilizes modern CSS techniques (shadows, border-radius, gradients) to break up the "empty" background space.

## Assumptions

- We will continue to use the established `tokens.css` colors but may introduce modern CSS features (like `box-shadow` or `linear-gradient` using the tokens) to add depth and personality.
