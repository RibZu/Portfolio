# Implementation Tasks: Portfolio Redesign

**Feature**: [002-portfolio-redesign]
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Remove `react-bootstrap` and `bootstrap` from `package.json` dependencies and run `npm install`
- [x] T002 Remove Bootstrap imports from `src/styles/app.css`
- [x] T003 Create global layout and reset in `src/styles/globals.css` (and import it in `app.css` or `main.jsx`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Define reusable typography, layout, and spacing utility classes in `src/styles/app.css` mapping to `tokens.css` to act as the base layout system.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Remove Bootstrap and Establish Custom Layout System (Priority: P1) ⭐ MVP

**Goal**: The portfolio must operate independently of Bootstrap, relying entirely on a modern custom layout system (Flexbox/Grid) while preserving the established color palette tokens.

**Independent Test**: Can be fully tested by verifying that `react-bootstrap` and `bootstrap` are uninstalled, yet the application still compiles and renders a basic structured layout.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create `src/components/Header.module.css`
- [x] T006 [P] [US1] Rewrite `src/components/Header.jsx` to remove all `react-bootstrap` components (`Navbar`, `Nav`, `Container`) and use standard HTML with CSS Modules for the sticky header and language switcher.
- [x] T007 [P] [US1] Create `src/components/Hero.module.css`
- [x] T008 [P] [US1] Rewrite `src/components/Hero.jsx` to remove `Container`, `Row`, `Col` and use a CSS grid/flexbox layout.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Professional Typography and Spacing Redesign (Priority: P2)

**Goal**: The text content across all sections must be styled with professional typography, generous whitespace, and clear visual hierarchy.

**Independent Test**: Can be fully tested by verifying that headings stand out clearly from body text, sections have consistent padding, and the content is highly legible.

### Implementation for User Story 2

- [x] T009 [P] [US2] Create `src/components/Skills.module.css`
- [x] T010 [P] [US2] Rewrite `src/components/Skills.jsx` to remove `react-bootstrap` components. **Crucial**: Omit the rendering of technology `blurb` descriptions to achieve the requested minimalist design; only render names/icons.
- [x] T011 [P] [US2] Create `src/components/Background.module.css`
- [x] T012 [P] [US2] Rewrite `src/components/Background.jsx` to remove `react-bootstrap` and implement a clean, text-focused vertical layout for the experience items.
- [x] T013 [P] [US2] Create `src/components/Contact.module.css`
- [x] T014 [P] [US2] Rewrite `src/components/Contact.jsx` to remove `react-bootstrap` and implement generous padding and clear typography for contact links.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Modern Card and Interactive Element Styling (Priority: P3)

**Goal**: The Projects and Experience sections must use a highly polished, custom card design with subtle hover effects, refined borders, and modern interactive feedback.

**Independent Test**: Can be fully tested by hovering over project cards and technology filters to observe smooth, deliberate interactive states.

### Implementation for User Story 3

- [x] T015 [P] [US3] Create `src/components/ProjectCard.module.css` defining modern, subtle hover effects, transitions, and polished borders.
- [x] T016 [US3] Rewrite `src/components/ProjectCard.jsx` to remove `react-bootstrap` (`Card`, `Badge`) and use native HTML mapping to the new module styles.
- [x] T017 [P] [US3] Rewrite `src/components/TechFilter.jsx` to use native buttons with custom active/inactive states instead of `react-bootstrap` components.
- [x] T018 [P] [US3] Create `src/components/Projects.module.css`
- [x] T019 [US3] Rewrite `src/components/Projects.jsx` to remove `react-bootstrap` (`Container`, `Row`, `Col`) and implement a custom responsive grid (`display: grid`) that adapts from 1 to multiple columns.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T020 [P] Run `npm run build` to verify Lighthouse/build performance and ensure 0 errors.
- [x] T021 Manual verification of responsive layout (mobile to desktop) checking for horizontal scrolling.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can proceed sequentially (US1 -> US2 -> US3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- Module CSS creation and JSX rewrites can be done in parallel across components.

---

## Implementation Strategy

### Incremental Delivery

1. Complete Setup + Foundational -> Bootstrap removed, layout basis set.
2. Add User Story 1 (Header/Hero) -> Navigation and landing work independently.
3. Add User Story 2 (Skills/Background/Contact) -> Text-heavy sections are refactored to minimalist style without blurbs.
4. Add User Story 3 (Projects) -> Interactive cards are polished and responsive.
5. Each story adds value without breaking previous stories.
