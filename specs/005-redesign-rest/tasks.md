# Implementation Tasks: Total Redesign Part 2

**Feature**: [005-redesign-rest]
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Foundational Updates

**Purpose**: Core data updates that must precede UI rendering.

- [x] T001 Shorten `summary` fields in `src/data/profile.js` to 1-2 impactful sentences for both English and Spanish.

---

## Phase 2: User Story 1 - Header Redesign (Priority: P1) ⭐ MVP

**Goal**: Floating island header

- [x] T002 [P] [US1] Update `src/components/Header.module.css` to create a floating pill layout (`border-radius: 50px`, `margin: 20px auto`, `box-shadow`, transparent backdrop filter).
- [x] T003 [P] [US1] Update `src/components/Header.jsx` to utilize the new floating island styles and ensure the mobile toggle works elegantly in this new shape.

**Checkpoint**: Header is floating and functional

---

## Phase 3: User Story 2 - Terminal UI Skills (Priority: P2)

**Goal**: Simulate a command-line interface with monospace text.

- [x] T004 [P] [US2] Update `src/components/Skills.module.css` to mimic a terminal (dark background, glowing text, monospace fonts, command prompt prefixes like `>`).
- [x] T005 [P] [US2] Refactor `src/components/Skills.jsx` to structure the skills list as if they were output from a terminal command (e.g. `> whoami --skills`).

**Checkpoint**: Skills looks like a hacker terminal

---

## Phase 4: User Story 3 - Notion-like Projects & Contact (Priority: P3)

**Goal**: Clean white cards, extremely subtle borders.

- [x] T006 [P] [US3] Update `src/components/ProjectCard.module.css` to use a Notion aesthetic (white/very light background, minimal 1px subtle borders, crisp typography) while retaining the 3D hover from the previous iteration.
- [x] T007 [P] [US3] Update `src/components/Contact.module.css` to match the Notion aesthetic.
- [x] T008 [P] [US3] Refactor `src/components/Contact.jsx` structure if necessary to fit the ultra-clean layout.

**Checkpoint**: Projects and Contact are minimalist and Notion-like

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Performance and styling verification

- [x] T009 Run `npm run build` to verify Lighthouse/build performance and ensure 0 errors.

---

## Dependencies & Execution Order

- **Phase 1** can be done immediately.
- **Phases 2, 3, and 4** can run in parallel since they touch completely independent components and CSS modules.
