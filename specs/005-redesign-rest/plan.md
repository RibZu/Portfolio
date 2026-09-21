# Implementation Plan: Total Redesign Part 2

**Branch**: `[005-redesign-rest]` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

## Summary
Complete the visual overhaul of the remaining sections of the portfolio (Header, Skills, Projects, Contact) based on the user's explicit design choices: Floating Island Header, Terminal UI Skills, and Notion-like Project/Contact cards. The profile summary will also be shortened for impact.

## Technical Context
**Language/Version**: JavaScript (React), HTML, CSS Modules
**Target Platform**: Web (Vercel Static)

## Constitution Check
- **I. Simplicity First**: PASS. We continue using CSS Modules without introducing external libraries like Framer Motion or Bootstrap.
- **II. Static-First**: PASS.
- **III. Accessible by Default**: PASS.
- **IV. Performance Budget**: PASS. 

## Project Structure
```text
src/
├── components/
│   ├── Header.jsx (Rebuild as floating island)
│   ├── Header.module.css
│   ├── Skills.jsx (Rebuild as Terminal UI)
│   ├── Skills.module.css
│   ├── ProjectCard.jsx (Rebuild as Notion-like card)
│   ├── ProjectCard.module.css
│   ├── Contact.jsx (Rebuild as Notion-like section)
│   └── Contact.module.css
├── data/
│   └── profile.js (Shorten summary)
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
