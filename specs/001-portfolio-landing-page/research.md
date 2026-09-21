# Phase 0 Research: Portfolio Landing Page

**Date**: 2026-09-20 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

Ten questions had to be settled before the design could be drawn. The first is the one that
determines the shape of the project; the rest follow from it or stand alone.

---

## 1. How the two languages are delivered

**Decision**: Two static HTML entry points built from one shared React application.
`index.html` carries `lang="es"`, `en/index.html` carries `lang="en"`, each with its own real
`<title>`, meta description, and Open Graph tags written into the HTML. Vite is configured for a
multi-page build. The React app reads `document.documentElement.lang` at startup and selects its
content accordingly.

**Rationale**: Three separate constraints all point here, which is what makes the decision safe
rather than merely reasonable.

- Constitution Principle II requires page metadata to live in `index.html`. A client-rendered
  language switch cannot satisfy this for the second language: the metadata would only become
  correct after JavaScript runs, and social and search crawlers commonly do not run it. FR-041
  would be satisfied in appearance only.
- The constitution forbids routers. Two static files need no routing at all — each language is
  a document, and sections are anchors within it.
- FR-048 requires every advertised link to resolve when opened directly. Static files do this
  inherently. The client-routing alternative needs a Vercel rewrite, and if that rewrite is ever
  missing or wrong, `/en` returns 404 for exactly the recruiter who was sent that link.

**Alternatives considered**:

- *One page, language held in React state, paths `/es` and `/en` via client routing.* Rejected:
  needs a router (forbidden), needs a `vercel.json` rewrite, and breaks per-language metadata.
- *One page, language as a query parameter (`?lang=en`).* Rejected: no router needed, but
  metadata is still client-side only, and a query-string URL is worse to put on a CV.
- *Language as a hash (`#en`).* Rejected: same metadata problem, and search engines treat the
  two as one page, so the English version would never rank on its own.
- *Two entirely separate React apps.* Rejected as duplication: the components and data are
  identical, only the strings differ.

**Cost accepted**: `vite.config.js` gains a `rollupOptions.input` map with two entries, and the
`en/index.html` file must be kept in step with `index.html` when the shell changes. This is a few
lines of configuration against three constraints satisfied.

---

## 2. First-visit language selection, without a flash or a redirect loop

**Decision**: A small inline script in the `<head>` of the **Spanish page only**, running before
React mounts. It reads a stored preference, falls back to `navigator.language`, and calls
`location.replace('/en/')` when English wins. The English page never redirects. An explicit use
of the language switch writes the preference, so a visitor who chooses Spanish is not bounced to
English on their next visit.

**Rationale**: FR-037 requires the initial language to follow the browser preference, and FR-036
requires the choice to be remembered. Doing this after React mounts would render Spanish, then
replace it with English — a visible flash that costs the layout-shift budget in SC-008. Running
before first paint avoids it. Restricting the redirect to the root page makes a loop structurally
impossible: only one of the two pages can ever redirect, so there is nothing to bounce between.
`location.replace` rather than `location.href` keeps the back button working, so a redirected
visitor can still return to where they came from.

**Alternatives considered**:

- *Redirect from both pages based on preference.* Rejected: a stale or conflicting preference
  can ping-pong between the two.
- *No redirect, switch offered but never automatic.* Rejected: fails FR-037.
- *Server-side language negotiation via `Accept-Language`.* Rejected: requires a server runtime,
  which Principle II forbids.

**Detail that matters**: both pages carry `<link rel="alternate" hreflang="es" …>` and
`hreflang="en"`, plus `x-default` pointing at the Spanish page, so search engines index both
correctly regardless of the JavaScript redirect.

---

## 3. Which `react-bootstrap` components are actually used

**Decision**: `Navbar` only, imported individually. Every other element — project cards, filter
controls, skill chips, timeline entries — is hand-written semantic HTML styled against the
FR-026 tokens. Bootstrap's stylesheet is used for its reset, grid, and a small set of layout
utilities; all visual styling is custom.

**Rationale**: `Navbar` earns its place because its collapse behaviour on small screens is the
one genuinely stateful, accessibility-sensitive widget on the page, and getting the focus
management and ARIA right by hand is work already done here. Nothing else on the page has that
property. Using `Card`, `Badge`, or `Button` would pull Bootstrap's visual identity into a design
brief that explicitly asks for something original and minimalist (FR-025), and would then need
overriding anyway.

**Alternatives considered**:

- *Use react-bootstrap throughout for consistency.* Rejected: fights FR-025, and each component
  adds bytes that custom markup does not.
- *Avoid react-bootstrap entirely and hand-write the navbar.* Attractive under Principle I, but
  the constitution mandates the library; see Complexity Tracking in the plan. Using it for the
  one component where it genuinely helps is the honest middle.
- *`Modal` for project detail.* Rejected under YAGNI: the project card links to the repository,
  which already holds a fuller README than a modal would show.

---

## 4. Typography

**Decision**: One self-hosted condensed grotesque for the name and headings, subset to Latin,
`woff2`, preloaded, with `font-display: swap`. Body text uses a system sans stack. The
letterspaced technical labels, on chips and the subtitle, use a **system monospace stack** with
wide `letter-spacing`, at no download cost.

**Rationale**: The banner's character comes from the contrast between a heavy condensed display
face and wide-tracked technical labels. The display face carries the identity and cannot be
reproduced by a system stack, so it justifies its bytes under Principle IV. The labels depend on
tracking and case far more than on the specific typeface, so a system monospace gets close enough
to be worth zero bytes. Preloading and `swap` keep the font off the critical path for SC-004.

**Open item for the owner**: the exact display face used in the banner is not recorded here.
If an exact match matters, it can be read off the "Industry" design system the palette came
from. Otherwise a condensed grotesque with a heavy weight, in the manner of Archivo Narrow,
Barlow Condensed, or Saira Condensed, matches the banner's proportions. This is a visual
preference and does not block implementation: the font family is a single token in `tokens.css`.

**Alternatives considered**:

- *Two webfonts, display and mono.* Rejected: roughly 20 kB more for a difference most visitors
  would not notice.
- *System fonts only.* Rejected: cheapest, but the page would read as undesigned, which fails
  the "original" half of FR-025.
- *Google Fonts via their CDN.* Rejected: the constitution asks for self-hosting where practical,
  and a third-party stylesheet adds a DNS lookup and a connection on the critical path.

---

## 5. How the technology groupings are decided

**Decision**: Groupings are declared by hand in `src/data/technologies.js`, and each project
declares which of them it belongs to. Counts, the set of visible filters, and the
"demonstrated" flag on each skill are derived at render time from the project data, never typed
in.

**Rationale**: FR-015 requires groupings meaningful to a recruiter rather than GitHub's language
detection, and the spec's own inventory shows why: the detection reports `Batchfile`,
`PowerShell`, and a misdetected `Hack`, while missing that `DigestoUNSL` is React and that
`MyCarApp` uses CodeIgniter. The READMEs carry the truth, and a human has to transfer it once.
Deriving the counts rather than storing them is what makes FR-016 and SC-009 real — the owner
adds a project and the counts cannot disagree with the data.

**Starting groupings**, from the READMEs, subject to the owner's revision: Go, React,
JavaScript, PHP, Java and Android, PostgreSQL, MySQL, Docker.

**On PHP specifically**, which the spec deferred here: PHP is included as a first-class grouping.
It backs half the published work, and a portfolio that hides its largest body of evidence is
worse than one that shows it. The positioning concern is handled by ordering (FR-017) rather than
by omission — the featured ordering leads with Go and React, and PHP appears in full below.

**Alternatives considered**:

- *Read languages from the GitHub API at build time.* Rejected: reintroduces the noise FR-015
  exists to exclude, and would need a token or rate-limit handling.
- *Derive groupings from a per-project free-text stack string.* Rejected: typos silently create
  duplicate groupings such as "Javascript" and "JavaScript".

---

## 6. The filter interaction, and making it accessible

**Decision**: The filters are a list of `<button>` elements in a labelled group, each carrying
`aria-pressed`. The active filter is marked by a text indicator and a shape change, not by
colour alone. The result count lives in an `aria-live="polite"` region that updates on every
filter change. Selecting a filter does not change the URL.

**Rationale**: FR-028 forbids colour as the only signal, and the spec's acceptance scenario for
screen-reader users requires the change and the resulting count to be announced. `aria-pressed`
on a button is the correct pattern for a toggle that filters in place; tabs would imply
navigation between panels, which is not what happens. Keeping the URL unchanged is deliberate
under Principle I — a filter is a transient view, not a destination worth linking, and encoding
it in the URL would mean reconciling it with the language redirect for no stated requirement.

**Alternatives considered**:

- *A `<select>` dropdown.* Rejected: hides the per-technology counts that FR-010 requires to be
  visible before interaction.
- *Checkboxes for multi-select.* Rejected under YAGNI: FR-011 asks for one technology at a time.
- *Encoding the filter in the URL hash.* Rejected: conflicts with section anchors and with the
  language redirect, for no requirement.

---

## 7. Project images

**Decision**: Use the screenshots already committed under `docs/screenshots/` in
`RedSocialArtesanos` and `TyH-Noticias`. Convert to WebP, size to the card's rendered dimensions
at 2×, and commit under `public/img/projects/`. Projects without a screenshot use a consistent
generated placeholder built from the palette. Every image carries explicit `width` and `height`.

**Rationale**: FR-040 and SC-008 require reserved space before load, which is what the explicit
dimensions do. Copying the files into this repository rather than hot-linking to GitHub keeps
the page self-contained and avoids a third-party request on the critical path, which Principle IV
discourages. Real screenshots exist for two projects and inventing visuals for the rest would be
dishonest; the placeholder makes their absence look deliberate instead of broken.

**Alternatives considered**:

- *Hot-link the raw GitHub URLs.* Rejected: an external dependency on every page load, and the
  images break if a repository is renamed.
- *Screenshot every project now.* Rejected as out of scope: several projects need a running
  database to screenshot. The owner can add images later, one field per project.

---

## 8. What is tested, and what is not

**Decision**: Vitest covers two things. `tests/derive.test.js` tests the pure functions in
`src/lib/derive.js`: filtering, counting, and the demonstrated-skill flag. `tests/content.test.js`
enforces content integrity: every project has a description in both languages, every technology a
project references exists, every required profile field is present, and no placeholder marker
survives. No component rendering tests.

**Rationale**: Principle V asks for automated tests where there is logic, and the derivations are
the only logic on the page. The content test is the higher-value of the two: FR-032 declares an
untranslated string a defect rather than an acceptable state, and a test is the only thing that
makes that declaration enforceable. Without it, a half-translated release is caught by a human or
not at all. Component rendering tests are omitted under Principle I: they would mostly assert
that React renders what it was given, at a real maintenance cost.

**Alternatives considered**:

- *End-to-end tests with Playwright.* Rejected for this size: the browser verification and the
  Lighthouse run in the quickstart cover the same ground for a one-page site without adding a
  browser automation dependency.
- *No tests, manual verification only.* Rejected: it leaves FR-032 unenforceable.

---

## 9. JavaScript budget

**Decision**: Ship a single bundle, no code splitting.

**Estimated cost**, gzipped: React and React DOM around 45 kB, `react-bootstrap`'s `Navbar` with
its dependencies around 15 kB, application code and content around 10 kB. Roughly **70 kB against
a 200 kB budget**. Bootstrap's stylesheet adds around 30 kB of CSS, which the constitution's
JavaScript budget does not count but which the Lighthouse target does.

**Rationale**: Principle IV suggests splitting non-critical code with `React.lazy`, but at this
size splitting would add loading states and complexity to save nothing — the whole bundle is
smaller than the threshold at which splitting begins to pay. Principle I says not to add it.

**Trigger for revisiting**: if the bundle passes roughly 120 kB gzipped, or if Lighthouse
Performance drops below 92 on mobile, split the projects section out. Recorded so the decision
can be revisited on evidence rather than on feeling.

---

## 10. Vercel specifics worth knowing before the first deploy

**Decision**: No `vercel.json`. Import the repository, accept the detected Vite preset, deploy.

**Rationale**: With two static entry points there is nothing to rewrite or redirect at the
platform level. Vercel serves `dist/en/index.html` for `/en/` from the build output directly.

**To verify on the first deploy, rather than assume**: that `/en` without a trailing slash
resolves rather than 404s. Vercel normally normalises this to `/en/`, but it depends on the
project's trailing-slash setting and is cheaper to check than to reason about. If it does not
resolve, the fix is one line — `{ "cleanUrls": true }` in `vercel.json`, or an explicit redirect
from `/en` to `/en/`. This check is in the quickstart.

**Also confirmed against the free plan**: a static site of this size sits far inside the Hobby
limits, and nothing in this design requires a paid feature. The plan's only standing caution is
the Hobby plan's personal, non-commercial terms, which a personal portfolio satisfies.

---

## Summary of what changed from the spec

Nothing in the spec is contradicted. Two items it left open are now closed:

| Spec item | Resolution |
|-----------|------------|
| FR-038 / FR-041 delivery approach, left to the plan | Two static entry points, forced by constitution Principle II |
| PHP's prominence as a grouping, deferred from the spec | Included as a first-class grouping; positioning handled by FR-017 ordering |

One new item is raised for the owner and does not block work: the exact display typeface, see
section 4.
