# Tasks: Unified Visual Identity — Full Portfolio Redesign

**Feature**: `009-unified-visual-identity`
**Branch**: `009-unified-visual-identity`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Contracts**: [contracts/ui-contracts.md](./contracts/ui-contracts.md)
**Date**: 2026-09-21

> No tests were requested. Tasks are implementation-only.
> **Hero section is FROZEN** — `Hero.jsx` and `Hero.module.css` must NOT be touched.

---

## Phase 1: Setup

**Purpose**: Verify baseline before any changes.

- [X] T001 Confirm `npm run build` exits with code 0 from `h:/Portfolio` (clean baseline)
- [X] T002 Confirm `npm run dev` serves the page at `http://localhost:5173` without errors

**Checkpoint**: Build and dev server are green.

---

## Phase 2: Foundational — Design System Tokens + Utilities

**Purpose**: Establish the design system in `src/index.css`. This phase BLOCKS all component work — every subsequent task depends on these tokens and classes existing.

- [X] T003 In `src/index.css`, add `--surface: #13141a;` to the `:root` block, after `--bg: #0f1015;`
- [X] T004 In `src/index.css`, add `--border-subtle: rgba(255,255,255,0.06);` to the `:root` block, after `--border: #2a2b36;`
- [X] T005 In `src/index.css`, add the `.section-label` utility class after the existing `.section-title` rule:
  ```css
  .section-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
    margin-bottom: 8px;
  }
  ```
- [X] T006 In `src/index.css`, add the `.section-heading` utility class after `.section-label`:
  ```css
  .section-heading {
    font-family: var(--font-family-display);
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 700;
    color: var(--text-h);
    margin: 0 0 var(--spacing-6) 0;
    letter-spacing: -0.02em;
    position: relative;
    padding-bottom: 12px;
  }
  .section-heading::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
  }
  ```

**Checkpoint**: Run `npm run dev`. Check DevTools → `:root` shows `--surface` and `--border-subtle`. Classes `.section-label` and `.section-heading` exist in the computed styles panel when applied to any element.

---

## Phase 3: User Story 2 — Navbar: Ball + Language Switch Relocation (Priority: P1)

**Goal**: The header pill contains a continuously animated bouncing ball and only 4 nav links. The language switch is moved to a fixed corner element outside the pill.

**Independent Test** (quickstart.md S2–S3): Ball visible and bouncing in pill. Pill has exactly 4 links. Language switch pill is in top-right corner. Header background is solid `var(--surface)` — no blur or gradient.

### Implementation for User Story 2

- [X] T007 [US2] Create `src/components/LanguageSwitch.jsx` with the following content:
  ```jsx
  import React from 'react';
  import { currentLanguage, setLanguagePreference, getOppositePath } from '../lib/language.js';
  import styles from './LanguageSwitch.module.css';

  export default function LanguageSwitch() {
    const switchLang = currentLanguage === 'es' ? 'en' : 'es';
    const oppositePath = getOppositePath();
    const switchLabel = switchLang === 'en' ? 'EN' : 'ES';
    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    const handleClick = () => {
      setLanguagePreference(switchLang);
    };

    return (
      <a
        href={`${oppositePath}${hash}`}
        onClick={handleClick}
        className={styles.langSwitch}
        aria-label={switchLang === 'en' ? 'Switch to English' : 'Cambiar a Español'}
      >
        {switchLabel}
      </a>
    );
  }
  ```

- [X] T008 [US2] Create `src/components/LanguageSwitch.module.css` with the following content:
  ```css
  .langSwitch {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999;
    padding: 4px 12px;
    border: 1px solid var(--border);
    border-radius: 9999px;
    background: var(--surface);
    color: var(--text);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
    line-height: 1.5;
  }

  .langSwitch:hover,
  .langSwitch:focus-visible {
    border-color: var(--accent-border);
    color: var(--accent);
    text-decoration: none;
    outline: none;
  }

  .langSwitch:focus-visible {
    box-shadow: 0 0 0 2px var(--accent-border);
  }
  ```

- [X] T009 [US2] In `src/App.jsx`, import `LanguageSwitch` and render it as a direct sibling before `<Header />`:
  ```jsx
  import LanguageSwitch from './components/LanguageSwitch';
  // ...
  return (
    <>
      <LanguageSwitch />
      <Header />
      <main>...</main>
    </>
  );
  ```

- [X] T010 [US2] In `src/components/Header.jsx`, remove the language-switch related code and add the ball span. Replace the entire file content with:
  ```jsx
  import React, { useState } from 'react';
  import styles from './Header.module.css';
  import { t } from '../lib/content.js';
  import { ui } from '../data/ui.js';

  export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <header className={`${styles.header} ${isMenuOpen ? styles.headerOpen : ''}`}>
        <span className={styles.ball} aria-hidden="true" />
        <div className={`container ${styles.container}`}>
          <button
            className={styles.toggle}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.toggleIcon}></span>
          </button>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li><a href="#skills" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navSkills)}</a></li>
              <li><a href="#projects" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navProjects)}</a></li>
              <li><a href="#background" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navBackground)}</a></li>
              <li><a href="#contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>{t(ui.navContact)}</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  ```

- [X] T011 [US2] Rewrite `src/components/Header.module.css` completely with the following content (removes `::before`/`::after` blur, adds solid `--surface` background, adds ball keyframes):
  ```css
  .header {
    position: sticky;
    top: 20px;
    z-index: 1000;
    border: 1px solid var(--border);
    border-radius: 50px;
    margin: 0 auto 20px auto;
    max-width: 800px;
    padding: var(--spacing-3) 0;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    background: var(--surface);
    transition: border-radius 0.3s ease;
  }

  /* Bouncing ball */
  .ball {
    position: absolute;
    top: 50%;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 6px var(--accent), 0 0 14px rgba(216, 180, 226, 0.4);
    pointer-events: none;
    --ball-travel: calc(min(100vw - 60px, 770px));
    animation: ballBounce 3s ease-in-out infinite alternate;
    will-change: transform;
    transform: translateX(10px) translateY(-50%);
  }

  @keyframes ballBounce {
    from { transform: translateX(10px) translateY(-50%); }
    to   { transform: translateX(var(--ball-travel)) translateY(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ball {
      animation: none;
      opacity: 0.4;
      transform: translateX(10px) translateY(-50%);
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--spacing-2);
    position: absolute;
    left: 0;
  }

  .toggleIcon {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--text-h);
    position: relative;
  }

  .toggleIcon::before,
  .toggleIcon::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--text-h);
    left: 0;
  }

  .toggleIcon::before { top: -6px; }
  .toggleIcon::after  { bottom: -6px; }

  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .navList {
    list-style: none;
    display: flex;
    gap: var(--spacing-5);
    margin: 0;
    padding: 0;
    justify-content: center;
  }

  .navLink {
    color: var(--text);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 1px;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .navLink:hover,
  .navLink:focus-visible {
    color: var(--accent);
    text-decoration: none;
  }

  @media (max-width: 991px) {
    .toggle { display: block; }

    .nav {
      display: none;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      padding-top: var(--spacing-4);
      gap: var(--spacing-4);
    }

    .navOpen { display: flex; }

    .navList {
      flex-direction: column;
      gap: var(--spacing-3);
      width: 100%;
      padding: 0 var(--spacing-4);
    }

    .headerOpen {
      border-radius: 24px;
    }

    .ball { display: none; }
  }
  ```

**Checkpoint**: The header shows a glowing purple ball bouncing left-to-right inside the pill. The pill has 4 nav links only. A small "ES"/"EN" pill floats in the top-right corner. Header background is `#13141a` (solid, no blur or image). Enable `prefers-reduced-motion` → ball stops.

---

## Phase 4: User Story 1 — Visual Cohesion (Priority: P1)

**Goal**: Apply the unified section heading pattern (`.section-label` + `.section-heading`) to all 4 non-Hero sections. This delivers the single most visible improvement in cohesion.

**Independent Test** (quickstart.md S4): Scroll Skills → Projects → Background → Contact. Every section has the same small uppercase label above the large title with an accent underline.

### Implementation for User Story 1

- [X] T012 [US1] In `src/components/Skills.jsx`, replace the hidden `h2` (line 18) and restructure the section heading. Change:
  ```jsx
  {/* Visually hide the heading but keep it for screen readers/structure */}
  <h2 className="section-title" style={{ display: 'none' }}>{t(ui.headingSkills)}</h2>
  ```
  to:
  ```jsx
  <span className="section-label">{currentLanguage === 'es' ? 'Tecnologías' : 'Technologies'}</span>
  <h2 className="section-heading">{t(ui.headingSkills)}</h2>
  ```
  Also add `import { currentLanguage } from '../lib/language.js';` to the imports if not already present.

- [X] T013 [US1] In `src/components/Projects.jsx`, replace the plain `<h2>` (line 22) with the unified heading pattern. Change:
  ```jsx
  <h2>{t(ui.headingProjects || ui.navProjects)}</h2>
  ```
  to:
  ```jsx
  <span className="section-label">{currentLanguage === 'es' ? 'Proyectos' : 'Projects'}</span>
  <h2 className="section-heading">{t(ui.headingProjects || ui.navProjects)}</h2>
  ```
  Also add `import { currentLanguage } from '../lib/language.js';` to the imports if not already present. Wrap both elements in the existing `<section>` — they sit directly inside `<section>` before `<TechFilter>`. Add `className="container"` to the section or wrap the heading in `<div className="container">` if not already wrapped.

- [X] T014 [US1] In `src/components/Background.jsx`, replace the existing `<h2 className="section-title">` inside `styles.header` div with the unified pattern. Remove the `styles.header` flex row that put the h2 and LinkedIn button side by side. New structure:
  ```jsx
  <span className="section-label">{currentLanguage === 'es' ? 'Trayectoria' : 'Background'}</span>
  <h2 className="section-heading">{t(ui.headingBackground)}</h2>
  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
    LinkedIn <span className={styles.srOnly}>{t(ui.externalLink)}</span>
  </a>
  ```
  The LinkedIn button now appears below the heading, not beside it.

- [X] T015 [US1] In `src/components/Contact.jsx`, replace the `<h2 className={styles.title}>` with the unified heading pattern. Change:
  ```jsx
  <h2 className={styles.title}>{t(ui.headingContact)}</h2>
  ```
  to:
  ```jsx
  <span className="section-label">{currentLanguage === 'es' ? 'Contacto' : 'Contact'}</span>
  <h2 className="section-heading">{t(ui.headingContact)}</h2>
  ```
  Also add `import { currentLanguage } from '../lib/language.js';` to the imports if not already present.

**Checkpoint**: Reload the page. Every section (Skills, Projects, Background, Contact) shows a small purple uppercase label above a large white title with a 2px purple underline on the left. All four headings look visually identical in structure.

---

## Phase 5: User Story 4 — Skills Terminal: Harmonised Palette (Priority: P2)

**Goal**: Remove all out-of-palette green values from the terminal. Terminal dots, skill names, and badges all use the unified token set.

**Independent Test** (quickstart.md S5): Terminal dots are purple-tinted (not red/yellow/green). Skill names are white. `[verified]` badge is accent purple. `[learning]` badge is grey.

### Implementation for User Story 4

- [X] T016 [P] [US4] In `src/components/Skills.module.css`, update terminal dot colours. Find the three `.terminalDot` rules (or the single rule if dots share a class) and update:
  - First dot: `background: var(--accent)`
  - Second dot: `background: rgba(216,180,226,0.4)`
  - Third dot: `background: rgba(216,180,226,0.2)`
  If dots use a single `.terminalDot` class, add `:nth-child(2)` and `:nth-child(3)` selectors for the 2nd and 3rd.

- [X] T017 [P] [US4] In `src/components/Skills.module.css`, change `.terminalWindow` border from `1px solid rgba(216,180,226,0.15)` to `1px solid var(--border-subtle)`

- [X] T018 [P] [US4] In `src/components/Skills.module.css`, change `.skillName` colour from `#4af626` (green) to `var(--text-h)` and remove any `text-shadow` glow that references green colours

- [X] T019 [P] [US4] In `src/components/Skills.module.css`, change `.badgeDemonstrated` colour from `#00e5ff` (cyan) to `var(--accent)`

- [X] T020 [P] [US4] In `src/components/Skills.module.css`, change `.badgeDeclared` colour from `#888` to `var(--text)` (consistent with global body text token)

**Checkpoint**: Terminal dots are 3 shades of purple. Skill names are white. `[verified]` is lavender/purple. `[learning]` is grey. No cyan or green anywhere.

---

## Phase 6: User Story 3 — Projects: Unified Cards + Filter (Priority: P1)

**Goal**: Align project cards and the tech filter to the unified design system — `border-subtle` on cards, accent active state on filters.

**Independent Test** (quickstart.md S6): Card borders are barely visible (subtle). Active filter uses accent colour. Cards match the surface/border system.

### Implementation for User Story 3

- [X] T021 [P] [US3] In `src/components/ProjectCard.module.css`, change `.projectCard` border from `1px solid var(--border)` to `1px solid var(--border-subtle)`

- [X] T022 [P] [US3] In `src/components/TechFilter.module.css`, change `.filterBtn` border from `1px solid var(--color-border)` to `1px solid var(--border-subtle)`

- [X] T023 [P] [US3] In `src/components/TechFilter.module.css`, update `.filterBtn[aria-pressed="true"]`:
  - `background-color: var(--accent-bg)`
  - `border-color: var(--accent-border)`
  - `color: var(--accent)`

- [X] T024 [P] [US3] In `src/components/TechFilter.module.css`, update `.filterBtn:hover`:
  - `background-color: var(--surface)` (replaces any blue-tinted rgba)
  - `border-color: var(--border-subtle)`
  - `color: var(--text-h)`

- [X] T025 [US3] In `src/components/Projects.jsx`, wrap the `<section>` content in a `<div className="container">` if not already present, so the section-label + heading align with the rest of the page's container width.

**Checkpoint**: Cards have a barely-visible border on the dark background. Active filter chip is purple-tinted. Hovering filters shows subtle background change. All within the design system.

---

## Phase 7: User Story 5 — Background: Heading + Unified Styling (Priority: P2)

**Goal**: Apply unified borders and button styles to the Background section.

**Independent Test** (quickstart.md S7): LinkedIn button is a pill outline. Experience item borders are subtle. Sub-labels match `.section-label` style. Language pills have subtle border.

### Implementation for User Story 5

- [X] T026 [US5] In `src/components/Background.module.css`, update `.linkButton` to use the outline pill button pattern:
  ```css
  .linkButton {
    display: inline-block;
    padding: 6px 16px;
    border: 1px solid var(--border);
    border-radius: 9999px;
    color: var(--text-h);
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
    margin-bottom: var(--spacing-5);
    display: inline-block;
  }
  .linkButton:hover,
  .linkButton:focus-visible {
    border-color: var(--accent-border);
    color: var(--accent);
    text-decoration: none;
  }
  ```

- [X] T027 [US5] In `src/components/Background.module.css`, change `.experienceItem` border from `1px solid var(--border)` to `1px solid var(--border-subtle)` (keep `border-left: 3px solid var(--accent)` unchanged)

- [X] T028 [US5] In `src/components/Background.module.css`, change `.experienceItem:hover` `border-left-color` from `var(--text-h)` to `var(--accent-border)`

- [X] T029 [US5] In `src/components/Background.module.css`, change `.languageItem` border from `1px solid var(--accent-border)` to `1px solid var(--border-subtle)`

- [X] T030 [US5] In `src/components/Background.module.css`, update `.experienceSubheading` and `.certificationsTitle` to mirror `.section-label` styles:
  ```css
  .experienceSubheading,
  .certificationsTitle {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
    margin-bottom: var(--spacing-3);
    display: block;
  }
  ```

- [X] T031 [US5] In `src/components/Background.module.css`, remove or simplify `.header` flex row styles since the LinkedIn button now sits below the heading (not beside it) — update to:
  ```css
  .header {
    margin-bottom: var(--spacing-5);
  }
  ```

**Checkpoint**: LinkedIn is a pill outline button. Experience item borders are subtle. Sub-labels match the accent-purple label style. Section cohesion is clear.

---

## Phase 8: User Story 6 — Contact: Open Layout (Priority: P2)

**Goal**: Remove the gradient card container from Contact. Content sits directly on page background. Social buttons become outline pills.

**Independent Test** (quickstart.md S8): No bordered/gradient card visible. Email CTA is accent pill. GitHub/LinkedIn are outline pill buttons. Section-label above heading.

### Implementation for User Story 6

- [X] T032 [US6] In `src/components/Contact.jsx`, remove the `<div className={styles.content}>` wrapper div. The `emailWrapper` and `socialLinks` divs now sit directly inside the container. New JSX structure:
  ```jsx
  <section id="contact" className={`section ${styles.contactSection} reveal-hidden`} ref={revealRef}>
    <div className="container">
      <span className="section-label">{currentLanguage === 'es' ? 'Contacto' : 'Contact'}</span>
      <h2 className="section-heading">{t(ui.headingContact)}</h2>
      <div className={styles.contactBody}>
        <div className={styles.emailWrapper}>
          <a href={`mailto:${profile.email}`} className={styles.primaryButton}>
            Email Me
          </a>
          <p className={styles.emailText}>{profile.email}</p>
        </div>
        <div className={styles.socialLinks}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
            GitHub <span className={styles.srOnly}>{t(ui.externalLink)}</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
            LinkedIn <span className={styles.srOnly}>{t(ui.externalLink)}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
  ```

- [X] T033 [US6] Rewrite `src/components/Contact.module.css` completely:
  ```css
  .contactSection {
    background-color: transparent;
    text-align: center;
    border-top: 1px solid var(--border-subtle);
    padding: var(--spacing-8) 0;
    color: var(--text);
  }

  /* section-label and section-heading used via global classes */

  .contactBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-5);
    max-width: 400px;
    margin: 0 auto;
  }

  .emailWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3);
    width: 100%;
  }

  .primaryButton {
    display: inline-block;
    padding: var(--spacing-3) var(--spacing-6);
    background-color: var(--accent);
    color: var(--bg);
    border-radius: 9999px;
    font-size: var(--font-size-base);
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    width: 100%;
    max-width: 280px;
    text-align: center;
  }

  .primaryButton:hover,
  .primaryButton:focus-visible {
    opacity: 0.88;
    transform: translateY(-2px);
    text-decoration: none;
    color: var(--bg);
  }

  .emailText {
    color: var(--text);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    user-select: all;
    margin: 0;
  }

  .socialLinks {
    display: flex;
    gap: var(--spacing-3);
    justify-content: center;
    width: 100%;
    padding-top: var(--spacing-5);
    border-top: 1px solid var(--border-subtle);
  }

  .secondaryButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2) var(--spacing-5);
    background-color: transparent;
    border: 1px solid var(--border);
    color: var(--text-h);
    border-radius: 9999px;
    font-size: var(--font-size-sm);
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
  }

  .secondaryButton:hover,
  .secondaryButton:focus-visible {
    border-color: var(--accent-border);
    color: var(--accent);
    text-decoration: none;
  }

  .srOnly {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  ```

**Checkpoint**: Contact section has no card/border container. Email button is an accent pill. GitHub and LinkedIn are outline pill buttons. Heading uses section-label + section-heading pattern.

---

## Phase 9: Polish & Build Verification

- [X] T034 [P] In `src/components/Contact.module.css`, confirm `.title` and `.title::after` rules are removed (the `.section-heading` global class handles this now). Remove any orphaned `.title` rule if present.
- [X] T035 [P] In `src/components/Background.module.css`, confirm `.languagesTitle` styling is consistent with `.section-label` or replace it with the same values for consistency
- [X] T036 [P] Run `npm run build` — must exit with code 0, no errors
- [ ] T037 Perform full responsive check per quickstart.md S10 at 375px, 768px, 1024px, 1280px — verify no horizontal overflow and no broken layout at any breakpoint
- [ ] T038 Enable `prefers-reduced-motion: reduce` in DevTools → Rendering — verify ball animation pauses and no other new animations play
- [X] T039 [P] Verify color contrast: `var(--accent)` (`#d8b4e2`) used as text colour against `var(--bg)` (`#0f1015`) — must meet WCAG 4.5:1 (computed: ~5.8:1 ✅). Section-label text against page background — check in DevTools Accessibility panel.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS** all component phases
- **Phase 3–8 (User Stories)**: All depend on Phase 2. Within each phase, file order matters
- **Phase 9 (Polish)**: Depends on Phases 3–8 complete

### User Story Dependencies

| Story | Tasks | Depends on |
|-------|-------|------------|
| US2 — Navbar (P1) | T007–T011 | Phase 2 (needs `--surface` token + `--border-subtle`) |
| US1 — Cohesion/Headings (P1) | T012–T015 | Phase 2 (needs `.section-label`, `.section-heading`) |
| US4 — Skills (P2) | T016–T020 | Phase 2 (needs `--border-subtle`) |
| US3 — Projects (P1) | T021–T025 | Phase 2 (needs `--border-subtle`) |
| US5 — Background (P2) | T026–T031 | Phase 2 + T014 (heading already applied in T014) |
| US6 — Contact (P2) | T032–T033 | Phase 2 + T015 (heading already applied in T015) |

### Parallel Opportunities

After Phase 2 completes, Phases 3–8 are mostly parallel (different files):

```
Phase 3 — Header.jsx + Header.module.css + LanguageSwitch.*  + App.jsx
Phase 4 — Skills.jsx + Skills.module.css                    ← all parallel
Phase 5 — Skills.module.css (terminal dots/colors)          ← part of Phase 4
Phase 6 — ProjectCard.module.css + TechFilter.module.css    ← parallel
Phase 7 — Background.jsx + Background.module.css            ← parallel
Phase 8 — Contact.jsx + Contact.module.css                  ← parallel
```

---

## Implementation Strategy

### MVP (Most visible impact first)

1. Phase 2 (tokens + utilities) → 2. Phase 3 (navbar + ball) → 3. Phase 4 (headings on all sections)
4. **STOP AND VALIDATE**: the page already looks radically more cohesive at this point
5. Continue: Phase 5 (Skills) → Phase 6 (Projects) → Phase 7 (Background) → Phase 8 (Contact) → Phase 9 (Polish)

---

## Notes

- `Hero.jsx` and `Hero.module.css` are **FROZEN** — do not touch under any circumstances
- `src/data/` files are **FROZEN** — no data changes required
- The `--ball-travel` CSS custom property on `.ball` uses `min(100vw - 60px, 770px)` — this covers all viewport widths without JS
- The `animation-direction: alternate` on the ball means only two keyframe states needed (`from` / `to`) — simpler and cleaner than `0%/50%/100%`
- After T009 (App.jsx), the `currentLanguage`, `setLanguagePreference`, `getOppositePath` imports can be removed from `Header.jsx` since they move to `LanguageSwitch.jsx`
