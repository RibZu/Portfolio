# Implementation Plan: Portfolio Personality and Polish

**Branch**: `[003-portfolio-personality]` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

## Summary
Refining the personal data (shortening name, removing location/availability), tweaking the header layout for centered navigation, and injecting modern visual personality into the Skills and Projects sections using advanced CSS techniques (shadows, gradients, pill-tags) while staying within the custom CSS Modules architecture.

## Technical Context
**Language/Version**: JavaScript (React), HTML, CSS Modules
**Target Platform**: Web (Vercel Static)

## Constitution Check
- **I. Simplicity First**: PASS. Using standard CSS to add visual flair without new dependencies.
- **II. Static-First**: PASS.
- **III. Accessible by Default**: PASS. Will ensure new visual elements maintain contrast.
- **IV. Performance Budget**: PASS.

## Project Structure
```text
src/
├── components/
│   ├── Header.jsx (Update layout)
│   ├── Header.module.css (Update flexbox)
│   ├── Hero.jsx (Remove location/availability)
│   ├── Skills.jsx (Redesign markup)
│   ├── Skills.module.css (Add modern styles)
│   ├── ProjectCard.jsx (Redesign markup)
│   └── ProjectCard.module.css (Add modern styles)
├── data/
│   └── profile.js (Update name, remove unused fields)
```
