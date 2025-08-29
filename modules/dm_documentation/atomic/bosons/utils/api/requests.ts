import { ref } from 'vue'

import type {
  CloseDialogType,
  DocumentationObjectInterface,
  DocumentationRequestsInterface,
  EntityCountResultsType,
  EntityResultsType,
  UseLoadingInterface,
} from 'atomic'
import { apiHandle, useApiSuccess, useLoading } from 'atomic'

export function documentationRequests(
  close?: CloseDialogType
): DocumentationRequestsInterface {
  const results: EntityResultsType<DocumentationObjectInterface> = ref([])
  const createdLastWeek: EntityCountResultsType = ref(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllDocumentation(loading?: boolean): Promise<void> {
    await apiHandle<DocumentationObjectInterface[]>({
      url: apiUrl() + '/documentation',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: DocumentationObjectInterface[]) => {
        results.value = response
      },
    })
  }

  async function getCountDocumentationByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/documentation/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        createdLastWeek.value = response
      },
    })
  }

  async function storeDocumentation(
    data: DocumentationObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<DocumentationObjectInterface>({
      url: apiUrl() + '/documentation',
      method: 'POST',
      data,
      onSuccess: (response: DocumentationObjectInterface) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editDocumentation(
    data: DocumentationObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<DocumentationObjectInterface>({
      url: apiUrl() + '/documentation',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response: DocumentationObjectInterface) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteDocumentation(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<DocumentationObjectInterface>({
      url: apiUrl() + '/documentation',
      method: 'DELETE',
      id,
      onSuccess: (response: DocumentationObjectInterface) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    createdLastWeek,
    loading,
    getAllDocumentation,
    getCountDocumentationByCreatedLastWeek,
    storeDocumentation,
    editDocumentation,
    deleteDocumentation,
  }
}
