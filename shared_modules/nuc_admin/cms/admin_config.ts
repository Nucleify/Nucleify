import { listPostBlockTypes } from './post_blocks'
import { listWidgets } from './registry'

import type {
  AdminRootConfig,
  CollectionConfig,
  FieldConfig,
  GlobalConfig,
} from './fields/types'

const seoFields: FieldConfig[] = [
  { type: 'text', name: 'title', label: 'SEO title' },
  { type: 'textarea', name: 'description', label: 'SEO description' },
  { type: 'text', name: 'shareTitle', label: 'Share title' },
  { type: 'upload', name: 'ogImage', label: 'OG image', relationTo: 'media' },
  { type: 'text', name: 'canonical', label: 'Canonical URL' },
  {
    type: 'select',
    name: 'robots',
    label: 'Robots',
    options: [
      { label: 'index,follow', value: 'index,follow' },
      { label: 'noindex,follow', value: 'noindex,follow' },
      { label: 'index,nofollow', value: 'index,nofollow' },
      { label: 'noindex,nofollow', value: 'noindex,nofollow' },
    ],
  },
]

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
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Trash', value: 'trash' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'date',
      name: 'publishedAt',
      label: 'Publish at',
      admin: {
        position: 'sidebar',
        description: 'Future date schedules publish',
      },
    },
    {
      type: 'select',
      name: 'template',
      label: 'Template',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Shear', value: 'shear' },
        { label: 'Holo cube', value: 'holo_cube' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'text',
      name: 'translationGroup',
      label: 'Translation group',
      admin: {
        position: 'sidebar',
        description: 'Shared UUID linking EN/PL (and other) locales',
      },
    },
    {
      type: 'checkbox',
      name: 'enableIris',
      label: 'Enable iris animation',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Play iris wipe animation on the initial section',
      },
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
      fields: seoFields,
      admin: { position: 'main' },
    },
  ],
}

const postsCollection: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
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
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Trash', value: 'trash' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'date',
      name: 'publishedAt',
      label: 'Publish at',
      admin: { position: 'sidebar' },
    },
    {
      type: 'textarea',
      name: 'excerpt',
      label: 'Excerpt',
      admin: { position: 'main' },
    },
    {
      type: 'upload',
      name: 'featuredImage',
      label: 'Featured image',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      type: 'blocks',
      name: 'body',
      label: 'Body',
      blocks: listPostBlockTypes(),
      admin: {
        position: 'main',
        description: 'Rich post body blocks',
      },
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: seoFields,
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
    {
      type: 'text',
      name: 'frontPageSlug',
      label: 'Front page slug',
      defaultValue: 'home',
      admin: { description: 'Which page is the site front' },
    },
    {
      type: 'text',
      name: 'blogIndexPath',
      label: 'Blog index path',
      defaultValue: 'blog',
    },
    {
      type: 'checkbox',
      name: 'enableIris',
      label: 'Enable iris animation',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'featureBlog',
      label: 'Enable blog',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'featureComments',
      label: 'Enable comments',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'featureContactInbox',
      label: 'Enable contact inbox',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'featureRedirects',
      label: 'Enable redirects',
      defaultValue: true,
    },
    {
      type: 'text',
      name: 'headerMenuSlug',
      label: 'Header menu slug',
      defaultValue: 'primary',
    },
    {
      type: 'text',
      name: 'footerMenuSlug',
      label: 'Footer menu slug',
      defaultValue: 'footer',
    },
  ],
}

const headerGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      type: 'text',
      name: 'menuSlug',
      label: 'Menu slug',
      defaultValue: 'primary',
      admin: { description: 'Uses cms_menus when present; else links below' },
    },
    {
      type: 'array',
      name: 'links',
      label: 'Nav links (fallback)',
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
      type: 'text',
      name: 'menuSlug',
      label: 'Menu slug',
      defaultValue: 'footer',
    },
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
  collections: [pagesCollection, postsCollection],
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

export function listCollectionSlugs(): string[] {
  return adminRootConfig.collections.map((c) => c.slug)
}
