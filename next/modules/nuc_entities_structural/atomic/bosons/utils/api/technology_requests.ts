'use client'

import { useState } from 'react'

import type {
  CloseDialogType,
  EntityCountResultsType,
  EntityResultsType,
  NucTechnologyObjectInterface,
  UseLoadingInterface,
} from 'nucleify'
import { apiHandle, useApiSuccess, useLoading } from 'nucleify'

import type { NucTechnologyRequestsInterface } from '../../types/api'

export function technologyRequests(
  close?: CloseDialogType
): NucTechnologyRequestsInterface {
  const [results, setResults] = useState<
    EntityResultsType<NucTechnologyObjectInterface>
  >([])
  const [resultsByCategory, setResultsByCategory] = useState<
    EntityResultsType<NucTechnologyObjectInterface>
  >([])
  const [resultsBySite, setResultsBySite] = useState<
    EntityResultsType<NucTechnologyObjectInterface>
  >([])
  const [createdLastWeek, setCreatedLastWeek] =
    useState<EntityCountResultsType>(0)

  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  async function getAllTechnologies(loading?: boolean): Promise<void> {
    await apiHandle<NucTechnologyObjectInterface[]>({
      url: apiUrl() + '/technologies',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucTechnologyObjectInterface[]) => {
        setResults(response)
      },
    })
  }

  async function getCountTechnologiesByCreatedLastWeek(
    loading?: boolean
  ): Promise<void> {
    await apiHandle<number>({
      url: apiUrl() + '/technologies/count-by-created-last-week',
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: number) => {
        setCreatedLastWeek(response)
      },
    })
  }

  async function getTechnologiesByCategory(
    category: string,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<NucTechnologyObjectInterface[]>({
      url: apiUrl() + `/technologies/get-by-category/${category}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucTechnologyObjectInterface[]) => {
        setResultsByCategory(response)
      },
    })
  }

  async function getSiteTechnologies(
    site: string,
    loading?: boolean
  ): Promise<void> {
    await apiHandle<NucTechnologyObjectInterface[]>({
      url: apiUrl() + `/technologies/get-site-technologies/${site}`,
      setLoading: loading ? setLoading : undefined,
      onSuccess: (response: NucTechnologyObjectInterface[]) => {
        setResultsBySite(response)
      },
    })
  }

  async function storeTechnology(
    data: NucTechnologyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucTechnologyObjectInterface>({
      url: apiUrl() + '/technologies',
      method: 'POST',
      data,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'create')
      },
    })
  }

  async function editTechnology(
    data: NucTechnologyObjectInterface,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucTechnologyObjectInterface>({
      url: apiUrl() + '/technologies',
      method: 'PUT',
      data,
      id: data.id,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'edit')
      },
    })
  }

  async function deleteTechnology(
    id: number,
    getData: () => Promise<void>
  ): Promise<void> {
    await apiHandle<NucTechnologyObjectInterface>({
      url: apiUrl() + '/technologies',
      method: 'DELETE',
      id,
      onSuccess: (response) => {
        apiSuccess(response, getData, close, 'delete')
      },
    })
  }

  return {
    results,
    resultsByCategory,
    resultsBySite,
    createdLastWeek,
    loading,
    getAllTechnologies,
    getCountTechnologiesByCreatedLastWeek,
    getTechnologiesByCategory,
    getSiteTechnologies,
    storeTechnology,
    editTechnology,
    deleteTechnology,
  }
}
