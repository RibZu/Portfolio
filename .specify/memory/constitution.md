<!--
Sync Impact Report
- Version change: 1.1.0 → 2.0.0 (MAJOR: reverses the 1.1.0 prohibition on frameworks, build
  tools, and CSS frameworks)
- Modified principles:
  - II. Static-First, Vercel Hobby-Compatible: "pre-rendered or static content" reworded to
    "static build output, no server-side runtime, metadata in index.html" (a client-rendered
    React app is not pre-rendered)
  - IV. Performance Budget: added JavaScript-size rules for the React app
- Added sections: none
- Removed sections: none
- Technology & Deployment Constraints: stack changed from plain HTML/CSS/JS to Vite + React
  (JavaScript) + react-bootstrap, with the Principle I justification recorded
- Templates requiring updates: none (dependent templates read this file at runtime)
- Deferred items:
  - Principle I was chosen by the user; II–V and the concrete numeric targets (Lighthouse ≥ 90,
    initial JS ≤ 200 kB gzipped) are defaults proposed by the amendment author and should be
    reviewed by the project owner.
  - The user reversed the 1.1.0 stack decision (plain HTML/CSS/JS) within the same day;
    the justification for React and react-bootstrap below is derived from the user's stated
    goal of a polished portfolio and should be confirmed.
-->
# Portfolio Constitution

## Core Principles

### I. Simplicity First (YAGNI)
Every change MUST solve a requirement that exists today. Speculative features, abstractions,
configuration options, and "future-proofing" MUST NOT be added. New dependencies MUST be
justified in the spec or plan; if the platform (HTML, CSS, the browser) can do the job, it MUST
be used instead of a library. Any added complexity MUST be recorded with the simpler
alternative that was rejected and why.

Rationale: a portfolio is small and changes rarely; complexity is a maintenance cost with no
payoff for its visitors.

### II. Static-First, Vercel Hobby-Compatible
The site MUST be deployable to Vercel's free (Hobby) plan without paid features. The site MUST
be built to static assets (`vite build`) with no server-side runtime, and page metadata
(title, description, Open Graph tags) MUST live in `index.html`. Server-side code (serverless functions, databases,
authentication) MUST NOT be introduced unless a spec shows a requirement that static content
cannot meet. The site MUST stay within the Hobby plan's limits and terms of use (including its
personal, non-commercial usage terms).

Rationale: static hosting is free, fast, and has no operational burden.

### III. Accessible by Default
Pages MUST use semantic HTML, have a logical heading order, provide alt text for meaningful
images, be fully operable by keyboard with visible focus, and meet WCAG 2.1 AA colour contrast.
Motion MUST respect `prefers-reduced-motion`. Accessibility regressions block merge.

Rationale: a portfolio is a public showcase; being unusable for some visitors defeats its
purpose.

### IV. Performance Budget
Pages MUST load quickly on mid-range mobile devices over a typical connection. Images MUST be
sized and compressed appropriately and use modern formats where supported. Third-party scripts
(analytics, embeds, fonts) MUST NOT be added without justification under Principle I. The
initial JavaScript payload MUST stay small (target: 200 kB gzipped or less): react-bootstrap
components MUST be imported individually, non-critical code SHOULD be split with dynamic
`import()` or `React.lazy`, and unused dependencies MUST be removed. A
Lighthouse run on the main pages MUST score at least 90 for Performance, Accessibility, Best
Practices, and SEO before a release.

Rationale: speed is part of the impression a portfolio makes, and the 90 threshold is a
measurable gate.

### V. Verifiable Changes
Each change MUST be checkable: the build MUST pass, linting/formatting (if configured) MUST
pass, and the affected pages MUST be verified in a browser at mobile and desktop widths before
merge. Features with logic (not purely content or styling) SHOULD include automated tests.
Broken links and missing assets MUST be fixed before release.

Rationale: a small project still needs a cheap, repeatable definition of "done".

## Technology & Deployment Constraints

- Hosting: Vercel Hobby plan, deployed from the main branch; preview deployments MAY be used
  for review.
- Stack: Vite + React (JavaScript, not TypeScript) + react-bootstrap with the `bootstrap`
  CSS, plus plain HTML (`index.html` entry) and hand-written CSS for custom styling. The
  build output (`dist`) is deployed to Vercel as a static site.
- Justification (Principle I): React gives reusable components for the project list and
  sections and demonstrates the owner's skills, which is the purpose of a portfolio;
  react-bootstrap gives accessible, tested interactive components (navbar, modal, carousel)
  without manipulating the DOM outside React. The simpler alternative, plain HTML/CSS/JS,
  was considered and set aside for these reasons.
- Forbidden without a written justification under Principle I: additional UI or component
  libraries, state managers, routers (a single-page layout with sections needs none),
  CSS-in-JS libraries, TypeScript, and server-side rendering or backends.
- Bootstrap's own JavaScript bundle and jQuery MUST NOT be used; interactive behaviour comes
  from react-bootstrap. Create React App MUST NOT be used.
- Third-party assets (a font, an icon set) MUST be justified under Principle I and, where
  practical, self-hosted.
- Secrets and API keys MUST NOT be committed to the repository.
- Personal contact details published on the site MUST be limited to what the owner has
  chosen to make public.

## Development Workflow

- Work follows the Spec Kit flow: specify → plan → tasks → implement, with plans checked
  against this constitution (Constitution Check) before implementation begins.
- Changes SHOULD be small and focused, one concern per commit or pull request.
- Content-only changes (copy, projects, images) MAY skip the full spec flow but MUST still
  satisfy Principles III–V.

## Governance

This constitution supersedes other project practices. Amendments MUST be made through the
constitution command, MUST state the reason for the change, and MUST update the version and
the Last Amended date.

Versioning follows semantic versioning: MAJOR for removing or redefining a principle in a
backward-incompatible way; MINOR for adding a principle or section or materially expanding
guidance; PATCH for clarifications and wording fixes.

Compliance: every plan and review MUST verify compliance with the principles above. Any
violation MUST be justified in writing (see Principle I) or the change revised. The project
owner MAY review the constitution at any time and SHOULD do so when the stack or hosting plan
changes.

**Version**: 2.0.0 | **Ratified**: 2026-09-20 | **Last Amended**: 2026-09-20
