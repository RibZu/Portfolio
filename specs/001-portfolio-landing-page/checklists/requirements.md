# Specification Quality Checklist: Portfolio Landing Page

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-09-20
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

**Validation run 1 (2026-09-20)**: 15 of 16 items passed. The failing item was the
[NEEDS CLARIFICATION] check, with two markers open: the colour palette and the content
language.

**Validation run 2 (2026-09-20)**: 16 of 16 items pass. Both markers were resolved by the owner
within the same session:

- **Colour palette** — the owner supplied the exact values from his design, derived from the
  "Industry" accent `#5980a6`. Recorded in FR-026, with per-colour contrast limits measured
  against the `#1d2d3d` surface in FR-027.
- **Content language** — resolved as Spanish and English with a switch, expanded into FR-032
  through FR-038.
- A third question, raised during validation, was also resolved: declared skills and published
  projects are shown as separate areas while each project still displays its own technologies
  (FR-007, FR-008, FR-012).

**Validation run 3 (2026-09-20)**: 16 of 16 items still pass after the owner asked for the
deployment path to be specified, because he is handing the project to a different assistant.
Added: nine deployment and operation requirements (FR-043 to FR-051), three deployment success
criteria (SC-012 to SC-014), deployment dependencies in Assumptions, and Appendix A. Also
revised: the project inventory is now stated as a snapshot of a set the owner will keep
extending, so the design targets a changing project list rather than the current eight entries.

**Structural checks**: 51 functional requirements numbered contiguously from FR-001 to FR-051
with no gaps or duplicates; 14 success criteria from SC-001 to SC-014; all internal
cross-references verified to point at the intended requirement; no trailing whitespace.

**Qualification on "No implementation details" — read this before trusting the tick.** The
normative sections of the spec contain none. Two things in the file are worth naming explicitly:

1. **Appendix A is implementation detail, deliberately.** It names Vite, React,
   `react-bootstrap`, npm commands, Vercel project settings, and a `vercel.json` snippet. This
   material belongs in `plan.md`. It was added at the owner's explicit request so that the next
   assistant inherits a written deployment path instead of rediscovering it. The appendix opens
   with a note stating it is guidance and that FR-043 to FR-051 are what actually bind. An
   auditor applying this checklist strictly should treat the appendix as out of scope for the
   item, not as a pass.
2. **Technology names in the body are subject matter, not build choices.** PHP, JavaScript, Go,
   Java, PostgreSQL, and Docker are what visitors filter by. The colour palette is an identity
   that already exists on the owner's GitHub banner and LinkedIn images. Neither describes how
   the page is built.

**Carried into planning, deliberately not left unspecified**: how prominently PHP appears as a
technology grouping. It backs four of the eight current public projects but is absent from the
owner's declared stack. The spec assumes PHP is included and relies on FR-017's deliberate
ordering. The owner has confirmed he will publish further work, so this tension is expected to
ease on its own.

**A second decision awaits the plan**: whether the two language versions are built as two HTML
entry points or as one page with client-side routing. It is not a free choice — the first
protects FR-041's per-language social metadata, and the second requires a rewrite rule in
Vercel or direct links to `/en` will 404. Appendix A sets out both and recommends the first.

**Correction (2026-09-20, validation run 4)**: earlier runs of this checklist recorded that the
repositories "carry no descriptions" and that the owner had to write every project description
from nothing. That was wrong, and the spec has been corrected. The claim came from GitHub's
one-line `description` field, which is empty on all eight repositories; the README files are
not, and each one states what the project does, why it was built, its features, and its real
stack. Consequences of the correction:

- Project descriptions are **condensed from the existing READMEs**, not authored from scratch.
  They still need rewriting for a non-technical audience, since the READMEs assume developer
  vocabulary, but the substance exists.
- The stack per project is now taken from the READMEs rather than from GitHub's language
  detection, which is what FR-015 asks for. This changed several entries: `MyCarApp` uses
  CodeIgniter 4 and MySQL, `NoticiasInstitucionales` and `TyH-Noticias` are hand-rolled MVC with
  no framework, and `MyCarAppMobile` uses SQLite and Gradle. None of this was visible in the
  language data.
- **React is demonstrated after all.** `DigestoUNSL` is a React SPA built with Vite, which the
  language detection reported only as "JavaScript". The declared-versus-demonstrated gap is
  therefore narrower than run 2 recorded, and now stands at TypeScript and Node.js as a runtime.
- `RedSocialArtesanos` and `TyH-Noticias` already hold screenshots under `docs/screenshots/`,
  which are the natural source for project images and remove the need to invent visuals.

**Content still required from the owner before release**: a recruiter-facing rewrite of each
project's README summary. The raw material exists; the translation into plain language does not.

**Precondition not yet met**: the project is not a git repository and has no GitHub remote.
Creating it is the first deployment task, recorded in Assumptions and in Appendix A.
