# Kit Scaffold Guide

How to set up and deliver a T1 client project. Follow this in order. Do not skip steps or reorder them.

---

## Before you start

You need all of the following before touching any code:

- Access to the `mmm-t1-system` repository
- The completed client intake form
- Kit assignment confirmed by web lead
- Client's brand assets (logo, fonts if supplied, colour values)
- Form submission endpoint confirmed (where does the contact form send?)

If any of these are missing, stop and ask. Do not guess at kit assignment. Do not start without the intake form.

---

## Step 1 — Create the client project

From the repo root, copy the assigned kit into the `clients/` directory:

```bash
cp -r kits/<kit-name> clients/<client-slug>
```

**Slug format:** lowercase, hyphens, no spaces. Match the business name closely.

```
acme-plumbing
jane-doe-physio
harbor-cafe
```

Open `clients/<client-slug>/package.json` and update two fields:

```json
{
  "name": "@mmm-clients/<client-slug>",
  "description": "<Client Name> — <Kit Name> kit"
}
```

From the repo root, install dependencies:

```bash
npm install
```

This links `@mmm/components` through the workspace. Do not install it separately.

Confirm the dev server runs before moving on:

```bash
npm run dev --workspace=clients/<client-slug>
```

If it doesn't start cleanly, fix it now. Do not proceed with a broken dev environment.

---

## Step 2 — Brand the project

Open `clients/<client-slug>/src/styles/theme.css`. This is the only file you edit for branding.

Work through every token group using the intake form:

**Colours**

- `--color-brand-primary` — main brand colour (buttons, accents, links)
- `--color-brand-secondary` — supporting colour
- `--color-brand-accent` — highlight or contrast colour
- `--color-surface-base` — page background
- `--color-surface-raised` — card and section backgrounds
- `--color-text-base` — body text
- `--color-text-muted` — secondary text, captions
- `--color-text-inverse` — text on dark/coloured backgrounds

**Typography**

- `--font-heading` — heading font family
- `--font-body` — body font family
- Font files go in `public/fonts/`. Use `@font-face` in `theme.css`. No Google Fonts — self-hosted only.

**Spacing, radius, motion**

- Adjust `--radius-*` tokens to match the brand feel (sharp vs. rounded)
- Leave `--motion-*` tokens at system defaults unless web lead has specified otherwise

Do not touch `tokens.css` in `packages/components`. That file defines the token names. `theme.css` defines the values. Only `theme.css` changes per project.

When done, eyeball every page in the dev server. The brand should be consistent across all pages before you move on.

---

## Step 3 — Set environment variables

Create `clients/<client-slug>/.env` (this file is gitignored — never commit it):

```
PUBLIC_FORM_ENDPOINT=<form submission URL confirmed in pre-project checklist>
PUBLIC_SITE_URL=<production URL — used for OG tags and sitemap>
```

You will also need to set these in Netlify before deploy (Step 7). Note them somewhere now so you don't forget.

---

## Step 4 — Populate the CMS

Open `clients/<client-slug>/public/admin/config.yml`. The collections are pre-configured for the kit — do not add or remove fields. If a field doesn't exist that the client needs, that is a T2 conversation, not a config change.

Start the CMS locally:

```bash
npm run dev --workspace=clients/<client-slug>
```

Navigate to `http://localhost:4321/admin` and populate content from the intake form:

- Site settings (name, tagline, contact details, social links)
- All page-level content collections
- Images — use the client's supplied assets. Resize before uploading if images are very large (over 2MB). The Astro image pipeline will optimise output, but it won't fix a 12MB source file.

Work through one collection at a time. Don't half-populate and move on — incomplete CMS content will cause component errors if required fields are empty.

**Kit-specific notes:**

| Kit                   | Watch out for                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------- |
| Service business      | Populate Reviews before checking the page — TestimonialRow errors on empty array              |
| Professional services | About page is the highest-value page — give it proper content, not placeholder                |
| Health & wellness     | FAQ — populate with real objections from the intake form, not generic questions               |
| Restaurant            | Hours and location must be above fold on Home — confirm address and trading hours with client |
| Real estate           | Listings card is kit-specific — confirm image dimensions with client before upload            |
| Personal brand        | Blog and newsletter are out of scope at T1 — if client asks, that's a T2 conversation         |
| SaaS / startup        | Pricing page is non-negotiable — must be present and populated before QA                      |

---

## Step 5 — Assemble pages

Pages are pre-wired in each kit. Your job is to confirm the right components are in the right order, with the right props, pulling from the right CMS collections.

Open each page file in `clients/<client-slug>/src/pages/`. For each page:

1. Check the component order matches the brief or any layout notes from web lead
2. Confirm all required props are being passed (refer to [component-library.md](./component-library.md))
3. Confirm CMS-driven props are pulling from the correct collection
4. Check the page renders correctly in the dev server — no errors, no empty sections

You should not be writing new components or new page layouts at this stage. If the kit's pre-wired pages don't match what's been scoped, stop and raise it with web lead before improvising.

**Variant decisions** (Hero layout, ServiceList layout, etc.) should come from the brief. If the brief doesn't specify, use kit defaults. Do not make visual decisions without a reference — ask.

---

## Step 6 — QA

Do not skip this. Do not rush it. Work through the checklist in full before pushing to Netlify.

### Performance

- [ ] Lighthouse score 95+ on Home (run in Chrome incognito, desktop and mobile)
- [ ] All images using Astro `<Image />` — no raw `<img>` tags with unoptimised sources
- [ ] Images have explicit `width` and `height` — no layout shift
- [ ] Hero image has `loading="eager"`, all others lazy (this is handled by the component — verify it's not been overridden)
- [ ] Fonts are self-hosted — no calls to `fonts.googleapis.com` (check Network tab)
- [ ] No render-blocking scripts
- [ ] No unused npm packages installed

### Design system

- [ ] All colours and spacing coming from tokens — no hard-coded hex values or pixel values in component files
- [ ] `theme.css` is the only file that has changed from the kit default
- [ ] All three Hero variants render correctly (check in dev even if only one is used on this project)

### CMS

- [ ] All collections fully populated — no empty required fields
- [ ] CMS accessible at `/admin` with client credentials
- [ ] Every CMS-driven component is rendering live data, not placeholder text

### Functionality

- [ ] Contact form submits successfully — check the endpoint receives it
- [ ] Form confirmation message displays after submission
- [ ] FAQ accordion opens and closes correctly
- [ ] LogoBar marquee runs if enabled
- [ ] StatsRow counters animate on scroll
- [ ] Mobile nav opens, closes, and traps focus correctly
- [ ] No 404s — check every internal link on every page
- [ ] No console errors

### Content

- [ ] All page titles set and descriptive
- [ ] All meta descriptions set
- [ ] OG image set (build-time generated — confirm it renders correctly by inspecting `<head>`)
- [ ] Alt text on every image — no empty `alt` attributes on content images
- [ ] No placeholder text anywhere on the site

### Pre-launch

- [ ] Favicon present and correct
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] Custom domain confirmed with client
- [ ] SSL will be handled by Netlify on deploy

---

## Step 7 — Deploy to Netlify

### First-time setup for this client project

In the Netlify dashboard, create a new site:

1. **Connect to Git** — link to the `mmm-t1-system` repository
2. **Base directory** — set to `clients/<client-slug>`
3. **Build command** — `npm run build` (this runs within the base directory)
4. **Publish directory** — `dist`

Set environment variables in Netlify (Site settings → Environment variables):

```
PUBLIC_FORM_ENDPOINT=<same value as your .env>
PUBLIC_SITE_URL=<production URL>
```

Enable Netlify Forms if the contact form uses it (check the kit's form configuration).

### Deploy

Push to the `main` branch or trigger a manual deploy from the Netlify dashboard. Watch the build log — if it fails, read the error before asking for help.

Confirm after deploy:

- [ ] Site loads at the Netlify preview URL
- [ ] Form submission works on the live URL (test again — environment differences can surface here)
- [ ] OG image renders correctly (use [opengraph.xyz](https://www.opengraph.xyz) to check)
- [ ] `sitemap.xml` and `robots.txt` accessible on the live domain

### Custom domain

In Netlify, add the client's custom domain under Domain management. Point the client's DNS to Netlify's nameservers or add the required A/CNAME records. Netlify provisions SSL automatically — this can take a few minutes after DNS propagates.

Do not hand over the site until SSL is confirmed active.

---

## Step 8 — Hand off to client

Before marking the project complete:

- [ ] Client has Netlify CMS login credentials and can access `/admin`
- [ ] Walk the client through CMS content entry for at least one collection — do not just send them a link
- [ ] Confirm client knows what is and is not editable via CMS
- [ ] Update `changelog.md` in the client project with what was built and the deploy date
- [ ] Notify web lead that the project is live

The 30-day bug fix window starts from the live date. Changelog must be updated — the QA script checks it.

---

## Scope reminders

If a client asks for any of the following during the build, it is not a T1 request. Stop, note it, and raise it with web lead:

- A blog or news section
- Integration with a third-party platform (booking, CRM, email marketing)
- Custom page layouts not covered by the existing components
- Search or filtering
- E-commerce of any kind
- Additional CMS fields or collections
- A component with more than 6 props

The response is not "I'll figure it out." The response is "That's outside the scope of this project — let me check with the team on what that would look like."
