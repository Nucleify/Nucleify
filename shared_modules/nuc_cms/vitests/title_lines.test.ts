import { describe, expect, it } from 'vitest'

import {
  applyLegacyTitleLines,
  coalesceTitleLines,
  migrateSectionTitleProps,
  restoreMultilineDefaults,
} from '../cms/merge_props'

describe('title line helpers', () => {
  it('joins legacy lead/trail when unified title is missing', () => {
    expect(
      coalesceTitleLines(
        { headlineLead: 'Keep the product.', headlineTrail: 'Migrate.' },
        'headline',
        'headlineLead',
        'headlineTrail',
        'fallback'
      )
    ).toBe('Keep the product.\nMigrate.')
  })

  it('prefers unified title over lead/trail', () => {
    expect(
      coalesceTitleLines(
        {
          headline: 'One line.\nTwo.',
          headlineLead: 'ignored',
          headlineTrail: 'ignored',
        },
        'headline',
        'headlineLead',
        'headlineTrail',
        'fallback'
      )
    ).toBe('One line.\nTwo.')
  })

  it('migrates section props and drops legacy keys', () => {
    const next = migrateSectionTitleProps({
      cloneTitleLead: 'Install the CLI.',
      cloneTitleTrail: 'Run framework migration.',
      railLabel: 'CLI',
    })
    expect(next.cloneTitle).toBe('Install the CLI.\nRun framework migration.')
    expect(next.cloneTitleLead).toBeUndefined()
    expect(next.cloneTitleTrail).toBeUndefined()
    expect(next.railLabel).toBe('CLI')
  })

  it('restores multiline defaults from single-line CMS values', () => {
    const defaults = {
      closeTitle: 'Same app.\nDifferent framework.',
    }
    const bag = applyLegacyTitleLines(
      { closeTitle: 'Same app. Different framework.' },
      { closeTitle: 'Same app. Different framework.' },
      []
    )
    expect(
      restoreMultilineDefaults(bag, defaults, ['closeTitle']).closeTitle
    ).toBe('Same app.\nDifferent framework.')
  })
})
