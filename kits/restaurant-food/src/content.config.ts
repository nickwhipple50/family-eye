/**
 * src/content/config.ts
 * Astro content collection schemas — Restaurant & Food kit.
 *
 * Collections:
 *   site_settings  — singleton
 *   menu           — MenuSection component (kit-local)
 *   testimonials   — TestimonialRow
 *   team           — TeamGrid
 *   pages          — Privacy policy, Terms of use
 *
 * No services, listings, or FAQ collections in this kit.
 *
 * Menu structure:
 *   Each entry is a menu item. Items belong to a category via the
 *   category field — a plain string that MenuSection uses to group them.
 *   This avoids a nested collection while keeping the CMS simple.
 *   Category order is controlled by the category_order field on each item.
 */

// src/content.config.ts

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

const site_settings = defineCollection({
  loader: glob({
    base: './src/content/site_settings',
    pattern: '**/*.{json,yaml,yml,toml}',
  }),
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

// ─── MENU ─────────────────────────────────────────────────────────────────────

const menu = defineCollection({
  loader: glob({
    base: './src/content/menu',
    pattern: '**/*.{json,yaml,yml,toml}',
  }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
    category: z.string(),
    category_order: z.number().int().default(0),
    item_order: z.number().int().default(0),
    featured: z.boolean().default(false),
    dietary: z
      .array(z.enum(['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'spicy']))
      .optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const testimonials = defineCollection({
  loader: glob({
    base: './src/content/testimonials',
    pattern: '**/*.{json,yaml,yml,toml}',
  }),
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
  loader: glob({
    base: './src/content/team',
    pattern: '**/*.{json,yaml,yml,toml}',
  }),
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
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.{json,yaml,yml,toml}',
  }),
  schema: z.object({
    title: z.string(),
    body: z.string(),
    updated_at: z.string().optional(),
  }),
});

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const collections = {
  site_settings,
  menu,
  testimonials,
  team,
  pages,
};
