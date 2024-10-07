import { describe, expect, it, beforeEach, vi } from 'vitest'
import axios from 'axios'

import { mockArticle, mockUseToast } from 'atomic/bosons/constants'
import {
    ArticleInterface,
    ArticleRequestsInterface,
    EntityResponseType,
    MockUseToastInterface,
} from 'atomic/bosons/types'
import { articleRequests, useDialog } from 'atomic/bosons/utils'

vi.mock('axios')
vi.mock('primevue/usetoast', (): { useToast: () => MockUseToastInterface } => ({
    useToast: () => mockUseToast,
}))

describe('articleRequests', (): void => {
    const { closeDialog } = useDialog()
    const requests: ArticleRequestsInterface = articleRequests(closeDialog)
    const mockResponse: EntityResponseType<ArticleInterface[]> = {
        data: [mockArticle],
    }

    beforeEach((): void => {
        vi.clearAllMocks()
        axios.get.mockResolvedValue(mockResponse)
        axios.post.mockResolvedValue(mockResponse)
        axios.put.mockResolvedValue(mockResponse)
        axios.delete.mockResolvedValue(mockResponse)
    })

    it('getAllArticles', async (): Promise<void> => {
        await requests.getAllArticles()

        expect(axios.get).toHaveBeenCalledWith('/api/articles')
        expect(mockUseToast.success)
    })

    it('storeArticle', async (): Promise<void> => {
        await requests.storeArticle(mockArticle)

        expect(axios.post).toHaveBeenCalledWith('/api/articles', {
            user_id: window.sessionStorage.getItem('user_id'),
            title: mockArticle.title,
            description: mockArticle.description,
            category: mockArticle.category,
        })

        expect(axios.get).toHaveBeenCalled()
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('editArticle', async (): Promise<void> => {
        await requests.editArticle(
            mockArticle,
            requests.getAllArticles(),
            close
        )

        expect(axios.put).toHaveBeenCalledWith(
            '/api/articles/' + mockArticle.id,
            {
                title: mockArticle.title,
                description: mockArticle.description,
                category: mockArticle.category,
            }
        )

        expect(axios.get).toHaveBeenCalled()
        expect(requests.results.value).toEqual(mockResponse.data)
        expect(mockUseToast.success)
    })

    it('deleteArticle', async (): Promise<void> => {
        await requests.deleteArticle(
            mockArticle.id,
            requests.getAllArticles(),
            close
        )

        expect(axios.delete).toHaveBeenCalledWith(
            '/api/articles/' + mockArticle.id
        )
        expect(axios.get).toHaveBeenCalledWith('/api/articles')
        expect(mockUseToast.success)
    })
})
