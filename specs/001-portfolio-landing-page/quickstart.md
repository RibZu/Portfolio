# Quickstart & Validation Guide: Portfolio Landing Page

**Date**: 2026-09-20 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

How to run the site, and how to prove it satisfies the specification. The checks below map to
the success criteria by number, so a release either passes them or does not ship.

## Prerequisites

- Node.js 20 LTS or later, and npm
- A GitHub account, and a Vercel account signed in with it
- Chrome or Edge, for the Lighthouse run

## Running locally

```bash
npm install
npm run dev
```

Vite prints a local URL, by default `http://localhost:5173`. The Spanish page is at `/`; the
English page at `/en/`.

One caveat while developing: the language redirect is disabled in development and the browser's
language preference is not consulted, so both pages can be opened directly. The redirect is
verified against the deployed site instead, in check 6 below.

## Building

```bash
npm run build      # writes dist/index.html and dist/en/index.html
npm run preview    # serves dist/ exactly as it will be served in production
```

Verify the build against `npm run preview`, not `npm run dev`. The dev server rewrites paths and
skips optimisation, so a path that works there can still 404 in production.

## Automated checks

```bash
npm test
```

Two suites run, and both are gates:

- **`tests/content.test.js`** — content integrity. Fails when a project is missing a description
  in either language, when a project references a technology that does not exist, when an image
  lacks its dimensions, when `relatedTo` points at nothing, or when a placeholder marker survives
  into content. This is what makes FR-032 real: a half-translated page fails here rather than
  reaching a recruiter.
- **`tests/derive.test.js`** — the filtering, counting, and ordering logic in `src/lib/derive.js`.

## Release checks

These run against a **deployed URL**, not `localhost`, as FR-050 requires. Use the Vercel preview
URL for a branch, or the production URL for a release. Every check runs **in both languages**.

### 1. Performance and quality — SC-005

Open Chrome DevTools, Lighthouse tab, Mobile, and run all four categories against `/` and `/en/`.

**Pass**: Performance, Accessibility, Best Practices, and SEO each at 90 or above.

If Performance falls short, check the image sizes first; it is almost always the images. The
JavaScript budget has roughly 130 kB of headroom, per research.md §9.

### 2. Accessibility — SC-006

Run axe DevTools, or Lighthouse's accessibility audit, on both pages.

**Pass**: zero WCAG 2.1 AA violations.

Then, with the mouse untouched, `Tab` from the top of the page to the bottom:

- Every interactive element receives focus, in visual order
- The focus indicator is always visible against its background
- The technology filters can be operated with `Enter` or `Space`
- The navbar's mobile toggle opens, and focus behaves sensibly inside it
- Nothing traps focus

With a screen reader, change a filter: **the result count is announced**.

### 3. Content shift — SC-008

In Lighthouse, read Cumulative Layout Shift.

**Pass**: 0.1 or below. If it is higher, an image is missing its `width`/`height`, or the webfont
is swapping without space reserved.

### 4. Responsive behaviour — SC-007

In DevTools' device toolbar, sweep the width from **320px to 2560px**.

**Pass**: no horizontal scrollbar at any width; no text clipped; the first screen still carries
name, title, summary, and technologies at 375px (spec User Story 1, scenario 2).

### 5. Links — SC-010

Run a link checker over both deployed pages, or click every link.

**Pass**: every link resolves. Specifically: each project's repository link, the single demo
link on `api-digesto`, both profile links, the LaCiS link, and the `mailto:`.

### 6. Direct entry and language — FR-037, FR-038, FR-048

Each of these is opened **in a fresh tab**, not reached by navigating:

| Open | Expect |
|------|--------|
| `/` with a Spanish browser | Spanish page, no redirect |
| `/` with an English browser | Redirects to `/en/`, before anything renders |
| `/en/` directly | English page, never redirects away |
| **`/en` without the trailing slash** | Resolves, does not 404. **This is the one to actually check** — see research.md §10; the fix if it fails is one line in `vercel.json` |
| `/#projects` | Spanish page, scrolled to projects |
| `/en/#projects` | English page, scrolled to projects |

Then: switch language from mid-page. **Expect** to land in the same section, not at the top
(FR-034). Switch, close the tab, reopen `/`. **Expect** the chosen language to be remembered
(FR-036).

Finally, block cookies and site data and reload. **Expect** the page to render normally — the
redirect script is wrapped in `try/catch` for exactly this.

### 7. Social preview — FR-041

Paste both URLs into a link preview tester, or into a draft message on LinkedIn.

**Pass**: each language shows its own title, description, and image. If the English preview shows
Spanish text, the metadata in `en/index.html` was not translated, which is the failure mode the
two-entry-point design exists to prevent.

### 8. Degraded conditions — Edge Cases

- **JavaScript disabled**: identity, background, and contact remain readable. Filtering is
  unavailable, which is accepted; a blank page is not.
- **Reduced motion** (`prefers-reduced-motion: reduce` in DevTools' Rendering panel): no
  animation plays.
- **Slow connection** (Network throttling, Slow 4G): the first screen is readable before the
  images arrive, and nothing jumps when they do.

### 9. The human check — SC-001, SC-003, SC-011

The one that cannot be automated, and the one the site is for. Show the page to someone with no
technical background, for **30 seconds**, then take it away and ask:

1. What does this person do for a living?
2. What are they good at?
3. Pick a project — what does it do?

**Pass**: they answer all three. If they cannot, the summary or the project descriptions are
still written for developers, and no Lighthouse score compensates for that.

## First deployment

Full detail is in [spec.md](./spec.md), Appendix A. In short: `git init`, push to a public GitHub
repository, import it at vercel.com signed in with GitHub, accept the detected Vite preset
(`npm run build`, output `dist`), deploy. No environment variables, and no `vercel.json` unless
check 6 says otherwise.

After the first deploy, run every release check above against the deployed URL, and record the
resulting URL — it goes on the CV and on LinkedIn (FR-051).

## Release gate

A release ships when checks 1 through 9 pass in both languages and `npm test` is green. Checks 1,
2, and 9 are the ones that fail most often, and in that order.
