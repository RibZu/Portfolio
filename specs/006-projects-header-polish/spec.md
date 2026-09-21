# Feature Specification: Header Alignment & MacOS Projects

**Feature Branch**: `[006-projects-header-polish]`

**Created**: 2026-09-21

**Status**: Approved

**Input**: User description: "quiero que mejores la dispocioon de los elemons en el header se ven al como desarolniados te doy la opcion para que lo arregles, aunque me gusta que este flotante, me gustaria qsi es posible al header agregarle una animacion o algo en el fondo que se va difuminado la parte de poryectos me sigue pareciendo horrible necesita un redisenio total"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Header Polish & Blurred Background (Priority: P1)
The floating pill header elements feel misaligned. The internal flexbox layout must be fixed so the navigation items and language switcher look perfectly balanced. Additionally, the header must have a strong blur/glassmorphism effect (backdrop-filter) and a subtle animation or background interaction.

**Independent Test**: Verify the header items are vertically and horizontally aligned, and scrolling over content produces a frosted glass blur effect on the header.

### User Story 2 - MacOS Window Style Projects (Priority: P2)
The Projects section must undergo a total redesign from the minimalist Notion style to a "MacOS Application Window" aesthetic. Each card will have a top title bar with the classic three window control dots (red, yellow, green), a distinctive layout, and retain its 3D hover animations.

**Independent Test**: Verify project cards visually resemble operating system windows rather than generic web cards.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: `Header.module.css` MUST be updated to fix alignment issues (likely removing arbitrary flex spacers or adjusting padding/gap).
- **FR-002**: `Header.module.css` MUST implement an intense `backdrop-filter: blur()` effect and a translucent background.
- **FR-003**: `ProjectCard.jsx` and `ProjectCard.module.css` MUST be completely redesigned to include a mock OS window title bar.
- **FR-004**: The Project cards MUST maintain the existing custom tokens and color palette.

## Success Criteria *(mandatory)*
- **SC-001**: The header navigation items have equal spacing and perfect vertical centering.
- **SC-002**: Project cards immediately evoke the feeling of a desktop application window.
