import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://yourclientdomain.com',

  // Ensures all pages are served with trailing slashes — /admin/ not /admin.
  // This fixes Decap CMS config.yml resolution without a redirect loop.
  trailingSlash: 'always',

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') && !page.includes('/changelog') && !page.includes('/og/'),
    }),
  ],

  vite: {
    resolve: {
      alias: {
        // Mirrors the paths entry in tsconfig.json — keep both in sync.
        '@mmm/components': path.resolve(__dirname, '../../packages/components/src'),
      },
    },
  },
});
