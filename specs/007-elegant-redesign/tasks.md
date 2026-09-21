# Implementation Tasks: Elegant Portfolio Redesign

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Find or generate the Japanese art background image and place it in `src/assets/japanese-art-bg.webp` (or equivalent assets folder)
- [x] T002 [P] Initialize global theme CSS variables in `src/styles/globals.css` (or equivalent global stylesheet) to prepare for non-white theme

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Update global CSS to remove stark white background colors and implement the new elegant dark/rich theme variables

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Recruiter Evaluates Portfolio Design (Priority: P1) ⭐ MVP

**Goal**: Apply an elegant, well-aligned, and visually striking theme across the portfolio without stark white backgrounds.

**Independent Test**: Can be independently tested by viewing the site and verifying that the stark white background is replaced with the new theme, and the overall layout looks elegant and cohesive.

### Implementation for User Story 1

- [x] T004 [US1] Apply new global theme variables to the main layout wrapper/container in `src/App.jsx` (or main layout component)
- [x] T005 [US1] Review and adjust general text contrast across the site to ensure WCAG 2.1 AA compliance against the new dark theme

**Checkpoint**: At this point, the global theme is applied and text is readable.

---

## Phase 4: User Story 2 - Elegant Glassmorphic Header with Japanese Art (Priority: P1)

**Goal**: Update the header to feature a blurred (glassmorphic) Japanese art background, with perfectly aligned elements, while retaining the current shape and name animation.

**Independent Test**: Can be tested by looking at the header to verify the glass effect over a Japanese art background, checking alignment, and ensuring the name animation remains untouched.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update `src/components/Header.module.css` (or equivalent) to set `src/assets/japanese-art-bg.webp` as the background image with `background-size: cover`
- [x] T007 [US2] Add the glassmorphic effect using `backdrop-filter: blur(10px)` and a semi-transparent background color in `src/components/Header.module.css`
- [x] T008 [US2] Refine flexbox/grid alignments in `src/components/Header.module.css` to ensure all elements are elegantly aligned
- [x] T009 [US2] Verify the existing name animation is unaffected in `src/components/Header.jsx` and its CSS (no changes should be made to the animation code)

**Checkpoint**: At this point, the header is fully redesigned with glassmorphism and the animation is preserved.

---

## Phase 5: User Story 3 - Revamped Contacts Section (Priority: P2)

**Goal**: Redesign the contacts section to make it highly appealing and professional for recruiters.

**Independent Test**: Can be tested by navigating to the contacts section and verifying it matches the new elegant theme and clearly presents contact methods.

### Implementation for User Story 3

- [x] T010 [P] [US3] Update `src/components/Contacts.module.css` (or equivalent) to align with the new elegant theme colors
- [x] T011 [US3] Refine the layout and typography of the Contacts section in `src/components/Contacts.jsx` and its CSS for a more professional, aligned look

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T012 Run a Lighthouse audit to confirm Performance score remains >= 90
- [x] T013 Verify alignment across mobile (375px) and desktop (1080px) viewports
- [x] T014 Run quickstart.md validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- Finding the image (T001) and initializing CSS variables (T002) can run in parallel.
- Header updates (US2) and Contacts updates (US3) can run in parallel since they modify different components.
