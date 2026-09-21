# Data Model: Elegant Portfolio Redesign

As this is a static portfolio redesign focused strictly on presentation (UI/UX), there are no complex backend entities, state machines, or databases involved. The project state remains purely presentational.

## Entities

- **Theme Configuration**: Represented via CSS custom properties (variables) defined globally.
  - `var(--bg-primary)`: Replaces the stark white background.
  - `var(--text-primary)`: Adjusted for contrast against the new elegant background.
  - `var(--glass-bg)`: The semi-transparent overlay color for the header.

## Validation Rules

- **Accessibility**: All text colors layered on top of the new background or glassmorphic header MUST meet WCAG 2.1 AA color contrast ratio requirements.
