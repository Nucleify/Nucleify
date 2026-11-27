import { listPageTemplates } from './page_templates'
import { listPostBlockTypes } from './post_blocks'
import './register_default_widgets'
import { listWidgets } from './registry'

import {
  defaultFooterGlobalData,
  FOOTER_TEMPLATE_OPTIONS,
} from './defaults/footer'
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
      type: 'select',
      name: 'template',
      label: 'Page template',
      required: true,
      defaultValue: 'rail',
      options: listPageTemplates().map((t) => ({
        label: t.label,
        value: t.id,
      })),
      admin: {
        position: 'sidebar',
        description: 'Shell chrome (rail / bare / …)',
      },
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
      type: 'checkbox',
      name: 'showMenu',
      label: 'Show menu',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Top nav from a cms_menus entry',
      },
    },
    {
      type: 'relationship',
      name: 'menuSlug',
      label: 'Menu',
      relationTo: 'menus',
      defaultValue: 'primary',
      admin: {
        position: 'sidebar',
        description: 'Which menu to render when Show menu is on',
        condition: { field: 'showMenu', equals: true },
      },
    },
    {
      type: 'checkbox',
      name: 'showRail',
      label: 'Show rail',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Side section rail',
      },
    },
    {
      type: 'checkbox',
      name: 'showShear',
      label: 'Show shear',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Diagonal shear backdrop',
      },
    },
    {
      type: 'checkbox',
      name: 'showFooter',
      label: 'Show footer',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Closing-section footer links',
      },
    },
    {
      type: 'select',
      name: 'footerTemplate',
      label: 'Footer pack',
      defaultValue: 'home',
      options: FOOTER_TEMPLATE_OPTIONS.map((t) => ({
        label: t.label,
        value: t.value,
      })),
      admin: {
        position: 'sidebar',
        description: 'Home / investor / company link set from Globals → Footer',
        condition: { field: 'showFooter', equals: true },
      },
    },
    {
      type: 'relationship',
      name: 'footerMenuSlug',
      label: 'Footer menu (optional)',
      relationTo: 'menus',
      defaultValue: '',
      admin: {
        position: 'sidebar',
        description:
          'Optional Menus override — leave empty to use the Footer pack links',
        condition: { field: 'showFooter', equals: true },
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

const headerGlobal: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      type: 'relationship',
      name: 'menuSlug',
      label: 'Default menu',
      relationTo: 'menus',
      defaultValue: 'primary',
      admin: {
        description:
          'Fallback when a page enables Show menu without its own Menu pick',
      },
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

const footerDefaults = defaultFooterGlobalData('en')

const footerGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      type: 'relationship',
      name: 'menuSlug',
      label: 'Shared menu (optional)',
      relationTo: 'menus',
      defaultValue: footerDefaults.menuSlug,
      admin: {
        description: 'Optional Menus override for template links',
        hidden: true,
      },
    },
    {
      type: 'json',
      name: 'templates',
      label: 'Templates',
      defaultValue: footerDefaults.templates,
      admin: {
        description:
          'Home / investor / migrations-company close-bar packs (edited in the footer UI)',
        hidden: true,
      },
    },
  ],
}

function withLiveRegistries(pages: CollectionConfig): CollectionConfig {
  return {
    ...pages,
    fields: pages.fields.map((field) => {
      if (field.type === 'select' && field.name === 'template') {
        return {
          ...field,
          options: listPageTemplates().map((t) => ({
            label: t.label,
            value: t.id,
          })),
        }
      }
      if (field.type === 'blocks' && field.name === 'sections') {
        return {
          ...field,
          blocks: listWidgets().map((w) => w.type),
        }
      }
      return field
    }),
  }
}

export const adminRootConfig: AdminRootConfig = {
  userCollection: 'users',
  theme: 'dark',
  dateFormat: 'yyyy-MM-dd HH:mm',
  toast: { durationMs: 4000, limit: 3, position: 'top-right' },
  collections: [pagesCollection, postsCollection],
  globals: [headerGlobal, footerGlobal],
}

export function getAdminConfig(): AdminRootConfig {
  return {
    ...adminRootConfig,
    collections: [withLiveRegistries(pagesCollection), postsCollection],
  }
}

export function getCollectionConfig(
  slug: string
): CollectionConfig | undefined {
  return getAdminConfig().collections.find((c) => c.slug === slug)
}

export function getGlobalConfig(slug: string): GlobalConfig | undefined {
  return adminRootConfig.globals.find((g) => g.slug === slug)
}

export function listCollectionSlugs(): string[] {
  return getAdminConfig().collections.map((c) => c.slug)
}
