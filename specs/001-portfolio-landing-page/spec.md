# Feature Specification: Portfolio Landing Page

**Feature Branch**: `001-portfolio-landing-page`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "quisera una pagina que tenga un buen disenio de frotend, que sin emeabrgo tenga un disneio origla y minimalista, me gustaria que el disneio este basado en estos colores: https://claude.ai/design/p/e7ae1662-51a3-4124-b5c1-817242954fbf?file=Banner+GitHub.dc.html lo ideal seria que sea en una pagina para permitirle al que me busca que encuentre la ianformacion rapida en general mi infromacion encesaria la tenes en mi guthub quisera que todos mis poryectos esten reflejados ahi divididos por teconolgia de una manera eficiente y buena para que el reclutador por ahi no formado en tenoclogia pueda encontrar rapido la infromacion que requiere de mi el resto de infromacion la tenes en mi linnkedin, la idea del porfolio es que sea un punto medio entre mi github y mi linkedin https://www.linkedin.com/in/simon-riberi-5a28bb238/"

**Supplementary input**: CV provided by the owner (2026-09-20) and GitHub profile
`https://github.com/RibZu`.

## Context

The owner is Simón Riberi Zunino, a web development student at the Universidad Nacional de San
Luis (Argentina) finishing the final supervised practice of a Tecnicatura Universitaria en Web,
currently working as a web developer at the LaCiS laboratory. He has two public profiles that
each fail him in a different way:

- **GitHub** holds the evidence, but presents it badly. The eight public project repositories
  carry no descriptions at all, are ordered by last commit, and are labelled only by GitHub's
  automatic language detection, which reports noise such as `Batchfile`, `PowerShell`, and a
  misdetected `Hack`. A recruiter cannot tell what any project does.
- **LinkedIn** holds the narrative, but shows no working software.

The portfolio is the missing middle: the evidence from GitHub, made legible, with enough of the
LinkedIn narrative to give it weight.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recruiter grasps the candidate at a glance (Priority: P1)

A recruiter with no technical training opens the page from a job application. Within the first
screen, with no scrolling and no clicking, they can read the owner's name, his professional
title, a short plain-language summary, his main technologies, and where to go next.

**Why this priority**: This is why the page exists. If a recruiter cannot form a judgement in
seconds, no later section will be reached. It is also the smallest viable slice: one screen
with identity and outbound links already beats sending someone a bare GitHub profile.

**Independent Test**: Load the page on a phone and on a laptop, look only at what is visible
before scrolling, and confirm a non-technical person can state the owner's role and main skills
and knows where to click next.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on a 1366x768 laptop screen, **When** the page finishes
   loading, **Then** the owner's name, professional title, summary, and primary technologies
   are visible without scrolling.
2. **Given** a first-time visitor on a 375px-wide phone, **When** the page finishes loading,
   **Then** the same identity information is visible without horizontal scrolling and the
   primary action remains reachable with one thumb.
3. **Given** a visitor with no technical background, **When** they read a technology label,
   **Then** a plain-language explanation of what that technology is used for is available
   without leaving the page.
4. **Given** any visitor, **When** they look at the first screen, **Then** exactly one action
   is visually emphasised as the primary next step and the others are clearly secondary.
5. **Given** a visitor who reads only the first screen, **When** they finish, **Then** the
   owner's availability and location are stated, so a recruiter knows whether he is relevant
   to their search at all.

---

### User Story 2 - Visitor finds projects by technology (Priority: P2)

A visitor wants to know whether the owner has worked with a given technology. Projects are
organised by technology, can be narrowed to one technology, and each project explains what it
does in plain language before the visitor decides to open the code.

**Why this priority**: This is the value GitHub does not deliver. The repositories have no
descriptions and no curation, so grouping and explaining them is the core contribution of the
portfolio. It depends on Story 1 being present but delivers value on its own.

**Independent Test**: Pick a technology, narrow to it, and confirm the resulting list contains
every project using it and nothing else, each explained in a sentence a non-technical reader
understands.

**Acceptance Scenarios**:

1. **Given** the projects section, **When** the visitor reaches it, **Then** projects are
   grouped or filterable by technology, with the number of projects per technology visible
   before any interaction.
2. **Given** a visitor who selects one technology, **When** the selection is applied, **Then**
   only projects using that technology remain visible and the active selection is clearly
   marked.
3. **Given** a visitor who has filtered the list, **When** they clear the filter, **Then** the
   full set of projects is shown again.
4. **Given** any project entry, **When** the visitor reads it, **Then** it states in plain
   language what the project does and what problem it solves, lists its technologies, and links
   to its source code.
5. **Given** a project that has a running deployment, **When** the visitor reads its entry,
   **Then** a link to the live version is offered and distinguished from the code link.
6. **Given** a visitor using only a keyboard, **When** they move through the filters and
   project entries, **Then** every control is reachable in a logical order and the focused
   control is visibly marked.
7. **Given** a visitor using a screen reader who changes the filter, **When** the list updates,
   **Then** the change and the resulting number of projects are announced.

---

### User Story 3 - Visitor understands the professional background (Priority: P3)

A visitor interested after seeing the projects wants context: work experience, education, and
certifications. The page gives a condensed, readable version and points to LinkedIn for the
full history rather than duplicating it.

**Why this priority**: This is the LinkedIn half of the bridge and converts interest into
confidence, but a visitor who never scrolls this far has still been served by Stories 1 and 2.

**Independent Test**: Read the background section alone and confirm it conveys the career
trajectory without opening LinkedIn, while making clear where the complete history lives.

**Acceptance Scenarios**:

1. **Given** the background section, **When** the visitor reads it, **Then** roles, education,
   and certifications are shown with their time periods in reverse-chronological order.
2. **Given** the background section, **When** the visitor wants the full history, **Then** a
   clearly labelled link to the LinkedIn profile is available.
3. **Given** a visitor recruiting for an English-speaking team, **When** they read the
   background, **Then** the owner's language proficiency is stated.
4. **Given** any external link on the page, **When** the visitor activates it, **Then** it
   opens in a new tab and is identifiable as an external destination to assistive technology.

---

### User Story 4 - Visitor makes contact (Priority: P4)

A convinced visitor wants to reach the owner. Contact options are present and work on the first
attempt, with no form to complete and no account to create.

**Why this priority**: Without it the funnel leaks at the last step, but the same outcome is
reachable through LinkedIn, so it is the least critical slice.

**Independent Test**: From the contact section, complete each offered route and confirm it
reaches a working destination.

**Acceptance Scenarios**:

1. **Given** the contact section, **When** the visitor reads it, **Then** the owner's email and
   links to the LinkedIn and GitHub profiles are offered.
2. **Given** a visitor who activates the email route, **When** it opens, **Then** the address is
   also visible as selectable text, so a visitor with no configured mail application can copy
   it.

---

### User Story 5 - Owner updates content without redesigning (Priority: P5)

The owner finishes a project and wants it on the portfolio. He adds its details in one place and
it appears in the right technology groupings with the counts updated.

**Why this priority**: It protects the page's usefulness over time, but the page ships and
delivers value before the first update is needed.

**Independent Test**: Add one project entry declaring a technology that has no projects yet,
then confirm it appears, a filter for that technology exists, and all counts are correct, with
no other edit required.

**Acceptance Scenarios**:

1. **Given** the owner adds one project entry, **When** the page is rebuilt, **Then** it appears
   under each technology it declares and the per-technology counts update automatically.
2. **Given** a project entry with no demo link and no image, **When** the page renders, **Then**
   the entry displays correctly with no broken link and no gap in the layout.

---

### Edge Cases

- **Project has no image**: the entry renders with a consistent placeholder so the grid keeps
  its rhythm rather than collapsing.
- **Project uses many technologies**: the entry shows a bounded number of labels and indicates
  that more exist, rather than wrapping into an unbalanced block.
- **Long project title or description**: text wraps or truncates predictably without pushing
  neighbouring entries out of alignment.
- **A technology has exactly one project**: the grouping still appears, since hiding it would
  misrepresent the owner's experience. Java currently has exactly one.
- **A technology is incidental rather than a skill**: styling and build-tool noise detected by
  GitHub must not become a filter of its own.
- **Two projects are variants of one another**: `MyCarApp` and `MyCarAppMobile` are a web and
  mobile pair; their relationship must be evident rather than appearing as unrelated entries.
- **A linked deployment goes offline**: a demo link that stops resolving must be removable
  without touching anything but that project's entry.
- **JavaScript is disabled or fails to load**: identity, background, and contact remain
  readable and every project remains listed, even if filtering is unavailable.
- **Visitor prefers reduced motion**: all non-essential animation is suppressed.
- **Slow or metered connection**: the first screen is usable before images arrive and the
  layout does not shift when they do.
- **Visitor arrives via a direct link to a section**: the correct section is shown.
- **The page is shared in a message or email**: the preview shows a meaningful title, summary,
  and image rather than a bare URL.

## Requirements *(mandatory)*

### Functional Requirements

**Structure and navigation**

- **FR-001**: The portfolio MUST present all content on a single page, organised into
  distinguishable sections: identity, projects, background, and contact.
- **FR-002**: The page MUST provide a persistent way to jump between sections without manually
  scrolling through the whole document.
- **FR-003**: Each section MUST be reachable by a stable direct link so it can be shared.

**Identity**

- **FR-004**: The page MUST display the owner's name, professional title, location, and a
  summary of no more than 60 words written for a non-technical reader.
- **FR-005**: The page MUST state the owner's current availability for work.
- **FR-006**: The page MUST display the owner's skill set, each skill paired with a
  plain-language explanation of what it is used for, ordered with languages first and
  frameworks and runtimes last, matching the order used on the owner's GitHub banner.
- **FR-007**: The skill set and the project showcase MUST be presented as separate, visually
  distinguishable areas, so that a reviewer can tell a declared skill from one backed by
  published work.
- **FR-008**: Each skill in the skill set MUST indicate whether a project on the page
  demonstrates it, without the indication being conveyed by colour alone.
- **FR-009**: The first screen MUST offer links to the GitHub profile, the LinkedIn profile, and
  the contact route, with exactly one presented as the primary action.

**Projects**

- **FR-010**: The page MUST present the owner's projects grouped by technology, showing the
  number of projects in each group before the visitor interacts with anything.
- **FR-011**: Visitors MUST be able to narrow the project list to a single technology and to
  clear that selection, without a page reload.
- **FR-012**: Each project entry MUST state its name, a plain-language description of what it
  does and what problem it solves, and the technologies it uses. The technologies MUST remain
  visible on the entry itself, not only in the grouping or filter that led to it.
- **FR-013**: Each project entry MUST link to its source code, and to a live deployment when one
  exists, with the two visually distinguished.
- **FR-014**: A project using several technologies MUST appear under each of them.
- **FR-015**: Technology groupings MUST be curated and meaningful to a recruiter, not a
  reproduction of GitHub's automatic language detection. Incidental or misdetected languages
  MUST NOT appear as groups.
- **FR-016**: Project data MUST be defined in a single location, and the technology groupings
  and counts MUST derive from that data rather than being maintained by hand.
- **FR-017**: Projects MUST be presented in a deliberate order placing the owner's strongest
  work first, rather than defaulting to chronological order.
- **FR-018**: It MUST be possible to exclude a repository from the portfolio without deleting it
  from GitHub, and to include a project that has no public repository.
- **FR-019**: Related projects MUST be able to declare that relationship so that variants of the
  same product are presented together.

**Background and contact**

- **FR-020**: The page MUST present work experience, education, and certifications with their
  time periods in reverse-chronological order, condensed rather than duplicating the full
  LinkedIn profile.
- **FR-021**: The page MUST state the owner's spoken language proficiency.
- **FR-022**: The page MUST link to the full LinkedIn profile from the background section.
- **FR-023**: The page MUST offer the owner's email as a direct contact route, with the address
  also shown as selectable text.
- **FR-024**: All external links MUST open in a new tab and MUST be identifiable as external to
  assistive technology.

**Design and presentation**

- **FR-025**: The visual design MUST be minimalist: generous whitespace, a restrained type
  scale, and no decorative element that does not carry information.
- **FR-026**: The design MUST use the owner's existing steel-navy palette, so that the portfolio,
  the GitHub banner, and the LinkedIn profile read as one identity. Every colour MUST be defined
  in one place so the whole page can be re-themed from a single edit. The palette and its roles:

  | Role | Value |
  |------|-------|
  | Surface, page background | `#1d2d3d` |
  | Accent base | `#5980a6` |
  | Accent light, links and icons | `#749dc4` |
  | Borders, chips, rules | `#b9cfe2` at reduced opacity |
  | Secondary text | `#d6e5f2` |
  | Primary text | `#f2f7fb` |
  | Display text, headings | `#f2f2f3` |
  | Light-surface background, if needed | `#d9dadc` |
  | Text on light surface | `#46586a` |

- **FR-027**: The palette MUST be applied within its measured contrast limits against the
  `#1d2d3d` surface, so that FR-039 holds:
  - `#f2f7fb`, `#f2f2f3`, `#d6e5f2`, and `#b9cfe2` at full opacity clear AA for any text.
  - `#749dc4` reaches 4.9:1 and MAY be used for body text, links, and icons.
  - `#5980a6` reaches only 3.4:1. It MUST NOT be used for normal-size text. It MAY be used for
    large text at 24px or above, for borders, and for filled shapes.
  - Any colour used at reduced opacity MUST be re-checked against the surface it sits on, since
    the reduction lowers its effective contrast.
- **FR-028**: Colour MUST NOT be the only means of conveying information, including in the
  technology filters and their active state.
- **FR-029**: The page MUST be legible and fully usable from 320px wide up to large desktop
  screens, with no horizontal scrolling at any width.
- **FR-030**: Interactive elements MUST have visible hover, focus, and active states.
- **FR-031**: Animation MUST be limited to conveying state change and MUST be suppressed when
  the visitor has requested reduced motion.

**Content language**

- **FR-032**: The page MUST be published in both Spanish and English, with every visitor-facing
  string available in both. Content MUST NOT fall back to the other language: an untranslated
  string is a defect, not an acceptable state.
- **FR-033**: A language switch MUST be available from the first screen and MUST remain
  reachable from anywhere on the page.
- **FR-034**: Switching language MUST keep the visitor in the same section rather than returning
  them to the top of the page.
- **FR-035**: The page's declared language MUST always match the language being displayed, and
  MUST update when the visitor switches.
- **FR-036**: The visitor's language choice MUST be remembered for subsequent visits.
- **FR-037**: On a first visit, the initial language MUST follow the visitor's browser language
  preference, defaulting to Spanish when no preference matches.
- **FR-038**: Each language version MUST be reachable by its own stable link, so that the owner
  can send a recruiter directly to the appropriate version.

**Quality and accessibility**

- **FR-039**: The page MUST meet WCAG 2.1 AA, including contrast, logical heading order,
  keyboard operability with a visible focus indicator, and alternative text for meaningful
  images.
- **FR-040**: Images MUST reserve their space before loading so that content does not shift as
  they arrive.
- **FR-041**: The page MUST carry a descriptive title, a meta description, and social preview
  metadata in each language, so that a shared link renders a meaningful preview.
- **FR-042**: The page MUST contain no broken internal or external links in either language.

**Deployment and operation**

- **FR-043**: The site MUST be published on Vercel's free Hobby plan and MUST stay within that
  plan's limits and personal-use terms. It MUST require no server-side runtime, no database, and
  no stored secrets.
- **FR-044**: The site MUST be deployed from a GitHub repository, and a push to the default
  branch MUST publish the updated site automatically, with no manual upload step.
- **FR-045**: A change on any branch other than the default MUST produce its own preview
  deployment at a distinct URL, so a change can be reviewed in its deployed form before it
  reaches visitors.
- **FR-046**: The production site MUST be served over HTTPS, and any non-HTTPS request MUST be
  redirected to it.
- **FR-047**: It MUST be possible to return to any previously published version without
  rebuilding or reverting source history, so that a bad release can be undone in minutes.
- **FR-048**: Every stable link the page advertises, including each language version from
  FR-038 and each section link from FR-003, MUST resolve on the deployed site when opened
  directly, rather than only when reached by navigating from the page itself.
- **FR-049**: The repository MUST NOT contain credentials, API keys, or private personal data.
  Only contact details the owner has chosen to publish may appear.
- **FR-050**: The release gates in SC-005, SC-006, and SC-010 MUST be verified against a
  deployed URL, not only against a local development server, since build output and hosting
  behaviour differ from local serving.
- **FR-051**: The deployed site MUST be reachable at a stable address the owner can put on a CV
  and on LinkedIn, and that address MUST NOT change when the site is updated.

### Key Entities

- **Owner Profile**: the person the portfolio represents. Name, professional title, location,
  availability, short summary, email, spoken languages, and external profile links. Exists once.
- **Project**: a piece of work to show. Name, plain-language description, ordered list of
  technologies, source-code link, optional live-deployment link, optional image, optional
  relationship to a sibling project, and an ordering value controlling prominence. Relates to
  many technologies.
- **Technology**: a skill or tool presented as a grouping. Name, plain-language explanation of
  what it is used for, and a category such as backend, frontend, mobile, or infrastructure.
  Derives its project count from the projects declaring it. Only curated technologies appear.
- **Experience Entry**: a role, a course of study, or a certification. Title, organisation, time
  period, and a short description. Ordered in reverse chronology.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor with no technical background can state the owner's professional role and
  main technologies within 30 seconds of opening the page, without scrolling past the first
  screen.
- **SC-002**: A visitor can list every project matching a given technology within 15 seconds of
  deciding to look for it.
- **SC-003**: Every project on the page carries a description a non-technical reader
  understands, verified by five of five non-technical readers correctly stating what each
  project does.
- **SC-004**: The first screen becomes readable within 2 seconds on a mid-range phone over a
  typical mobile connection.
- **SC-005**: The deployed page scores at least 90 in each of Performance, Accessibility, Best
  Practices, and SEO in an automated audit.
- **SC-006**: An automated accessibility audit reports zero WCAG 2.1 AA violations, and the
  whole page can be operated with a keyboard alone.
- **SC-007**: The page displays correctly with no horizontal scrolling at every width from 320px
  to 2560px.
- **SC-008**: Visible content does not shift after the first render, measured as a cumulative
  layout shift of 0.1 or less.
- **SC-009**: The owner can add a new project and see it correctly grouped, counted, and
  filterable in under 5 minutes, editing a single location.
- **SC-010**: Every link on the page resolves successfully, verified by an automated link check.
- **SC-011**: Five of five people asked to find a specific piece of information about the owner
  succeed on the first attempt without assistance.
- **SC-012**: A change pushed to the default branch is live on the public address within 5
  minutes, with no manual step beyond the push.
- **SC-013**: A previously published version can be restored within 5 minutes without editing
  or reverting source code.
- **SC-014**: Hosting costs nothing: the site stays on the free plan with no paid feature
  required.

## Assumptions

**Scope**

- The portfolio is a single, publicly readable page. There is no authentication, no database, no
  server-side processing, and no content management interface; the owner edits content in the
  source.
- Contact is a direct email address rather than a submitted form, because a form would need
  server-side handling that the project's hosting constraints exclude.
- Analytics, a blog, a comments system, and multi-page routing are out of scope for this
  version.
- A downloadable CV is out of scope for this version; the background section carries the same
  information and cannot fall out of date separately.
- The page is a deliberate summary, not a mirror: it does not reproduce every repository or the
  full LinkedIn history, and always points to those sources for the complete picture.

**Content**

- Project and profile content is curated and maintained by the owner in the project source
  rather than read from the GitHub API at page load. This keeps the page static, avoids API
  rate limits and failure states, and lets the owner write recruiter-facing wording that
  repository metadata cannot provide.
- **Every repository has a substantial README**, each stating what the project does, why it was
  built, its feature list, and its real stack. What is empty is GitHub's one-line `description`
  field, which is why the repository list looks bare at a glance while the detail sits one click
  away. The portfolio's project descriptions are therefore **condensed from the existing
  READMEs**, not written from nothing. They must still be rewritten for the audience: the
  READMEs are developer-facing and assume technical vocabulary, whereas FR-012 requires plain
  language a recruiter understands. No description may be invented beyond what a README
  supports.
- The following inventory was read from `https://github.com/RibZu` on 2026-09-20. The stack
  column reflects what each README states, which is more accurate than GitHub's language
  detection:

  | Project | Real stack, per its README | Live demo | Screenshots in repo |
  |---------|---------------------------|-----------|---------------------|
  | `GIS-LACIS` | Go, PostgreSQL, server-side rendering | none | no |
  | `DigestoUNSL` | **React** SPA, Vite | none | no |
  | `API-DIGESTO` | Go REST API, concurrent fetching, Docker | yes | no |
  | `MyCarAppMobile` | Java, Android, SQLite, Gradle | n/a, mobile | no |
  | `MyCarApp` | PHP 8.2, CodeIgniter 4, MySQL, Bootstrap 5, MVC | none | no |
  | `RedSocialArtesanos` | PHP 8, MySQL, vanilla JavaScript, PHPMailer | none | **yes** |
  | `NoticiasInstitucionales` | PHP 8, MySQL, hand-rolled MVC, no framework | none | no |
  | `TyH-Noticias` | PHP, MySQL, hand-rolled MVC, no framework | none | **yes** |

- Two repositories already hold screenshots under `docs/screenshots/`. These are the natural
  source for the project images in FR-040 and avoid inventing visuals; projects without them
  fall back to the placeholder treatment in the Edge Cases.
- Derived from that inventory, the proposed curated groupings are PHP (4 projects), JavaScript
  (3), Go (2), React (1), Java and Android (1), PostgreSQL (1), MySQL (4), and Docker (1).
  `Batchfile`, `PowerShell`, and the misdetected `Hack` are excluded as noise under FR-015. The
  owner confirms or revises these groupings, which are drawn from the READMEs rather than from
  GitHub's detected languages, as FR-015 requires.
- The owner presents his stack, on his GitHub banner, as Golang, JavaScript, TypeScript, React,
  and Node.js, in that order. The skill set on the page follows that positioning and ordering.
- That positioning and the published evidence do not currently coincide, and the page must hold
  both honestly rather than hide the difference:

  | Declared on the banner | Public projects demonstrating it |
  |------------------------|----------------------------------|
  | Golang | 2 — `API-DIGESTO`, `GIS-LACIS` |
  | JavaScript | 3 |
  | TypeScript | none |
  | React | 1 — `DigestoUNSL` |
  | Node.js | none as a runtime; present as build tooling |

  Conversely, PHP backs four of the eight public projects and Java backs one, yet neither
  appears in the declared stack. Per the owner's decision, the skill set and the project
  showcase are separate areas (FR-007), each project still displays its own technologies
  (FR-012), and each declared skill indicates whether a project demonstrates it (FR-008).

- **The inventory above is a snapshot, not the final set.** The owner has stated he will publish
  further projects and keep the portfolio updated, specifically to close the gap between his
  declared stack and his published work. The page MUST therefore be built for a changing
  project set rather than tuned to these eight entries: technology groups appear and disappear
  as the data changes (FR-016), the layout holds from one project to many, and no grouping,
  count, or ordering is written by hand. The gap table above records the state on 2026-09-20 and
  is expected to close over time; it is not a constraint on the design.
- Profile facts are taken from the CV supplied on 2026-09-20: Simón Riberi Zunino, San Luis,
  Argentina; email `simonriberizunino@gmail.com`; GitHub `https://github.com/RibZu`; LinkedIn
  `https://www.linkedin.com/in/simon-riberi-5a28bb238/`; currently a web developer at LaCiS,
  UNSL; finishing a Tecnicatura Universitaria en Web at UNSL; Spanish native, English B2 (FCE).

**Audience and environment**

- The primary audience is recruiters and hiring managers; the secondary audience is technical
  reviewers. Both use a browser released within roughly the last two years.
- The audience is assumed to be primarily the Argentine and wider Spanish-speaking market
  implied by the owner's location and CV, with English-speaking remote recruiters as a
  secondary audience. This assumption drives the open language question.
- Mobile traffic is assumed to be significant, so the layout is designed for small screens
  first.
- Visitors arrive from a link in an application, a message, or a CV, so the page must make sense
  with no prior context.

**Design**

- "Minimalist" is read as restraint in decoration, not scarcity of information: the page must
  still carry the substance a recruiter needs.
- "Original" is read as a deliberate, recognisable design rather than an unmodified
  off-the-shelf template, and must not cost clarity, accessibility, or speed.
- The palette in FR-026 was supplied by the owner on 2026-09-20. It derives from the accent
  `#5980a6` of the "Industry" design system and is the same palette used on his GitHub banner
  and LinkedIn profile images, so the portfolio extends an identity that already exists rather
  than inventing one.
- The contrast ratios in FR-027 were computed against the `#1d2d3d` surface for this spec.
  They are the reason `#5980a6` is restricted: at 3.4:1 it is a shape and border colour, not a
  text colour.
- The design's character is dark-surface by default, with a fine technical grid, condensed bold
  display type for the name, and wide-letterspaced technical labels for chips and subtitles, as
  established by the banner. Exact typeface selection is left to the planning phase.
- Because the base surface is already dark, a separate dark mode is not required. A light
  variant is possible later using `#d9dadc` and `#46586a`, and defining colour in one place
  keeps that cheap.

**Dependencies**

- The site is deployed as a static site on free-tier hosting, as required by the project
  constitution.
- The thresholds in SC-005 and SC-006 restate the constitution's performance and accessibility
  principles and are therefore release gates, not aspirations.
- Deployment depends on two external accounts the owner already holds or must create: GitHub,
  for the repository, and Vercel, signed in with that GitHub account. Both are free.
- **The project is not yet a git repository.** As of 2026-09-20 the working directory contains
  only specification and tooling files, with no version control and no remote. Creating the
  repository and connecting it to Vercel is the first deployment task, not an assumed
  precondition.
- The default branch is assumed to be `main`, and production is assumed to track it.
- The site is assumed to launch on the free `*.vercel.app` address. A custom domain is optional,
  costs money, and is out of scope for this version; FR-051 is satisfied by the `*.vercel.app`
  address, which is stable across deployments.

## Resolved Clarifications

All three open questions were answered by the owner on 2026-09-20.

1. **Colour palette** — resolved. The owner supplied the exact values from his design, now
   recorded in FR-026 with their contrast limits in FR-027. The earlier neon palette found in
   his GitHub README is superseded and is not used.
2. **Content language** — resolved as Spanish and English with a switch (FR-032 to FR-038).
3. **Declared skills versus published projects** — resolved. The two are presented as separate
   areas, while each project continues to display its own technologies. See FR-007, FR-008, and
   FR-012, and the table in Assumptions.

One judgement is deliberately deferred to the planning phase rather than left unspecified: how
prominently PHP is featured as a technology grouping, given that it backs half the public
projects but is absent from the owner's declared stack. The spec assumes it is included, and the
owner has since confirmed he will publish further work to close the gap, so the page is built
for a changing project set rather than for the current eight.

## Appendix A: Deployment Guidance

> **Status of this appendix.** A specification states *what* must be true; the detail below is
> *how*, and normally belongs in `plan.md`. It is included at the owner's request because he is
> handing this project to a different assistant and needs the deployment path written down
> rather than rediscovered. It is guidance, not requirement: FR-043 to FR-051 and SC-012 to
> SC-014 are what must hold. Running `/speckit-plan` produces the full technical plan, of which
> this is a preview.

### Stack

Fixed by the project constitution v2.0.0, at `.specify/memory/constitution.md`, which the
implementing assistant must read before writing code:

- Vite + React in JavaScript, not TypeScript
- `react-bootstrap` with the `bootstrap` stylesheet, components imported individually
- Hand-written CSS for custom styling, with the FR-026 palette as CSS custom properties defined
  in one place
- Forbidden without a written justification: extra UI libraries, state managers, routers,
  CSS-in-JS, TypeScript, SSR, backends, Bootstrap's own JavaScript bundle, jQuery, Create React
  App

### First deployment

The working directory is not yet a git repository, so it starts there.

1. `git init`, commit the project, and create a **public** GitHub repository under the owner's
   account. Public matters: the portfolio's own source is itself a work sample, and it makes the
   repository linkable from the page.
2. Push to `main`.
3. At vercel.com, sign in **with the GitHub account**, then *Add New → Project* and import the
   repository.
4. Vercel detects Vite and fills the build settings in. Confirm rather than retype them:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node: a current LTS version
5. Deploy. The site goes live at a `*.vercel.app` address, which satisfies FR-051 and is the
   address for the CV and LinkedIn.

No environment variables are needed. If the project ever asks for one, that is a signal it has
drifted outside the static, secret-free scope in FR-043.

### Continuous deployment

Once imported, Vercel wires this up on its own and it satisfies FR-044, FR-045, and FR-047:

- A push to `main` rebuilds and republishes production.
- A push to any other branch produces its own preview URL.
- The *Deployments* tab lists every past build; *Promote to Production* on an earlier one
  restores it without touching source history.

HTTPS and its redirect (FR-046) are automatic and need no configuration.

### The one decision that changes the Vercel configuration

FR-038 requires each language to have its own stable link, and FR-041 requires per-language
social metadata. Two approaches satisfy FR-048, and they differ in what Vercel needs:

| Approach | How it works | Vercel needs | Trade-off |
|----------|--------------|--------------|-----------|
| **Two entry points** *(recommended)* | Vite builds `index.html` for Spanish and `en/index.html` for English, each with its own real `<title>`, meta description, and Open Graph tags | nothing extra | Real per-language metadata that social and search crawlers read without running JavaScript. Some duplication in the build config. |
| **Single page, client routing** | One `index.html`, language held in client state, paths `/es` and `/en` handled in the browser | a rewrite in `vercel.json` sending unmatched paths to `/index.html`, or `/en` returns 404 on direct open | Simpler build, but metadata is only correct after JavaScript runs, and crawlers commonly do not run it, which weakens FR-041. |

The first is recommended for that reason. If the plan chooses the second, `vercel.json` at the
repository root must contain:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Verifying a release

Per FR-050, these run against the deployed URL, not `localhost`:

- Lighthouse on the production address, in both languages: each of Performance, Accessibility,
  Best Practices, and SEO at 90 or above (SC-005).
- An accessibility checker reporting zero WCAG 2.1 AA violations, plus a keyboard-only pass
  through the whole page (SC-006).
- A link check across both languages, including every project's code and demo link (SC-010).
- Open each advertised link directly in a fresh tab, rather than by navigating to it, to confirm
  FR-048.
- Widths from 320px to 2560px with no horizontal scrolling (SC-007).

### Keeping it free

The Hobby plan covers this site comfortably; a static portfolio is well inside its limits. Two
things to avoid, both of which the constitution already forbids: adding serverless functions,
and using the plan for commercial work, which its terms do not allow.
