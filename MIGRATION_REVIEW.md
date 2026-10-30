# Portfolio 03 migration review

Implemented locally on 30 October 2026. Nothing was pushed, merged or deployed.

Preview the production build at `http://127.0.0.1:4173/` while the preview process is running. To restart it, use `npm run build` followed by `npm run preview -- --host 127.0.0.1 --port 4173`.

## Reference and factual decisions

- Visual source: `C:/Users/Adam Jattiem/Desktop/PORTFOLIO DESIGNS/Adam_Portfolio_3_With_CV.html`. The filename with `(1)` was not present; the supplied file without that suffix was used.
- CV source: `C:/Users/Adam Jattiem/Downloads/Adam Jattiem CV (V2).pdf`. Copied unchanged into `public/Adam Jattiem CV.pdf`.
- Modified the existing checkout; no replacement repository, iframe, compiled reference application or framework migration.
- The existing deletion of `repomix-output.xml` was left untouched. The referenced ZIP was not present and was not needed for this checkout.
- The HTML says the YouthCode programme is completed. The CV says April 2026–April 2027, in progress. The implementation identifies the programme as in progress and the April–September 2026 practical phase as completed.
- Added the CV's LC Studio internship, October 2026–present, and Linux Unhatched, in progress. Kept the completed Cisco courses and credential links.
- Preserved project descriptions and team credits, with Market Pulse wording narrowed to Adam's scraping/extraction responsibilities. Removed the unsupported 20%/80% reliability sentence. The architecture notes retain the source-specific data feeds from the HTML; no additional performance claims were introduced.

## Implementation and files

Modified:

- `src/App.vue`: page shell, scroll progress, shared motion state, reveals and offscreen animation observers with cleanup.
- `src/views/HomeView.vue`: composes the reference sections in their original order.
- `src/views/ProjectsView.vue`: original exhibition, synchronized project state, previous/next/index navigation, keyboard arrows, swipe support, transitions and build notes. Selection never calls `scrollIntoView`.
- `src/views/SkillsView.vue`: original graphical layers, accessible category buttons and synchronized descriptions.
- `src/views/AboutView.vue`: original photograph, portrait rays, editorial panels and biography, including the current internship.
- `src/views/EducationView.vue`: education/Cisco disclosures and accurate completion labels.
- `src/views/ContactView.vue`: original form and Formspree endpoint, validation, loading feedback, request timeout, server/network errors and field retention after failure. Added the CV's direct email link.
- `src/components/TheHeader.vue`: original navigation and branding, mobile disclosure, Escape/focus handling and active section indication.
- `src/components/TheFooter.vue`: original footer and social destinations.
- `src/data/projects.js`: original project data with extracted screenshot paths and contribution clarifications.
- `src/assets/main.css`: recovered reference styles, formatted for reading, plus small Vue-specific motion and stable-height fixes.
- `src/router/index.js`: legacy routes, `/certifications` alias, font-aware initial section positioning and sticky-header offsets.
- `index.html`: reference metadata and title.
- `.gitignore`: excludes local reference captures, browser profiles and temporary verification tools in `.migration/`.
- `src/main.js`: final newline only; application bootstrap is unchanged.

Added:

- `src/components/HeroSection.vue`: original cosmic hero, deterministic stars, map disclosure, shared motion toggle and pointer depth.
- `src/components/TechnicalCaseStudies.vue`: FoodBoxx and Market Pulse disclosures, selectable SVG components, keyboard support and engineering descriptions.
- `src/data/skills.js` and `src/data/caseStudies.js`: readable reference content separated from presentation.
- `public/_redirects`: Cloudflare Pages SPA fallback, `/* /index.html 200`.
- `public/Adam Jattiem CV.pdf` and the assets below.
- `scripts/verify-portfolio.mjs`, `scripts/verify-layout.mjs`: repeatable browser checks.
- This review document.

## Extracted assets

All 15 assets in `public/design/` came from embedded data in the supplied HTML:

| Assets | Purpose |
| --- | --- |
| `barlow-condensed-700.woff2`, `barlow-condensed-800.woff2`, `barlow-condensed-800-italic.woff2` | Original display typography |
| `space-grotesk-400.woff2` through `space-grotesk-700.woff2` | Original body typography, four weights |
| `hero-astronaut.svg` | Exact hero illustration, including the original astronaut body, embedded face cutout and adjusted head position; no visor or generated replacement |
| `adam-portrait.png` | Original natural-colour About photograph |
| `contact-telescope.svg` | Original contact illustration |
| `project-foodboxx.png`, `project-market-pulse.png`, `project-moderntech.png`, `project-tutorlink.png`, `project-portfolio.png` | Original five project screenshots |

The face remains embedded inside the original SVG so its positioning and appearance stay intact. No external fonts or generated portraits are required.

## Verification performed

- `npm ci`: restored the repository's existing lockfile versions. No dependency manifest or lockfile changes.
- `npm run build`: passed with locked Vite 8.3.0, Vue 3.5.43 and Vue Router 5.3.1. Final JavaScript approximately 134.45 kB / 50.26 kB gzip; CSS approximately 54.88 kB / 11.97 kB gzip.
- Chromium production preview: 52 interaction assertions passed. Checks cover CV delivery, project navigation/counters/notes, arrow keys, touch input, map, SVG controls, Skills, education/Cisco disclosures, form validation/loading/error/success, scroll progress, six legacy routes, sticky-header positioning, mobile navigation/Escape/focus, manual/system motion and offscreen pausing.
- Formspree requests were intercepted in the browser. Simulated server rejection, network failure and successful response were tested; **no real message was sent**.
- Responsive checks passed at 320, 375, 390, 430, 768, 1024 and 1440 CSS pixels: no document-level horizontal overflow, no broken images, no runtime errors, unchanged exhibition height and unchanged scroll position when switching through all five projects.
- Collapsed project heights by viewport: 1200, 1120, 1120, 1045, 620, 630 and 690 px respectively. Intentionally opening build notes expands the exhibition.
- Rendered the original HTML first. Captured matching reference/application sections at 320, 390, 768 and 1440, including hero, projects, About, Skills, education, Contact and footer. Additional full-page application captures cover all seven requested widths. Visual review confirmed the original composition, fonts, artwork and colours; factual text changes are listed above.
- The reference and production hero PNG captures were byte-identical at all four comparison widths, using the same Chromium viewport and reduced-motion settings. This measurement applies to the hero captures, not to the entire website or every animated frame.
- Found and fixed narrow-screen project-height variation, initial route/header spacing and observers attaching before the router rendered its sections; rechecked the affected behavior.
- The public PDF URL returns the exact supplied bytes. The source PDF, public copy and `dist/Adam Jattiem CV.pdf` share SHA-256 `597373f97f1024082cf715661d17f8babe4a4554a6ac0b8d0e2b1b9831ba33d2`.
- Direct refreshes of `/projects`, `/skills`, `/about`, `/education`, `/certifications` and `/contact` work in production preview. `dist/_redirects` and all design assets are present.

Local screenshots and JSON results are in `.migration/`, excluded from Git. Full-page production captures are `vue-320.png` through `vue-1440.png`; reference/application comparison captures use the `reference-` and `vue-` prefixes.

To rerun browser checks without changing application dependencies, install optional verification tools separately:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd install --prefix .migration/browser-tools playwright
& ./.migration/browser-tools/node_modules/.bin/playwright.cmd install chromium
# In another terminal, start: npm.cmd run preview -- --host 127.0.0.1 --port 4173
node scripts/verify-portfolio.mjs
node scripts/verify-layout.mjs
```

The scripts also accept `PORTFOLIO_URL`, `CHROMIUM_PATH`, or `BROWSER_CDP_URL` environment variables. The current session used an isolated headless Chromium instance through CDP.

## Limits and publishing

- Browser evidence is Chromium desktop/mobile emulation, not physical iOS/Android, Safari, Firefox or screen-reader certification. Visual fidelity was reviewed; no claim of automated pixel-perfect equivalence.
- Live Formspree acceptance/delivery and external project/credential availability were not tested by sending messages or contacting every external service.
- The existing deployed website and its Cloudflare account configuration were not changed or validated. The new PDF URL was verified on the local production preview; check it again after publishing.
- The unchanged lockfile reports two high-severity dependency findings in `npm audit`: `source-map-js` and Vite's development tooling. A dependency update should be reviewed separately. No automatic audit fix was applied.

After local review, commit only the intended migration files, retaining the user's decision about the pre-existing XML deletion. Push the reviewed commit to the branch already connected to the existing Cloudflare Pages project. Keep build command `npm run build` and output directory `dist`; no project setting changes were made. After Cloudflare finishes, check the homepage, direct section URLs and `/Adam%20Jattiem%20CV.pdf`, then perform an explicitly authorized live contact submission if desired.
