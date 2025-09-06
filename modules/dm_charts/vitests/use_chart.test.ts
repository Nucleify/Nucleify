import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as atomic from 'atomic'

describe('useChart', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks()
  })

  it('should return correct interface with chartData, setChartData, and setChartOptions', (): void => {
    const result = atomic.useChart()

    expect(result).toHaveProperty('chartData')
    expect(result).toHaveProperty('setChartData')
    expect(result).toHaveProperty('setChartOptions')
    expect(typeof result.setChartData).toBe('function')
    expect(typeof result.setChartOptions).toBe('function')
  })

  it('should set chart data for annual chart type with example data', (): void => {
    const result = atomic.useChart()

    const chartData = result.setChartData(
      'annual',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    )

    expect(chartData).toHaveProperty('labels')
    expect(chartData).toHaveProperty('datasets')
    expect(chartData?.labels).toEqual(atomic.months)
    expect(Array.isArray(chartData?.datasets)).toBe(true)
  })

  it('should set chart data for count chart type', (): void => {
    const result = atomic.useChart()
    const mockArticleData = [
      { id: 1, created_at: '2024-01-15' },
      { id: 2, created_at: '2024-02-20' },
    ]

    const chartData = result.setChartData('count', undefined, mockArticleData)

    expect(chartData).toHaveProperty('labels')
    expect(chartData).toHaveProperty('datasets')
    expect(Array.isArray(chartData?.labels)).toBe(true)
    expect(Array.isArray(chartData?.datasets)).toBe(true)
  })

  it('should return null for invalid chart method type', (): void => {
    const result = atomic.useChart()

    const chartData = result.setChartData('invalid')

    expect(chartData).toBeNull()
  })

  it('should set chart options for pie chart type', (): void => {
    const result = atomic.useChart()

    const options = result.setChartOptions('pie')

    expect(options).toHaveProperty('maintainAspectRatio', false)
    expect(options).toHaveProperty('aspectRatio', 0.8)
    expect(options.plugins?.legend?.display).toBe(false)
    expect(options.scales).toBeUndefined()
  })

  it('should set chart options for doughnut chart type', (): void => {
    const result = atomic.useChart()

    const options = result.setChartOptions('doughnut')

    expect(options).toHaveProperty('maintainAspectRatio', false)
    expect(options).toHaveProperty('aspectRatio', 0.8)
    expect(options.plugins?.legend?.display).toBe(false)
    expect(options.scales).toBeUndefined()
  })

  it('should set chart options for bar chart type', (): void => {
    const result = atomic.useChart()

    const options = result.setChartOptions('bar')

    expect(options).toHaveProperty('maintainAspectRatio', false)
    expect(options).toHaveProperty('aspectRatio', 0.8)
    expect(options.plugins?.legend?.display).toBeUndefined()
    expect(options.scales).toBeDefined()
    expect(options.scales?.x).toBeDefined()
    expect(options.scales?.y).toBeDefined()
  })

  it('should set chart options for horizontal direction', (): void => {
    const result = atomic.useChart()

    const options = result.setChartOptions('bar', 'horizontal')

    expect(options).toHaveProperty('indexAxis', 'y')
  })

  it('should process real data correctly for annual chart', (): void => {
    const result = atomic.useChart()
    const mockArticleData = [
      { id: 1, created_at: '2024-01-15' },
      { id: 2, created_at: '2024-01-20' },
      { id: 3, created_at: '2024-02-10' },
    ]

    const chartData = result.setChartData('annual', undefined, mockArticleData)

    expect(chartData).toHaveProperty('labels', atomic.months)
    expect(chartData?.datasets).toBeDefined()

    if (chartData?.datasets) {
      chartData.datasets.forEach((dataset) => {
        expect(dataset.data.some((count: number) => count > 0)).toBe(true)
      })
    }
  })

  it('should process real data correctly for count chart', (): void => {
    const result = atomic.useChart()
    const mockArticleData = [
      { id: 1, created_at: '2024-01-15' },
      { id: 2, created_at: '2024-02-20' },
    ]
    const mockUserData = [{ id: 1, created_at: '2024-01-10' }]

    const chartData = result.setChartData(
      'count',
      undefined,
      mockArticleData,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      mockUserData
    )

    expect(chartData).toHaveProperty('labels')
    expect(chartData).toHaveProperty('datasets')
    expect(chartData?.datasets?.[0]).toHaveProperty('data')
    expect(chartData?.datasets?.[0]).toHaveProperty('borderColor')
    expect(chartData?.datasets?.[0]).toHaveProperty('backgroundColor')
  })
})
