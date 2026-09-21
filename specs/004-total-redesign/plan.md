# Implementation Plan: Total Portfolio Redesign

**Branch**: `[004-total-redesign]` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

## Summary
A comprehensive visual overhaul focused on attracting recruiters. We are implementing a split-layout Hero with abstract engineering visuals, an interactive vertical timeline for the background, and performant CSS-based micro-animations (scroll reveals and 3D hovers) across all components, while strictly adhering to the existing CSS Modules and token architecture.

## Technical Context
**Language/Version**: JavaScript (React), HTML, CSS Modules
**Target Platform**: Web (Vercel Static)

## Constitution Check
- **I. Simplicity First**: PASS. We will implement scroll animations using a custom React hook wrapping native `IntersectionObserver` and CSS classes, avoiding heavy animation libraries like Framer Motion to keep the bundle small.
- **II. Static-First**: PASS.
- **III. Accessible by Default**: PASS. All animations will respect `@media (prefers-reduced-motion: reduce)`.
- **IV. Performance Budget**: PASS.

## Project Structure
```text
src/
├── hooks/
│   └── useScrollReveal.js (NEW - intersection observer hook)
├── components/
│   ├── Hero.jsx (Rewrite for split layout)
│   ├── Hero.module.css
│   ├── Background.jsx (Rewrite for timeline)
│   ├── Background.module.css
│   ├── ProjectCard.jsx (Add 3D hover)
│   └── ProjectCard.module.css
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Custom React Hook for Animations | We need scroll-reveal effects. | Hardcoding CSS keyframes on load doesn't trigger when scrolling down to the Timeline. A lightweight custom hook is much simpler than adding a library like Framer Motion. |
