/**
 * src/content.config.ts   ← note: lives at src/ level, not src/content/
 * Astro v6 content collection schemas — Professional Services kit.
 *
 * Astro v6 breaking change: collections now require explicit loaders.
 * Use glob() from 'astro/loaders' for file-based collections.
 * Config file must be at src/content.config.ts, not src/content/config.ts.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

const site_settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/site_settings' }),
  schema: z.object({
    site_name: z.string(),
    tagline: z.string().optional(),
    logo: z.string().optional(),

    contact: z
      .object({
        phone: z.string().optional(),
        email: z.string().optional(),
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
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
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
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
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
  loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    credentials: z.string().optional(),
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
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().int().default(0),
  }),
});

// ─── PAGES ────────────────────────────────────────────────────────────────────

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
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
