/**
 * src/content/config.ts
 * Astro content collection schemas — Real Estate kit.
 *
 * Collections:
 *   site_settings  — singleton
 *   listings       — ListingsGrid (kit-local component)
 *   services       — ServiceList
 *   testimonials   — TestimonialRow
 *   team           — TeamGrid
 *   pages          — Privacy policy, Terms of use
 *
 * No FAQ collection in this kit.
 */

import { defineCollection, z } from 'astro:content';

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

const site_settings = defineCollection({
  type: 'data',
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

// ─── LISTINGS ─────────────────────────────────────────────────────────────────

const listings = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    price: z.string(),
    status: z.enum(['active', 'pending', 'sold', 'for-rent']),
    bedrooms: z.number().int().optional(),
    bathrooms: z.number().int().optional(),
    area: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().int().default(1200),
      height: z.number().int().default(800),
    }),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
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

// ─── PAGES ────────────────────────────────────────────────────────────────────

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
  listings,
  services,
  testimonials,
  team,
  pages,
};
