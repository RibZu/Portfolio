---

description: "Task list for the Portfolio Landing Page feature"
---

# Tasks: Portfolio Landing Page

**Input**: Design documents from `/specs/001-portfolio-landing-page/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/content-schema.md](./contracts/content-schema.md)

**Tests**: Test tasks ARE included. Constitution Principle V requires automated tests where there
is logic, and [research.md §8](./research.md) scopes them to two suites: the derivations and
content integrity. Component rendering tests are deliberately excluded.

**Organization**: Tasks are grouped by user story so each can be implemented, tested, and
deployed on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel — different files, no dependency on an incomplete task
- **[Story]**: Which user story the task serves (US1–US5)
- Every task names its exact file path

## Path Conventions

Single Vite project at the repository root, per [plan.md](./plan.md): `src/`, `tests/`,
`public/`, with `index.html` and `en/index.html` as the two entry points.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Turn an empty directory into a deployed, building project. The deployment happens
here, before any feature work, so the pipeline is proven while it is still trivial to debug.

- [X] T001 Run `git init` at the repository root and create `.gitignore` covering `node_modules/`, `dist/`, `.env*`, and `.vercel`
- [X] T002 Scaffold the project with `npm create vite@latest . -- --template react` (JavaScript, not TypeScript, per constitution), keeping the existing `.specify/`, `.claude/`, `specs/`, and `README.md`
- [X] T003 Install runtime dependencies: `npm install bootstrap react-bootstrap`
- [X] T004 [P] Install the dev dependency `npm install -D vitest`
- [X] T005 [P] Configure the multi-page build in `vite.config.js`: `build.rollupOptions.input` mapping `main` to `index.html` and `en` to `en/index.html`
- [X] T006 [P] Add npm scripts to `package.json`: `dev`, `build`, `preview`, and `test` running `vitest run`
- [X] T007 Create the directory skeleton: `src/components/`, `src/data/`, `src/lib/`, `src/styles/`, `tests/`, `public/fonts/`, `public/img/projects/`, `public/og/`, and `en/`
- [X] T008 Create a public GitHub repository under the `RibZu` account, push `main`, then import it at vercel.com signed in with GitHub, accepting the detected Vite preset (build `npm run build`, output `dist`)
- [X] T009 Verify on the deployed scaffold that `/en` **without a trailing slash** resolves rather than returning 404 (see [research.md §10](./research.md)); if it 404s, add `{ "cleanUrls": true }` to `vercel.json` and redeploy

**Checkpoint**: An empty page is live on a `*.vercel.app` URL and every push republishes it.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The bilingual shell, the design tokens, the content modules, and the derivation
layer. Every user story renders through this, so none can start until it is done.

**CRITICAL**: No user story work can begin until this phase is complete.

### Design tokens and base styles

- [ ] T010 [P] Create `src/styles/tokens.css` defining the FR-026 palette as CSS custom properties on `:root` — surface `#1d2d3d`, accent base `#5980a6`, accent light `#749dc4`, border `#b9cfe2`, text secondary `#d6e5f2`, text primary `#f2f7fb`, display `#f2f2f3` — plus the type scale and spacing scale. This file is the single source FR-026 requires; no hex value may appear anywhere else in the codebase
- [ ] T011 [P] Add the font declarations to `src/styles/tokens.css`: one self-hosted condensed display `@font-face` from `public/fonts/` with `font-display: swap`, a system sans stack for body, and a system monospace stack for letterspaced technical labels (per [research.md §4](./research.md))
- [ ] T012 Create `src/styles/app.css` with the base layout, importing Bootstrap's stylesheet for its reset and grid only; add a comment recording that `#5980a6` must never be used for normal-size text as it reaches only 3.4:1 against the surface (FR-027)

### Bilingual entry points

- [ ] T013 Create `index.html` at the repository root with `lang="es"`, a Spanish `<title>` and meta description, Spanish Open Graph and Twitter tags pointing at `/og/og-es.png`, and `<link rel="alternate">` tags for `hreflang="es"` (self), `hreflang="en"` (`/en/`), and `x-default` (self)
- [ ] T014 Add the inline language-redirect script to the `<head>` of `index.html`, before any render, per the contract in [contracts/content-schema.md](./contracts/content-schema.md) Part 2: read `localStorage.lang`; if `en`, `location.replace('/en/')`; if `es`, never redirect; if absent, consult `navigator.language` and redirect only when it does not indicate Spanish; wrap the whole thing in `try/catch` so blocked storage still renders
- [ ] T015 Create `en/index.html` mirroring `index.html` with `lang="en"`, English title, description, and Open Graph tags pointing at `/og/og-en.png`, alternates reversed with `x-default` pointing at `/`, and **no redirect script** — the English page must never redirect away
- [ ] T016 [P] Create `src/lib/language.js` exporting the current language read from `document.documentElement.lang`, a `setLanguagePreference(lang)` that writes `localStorage.lang` inside `try/catch`, and the path of the opposite-language document
- [ ] T017 [P] Create `src/lib/content.js` with a `t(localizedValue)` helper resolving a `{ es, en }` object against the active language, and supporting function values for interpolation such as `resultCount(n)`

### Content modules

- [ ] T018 [P] Create `src/data/technologies.js` exporting the curated groupings with fields `id`, `name`, `category` — one of `language` \| `framework` \| `database` \| `platform` \| `tooling` — and `blurb` as `{ es, en }`. Seed with `go`, `react`, `javascript`, `typescript`, `node`, `php`, `java-android`, `postgresql`, `mysql`, `docker`. Leave `blurb` values as clearly marked placeholders; they are written in T032. Note that `typescript` and `node` are intentionally present with no project referencing them
- [ ] T019 [P] Create `src/data/projects.js` with the eight projects from the spec inventory, filling every structural field from the repository READMEs: `id`, `name`, `technologies` (must be non-empty and every entry must exist in `technologies.js`), `repo`, `featured`, `order`, and `relatedTo` pairing `my-car-app` with `my-car-app-mobile`. Set `demo` only on `api-digesto` (`https://api-concursos-gilt.vercel.app`). Leave `description` as clearly marked placeholders; they are written in T038
- [ ] T020 [P] Create `src/data/profile.js` exporting `profile` with `name`, `title`, `location`, `availability`, `summary` (**60 words maximum per language**), `email` (`simonriberizunino@gmail.com`), `github`, `linkedin`, `spokenLanguages` (Spanish native, English B2 FCE), and `ogImage`; plus `skills` as `{ technologyId, order }` entries ordered `go`, `javascript`, `typescript`, `react`, `node` — languages first, frameworks and runtimes last (FR-006). Leave `summary` and `availability` as placeholders; written in T031
- [ ] T021 [P] Create `src/data/experience.js` from the owner's CV with fields `id`, `type` — one of `work` \| `education` \| `certification` — `role` as `{ es, en }`, `organisation`, `period` as `{ from, to }` where `from` matches `YYYY` or `YYYY-MM` and `to: null` means current, optional `description`, and optional `url`. Include the three roles, the Tecnicatura and secondary education, and the four certifications
- [ ] T022 [P] Create `src/data/ui.js` with every interface string as `{ es, en }`: navigation labels, section headings, `filterAll`, `filterGroupLabel`, `filterEmpty`, `resultCount` as a function of `n` handling pluralisation per language, `externalLink`, and the language switch label

### Derivation layer and its tests

- [ ] T023 Create `src/lib/derive.js` with the six pure functions from [data-model.md](./data-model.md): `projectsByTechnology`, `technologyCounts`, `visibleFilters` (technologies with at least one project, ordered by count descending), `filterProjects`, `isDemonstrated`, and `sortExperience`. Project ordering is `featured` descending, then `order` ascending, then `name` alphabetically; experience ordering is reverse-chronological by `period.from` with `to: null` entries first
- [ ] T024 [P] Create `tests/derive.test.js` covering every function in `src/lib/derive.js`, including the tie-break ordering and the case of a technology with zero projects producing no filter
- [ ] T025 [P] Create `tests/content.test.js` enforcing the validation rules in [contracts/content-schema.md](./contracts/content-schema.md): every localized value has both `es` and `en` non-empty; `profile.summary` is 60 words or fewer in each language; project `id`s are unique; every referenced technology exists; `technologies` arrays are non-empty; `repo` and `demo` start with `https://`; `imageWidth` and `imageHeight` are present whenever `image` is; `relatedTo` names an existing other project; `category` and `type` hold only their allowed enum values; `period.to` is not earlier than `period.from`; and **no placeholder marker survives in any content field**. This suite is expected to fail until the content tasks are done, which is intended

### Application shell

- [ ] T026 Create `src/main.jsx` mounting the app and reading the active language from `document.documentElement.lang`, imported by both HTML entry points
- [ ] T027 Create `src/App.jsx` composing the sections as semantic landmarks with the language-neutral ids `#skills`, `#projects`, `#background`, and `#contact` — identical in both languages so the language switch can carry the current hash across (FR-034)

**Checkpoint**: Both `/` and `/en/` render an empty but correctly-titled, correctly-themed shell. `npm test` runs. User stories can now proceed, and in parallel.

---

## Phase 3: User Story 1 — Recruiter grasps the candidate at a glance (Priority: P1) — MVP

**Goal**: A non-technical recruiter can state the owner's role and main technologies within 30
seconds, without scrolling.

**Independent Test**: Load the page on a phone and a laptop, look only above the fold, and confirm
a non-technical person can name the owner's role and skills and knows where to click next.

- [X] T028 [P] [US1] Create `src/components/Header.jsx` using `react-bootstrap`'s `Navbar` imported individually, with same-document anchor links to the four section ids and a language switch rendered as an `<a>` to the opposite-language document that writes `localStorage.lang` before navigating and carries the current hash across (FR-034)
- [X] T029 [US1] In `src/components/Header.jsx`, label the language switch in the language it leads to — "English" on the Spanish page, "Español" on the English page — so a visitor who cannot read the current page can still find the switch
- [X] T030 [P] [US1] Create `src/components/Hero.jsx` rendering name, title, location, availability, and summary, with links to GitHub, LinkedIn, and contact where **exactly one is visually emphasised as the primary action** (FR-009)
- [X] T031 [US1] Write the real content for `summary` and `availability` in `src/data/profile.js`, in both languages, **60 words maximum per language**, aimed at a reader with no technical background
- [X] T032 [US1] Write the real `blurb` for every technology in `src/data/technologies.js`, in both languages: one sentence each, explaining what the technology is *used for* to someone who does not know what it is — "framework MVC para PHP" does not satisfy this; "la base sobre la que se arma una aplicación web en PHP, para no escribir todo desde cero" does
- [X] T033 [US1] Create `src/components/Skills.jsx` rendering the declared stack in `skills` order, each with its plain-language blurb, presented as an area **visually distinct from the projects section** (FR-007)
- [X] T034 [US1] In `src/components/Skills.jsx`, mark each skill as demonstrated or not using `isDemonstrated` from `src/lib/derive.js`, conveying it with a text or shape indicator and **never by colour alone** (FR-008). `typescript` and `node` will render as declared but not yet demonstrated, which is the intended honest presentation
- [X] T035 [US1] Verify the first screen carries name, title, location, availability, summary, and technologies with no scrolling at both 1366×768 and 375px width

**Checkpoint**: The MVP is deliverable. A recruiter opening the link learns who this is and where to go next, in either language.

---

## Phase 4: User Story 2 — Visitor finds projects by technology (Priority: P2)

**Goal**: A visitor can narrow to one technology and read what each project does in plain
language.

**Independent Test**: Pick a technology, narrow to it, and confirm the list holds every project
using it and nothing else, each explained so a non-technical reader understands it.

- [X] T036 [P] [US2] Create `src/components/ProjectCard.jsx` rendering name, description, and **the project's own technologies on the card itself, not only in the filter that led to it** (FR-012), plus a source-code link and, when `demo` is set, a visually distinguished live-demo link (FR-013)
- [X] T037 [US2] In `src/components/ProjectCard.jsx`, bound the number of technology labels shown and indicate when more exist, and render the placeholder treatment when `image` is absent so the grid keeps its rhythm (Edge Cases)
- [X] T038 [US2] Write the real `description` for all eight projects in `src/data/projects.js`, in both languages, **condensed from each repository's existing README and rewritten for a non-technical reader**: what it does and what problem it solves. The READMEs carry the substance; this task is the translation into plain language, not invention
- [X] T039 [P] [US2] Create `src/components/TechFilter.jsx` per the contract in [contracts/content-schema.md](./contracts/content-schema.md) Part 3: a `<button>` per technology plus an "all" button, inside a group labelled by `ui.filterGroupLabel`, each carrying `aria-pressed`, each showing its **project count as text so counts are visible before any interaction** (FR-010), and the active state conveyed by a non-colour signal (FR-028)
- [X] T040 [US2] Create `src/components/Projects.jsx` owning the single `activeFilter` state, rendering the filtered, ordered list via `filterProjects`, with filtering that **never changes the URL and never scrolls the page**
- [X] T041 [US2] In `src/components/Projects.jsx`, add an `aria-live="polite"` region holding the current result count so screen readers hear the change and the resulting number (User Story 2, scenario 7), and render `ui.filterEmpty` instead of an empty region when a filter yields nothing
- [X] T042 [US2] Verify with the keyboard alone that every filter and project link is reachable in visual order with a visible focus indicator, and that filters respond to `Enter` and `Space`
- [X] T043 [US2] Verify that selecting each technology returns exactly the projects declaring it, that clearing restores the full set, and that PHP appears as a first-class grouping per [research.md §5](./research.md)

**Checkpoint**: The portfolio now does the thing GitHub does badly. US1 and US2 both work independently.

---

## Phase 5: User Story 3 — Visitor understands the professional background (Priority: P3)

**Goal**: A visitor gets the career trajectory without opening LinkedIn, and knows where the full
history lives.

**Independent Test**: Read the background section alone and confirm it conveys the trajectory
while making clear LinkedIn holds the complete record.

- [X] T044 [P] [US3] Create `src/components/Background.jsx` rendering work, education, and certifications on one reverse-chronological timeline via `sortExperience`, with each entry's period shown (FR-020)
- [X] T045 [US3] In `src/components/Background.jsx`, state the owner's spoken language proficiency from `profile.spokenLanguages` (FR-021) and add a clearly labelled link to the full LinkedIn profile (FR-022)
- [X] T046 [US3] Write the real `description` values in `src/data/experience.js` for the three work roles and the Tecnicatura, in both languages, condensed rather than duplicating the CV

**Checkpoint**: Interest converts into confidence. Three stories working independently.

---

## Phase 6: User Story 4 — Visitor makes contact (Priority: P4)

**Goal**: A convinced visitor reaches the owner on the first attempt.

**Independent Test**: Complete each offered contact route and confirm it reaches a working
destination.

- [X] T047 [P] [US4] Create `src/components/Contact.jsx` offering the email as a `mailto:` link **with the address also rendered as selectable text**, so a visitor with no configured mail application can copy it (FR-023), alongside the GitHub and LinkedIn links
- [X] T048 [US4] Apply the external-link contract across every outbound link in the codebase: `target="_blank"`, `rel="noopener noreferrer"`, and the visually-hidden `ui.externalLink` text so assistive technology announces the new tab (FR-024)

**Checkpoint**: The funnel is closed. All four visitor-facing stories work.

---

## Phase 7: User Story 5 — Owner updates content without redesigning (Priority: P5)

**Goal**: Adding a project is one edit in one file, and everything else follows.

**Independent Test**: Add a project declaring a technology no project currently uses, then confirm
it appears, a filter for that technology exists, counts are right, and nothing else needed editing.

- [X] T049 [US5] Add a temporary ninth project to `src/data/projects.js` declaring `typescript`, then verify it appears in the list, a `typescript` filter has appeared, every count is correct, and the `typescript` skill has flipped to demonstrated — **all without editing any file but `projects.js`**. Remove the temporary entry afterwards
- [X] T050 [US5] Document the add-a-project workflow in `README.md`, pointing at [contracts/content-schema.md](./contracts/content-schema.md), so the owner and any future assistant know that content lives in `src/data/` and nowhere else

**Checkpoint**: The site is maintainable by its owner. All five stories complete.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: The release gates. These are what turn a working page into a shippable one, and they
run against a **deployed URL**, not localhost (FR-050).

### Assets

- [X] T051 [P] Download the committed screenshots from `RedSocialArtesanos` and `TyH-Noticias` under their `docs/screenshots/` paths, convert to WebP sized to the card's rendered dimensions at 2×, and commit to `public/img/projects/`, then set `image`, `imageWidth`, and `imageHeight` on those two projects in `src/data/projects.js`
- [X] T052 [P] Create the placeholder project image from the palette in `public/img/projects/` for the six projects without a screenshot, so their absence reads as deliberate rather than broken
- [X] T053 [P] Create the social preview images `public/og/og-es.png` and `public/og/og-en.png`, reusing the existing banner artwork so the shared link matches the owner's GitHub and LinkedIn identity
- [X] T054 [P] Add the self-hosted subset display font as `woff2` to `public/fonts/` and preload it from both HTML entry points

### Cross-cutting behaviour

- [X] T055 [P] Add a `prefers-reduced-motion: reduce` block to `src/styles/app.css` suppressing all non-essential animation (FR-031)
- [X] T056 Verify that with JavaScript disabled the identity, background, and contact sections remain readable and every project stays listed, even though filtering is unavailable (Edge Cases)
- [X] T057 Run `npm test` and confirm both suites pass, including the assertion that no placeholder marker survives in any content field

### Release gates — run against the deployed URL, in both languages

- [X] T058 Run Lighthouse on mobile against `/` and `/en/`; **pass is 90 or above in Performance, Accessibility, Best Practices, and SEO** (SC-005), and Cumulative Layout Shift at or below 0.1 (SC-008)
- [X] T059 Run axe DevTools on both pages for **zero WCAG 2.1 AA violations** (SC-006), then `Tab` the whole page confirming visible focus throughout and no focus trap, and confirm with a screen reader that changing a filter announces the result count
- [X] T060 Sweep the viewport from **320px to 2560px** confirming no horizontal scrollbar and no clipped text at any width (SC-007)
- [X] T061 Run a link check across both deployed pages: every repository link, the `api-digesto` demo, both profile links, the LaCiS link, and the `mailto:` (SC-010)
- [X] T062 Verify direct entry per the table in [quickstart.md](./quickstart.md) check 6: `/` with a Spanish browser and with an English browser, `/en/` directly, `/en` without the trailing slash, `/#projects`, and `/en/#projects`; then confirm switching language mid-page lands in the same section, that the choice survives a reopened tab, and that the page still renders with cookies and site data blocked
- [X] T063 Paste both URLs into a link preview tester and confirm **each language shows its own title, description, and image** — an English preview showing Spanish text means `en/index.html` metadata was never translated (FR-041)
- [X] T064 Run the human check from [quickstart.md](./quickstart.md) check 9: show the page to a non-technical person for 30 seconds, take it away, and ask what the owner does, what they are good at, and what one project does. **Pass is all three** (SC-001, SC-003, SC-011). Failure here means the copy is still written for developers, and no Lighthouse score compensates
- [X] T065 Record the production URL and add it to the owner's CV and LinkedIn profile (FR-051)

---

## Dependencies & Execution Order

### Phase dependencies

```text
Phase 1 (Setup)          → blocks everything
Phase 2 (Foundational)   → blocks all user stories
Phase 3 (US1, P1)  ─┐
Phase 4 (US2, P2)  ─┤
Phase 5 (US3, P3)  ─┼→ independent of one another once Phase 2 is done
Phase 6 (US4, P4)  ─┤
Phase 7 (US5, P5)  ─┘    (T049 needs US2's filter UI to verify against)
Phase 8 (Polish)         → needs the stories it verifies
```

### Story dependencies

The four visitor-facing stories are genuinely independent after Phase 2: each renders its own
section from its own data, and removing any one leaves the others working. Two real couplings:

- **T034** (US1, the demonstrated marker) reads the project data created in T019. The data exists
  from Phase 2, so US1 does not wait for US2's UI.
- **T049** (US5) verifies the add-a-project flow through the filter UI built in US2, so it runs
  after Phase 4.

### Parallel opportunities

Within Phase 2, the content modules T018–T022 are five separate files with no interdependency, and
T024 and T025 are separate test files. Within each story phase, the component marked `[P]` can be
written alongside the others; the unmarked tasks that follow modify the same file and must be
sequential.

With two people or two agents after Phase 2: one takes US1 and US3 (identity and background, both
static rendering), the other takes US2 (projects, the only stateful section). They meet at Phase 8.

Asset tasks T051–T054 are four independent files and can all run in parallel at any point after
Phase 2.

---

## Implementation Strategy

### MVP scope

**Phases 1–3 (T001–T035).** That delivers a deployed, bilingual page where a recruiter learns who
Simón is, what he works with, and where to go next. It is genuinely shippable: the link can go on
a CV that day, and it already beats sending someone a bare GitHub profile, which is the
portfolio's whole justification.

### Incremental delivery

1. **Phase 1** → the pipeline is proven while it is trivial
2. **Phase 2** → the bilingual shell stands
3. **Phase 3** → **ship it**; the MVP is live
4. **Phase 4** → the reason the portfolio exists: projects, grouped and explained
5. **Phases 5–6** → background and contact close the funnel
6. **Phase 7** → the owner can maintain it alone
7. **Phase 8** → the release gates

Each phase ends deployable. Nothing is left half-built between phases.

### The two tasks that will take longest

Not the code. **T032** and **T038** — writing the technology blurbs and the eight project
descriptions, in two languages, for a reader who does not know what PHP is. The READMEs supply the
substance, so this is translation rather than invention, but it is the work that decides whether
SC-003 and SC-011 pass. Budget real time for it, and expect T064 to send it back for a rewrite at
least once.

