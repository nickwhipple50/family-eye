/**
 * src/content.config.ts
 * Astro v6 content collection schemas — Personal Brand kit.
 *
 * Collections:
 *   site_settings  — singleton
 *   offers         — Work + Offers page (replaces services — more personal brand language)
 *   testimonials   — TestimonialRow
 *   press          — Press page (kit-local PressGrid component)
 *   pages          — Privacy policy, Terms of use
 *
 * No team collection — personal brand is typically a solo operator.
 * No FAQ collection — not in the personal brand kit page set.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

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

// ─── OFFERS ───────────────────────────────────────────────────────────────────
// "Offers" rather than "services" — personal brand language.
// Covers speaking, consulting, workshops, courses, books, etc.

const offers = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/offers' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    type: z
      .enum(['speaking', 'consulting', 'workshop', 'course', 'book', 'podcast', 'other'])
      .optional(),
    icon: z.string().optional(),
    cta: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    order: z.number().int().default(0),
    featured: z.boolean().default(false),
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

// ─── PRESS ────────────────────────────────────────────────────────────────────
// Media mentions, podcast appearances, articles, interviews.

const press = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/press' }),
  schema: z.object({
    publication: z.string(),
    title: z.string(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    date: z.string(),
    type: z.enum(['article', 'interview', 'podcast', 'tv', 'radio', 'award', 'other']).optional(),
    logo: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    featured: z.boolean().default(false),
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
  offers,
  testimonials,
  press,
  pages,
};
