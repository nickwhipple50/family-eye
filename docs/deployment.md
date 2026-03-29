# Deployment

How Netlify is configured for the T1 monorepo, how client sites are set up, and how to handle updates after launch.

---

## How the monorepo deploys

The `mmm-t1-system` repository is a single Git repo containing multiple deployable projects — one per client under `clients/`. Each client project is a separate Netlify site, all pointing at the same repository but scoped to a different subdirectory.

Netlify reads the `netlify.toml` at the root of each client project's base directory. This file tells Netlify what to build and where to find the output. You do not manage a global build config for the whole monorepo — each site is independently configured.

```
mmm-t1-system/
├── packages/
│   └── components/          # Shared library — not deployed directly
├── kits/                    # Templates — not deployed directly
├── clients/
│   ├── acme-plumbing/       # Netlify site A
│   │   └── netlify.toml
│   ├── harbor-cafe/         # Netlify site B
│   │   └── netlify.toml
│   └── jane-doe-physio/     # Netlify site C
│       └── netlify.toml
```

---

## `netlify.toml` — standard config

Every client project ships with this file pre-configured. Do not change the build command or publish directory without a good reason and web lead sign-off.

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
```

The `[[redirects]]` rule ensures Netlify serves the Astro 404 page rather than a generic Netlify error on missing routes.

If the project includes Netlify Forms, add:

```toml
[build.processing]
  skip_processing = false
```

If the project includes edge functions (view counter, spam filtering, dynamic hours), add:

```toml
[functions]
  directory = "netlify/edge-functions"
```

---

## Creating a new Netlify site for a client project

Do this once per client, at the start of the project. Do not wait until the site is ready to launch.

1. In the Netlify dashboard, click **Add new site → Import an existing project**
2. Connect to GitHub and select `mmm-t1-system`
3. Set **Base directory** to `clients/<client-slug>` — this is the critical step. Without it, Netlify will try to build the repo root, which has no build output
4. **Build command:** `npm run build`
5. **Publish directory:** `dist`
6. Click **Deploy site**

The first deploy will likely succeed on a kit default — that is fine. You are establishing the site configuration, not launching.

Rename the site in Netlify immediately: **Site configuration → Site details → Change site name**. Use the same client slug as the directory. The auto-generated Netlify subdomain (`random-words-123.netlify.app`) is not useful to anyone.

---

## Environment variables

Set these in Netlify before the first real deploy: **Site configuration → Environment variables**.

| Variable               | Value                      | Notes                                           |
| ---------------------- | -------------------------- | ----------------------------------------------- |
| `PUBLIC_FORM_ENDPOINT` | Form submission URL        | Netlify Forms URL, or third-party endpoint      |
| `PUBLIC_SITE_URL`      | `https://clientdomain.com` | No trailing slash. Used for OG tags and sitemap |

These must match what is in the local `.env` file exactly. Mismatches between local and production are a common source of form submission failures post-launch.

Do not commit `.env` to Git. It is gitignored. The Netlify dashboard is the source of truth for production environment variables.

---

## Branch deploys and preview URLs

Netlify generates a unique preview URL for every branch and every deploy. Use these — they are the right way to share work for review before going live.

Standard branch convention:

| Branch                  | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `main`                  | Production. Deploys automatically on push.                 |
| `staging/<client-slug>` | Pre-launch review. Netlify preview URL shared with client. |
| Feature branches        | Local work. No automatic deploy unless configured.         |

Do not push directly to `main` during active development on a client project. Work on a staging branch, get sign-off, then merge.

To share a preview with a client or web lead: in the Netlify dashboard, go to **Deploys**, find the branch deploy, copy the preview URL. No login required to view it.

---

## Change detection — shared component updates

When `packages/components` changes, active client sites need to rebuild to pick up the update. Netlify does not automatically detect changes outside a site's base directory.

To trigger a rebuild after a component library update, either:

**Option A — manual trigger (simple, always works)**
In the Netlify dashboard for each affected site: **Deploys → Trigger deploy → Deploy site**. Do this for every active client site after a component library change.

**Option B — build hook (faster for multiple sites)**
Each Netlify site has a build hook URL under **Site configuration → Build hooks**. Create one per site named `component-library-update`. When `packages/components` changes, POST to each hook:

```bash
curl -X POST -d '{}' https://api.netlify.com/build_hooks/<hook-id>
```

This can be scripted. A shell script at `scripts/trigger-rebuilds.sh` in the repo root, with one curl call per active client, is sufficient at current team size. No CI pipeline required.

Web lead is responsible for running rebuilds after component library changes. No one else should not be touching shared components — but if a component update is needed mid-project, flag it and web lead coordinates the rebuild.

---

## Custom domains and SSL

Add the custom domain after the site is building cleanly and client sign-off is confirmed.

In Netlify: **Domain management → Add a domain**

Netlify will prompt for DNS configuration. Two options:

**Option A — Netlify DNS (recommended)**
Transfer DNS management to Netlify nameservers. Netlify handles everything including SSL renewal. Simplest long-term.

**Option B — External DNS**
Client keeps their existing DNS provider. Add a CNAME record pointing `www` to the Netlify subdomain (`<site-name>.netlify.app`), and an A record for the apex domain pointing to Netlify's load balancer IP. Netlify's dashboard shows the exact values required.

SSL is provisioned automatically by Netlify via Let's Encrypt once DNS propagates. This can take up to 24 hours depending on the registrar. Do not hand the site over until the padlock is confirmed in the browser.

Netlify automatically redirects `http://` to `https://` and `www` to the canonical domain (or vice versa, based on your domain settings). Confirm which is canonical before launch and configure accordingly — mixed signals here affect SEO.

---

## Netlify Forms setup

If the contact form uses Netlify Forms as the submission handler:

1. The form in the Astro component must have the `netlify` attribute and a `name` attribute:
   ```html
   <form name="contact" netlify></form>
   ```
2. Netlify detects this at build time and registers the form. It will not appear in the Netlify dashboard until after the first successful deploy.
3. Set the notification email in **Forms → contact → Form notifications → Email notification**. Default goes to the Netlify account email — change this to the client's email before launch.
4. Test the form on the live Netlify URL (not localhost) before handing over. Netlify Forms does not work locally.

Spam protection: Netlify Forms includes a basic honeypot by default. If the project includes the smart spam filtering edge function add-on, that sits in front of the Netlify Forms handler and supplements it.

---

## Post-launch handover checklist

Before marking a project as handed over:

- [ ] Custom domain live and SSL confirmed
- [ ] `PUBLIC_SITE_URL` environment variable updated to the final domain (not the Netlify subdomain)
- [ ] Trigger a fresh deploy after updating the URL — OG images and sitemap use this variable
- [ ] Form submissions routing to client email — test it
- [ ] Netlify CMS accessible at `/admin` with client login
- [ ] Client walkthrough complete — they can log into CMS and edit content
- [ ] Staging branch deploy-locked or deleted (don't leave staging deploys publicly accessible after launch)
- [ ] Changelog updated with final launch date
- [ ] Web lead notified

---

## Ongoing maintenance

The 30-day bug fix window starts from the live date. After that, changes are billable.

**What counts as a bug:** something broken that was in scope and should have worked at launch. Form not submitting, page not rendering, CMS field not saving.

**What does not count as a bug:** content changes, new pages, feature additions, anything that is a change of mind rather than a defect.

If the client reports an issue:

1. Reproduce it
2. Check whether it is a code issue or a content/CMS issue — content issues are the client's to fix
3. If it is a code issue, fix on a branch, test on the preview URL, merge to main
4. If it is out of scope, document it and raise it with web lead before agreeing to any work

Component library updates that fix a bug in a shared component require rebuilding all affected client sites. Co-ordinate with web lead.
