# Implementation Tasks: Header Alignment & MacOS Projects

**Feature**: [006-projects-header-polish]
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Header Alignment & Glassmorphism (Priority: P1) ⭐ MVP

- [x] T001 [P] [US1] Update `src/components/Header.jsx` to clean up the `.navSpacer` and flexbox wrappers that caused the misalignment.
- [x] T002 [P] [US1] Update `src/components/Header.module.css` to fix the flex gap/justification, and apply a strong `backdrop-filter: blur(12px)` with a slightly transparent background color so elements beneath it blur gracefully.

**Checkpoint**: Header is perfectly aligned and blurry.

---

## Phase 2: MacOS Projects (Priority: P2)

- [x] T003 [P] [US2] Update `src/components/ProjectCard.jsx` to inject a generic "title bar" `div` at the top of the card containing three span elements (the traffic light dots).
- [x] T004 [P] [US2] Update `src/components/ProjectCard.module.css` to style the title bar (grey gradient background, bottom border) and the red/yellow/green dots. 

**Checkpoint**: Projects look like mini applications.

---

## Phase 3: Polish & Cross-Cutting Concerns

- [x] T005 Run `npm run build` to verify Lighthouse/build performance and ensure 0 errors.
