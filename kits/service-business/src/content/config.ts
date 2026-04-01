/**
 * src/content/config.ts
 * Astro content collection schemas — Service Business kit.
 *
 * These schemas type the data returned by getCollection() and getEntry().
 * They mirror the Decap CMS config.yml field definitions exactly.
 * If you add a field in config.yml, add it here too — and vice versa.
 *
 * Zod is Astro's built-in schema validator — no extra install needed.
 *
 * Collections defined here:
 *   site_settings  — singleton, global site config
 *   services       — ServiceList component data
 *   testimonials   — TestimonialRow component data
 *   team           — TeamGrid component data
 *   faq            — FAQAccordion component data (if used)
 */

import { defineCollection, z } from 'astro:content';

// ─── SITE SETTINGS ───────────────────────────────────────────────────────────

const site_settings = defineCollection({
  type: 'data',
  schema: z.object({
    site_name: z.string(),
    tagline: z.string().optional(),
    logo: z.string().optional(),

    contact: z
      .object({
        phone: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        service_area: z.string().optional(),
      })
      .optional(),

    hours: z
      .array(
        z.object({
          day: z.enum([
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ]),
          open: z.string(),
          close: z.string(),
          closed: z.boolean().default(false),
        })
      )
      .optional(),

    social: z
      .object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        x: z.string().optional(),
        youtube: z.string().optional(),
      })
      .optional(),

    nav: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        })
      )
      .max(7)
      .optional(),

    social_proof: z
      .object({
        rating: z.number().min(1).max(5).optional(),
        review_count: z.number().int().optional(),
        years: z.number().int().optional(),
        customers: z.string().optional(),
      })
      .optional(),

    floating_cta: z
      .object({
        label: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),

    analytics: z
      .object({
        ga_id: z.string().optional(),
        gtm_id: z.string().optional(),
      })
      .optional(),

    seo: z.object({
      title: z.string(),
      description: z.string(),
      og_image: z.string().optional(),
    }),
  }),
});

// ─── SERVICES ─────────────────────────────────────────────────────────────────

const services = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    order: z.number().int().default(0),
  }),
});

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
  }),
});

// ─── TEAM ─────────────────────────────────────────────────────────────────────

const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    photo: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    order: z.number().int().default(0),
  }),
});

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().int().default(0),
  }),
});

// ─── PAGES (prose) ───────────────────────────────────────────────────────────

const pages = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    body: z.string(),
    updated_at: z.string().optional(),
  }),
});

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const collections = {
  site_settings,
  services,
  testimonials,
  team,
  faq,
  pages,
};
