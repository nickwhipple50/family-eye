# Add-on Catalogue

All enhancements available for T1 Launchpad projects. Split into two sections: what ships in every kit by default, and what is scoped and sold separately.

---

## System defaults

These are built into the component library and ship in every kit. They require no per-project decisions and are not sold separately. They are not features — they are the baseline.

### Visual

**Staggered group reveals**
Card-based layouts (FeatureGrid, TeamGrid) animate children in sequentially on scroll. Driven by `[data-reveal-group]` on the container and CSS `transition-delay` stepped by child index. One IntersectionObserver call. No JS per-element.

**Mesh gradient backgrounds**
Hero and CTABand backgrounds use two overlapping radial gradients via `--color-mesh-a` and `--color-mesh-b` tokens. Values set in `theme.css` per project. Optional slow drift animation via CSS keyframe — no JS.

**Noise texture overlay**
Fine SVG grain over coloured sections via `::after` pseudo-element. Inline SVG — no HTTP request. Opacity controlled by `--noise-opacity` token.

**Card hover depth**
Three-layer `box-shadow` on hover combined with `translateY(-4px) scale(1.01)`. Shadow derived from `color-mix()` against the shadow token. Applied to all card components.

**Gradient text headings**
CSS `background-clip: text` on selected headings. Controlled by `--color-heading-grad-a` and `--color-heading-grad-b` tokens. Opt-in via class — not applied universally.

**Section dividers — organic shapes**
CSS `clip-path` shapes (wave, angle, curve) as `::before` pseudo-elements on sections. Four variants available as token values. Colour matches the preceding section background.

**Floating contact button**
Fixed CTA in the bottom-right corner. Hidden until user scrolls past the hero. Enters via fade-up, pulses via `box-shadow` animation. Label and URL from `site_settings` CMS. Kit defaults: "Call us" / "Book now" / "Request a quote."

**Social proof bar**
Slim full-width band below the hero. Star rating, customer count, years in business, service area — pipe-separated. CMS-managed via `site_settings`. No JS.

**Sticky section headers**
Section headings on long pages (Services, Menu) pin to the top of the viewport while the user scrolls through that section. Pure CSS — `position: sticky; top: var(--nav-height)`.

**Frosted glass nav on scroll**
Nav starts transparent over the hero. IntersectionObserver on a 1px sentinel at the hero bottom adds `nav--scrolled` class, applying `backdrop-filter: blur(12px)` and a semi-transparent background. CSS transition only.

**OG image generation**
Build-time OG images via Satori. Each page's title and site name rendered into a branded PNG at `/og/[slug].png`. Build-time-only dependency — nothing added to the client bundle.

**Skeleton loading states**
Shimmer placeholders for image-heavy components (TeamGrid, TestimonialRow) while images load. Matches the layout of the real content. Eliminates perceived layout shift.

**`content-visibility: auto` on below-fold sections**
Applied via `.section--deferred` to everything below the fold. Paired with `contain-intrinsic-size` to prevent scrollbar jump. Measurable Lighthouse improvement on long pages. No JS.

**Eased stat counters**
StatsRow counter animation uses `easeOutQuart` via `requestAnimationFrame`. Numbers decelerate as they approach their final value. Comma formatting via `toLocaleString()`. Respects `prefers-reduced-motion`.

**Structured data for reviews**
Service Business and Health & Wellness kits generate `AggregateRating` and `Review` JSON-LD from the reviews CMS collection at build time. Unlocks star ratings in Google search results. No additional client input required.

### Interaction

**Magnetic CTA buttons**
Hero CTA and any `[data-magnetic]` element shifts slightly toward the cursor on `mousemove`. `0.25` multiplier. Resets on `mouseleave`. Desktop only.

**Native `<dialog>` lightbox**
Full-screen image overlay using the browser's native `<dialog>` element. No library. Focus trapping and keyboard behaviour (`Escape` to close) handled natively by the browser.

**Keyboard-trapped mobile nav**
Focus trapping, `Escape` to close, focus return to toggle on close. `aria-hidden` and `aria-expanded` managed correctly. WCAG 2.1 AA compliant.

**Lazy module initialisation**
All module initialisation wrapped in an IntersectionObserver with a `200px` root margin. Modules initialise just before entering the viewport rather than all at once on load. Reduces main-thread burst on initial page load.

### Accessibility and standards

**`focus-visible` styles**
`3px solid var(--color-focus-ring)` with `outline-offset: 3px`. Dark surface override for fullbleed and CTABand contexts. WCAG 2.1 AA compliant.

**`prefers-contrast: more` support**
`@media (prefers-contrast: more)` block in `tokens.css` overrides text and border tokens to maximum contrast. Invisible to standard users. Makes the site pass accessibility reviews for high-contrast OS settings without any additional work.

**`prefers-color-scheme` dark mode (base support)**
The token system is structured to support dark mode overrides. Whether a kit opts in is a per-project decision — see Dark Mode in the paid add-ons below.

### Technical and SEO

**`theme-color` meta + PWA manifest**
`<meta name="theme-color">` sets browser chrome colour on Android. Minimal `manifest.json` makes Add to Home Screen work correctly. No service worker required.

**Print stylesheet**
`@media print` styles on the Contact page. Removes nav and decoration. Preserves address, phone, hours, and map. Relevant for Restaurant and Service Business clients.

**Offline fallback page**
Minimal service worker caches `/offline.html`. Visitors see a branded page on navigation failures rather than a browser error. Intentionally minimal — no full offline caching.

**RSS feed**
`@astrojs/rss` generates `/feed.xml` for Press and relevant content collections (Personal Brand kit). Feed URL in `<head>` and `robots.txt`.

**`humans.txt`**
`/humans.txt` crediting MMM. Informal web standard. Shows up in crawls.

**Changelog page**
`/changelog` in every kit. `noindex`, excluded from sitemap. Static Markdown — updated at deploy. The QA script checks this file has been updated within 30 days of the deploy date.

---

## Paid add-ons

Scoped and sold before project start. Not retrofitted mid-project. Each add-on lives in `add-ons/<category>/<name>/` in the repo with its own README covering installation steps, required assets, and any CWV notes.

If an add-on is not in this catalogue, it does not exist yet. Do not improvise a one-off solution — raise it with web lead to decide whether it belongs in the system.

---

### Motion package — ~$500–800

The highest-leverage add-on in the catalogue. GSAP and Lenis are most effective sold together — the combination is what makes a T1 site read as a substantially more expensive build.

> **CWV requirement:** GSAP ScrollTrigger and Lenis both require a CWV audit before client delivery. Do not mark either as complete without a passing audit.

| Feature             | What it does                                                                           | Kit fit                                     |
| ------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| GSAP ScrollTrigger  | Scroll-linked section animations — content pins, cards animate in from position        | Service Business, SaaS/Startup, Real Estate |
| Lenis smooth scroll | Replaces native scroll with momentum-based deceleration                                | All kits                                    |
| Page transitions    | Branded curtain wipe or directional slide between pages via Astro View Transitions API | All kits                                    |
| Parallax hero image | Fullbleed hero image moves at 0.35× scroll rate. Desktop only — disabled on touch      | All kits with fullbleed hero variant        |
| Split text heading  | Hero heading words animate in sequentially on load. Works best at ≤8 words             | Centered and fullbleed hero variants only   |
| Custom cursor       | Branded trailing circle cursor with `mix-blend-mode: multiply`. Desktop only           | Personal Brand, SaaS/Startup                |

**Implementation notes:**

- All motion must be disabled under `prefers-reduced-motion` — no exceptions
- Custom cursor and parallax must be disabled on touch devices via `@media (hover: none)`
- Page transitions require all animation init functions to register `astro:page-load` listeners — modules that don't do this will break after navigation
- GSAP ScrollTrigger adds ~30kb gzipped to the bundle — document this in the CWV audit

---

### Premium interactions — ~$300–500

Interaction enhancements that go beyond the system defaults. Each can be scoped individually or as a package.

| Feature               | What it does                                                                                        | Kit fit                                          | Asset requirements                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| Testimonial carousel  | Lightweight auto-advancing carousel for TestimonialRow. No Swiper. Pauses on hover. Dot indicators. | Service Business, Health & Wellness, Real Estate | None                                                                 |
| Before/after slider   | Drag handle between two images using Pointer Events API. Mouse and touch identical.                 | Real Estate, Health & Wellness                   | Two matched images from client                                       |
| Ambient video section | Silent looping video in place of a static image in the ContentMedia layout                          | All kits                                         | `.mp4`, H.264, ≤10s, loopable, under 5MB — specify this in the brief |
| Native cookie consent | `<dialog>`-based consent banner. GA/GTM held behind `mmm:consent-granted` event until accepted.     | All kits with analytics                          | Legal copy from client                                               |

**Implementation notes:**

- Ambient video: do not begin implementation without the client's video file. Specify format and size requirements explicitly in the project brief — clients will send large files if not told otherwise. Disabled under `prefers-reduced-motion`.
- Cookie consent: the technical implementation is MMM's responsibility. What the banner says is the client's responsibility. Do not write legal copy.

---

### Dark mode — ~$200–300

A second token set in `theme.css` scoped to `@media (prefers-color-scheme: dark)`. Responds to OS preference automatically — no toggle UI required.

**Best fit:** Restaurant, Personal Brand, SaaS/Startup

**Poor fit:** Service Business, Professional Services — these brands typically don't translate well to dark context without significant design work that is not included in this add-on price.

**Notes:**

- This is a project-start decision. It cannot be cleanly retrofitted after `theme.css` has been finalised without a full theme review.
- Surface, text, border, and brand tokens all need dark variants — this is not just inverting backgrounds.
- If the client's brand colours don't have sufficient contrast on dark surfaces, that is a design problem that needs resolving before implementation begins, not during.

---

### Edge features — ~$300–400

Netlify Edge Function enhancements. Each is independent and can be scoped individually.

| Feature                | What it does                                                                                                                    | Kit fit                                                             | Pre-scope check                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| View counter           | Per-page visit counter via Netlify Blobs. Surfaces on listing or content pages as a subtle signal.                              | Real Estate (listing views), Personal Brand (case study popularity) | Confirm Netlify Blobs is available on the client's Netlify plan                             |
| Smart spam filtering   | Edge function in front of the form endpoint. Rate limiting (5/IP/hour), bad actor IP blocking, pattern rejection. No reCAPTCHA. | All kits                                                            | None                                                                                        |
| Dynamic business hours | "Open now" / "Closed — opens at Xam" badge injected at the edge from `site_settings` CMS data. Timezone-aware.                  | Restaurant, Service Business, Health & Wellness                     | Client must have consistent, predictable hours — not suitable for highly variable schedules |

**Notes:**

- View counter requires Netlify Blobs — confirm availability on the client's plan before including in a quote. It is not available on all Netlify tiers.
- Edge functions are deployed with the site. Test on a Netlify preview deploy, not just the local dev server.

---

## Approval and CWV requirements — summary

| Add-on                         | CWV audit required                      | Web lead approval required |
| ------------------------------ | --------------------------------------- | -------------------------- |
| GSAP ScrollTrigger             | Yes — before client delivery            | Yes                        |
| Lenis smooth scroll            | Yes — particularly on mid-range Android | Yes                        |
| Page transitions               | Recommended                             | No                         |
| Parallax hero                  | Recommended                             | No                         |
| Custom cursor                  | No                                      | No                         |
| Split text heading             | No                                      | No                         |
| All interactions package items | No                                      | No                         |
| Dark mode                      | No                                      | No                         |
| Edge features                  | No                                      | No                         |

**Universal motion rules — no exceptions:**

- All motion add-ons disabled under `prefers-reduced-motion`
- Custom cursor and parallax disabled on touch devices via `@media (hover: none)`
- Ambient video disabled under `prefers-reduced-motion`
