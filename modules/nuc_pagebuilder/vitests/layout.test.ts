import { describe, expect, test } from 'vitest'

import { createLayout, createNode } from '../components/pagebuilder'

describe('nuc_pagebuilder layout utils', () => {
  test('createLayout returns empty page layout', () => {
    const layout = createLayout()

    expect(layout.type).toBe('page')
    expect(Array.isArray(layout.children)).toBe(true)
    expect(layout.children).toHaveLength(0)
  })

  test('createNode creates heading widget with defaults', () => {
    const node = createNode('native-heading')

    expect(node.type).toBe('widget')
    expect(node.widgetType).toBe('heading')
    expect(node.props).toHaveProperty('text')
  })

  test('createNode creates component widget from registry', () => {
    const node = createNode('templates-grid-background')

    expect(node.widgetType).toBe('component')
    expect(node.props).toHaveProperty('componentTag', 'nuc-grid-background')
    expect(node.props).toHaveProperty('componentProps')
  })
})
