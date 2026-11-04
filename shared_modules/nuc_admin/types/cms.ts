export type CmsDocumentStatus = 'draft' | 'published'

export interface NucAdminCmsDocumentInterface {
  id: string
  collection_slug: string
  locale: string
  title: string
  slug: string
  status: CmsDocumentStatus | string
  published_at: string | null
  data: Record<string, unknown>
  created_at?: string
  updated_at?: string
}

export interface NucAdminCmsGlobalDocumentInterface {
  id: string
  global_slug: string
  locale: string
  status: CmsDocumentStatus | string
  data: Record<string, unknown>
  created_at?: string
  updated_at?: string
}

export interface NucAdminCmsMediaInterface {
  id: string
  filename: string
  mime: string
  size: number
  storage_path: string
  alt: string
  created_by: string | null
  created_at?: string
}
