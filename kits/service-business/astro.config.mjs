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
  },
});
