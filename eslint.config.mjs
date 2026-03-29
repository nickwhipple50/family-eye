import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import a11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    plugins: {
      'jsx-a11y': a11y,
    },
    rules: {
      ...a11y.configs.recommended.rules,
    },
  },
  {
    rules: {
      // Astro components use props that TS can't always infer — relax this slightly
      '@typescript-eslint/no-explicit-any': 'warn',
      // Unused vars are errors, but allow underscore-prefixed to be ignored
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'public/admin/'],
  },
];
