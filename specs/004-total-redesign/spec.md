# Feature Specification: Total Portfolio Redesign (Recruiter Focus)

**Feature Branch**: `[004-total-redesign]`

**Created**: 2026-09-21

**Status**: Approved

**Input**: User description: "quiero un redisenio total de la pagina usando los mismos colores buscando atraer lo mas posible a los recludatores usa todas las tecnicas posibles y quiero que lo hgamos juntos"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - "High-Level Engineering" Split Hero Section (Priority: P1)
The Hero section must be redesigned into a split layout. The left side will feature impactful, professional typography conveying the developer's identity, while the right side will feature an abstract visual element (geometric shapes, code abstract) using the established color palette tokens to create a strong "Software Engineer" first impression.

**Independent Test**: Verify that the Hero is divided into two distinct halves on desktop and stacks elegantly on mobile, with micro-animations upon page load.

### User Story 2 - Interactive Timeline for Background (Priority: P2)
The background/experience section must be transformed into an interactive vertical timeline. As the recruiter scrolls down, timeline nodes and experience cards should animate into view softly.

**Independent Test**: Scroll through the background section and observe the timeline rendering correctly with scroll-triggered reveal animations.

### User Story 3 - Micro-Animations and 3D Floating Cards (Priority: P3)
Across the entire site (Skills, Projects), elements must utilize micro-animations. Project cards should have a subtle 3D floating effect on hover, and sections should softly reveal themselves as they enter the viewport.

**Independent Test**: Hover over project cards to verify the 3D lift effect. Reload the page and scroll to verify elements fade/slide in smoothly.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST redesign `Hero.jsx` using a CSS Grid/Flex split layout (1fr 1fr on desktop).
- **FR-002**: System MUST implement an abstract visual/SVG on the right side of the Hero using the blue tokens.
- **FR-003**: System MUST redesign `Background.jsx` into a vertical timeline structure (e.g., a central line with dots connecting to experience cards).
- **FR-004**: System MUST implement scroll-reveal micro-animations for main sections (using `IntersectionObserver` or simple CSS animations on load if observer is too complex for vanilla React).
- **FR-005**: System MUST implement 3D floating hover states on `ProjectCard.jsx`.
- **FR-006**: System MUST maintain the existing `tokens.css` color palette.

## Success Criteria *(mandatory)*
- **SC-001**: Lighthouse performance score > 90 (animations must be CSS-based and performant).
- **SC-002**: The layout is fully responsive, ensuring the split Hero and timeline adapt to a single column on mobile screens.
