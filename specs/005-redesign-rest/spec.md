# Feature Specification: Total Redesign Part 2 (Rest of the Sections)

**Feature Branch**: `[005-redesign-rest]`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "quiero que sigamos con el rediseno total del proyecto la animacion me gusto pero me sigue sin gustar la parte del header la de skills y rpoeyctos y contactos literalmente lo unico qu eme gusto es la animacion y la aprte de como eta mi nombre y demas mi desicpcion me parece muy larga nada mas pero fuera de eso no me gusta nada del rsto quiero que implementemos un redisenio totale en el resto para lograr atraer la atencion de los reclutadores"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Shorter Summary & Header Redesign (Priority: P1)
The user's summary in the Hero section must be significantly shortened for quicker reading by recruiters. The Header must be completely redesigned into a floating "pill" or island header at the top center of the screen, separated from the edges, feeling minimalist and modern.

**Independent Test**: Verify the summary is only 1-2 short sentences and the header has a completely new layout structure.

### User Story 2 - Skills Section Overhaul (Priority: P2)
The Skills section must be completely re-imagined from the pill-grid into a Terminal UI design. It will simulate a command-line interface with monospace text, achieving a "professional hacker/engineer" aesthetic.

**Independent Test**: Verify the Skills section uses the new chosen visual paradigm.

### User Story 3 - Projects & Contact Overhaul (Priority: P3)
The Projects cards and the Contact section must be redesigned into a "Notion-like" minimalist style: clean white cards, extremely subtle borders, and a high-productivity modern UI aesthetic. The 3D animation stays.

**Independent Test**: Verify Projects and Contact visually differ entirely from the previous iteration.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: `profile.js` summary MUST be reduced to a maximum of 2 sentences.
- **FR-002**: `Header.jsx` MUST be completely rebuilt to the new approved layout.
- **FR-003**: `Skills.jsx` MUST be completely rebuilt to the new approved layout.
- **FR-004**: `Projects.jsx` and `ProjectCard.jsx` MUST be completely rebuilt to the new approved layout while retaining scroll/hover animations.
- **FR-005**: `Contact.jsx` MUST be completely rebuilt.

## Success Criteria *(mandatory)*
- **SC-001**: All specified sections look entirely different from their V2/V3 iterations.
- **SC-002**: The portfolio retains extreme performance metrics (Lighthouse > 90) despite visual overhauls.

## Assumptions
- The animations introduced in 004 (scroll reveals and 3D hovers) will be retained and applied to the new structures.
- The `Background` (timeline) remains as is unless explicitly challenged by the user later, as it was not explicitly listed in their dislike list, though they said "nothing else". We will focus on the explicitly listed sections first.
