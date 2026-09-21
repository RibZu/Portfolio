# Phase 0: Research

## Glassmorphism (Glass Effect) Implementation

- **Decision**: Use CSS `backdrop-filter: blur(px)` along with a semi-transparent background color (e.g., `background: rgba(20, 20, 20, 0.6)`) to create the glass effect over the Japanese art background.
- **Rationale**: This is the modern, native browser way to implement glassmorphism without heavy JavaScript computations or complex SVG masks. It is well-supported in modern browsers and hardware-accelerated, ensuring it respects the performance budget (Constitution IV).
- **Alternatives considered**: Using pre-rendered blurred images (too inflexible, adds payload), or WebGL-based effects (overly complex for a static portfolio and bad for performance).

## Background Asset Sourcing and Optimization

- **Decision**: Generate or source a high-quality Japanese art static image, convert it to WebP format, and implement responsive sizing (`background-size: cover; background-position: center`).
- **Rationale**: The Constitution (IV) mandates that images must be sized and compressed appropriately. WebP offers excellent quality-to-size ratios, helping maintain the 90+ Lighthouse score.
- **Alternatives considered**: Using a video or heavy CSS/JS animation for the background (rejected due to performance impact and potential distraction from the main content).

## Styling Architecture

- **Decision**: Use CSS Modules for all styling, defining a global CSS variables file (`variables.css`) for the new non-white elegant theme (e.g., dark grays, deep blues, or soft blacks).
- **Rationale**: Mandated by the project Constitution (II) which explicitly forbids external UI frameworks like Bootstrap or Tailwind, and requires CSS Modules.
- **Alternatives considered**: Tailwind CSS (rejected: forbidden by Constitution).
