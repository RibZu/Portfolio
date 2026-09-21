# Implementation Plan: Header Alignment & MacOS Projects

**Branch**: `[006-projects-header-polish]` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

## Summary
Fix the flexbox alignment inside the Header to remove the "misaligned" feeling, and add a strong glassmorphism blur effect. Completely rebuild the ProjectCard to look like a MacOS application window with the 3 control dots.

## Technical Context
**Language/Version**: JavaScript (React), HTML, CSS Modules
**Target Platform**: Web (Vercel Static)

## Constitution Check
- **I. Simplicity First**: PASS. CSS Modules only.
- **II. Static-First**: PASS.
- **III. Accessible by Default**: PASS.
- **IV. Performance Budget**: PASS. 

## Project Structure
```text
src/
├── components/
│   ├── Header.jsx (Simplify markup for perfect flex alignment)
│   ├── Header.module.css (Fix flexbox, add backdrop-filter)
│   ├── ProjectCard.jsx (Add window title bar structure)
│   └── ProjectCard.module.css (Style as macOS window)
```
