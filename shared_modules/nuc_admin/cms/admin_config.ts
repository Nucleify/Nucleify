import { listWidgets } from './registry'

import type {
  AdminRootConfig,
  CollectionConfig,
  GlobalConfig,
} from './fields/types'

const pagesCollection: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      admin: { position: 'main' },
    },
    {
      type: 'text',
      name: 'slug',
      label: 'Slug',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      type: 'text',
      name: 'locale',
      label: 'Locale',
      required: true,
      defaultValue: 'en',
      admin: { position: 'sidebar' },
    },
    {
      type: 'select',
      name: 'status',
      label: 'Status',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'blocks',
      name: 'sections',
      label: 'Sections',
      blocks: listWidgets().map((w) => w.type),
      admin: {
        position: 'main',
        description: 'Ordered page sections from the widget registry',
      },
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        { type: 'text', name: 'title', label: 'SEO title' },
        { type: 'textarea', name: 'description', label: 'SEO description' },
      ],
      admin: { position: 'main' },
    },
  ],
}

const settingsGlobal: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  fields: [
    { type: 'text', name: 'siteName', label: 'Site name', required: true },
    {
      type: 'text',
      name: 'defaultLocale',
      label: 'Default locale',
      defaultValue: 'en',
    },
  ],
}

const headerGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      type: 'array',
      name: 'links',
      label: 'Nav links',
      fields: [
        { type: 'text', name: 'label', label: 'Label', required: true },
        { type: 'text', name: 'href', label: 'Href', required: true },
      ],
    },
  ],
}

const footerGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      type: 'array',
      name: 'columns',
      label: 'Columns',
      fields: [
        { type: 'text', name: 'title', label: 'Title' },
        {
          type: 'array',
          name: 'links',
          label: 'Links',
          fields: [
            { type: 'text', name: 'label', label: 'Label', required: true },
            { type: 'text', name: 'href', label: 'Href', required: true },
          ],
        },
      ],
    },
  ],
}

export const adminRootConfig: AdminRootConfig = {
  userCollection: 'users',
  theme: 'dark',
  dateFormat: 'yyyy-MM-dd HH:mm',
  toast: { durationMs: 4000, limit: 3, position: 'top-right' },
  collections: [pagesCollection],
  globals: [settingsGlobal, headerGlobal, footerGlobal],
}

export function getAdminConfig(): AdminRootConfig {
  return adminRootConfig
}

export function getCollectionConfig(
  slug: string
): CollectionConfig | undefined {
  return adminRootConfig.collections.find((c) => c.slug === slug)
}

export function getGlobalConfig(slug: string): GlobalConfig | undefined {
  return adminRootConfig.globals.find((g) => g.slug === slug)
}
