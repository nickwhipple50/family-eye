# Component Library

Shared Astro components used across all T1 kits. Defined once in `packages/components`. Consumed by every kit and every client project via npm workspace linking.

These components are the system. Do not modify them for a client project. If a component doesn't do what a client needs, the answer is either a prop that already exists, a variant you've missed, or a T2 conversation.

---

## Rules that apply to every component

- Props are documented below with their types and defaults. Never pass undeclared props.
- No component accepts more than 6 props. If you think you need a 7th, stop and talk to web lead.
- All styling goes through design tokens. No inline styles, no hard-coded colour values, no one-off classes.
- All content that appears on the page must come through a prop or a slot. Nothing hardcoded in the component markup.
- CMS-driven components receive their data as props passed down from the page — they do not fetch their own data.

---

## Hero

Three layout variants for the primary page header. Used once per page, always first.

**Variants:** `centered` · `split` · `fullbleed`

| Prop         | Type                                   | Default      | Notes                                      |
| ------------ | -------------------------------------- | ------------ | ------------------------------------------ |
| `variant`    | `'centered' \| 'split' \| 'fullbleed'` | `'centered'` | Controls layout                            |
| `heading`    | `string`                               | —            | Required                                   |
| `subheading` | `string`                               | `undefined`  | Optional supporting line                   |
| `ctaLabel`   | `string`                               | `undefined`  | Primary CTA button label                   |
| `ctaHref`    | `string`                               | `undefined`  | Primary CTA destination                    |
| `image`      | `ImageMetadata`                        | `undefined`  | Required for `split` and `fullbleed`       |
| `imageAlt`   | `string`                               | `''`         | Alt text — always populate if image is set |

**Notes:**

- `centered` — heading and CTA centred, no image
- `split` — heading left, image right
- `fullbleed` — image fills background, text overlaid
- Hero image is never lazy-loaded — explicit `loading="eager"` is set internally
- Do not use Hero mid-page. It is a page-entry component only.

---

## FeatureGrid

Icon, heading, and short text in a 3–4 column grid. Communicates service pillars, benefits, or differentiators.

| Prop      | Type            | Default     | Notes                               |
| --------- | --------------- | ----------- | ----------------------------------- |
| `heading` | `string`        | `undefined` | Optional section heading above grid |
| `items`   | `FeatureItem[]` | —           | Required. See type below            |
| `columns` | `3 \| 4`        | `3`         | Grid column count                   |

**`FeatureItem` type:**

```ts
{
  icon: string; // inline SVG string
  heading: string;
  body: string;
}
```

**Notes:**

- Maximum 8 items. Beyond that the grid reads as a list — use `ServiceList` instead.
- Icons must be inline SVG. No icon font, no external image URLs.
- `body` should be 1–2 sentences. Component does not truncate — long copy breaks the grid rhythm.

---

## ServiceList

Vertically stacked or grid-arranged list of services. CMS-driven. Primary content block on Services pages.

| Prop      | Type                | Default   | Notes                                       |
| --------- | ------------------- | --------- | ------------------------------------------- |
| `items`   | `ServiceItem[]`     | —         | Required                                    |
| `layout`  | `'stack' \| 'grid'` | `'stack'` | Stack = full-width rows. Grid = card layout |
| `showCta` | `boolean`           | `false`   | Appends a CTA link to each item             |

**`ServiceItem` type:**

```ts
{
  title: string
  description: string
  href?: string       // Required if showCta is true
}
```

**Notes:**

- No item limit, but beyond ~10 consider whether the page needs pagination or a filtered archive — which is T3.
- `grid` layout works best at 3–6 items. `stack` works at any count.

---

## TestimonialRow

A row of testimonial cards. Static or CMS-driven.

| Prop      | Type                | Default     | Notes                    |
| --------- | ------------------- | ----------- | ------------------------ |
| `items`   | `TestimonialItem[]` | —           | Required                 |
| `heading` | `string`            | `undefined` | Optional section heading |

**`TestimonialItem` type:**

```ts
{
  quote: string
  author: string
  role?: string
  company?: string
  photo?: ImageMetadata
  photoAlt?: string
}
```

**Notes:**

- Maximum 6 items. This is a system constraint, not a suggestion — beyond 6, use the Testimonial Carousel add-on (sold separately) or reduce the count.
- `photo` is optional. If omitted, an avatar placeholder renders.
- Do not manufacture testimonials. Populate from real client-supplied copy only.

---

## CTABand

Full-width strip with a heading and one or two calls to action. Used to break up page flow and drive conversion. Often placed before the footer.

| Prop             | Type     | Default     | Notes                               |
| ---------------- | -------- | ----------- | ----------------------------------- |
| `heading`        | `string` | —           | Required                            |
| `subheading`     | `string` | `undefined` | Optional supporting line            |
| `primaryLabel`   | `string` | —           | Required                            |
| `primaryHref`    | `string` | —           | Required                            |
| `secondaryLabel` | `string` | `undefined` | Optional second CTA                 |
| `secondaryHref`  | `string` | `undefined` | Required if `secondaryLabel` is set |

**Notes:**

- Background colour pulls from `--color-brand-primary` by default. Override via token only.
- One CTABand per page is standard. Two is acceptable if the page is long. Three is a copy problem, not a component problem.

---

## LogoBar

Horizontal strip of client or partner logos. Supports optional marquee (auto-scrolling) for social proof sections.

| Prop      | Type         | Default     | Notes                                         |
| --------- | ------------ | ----------- | --------------------------------------------- |
| `logos`   | `LogoItem[]` | —           | Required                                      |
| `heading` | `string`     | `undefined` | Optional label above logos, e.g. "Trusted by" |
| `marquee` | `boolean`    | `false`     | Enables continuous scroll animation           |

**`LogoItem` type:**

```ts
{
  src: ImageMetadata;
  alt: string; // Company name — always populate
}
```

**Notes:**

- Logos should be SVG or high-resolution PNG with transparent backgrounds.
- `marquee: true` duplicates the logo set internally for seamless looping — do not manually duplicate items in the array.
- If logos vary significantly in aspect ratio, they will look uneven. Flag to client and ask for consistent-format assets.

---

## StatsRow

Three or four statistics with animated counters. Scroll-triggered — counters run once when the section enters the viewport.

| Prop    | Type         | Default | Notes    |
| ------- | ------------ | ------- | -------- |
| `items` | `StatItem[]` | —       | Required |

**`StatItem` type:**

```ts
{
  value: number
  suffix?: string     // e.g. '+', '%', 'k'
  label: string
}
```

**Notes:**

- 3–4 items only. The layout does not accommodate more without breaking.
- Animation respects `prefers-reduced-motion` — counters display their final value immediately if the user has reduced motion enabled.
- `value` must be a number. Formatting (commas, decimal places) is handled internally via `toLocaleString()`.

---

## TeamGrid

Grid of team member cards. CMS-driven.

| Prop      | Type           | Default     | Notes                    |
| --------- | -------------- | ----------- | ------------------------ |
| `items`   | `TeamMember[]` | —           | Required                 |
| `heading` | `string`       | `undefined` | Optional section heading |

**`TeamMember` type:**

```ts
{
  name: string
  role: string
  bio?: string
  photo: ImageMetadata
  photoAlt: string
}
```

**Notes:**

- Grid is responsive — no column count prop. Layout adjusts automatically.
- `photo` is required. A team grid without photos is a list — use `ServiceList` instead.
- `bio` is optional. If included, keep it to 2–3 sentences. Component does not truncate.

---

## FAQAccordion

Expand/collapse FAQ list. Lightweight JS — no library dependency.

| Prop      | Type        | Default     | Notes                    |
| --------- | ----------- | ----------- | ------------------------ |
| `items`   | `FAQItem[]` | —           | Required                 |
| `heading` | `string`    | `undefined` | Optional section heading |

**`FAQItem` type:**

```ts
{
  question: string;
  answer: string; // Plain text or basic HTML — not Markdown
}
```

**Notes:**

- No item limit, but 8–12 is a reasonable ceiling before the page becomes unwieldy.
- The first item is open by default. This is not configurable via prop.
- `answer` accepts basic HTML (`<a>`, `<strong>`, `<br>`). Do not pass Markdown strings — they will render as raw text.
- `FAQPage` JSON-LD is generated automatically from the items array on kits where it is configured. Do not add it manually.

---

## ContactForm + ContactSection

The contact section is a composite — it wraps the form with kit-configured surrounding content (heading, contact details, optional map embed). The form itself is the submission mechanism.

These are treated as one unit. You configure the section; the form is internal to it.

| Prop       | Type     | Default          | Notes                                                    |
| ---------- | -------- | ---------------- | -------------------------------------------------------- |
| `heading`  | `string` | `'Get in touch'` | Section heading                                          |
| `intro`    | `string` | `undefined`      | Optional paragraph above form                            |
| `phone`    | `string` | `undefined`      | Displayed alongside form if provided                     |
| `email`    | `string` | `undefined`      | Displayed alongside form if provided                     |
| `address`  | `string` | `undefined`      | Displayed alongside form if provided                     |
| `mapEmbed` | `string` | `undefined`      | Google Maps embed `src` URL — not the full iframe markup |

**Notes:**

- Form fields are pre-configured per kit. Do not add or remove fields at the component level — that is a kit-level configuration.
- Form submission target is set via the `PUBLIC_FORM_ENDPOINT` environment variable. Set this before QA.
- `mapEmbed` takes the `src` URL from a Google Maps embed iframe, not the full iframe HTML. The component wraps it.
- Phone number display format is not enforced — pass it exactly as the client wants it displayed.

**Kit-specific contact defaults:**

| Kit                   | Emphasis                               |
| --------------------- | -------------------------------------- |
| Service business      | Phone prominent + service area map     |
| Professional services | Consultation framing                   |
| Health & wellness     | Warm tone — intake or booking language |
| Restaurant            | Reservation + event inquiry            |
| Real estate           | Buyer/seller qualifier fields          |
| Personal brand        | Speaking / collab / press routing      |
| SaaS / startup        | Support vs. sales routing              |

These defaults are pre-set in each kit. Changing the framing is a content decision. Changing the fields is a kit modification — talk to web lead.

---

## Adding a new component

Do not add new components without web lead involvement. If a client project needs something the library doesn't cover:

1. Check whether an existing component with different props solves it
2. Check whether it belongs in the kit rather than the shared library
3. If it genuinely belongs in the library — raise it with web lead before writing any code

A component added to `packages/components` affects every kit and every active client project. It is a system change, not a project task.
