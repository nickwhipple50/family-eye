import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Vite alias — mirrors the paths entry in tsconfig.json.
  // Both must be kept in sync. If you add an alias to one, add it to the other.
  vite: {
    resolve: {
      alias: {
        '@mmm/components': path.resolve(__dirname, '../../packages/components/src'),
      },
    },
    // Copy Decap CMS built files from node_modules into public/admin/
    // so admin/index.html can reference them without a CDN dependency.
    plugins: [
      {
        name: 'copy-decap-cms',
        buildStart() {
          const decapDist = path.resolve(__dirname, 'node_modules/decap-cms-app/dist');
          const adminDist = path.resolve(__dirname, 'public/admin');

          if (!fs.existsSync(adminDist)) {
            fs.mkdirSync(adminDist, { recursive: true });
          }

          for (const file of ['decap-cms.js', 'decap-cms.css']) {
            const src = path.join(decapDist, file);
            const dest = path.join(adminDist, file);
            if (fs.existsSync(src) && !fs.existsSync(dest)) {
              fs.copyFileSync(src, dest);
            }
          }
        },
      },
    ],
  },
});
