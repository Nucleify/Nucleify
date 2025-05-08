import { describe, expect, it, beforeEach, vi } from 'vitest'
import {
  mockArticle,
  articleRequests,
  mockGlobalFetch,
  useDialog,
  ArticleRequestsInterface,
} from 'atomic'

describe('articleRequests', (): void => {
  const { closeDialog } = useDialog()
  const requests: ArticleRequestsInterface = articleRequests(closeDialog)
  const mockResponse = [mockArticle]

  beforeEach((): void => {
    vi.clearAllMocks()
    mockGlobalFetch(mockResponse)
  })

  it('getAllArticles', async (): Promise<void> => {
    await requests.getAllArticles()
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('articles'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('storeArticle', async (): Promise<void> => {
    await requests.storeArticle(mockArticle, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('articles'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('editArticle', async (): Promise<void> => {
    await requests.editArticle(mockArticle, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('articles'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('deleteArticle', async (): Promise<void> => {
    await requests.deleteArticle(mockArticle.id ?? 0, async () => {})
    expect((globalThis as any).$fetch).toHaveBeenCalledWith(
      expect.stringContaining('articles'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })
})
