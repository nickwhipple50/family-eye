/**
 * icons.ts
 * Approved icon name type for the MMM T1 component library.
 * Extracted from Icon.astro so it can be safely imported across
 * the monorepo workspace boundary without esbuild union syntax errors.
 *
 * Import this type anywhere you need to type an icon name prop:
 *   import type { IconName } from '../icons';
 *   import type { IconName } from '@mmm/components/components/icons';
 */

export type IconName =
  // General
  | 'check'
  | 'check-circle'
  | 'x'
  | 'x-circle'
  | 'info'
  | 'alert-triangle'
  | 'chevron-right'
  | 'chevron-down'
  | 'arrow-right'
  | 'external-link'
  | 'menu'
  | 'search'
  // Service / business
  | 'briefcase'
  | 'users'
  | 'user'
  | 'star'
  | 'shield'
  | 'award'
  | 'thumbs-up'
  | 'clock'
  | 'calendar'
  | 'map-pin'
  | 'phone'
  | 'mail'
  | 'message-circle'
  | 'thermometer'
  | 'monitor'
  // Features / product
  | 'zap'
  | 'layers'
  | 'settings'
  | 'sliders'
  | 'lock'
  | 'unlock'
  | 'eye'
  | 'trending-up'
  | 'bar-chart'
  | 'pie-chart'
  | 'activity'
  | 'heart'
  | 'ear'
  | 'message'
  // Content
  | 'image'
  | 'file'
  | 'file-text'
  | 'download'
  | 'upload'
  | 'link'
  | 'rss';
