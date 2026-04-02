import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Set to the production domain before deploying.
  // Used by Astro.site in Base.astro to build absolute OG image URLs,
  // and required by @astrojs/sitemap to generate correct sitemap URLs.
  // Update this per client — do not leave as placeholder.
  site: 'https://yourclientdomain.com',

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') && !page.includes('/changelog') && !page.includes('/og/'),
    }),
  ],

  vite: {
    resolve: {
      alias: {
        '@mmm/components': path.resolve(__dirname, '../../packages/components/src'),
      },
    },
  },
});
