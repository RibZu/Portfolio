# Implementation Tasks: Total Portfolio Redesign

**Feature**: [004-total-redesign]
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `src/hooks/useScrollReveal.js` defining a custom React hook that uses `IntersectionObserver` to toggle a CSS class when an element enters the viewport.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Add base CSS animation classes (e.g., `.reveal-hidden`, `.reveal-visible`) to `src/styles/globals.css` to be used by the scroll reveal hook.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - "High-Level Engineering" Split Hero Section (Priority: P1) ⭐ MVP

**Goal**: Split layout with impactful typography on the left and an abstract visual on the right.

**Independent Test**: Verify Hero renders as a 1fr 1fr grid on desktop and stacks on mobile.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create SVG abstract engineering visual component or add it directly to `src/components/Hero.jsx`.
- [x] T004 [P] [US1] Update `src/components/Hero.module.css` to use a 2-column Grid/Flex layout (`grid-template-columns: 1fr 1fr`).
- [x] T005 [P] [US1] Refactor `src/components/Hero.jsx` markup to support the split layout, placing text content in the left column and the abstract visual in the right column.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Interactive Timeline for Background (Priority: P2)

**Goal**: Transform the background/experience section into an interactive vertical timeline.

**Independent Test**: Verify dots and lines connect experience items.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update `src/components/Background.module.css` to style a central vertical line, timeline dots, and alternating card placements (left/right or standard timeline).
- [x] T007 [P] [US2] Refactor `src/components/Background.jsx` to wrap experience items in the timeline HTML structure.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Micro-Animations and 3D Floating Cards (Priority: P3)

**Goal**: Apply scroll-reveal animations to all sections and add 3D hover effects to Project Cards.

**Independent Test**: Scroll down to see sections fade in; hover over projects to see 3D lift.

### Implementation for User Story 3

- [x] T008 [P] [US3] Update `src/components/ProjectCard.module.css` to enhance the hover state with a 3D effect (e.g., `transform: translateY(-10px) perspective(1000px) rotateX(2deg);` and deeper shadows).
- [x] T009 [P] [US3] Integrate the `useScrollReveal` hook into `Skills.jsx`, `Projects.jsx`, and `Contact.jsx` so these sections animate in on scroll.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T010 [P] Run `npm run build` to verify Lighthouse/build performance and ensure 0 errors.
- [x] T011 Manual verification of animations ensuring they respect `prefers-reduced-motion` in CSS.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup & Foundational**: Must complete first.
- **User Stories**: Can run in parallel.

### Parallel Opportunities

- T003, T004, T005 can run in parallel with T006, T007.
