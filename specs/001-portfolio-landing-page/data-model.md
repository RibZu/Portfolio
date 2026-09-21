# Phase 1 Data Model: Portfolio Landing Page

**Date**: 2026-09-20 | **Plan**: [plan.md](./plan.md) | **Contract**: [contracts/content-schema.md](./contracts/content-schema.md)

The site has no database. "Data model" here means the shape of the JavaScript modules under
`src/data/`, which are the only place content lives and the only files the owner edits to update
the site. They are bundled at build time.

## Conventions

**LocalizedText** — any visitor-facing string is an object with one key per language:

```js
{ es: "Texto en español", en: "English text" }
```

Both keys are required. FR-032 makes a missing translation a defect rather than a fallback, and
keeping both languages in the same object is what makes an omission visible at the point of
editing instead of at runtime. `tests/content.test.js` enforces this.

**Identifiers** — `id` fields are lowercase kebab-case, stable, and never shown to visitors.
Renaming an `id` breaks the references that point at it, so ids are chosen once and left alone.

**Derived, never stored** — project counts per technology, the set of filters that appear, and
whether a skill is demonstrated. These are computed in `src/lib/derive.js` from the entities
below. Storing them would let them drift out of agreement with the data, which is exactly what
FR-016 and SC-009 forbid.

---

## Entity: Profile

One record, in `src/data/profile.js`. The identity shown above the fold and in the contact
section.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Not localized. "Simón Riberi Zunino" |
| `title` | LocalizedText | yes | "Desarrollador de Software" / "Software Developer" |
| `location` | LocalizedText | yes | FR-004 |
| `availability` | LocalizedText | yes | FR-005. Short, e.g. "Abierto a propuestas" |
| `summary` | LocalizedText | yes | FR-004. **60 words maximum per language**, enforced by test |
| `email` | string | yes | `simonriberizunino@gmail.com`. FR-023 |
| `github` | string (URL) | yes | `https://github.com/RibZu` |
| `linkedin` | string (URL) | yes | FR-022 |
| `spokenLanguages` | array of `{ name: LocalizedText, level: LocalizedText }` | yes | FR-021. Spanish native, English B2 (FCE) |
| `ogImage` | LocalizedText | yes | Path to the social preview image per language. FR-041 |

**Validation**: `summary` at or below 60 words in each language; `email` contains `@`; the three
URLs start with `https://`.

---

## Entity: Technology

Array in `src/data/technologies.js`. A curated grouping, not a detected language (FR-015). Only
entries in this file can become filters.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | e.g. `go`, `react`, `php`. Referenced by Project and Skill |
| `name` | string | yes | Display name, not localized: "Go", "React", "PHP" |
| `category` | enum | yes | `language` \| `framework` \| `database` \| `platform` \| `tooling` |
| `blurb` | LocalizedText | yes | FR-006. Plain language, for a non-technical reader. One sentence. |

**Validation**: `id` unique; `category` one of the listed values; `blurb` present in both
languages.

**Starting set** (from the project READMEs, per research.md §5): `go`, `react`, `javascript`,
`php`, `java-android`, `postgresql`, `mysql`, `docker`.

**Note on `blurb`**: this is the field that does the work for the primary audience. "PHP" means
nothing to a recruiter; "el lenguaje que corre detrás de la mayoría de los sitios web" does.

---

## Entity: Project

Array in `src/data/projects.js`. The showcase.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | e.g. `api-digesto` |
| `name` | string | yes | Display name, not localized |
| `description` | LocalizedText | yes | FR-012. Plain language, what it does and what problem it solves. **Condensed from the repository README, rewritten for a non-technical reader.** |
| `technologies` | array of Technology `id` | yes | At least one. Drives grouping, filtering, and counts (FR-014) |
| `repo` | string (URL) | no | FR-013. Absent for a project with no public repository (FR-018) |
| `demo` | string (URL) | no | FR-013. Only when a deployment is actually running |
| `image` | string (path) | no | Under `public/img/projects/`. Absent falls back to the placeholder |
| `imageWidth`, `imageHeight` | number | yes when `image` is set | FR-040, SC-008 |
| `featured` | boolean | no, defaults `false` | Featured projects sort first (FR-017) |
| `order` | number | no, defaults `0` | Tie-break within featured and non-featured. Lower comes first |
| `relatedTo` | Project `id` | no | FR-019. Pairs variants such as `my-car-app` and `my-car-app-mobile` |

**Validation**: `id` unique; every entry in `technologies` exists in `technologies.js`;
`technologies` non-empty; `repo` and `demo`, when present, start with `https://`; `imageWidth`
and `imageHeight` present whenever `image` is; `relatedTo`, when present, names an existing
project and is not the project itself; `description` present in both languages and free of
placeholder markers.

**Ordering rule** (FR-017), applied in `derive.js`: `featured` descending, then `order`
ascending, then `name` alphabetically. Deterministic, so the same data always renders the same
page.

**Starting set**: the eight repositories in the spec's inventory. `api-digesto` carries the only
`demo`. `red-social-artesanos` and `tyh-noticias` are the two with `image` available from their
committed screenshots.

---

## Entity: Skill

Array in `src/data/profile.js` alongside the profile, or its own export. The declared stack shown
in the identity section, which FR-007 keeps visually separate from the projects.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `technologyId` | Technology `id` | yes | Reuses the Technology entity, so the blurb is written once |
| `order` | number | yes | FR-006: languages first, frameworks and runtimes last |

**Derived field, not stored**: `demonstrated` — true when at least one project declares this
`technologyId`. FR-008 requires the page to show this, and it must be computed so it cannot go
stale as the owner publishes more work.

**Starting set**, per the owner's banner ordering: `go`, `javascript`, `typescript`, `react`,
`node`. Note that `typescript` and `node` have no project today and will render as declared but
not yet demonstrated — which is the honest presentation FR-008 asks for, and which the owner has
said he intends to close.

**Implication**: `technologies.js` must therefore also contain `typescript` and `node` entries
even though no project references them. A Technology with no projects is valid; it simply
produces no filter (a filter with zero results would be a dead control).

---

## Entity: ExperienceEntry

Array in `src/data/experience.js`. Work, education, and certifications in one list, discriminated
by `type`, because they share a shape and render on one timeline (FR-020).

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | |
| `type` | enum | yes | `work` \| `education` \| `certification` |
| `role` | LocalizedText | yes | Job title, degree, or certification name |
| `organisation` | string | yes | Not localized — institution names are proper nouns |
| `period` | `{ from: string, to: string \| null }` | yes | `YYYY` or `YYYY-MM`. `to: null` means current |
| `description` | LocalizedText | no | Omitted for certifications, which need no elaboration |
| `url` | string (URL) | no | e.g. the LaCiS site |

**Validation**: `period.from` matches `YYYY` or `YYYY-MM`; when `to` is set it is not earlier than
`from`; `type` is one of the three.

**Ordering** (FR-020): reverse chronological by `period.from`, entries with `to: null` first.

---

## Entity: UIStrings

One object in `src/data/ui.js`. Every interface string that is not content: section headings,
navigation labels, button text, the filter group label, the empty-state message, the
"all technologies" label, the language switch label, the external-link announcement.

Shape: a flat map of key to LocalizedText.

**Rationale for separating it from content**: it changes for different reasons and at different
times. A translator touches `ui.js` once; the owner touches `projects.js` every time he ships
something.

**Validation**: every key present in both languages. This is where a half-finished translation is
most likely to hide, so the content test walks this object exhaustively.

---

## Relationships

```text
Profile ──1:N──> Skill ──N:1──> Technology <──N:M── Project
                                                       │
                                                       └──0:1──> Project  (relatedTo)

Profile ──1:N──> ExperienceEntry
```

`Technology` is the hub: both `Skill` and `Project` reference it by `id`, so a technology's
plain-language blurb is written once and cannot disagree between the skills section and the
project filters.

## Derivations

All in `src/lib/derive.js`, all pure, all covered by `tests/derive.test.js`.

| Function | Input | Output | Serves |
|----------|-------|--------|--------|
| `projectsByTechnology(projects)` | project array | map of technology id to project array | FR-010 |
| `technologyCounts(projects)` | project array | map of technology id to count | FR-010 |
| `visibleFilters(projects, technologies)` | both | technologies with at least one project, ordered by count descending | FR-010, FR-015 |
| `filterProjects(projects, technologyId)` | projects, id or `null` | filtered, ordered projects | FR-011, FR-017 |
| `isDemonstrated(technologyId, projects)` | id, projects | boolean | FR-008 |
| `sortExperience(entries)` | entries | reverse-chronological entries | FR-020 |

## State

The page holds exactly one piece of runtime state: `activeFilter`, a Technology `id` or `null`,
owned by `Projects.jsx`. Nothing else changes after load.

The language preference is not state — it is read once before React mounts and persisted to
`localStorage` when the switch is used. Treating it as state would mean re-rendering the page in
another language, which is not how this site works: the switch is a link to another document.
