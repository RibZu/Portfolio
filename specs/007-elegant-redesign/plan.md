# Implementation Plan: Elegant Portfolio Redesign

**Branch**: `[007-elegant-redesign]` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-elegant-redesign/spec.md`

## Summary

This plan outlines the total redesign of the portfolio to replace the stark white theme with an elegant, visually appealing aesthetic. It includes overhauling the header with a glassmorphic effect over a Japanese art background (while meticulously preserving the existing name animation), and completely redesigning the contacts section to maximize recruiter interest.

## Technical Context

**Language/Version**: HTML, CSS, JavaScript (React)

**Primary Dependencies**: Vite, React, CSS Modules

**Storage**: N/A

**Testing**: Visual regression and manual validation

**Target Platform**: Modern web browsers, deployed to Vercel (Hobby plan)

**Project Type**: Static web application (Portfolio)

**Performance Goals**: Lighthouse score >= 90, initial JS payload < 200kB

**Constraints**: No external UI frameworks (e.g., Bootstrap, Tailwind) allowed. Pure CSS/CSS Modules only.

**Scale/Scope**: Single page portfolio

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Simplicity First):** PASS. No new dependencies or abstractions are introduced. We are using standard CSS (`backdrop-filter`) for the requested effects.
- **Principle II (Static-First):** PASS. The project remains a purely static site built with Vite.
- **Principle III (Accessible by Default):** PASS. Color contrast will be checked to ensure AA compliance against the new backgrounds.
- **Principle IV (Performance Budget):** PASS. The Japanese art asset will be optimized (WebP) to maintain the Lighthouse score >= 90.
- **Principle V (Verifiable Changes):** PASS. Changes are visually verifiable across viewports as defined in `quickstart.md`.
- **Technology & Deployment Constraints:** PASS. We are adhering to Vite + React + CSS Modules without using Tailwind or Bootstrap.

## Project Structure

### Documentation (this feature)

```text
specs/007-elegant-redesign/
├── plan.md              # This file
├── research.md          # Research into glassmorphism and optimization
├── data-model.md        # Entities (CSS variables config)
└── quickstart.md        # How to validate the changes
```

### Source Code (repository root)

```text
# Single project structure
src/
├── components/
│   ├── Header.module.css
│   ├── Header.jsx
│   ├── Contacts.module.css
│   ├── Contacts.jsx
│   └── ...
├── assets/
│   └── japanese-art-bg.webp
└── styles/
    └── globals.css       # Where CSS variables for themes are defined
```

**Structure Decision**: The redesign will modify the existing `Header` and `Contacts` components (or equivalent) in the `src/` directory, update global CSS variables for the theme, and add a new optimized image asset.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*(No violations. Keeping simple CSS-based implementation.)*
