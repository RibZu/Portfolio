# Tasks: Complete Portfolio Redesign

**Feature**: `008-complete-portfolio-redesign`
**Branch**: `008-complete-portfolio-redesign`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Contracts**: [ui-contracts.md](./contracts/ui-contracts.md)
**Date**: 2026-09-21

> No tests were requested. Tasks are implementation-only.

---

## Phase 1: Setup

**Purpose**: Verify the working environment and confirm no external assets are blocking the redesign.

- [x] T001 Confirm dev server runs cleanly with `npm run dev` from repo root `h:/Portfolio` and the page loads at `http://localhost:5173`
- [x] T002 Confirm `npm run build` exits with code 0 (clean baseline before any changes)

**Checkpoint**: Dev server and build are green. Ready to begin component changes.

---

## Phase 2: Foundational

**Purpose**: Establish that the shared design token system (`src/index.css`) does not need any changes. This is a read-only verification — no tokens are added or modified.

- [x] T003 Verify in `src/index.css` that `--code-bg`, `--accent`, `--accent-bg`, `--accent-border`, `--glass-bg`, `--border`, `--bg`, `--text`, `--text-h` are all defined at `:root` — no modifications required, this is a verification step only

**Checkpoint**: Token system confirmed. All components can be built against existing tokens without adding new ones.

---

## Phase 3: User Story 2 — Navbar Redesign (Priority: P1)

**Goal**: Replace the Japanese art background image on the navbar with a CSS gradient glass effect, while preserving the pill shape, sticky behavior, and all navigation functionality.

**Independent Test** (from quickstart.md S2): Open DevTools, inspect `header::before` pseudo-element — `background-image` must be `none` or absent; a gradient must be shown. Pill shape and blur still present. Mobile toggle works at 991px.

### Implementation for User Story 2

- [x] T004 [US2] In `src/components/Header.module.css`, locate the `.header::before` rule and remove `background-image: url('../assets/japanese-art-bg.jpg')`. Replace with `background-image: linear-gradient(135deg, rgba(216,180,226,0.06) 0%, rgba(15,16,21,0.92) 100%)`. Keep `background-size`, `background-position`, and `filter: blur(10px)` properties intact.

**Checkpoint**: Reload `http://localhost:5173`. Navbar must show no image behind the glass, only a subtle purple-tinted dark gradient. Pill shape, sticky, and mobile toggle must work.

---

## Phase 4: User Story 4 — Skills Terminal Redesign (Priority: P2)

**Goal**: Change the terminal window background from pure black to `var(--code-bg)` and update prompt and cursor colors to use the accent palette.

**Independent Test** (from quickstart.md S4): DevTools computed style on `.terminalWindow` must show `background-color: rgb(28, 29, 38)` (not `rgb(12,12,12)`). Command user text must appear purple/lavender. Skill names remain green.

### Implementation for User Story 4

- [x] T005 [US4] In `src/components/Skills.module.css`, change `.terminalWindow` `background-color` from `#0c0c0c` to `var(--code-bg)`
- [x] T006 [US4] In `src/components/Skills.module.css`, change `.terminalWindow` `border` from `1px solid #333` to `1px solid rgba(216,180,226,0.15)`
- [x] T007 [US4] In `src/components/Skills.module.css`, change `.commandUser` `color` from `#55ff55` to `var(--accent)`
- [x] T008 [US4] In `src/components/Skills.module.css`, change `.cursor` `background-color` from `#fff` to `var(--accent)`

**Checkpoint**: Scroll to Skills section. Terminal must have a dark blue-gray background (not black). User label is purple. Skill names still green. Cursor blinks in purple.

---

## Phase 5: User Story 3 — ProjectCard Redesign (Priority: P2)

**Goal**: Replace the light Notion-style cards with dark-surface cards that fit the site palette. Remove the Mac window chrome (red/yellow/green dots).

**Independent Test** (from quickstart.md S3): No white/light-background cards visible. No Mac dots. Project title, description, badges, and links all readable. Tech badges use purple accent. Hover lifts the card.

### Implementation for User Story 3

- [x] T009 [US3] In `src/components/ProjectCard.jsx`, remove lines 19–23 (the entire `<div className={styles.macTitleBar}>...</div>` block including its three `<span className={styles.macDot}>` children)
- [x] T010 [US3] In `src/components/ProjectCard.module.css`, update `.projectCard`: set `background-color` to `var(--code-bg)`, `border` to `1px solid var(--border)`, `border-radius` to `12px`, `box-shadow` to `0 2px 8px rgba(0,0,0,0.3)`
- [x] T011 [US3] In `src/components/ProjectCard.module.css`, update `.projectCard::before`: remove the `background: rgba(255,255,255,0.95)` rule; replace with `background: rgba(216,180,226,0.04)` (subtle accent glow on hover)
- [x] T012 [US3] In `src/components/ProjectCard.module.css`, update `.projectCard:hover`: change `box-shadow` to `0 8px 24px rgba(0,0,0,0.4)` and add `border-color: var(--accent-border)`; remove the `perspective/rotateX` transform, replace with `translateY(-4px)`
- [x] T013 [US3] In `src/components/ProjectCard.module.css`, update `.projectImageContainer`: change `background` from `#f7f7f5` to `var(--border)` (dark placeholder)
- [x] T014 [US3] In `src/components/ProjectCard.module.css`, update `.projectImagePlaceholder`: change `background` from `#f7f7f5` to `var(--border)`
- [x] T015 [US3] In `src/components/ProjectCard.module.css`, update `.projectContent`: remove `background-color: #ffffff`; set `background-color: transparent`
- [x] T016 [US3] In `src/components/ProjectCard.module.css`, update `.projectTitle`: change `color` from `#37352f` to `var(--text-h)`
- [x] T017 [US3] In `src/components/ProjectCard.module.css`, update `.projectDescription`: change `color` from `#787774` to `var(--text)`
- [x] T018 [US3] In `src/components/ProjectCard.module.css`, update `.techBadge`: change `background-color` from `rgba(227,226,224,0.5)` to `rgba(216,180,226,0.12)`; change `color` from `#37352f` to `var(--accent)`; change `border` from `1px solid transparent` to `1px solid rgba(216,180,226,0.2)`
- [x] T019 [US3] In `src/components/ProjectCard.module.css`, update `.techBadgeMore`: change `color` from `#787774` to `var(--text)`; change `border` to `1px solid var(--border)`; keep `background: transparent`
- [x] T020 [US3] In `src/components/ProjectCard.module.css`, update `.projectLink`: change `color` from `#37352f` to `var(--text-h)`; update hover rule: `color: var(--accent)`, `background-color: rgba(216,180,226,0.08)`
- [x] T021 [US3] In `src/components/ProjectCard.module.css`, remove the `.macTitleBar`, `.macDot`, `.macRed`, `.macYellow`, `.macGreen` CSS rules entirely (lines 152–178)

**Checkpoint**: Project cards display with dark background, no Mac dots, purple accent badges, readable text on dark. Hover lifts smoothly with accent border.

---

## Phase 6: User Story 5 — Background Section Redesign (Priority: P3)

**Goal**: Condense the Background section into a two-tier layout: work/education entries as compact left-bar timeline cards, certifications as pill tags. Remove the zigzag timeline.

**Independent Test** (from quickstart.md S5): Work/education entries render as compact cards with a colored left bar. Certification entries (FCE, React, Golang, SQL) render as small pill tags in a horizontal row, NOT as full cards. Section fits in significantly less vertical space.

### Implementation for User Story 5

- [x] T022 [US5] In `src/components/Background.jsx`, split entries by type: `mainEntries` (work/education) and `certEntries` (certifications)
- [x] T023 [US5] In `src/components/Background.jsx`, add experienceSubheading h3 before the experience list
- [x] T024 [US5] In `src/components/Background.jsx`, use `mainEntries.map(...)` in the experience list (excludes certifications)
- [x] T025 [US5] In `src/components/Background.jsx`, add certifications pill section after the experience list
- [x] T026 [US5] In `src/components/Background.module.css`, remove vertical line `::before` and zigzag `@media` block; simplify `.experienceList` to flex column
- [x] T027 [US5] In `src/components/Background.module.css`, update `.experienceItem`: 100% width, left accent bar (`border-left: 3px solid var(--accent)`), rounded right corners
- [x] T028 [US5] In `src/components/Background.module.css`, remove `.experienceItem::before` dot rule entirely
- [x] T029 [US5] In `src/components/Background.module.css`, add `.experienceSubheading`, `.certificationsSection`, `.certificationsTitle`, `.certificationsPills`, `.certPill` styles
- [x] T030 [US5] In `src/components/Background.module.css`, update `.languageItem` border to `var(--accent-border)`

**Checkpoint**: Background section renders in two distinct tiers. Work/education entries show as compact cards with a purple left border. FCE, React Course, Golang, SQL appear as small pill tags in a single horizontal row. Section takes significantly less vertical space than before.

---

## Phase 7: User Story 6 — Contact Section Redesign (Priority: P3)

**Goal**: Replace the plain bordered contact card with a gradient accent container and pill-shaped primary CTA.

**Independent Test** (from quickstart.md S6): Contact container has a visible gradient and purple border. "Email Me" button is pill-shaped with accent background. All three links (email, GitHub, LinkedIn) work.

### Implementation for User Story 6

- [x] T031 [US6] In `src/components/Contact.module.css`, update `.content`: gradient background, accent border, `border-radius: 16px`, `max-width: 480px`
- [x] T032 [US6] In `src/components/Contact.module.css`, update `.primaryButton`: `border-radius: 9999px`, `font-weight: 600`
- [x] T033 [US6] In `src/components/Contact.module.css`, add `.title::after` accent underline (40px wide, 2px tall, accent color)

**Checkpoint**: Contact section shows a gradient container with a purple/accent border. "Email Me" button is a pill shape. Title has a small accent underline. GitHub and LinkedIn buttons are unchanged and functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, responsive check, reduced motion, and accessibility pass.

- [x] T034 [P] In `src/components/TechFilter.module.css`, reviewed all colors — uses design tokens only, no hardcoded light values. No changes required.
- [x] T035 [P] `npm run build` exits with code 0 — build clean, no errors. CSS 18.84 kB gzip 4.37 kB.
- [ ] T036 Run `npm run dev` and perform the responsive check from quickstart.md S7: verify all sections at 375px, 768px, 1024px, and 1280px widths with no horizontal overflow or broken layout
- [ ] T037 In Chrome DevTools → Rendering → enable `prefers-reduced-motion: reduce` and confirm no new animations play in Skills, Contact, or Background sections (quickstart.md S8)
- [ ] T038 [P] Verify color contrast for the updated tech badges (quickstart.md S9): `var(--accent)` (`#d8b4e2`) on `rgba(216,180,226,0.12)` over `var(--code-bg)` (`#1c1d26`) — use DevTools Accessibility panel or WebAIM checker; must meet 4.5:1

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1
- **Phases 3–7 (User Stories)**: All depend on Phase 2; can be done sequentially or in parallel since each targets different files
- **Phase 8 (Polish)**: Depends on all story phases being complete

### User Story Dependencies

- **US2 — Navbar** (T004): Isolated CSS-only change. No dependencies on other stories.
- **US4 — Skills** (T005–T008): Isolated CSS-only changes. No dependencies on other stories.
- **US3 — ProjectCard** (T009–T021): JSX + CSS changes. No dependencies on other stories.
- **US5 — Background** (T022–T030): JSX + CSS changes. No dependencies on other stories.
- **US6 — Contact** (T031–T033): CSS-only changes. No dependencies on other stories.

### Parallel Opportunities

All user story phases (Phases 3–7) target different source files and can be worked in parallel:

```
Phase 3 (Navbar) — Header.module.css
Phase 4 (Skills) — Skills.module.css           ← all in parallel
Phase 5 (Cards)  — ProjectCard.jsx + .module.css
Phase 6 (Bg)     — Background.jsx + .module.css
Phase 7 (Contact)— Contact.module.css
```

Within Phase 5 (ProjectCard), tasks T010–T021 all target `ProjectCard.module.css` — these must be done sequentially in a single editing session.

---

## Implementation Strategy

### MVP First (Navbar + Cards — most visible)

1. Complete Phase 1 + Phase 2 (verification, ~5 min)
2. Complete Phase 3 (Navbar — T004): 1 CSS line change
3. Complete Phase 4 (Skills — T005–T008): 4 CSS line changes
4. Complete Phase 5 (ProjectCard — T009–T021): most impactful visual change
5. **STOP and VALIDATE**: Reload page, verify navbar, skills, and cards look correct
6. Continue with Phases 6–8

### Full Sequential Delivery

1. Setup → 2. Foundational → 3. Navbar → 4. Skills → 5. ProjectCard → 6. Background → 7. Contact → 8. Polish

---

## Notes

- `[P]` tasks target different files and can run in parallel
- `[Story]` label maps each task to its user story for traceability
- Hero section (`Hero.jsx`, `Hero.module.css`) is **NOT modified** — do not touch these files
- `src/assets/japanese-art-bg.jpg` is **NOT deleted** — it is only dereferenced from `Header.module.css`
- All changes use existing CSS custom properties from `src/index.css` — no new colors introduced
- Run `npm run dev` before starting and keep it open to see changes live
