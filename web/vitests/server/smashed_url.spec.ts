import { describe, expect, it } from 'vitest'

import { isSmashedSegment, redirectTargetForPath } from '@web'

describe('smashed_url', () => {
  it('detects glued path segments from the old canonical bug', () => {
    expect(isSmashedSegment('enhometerms-of-service')).toBe(true)
    expect(isSmashedSegment('homegdpr')).toBe(true)
    expect(isSmashedSegment('filesentitiescontacts')).toBe(true)
    expect(isSmashedSegment('plhomeservicesservices')).toBe(true)
    expect(isSmashedSegment('servicesservices')).toBe(true)
    expect(isSmashedSegment('home')).toBe(false)
    expect(isSmashedSegment('en')).toBe(false)
  })

  it('redirects smashed and dead marketing paths to locale home', () => {
    expect(redirectTargetForPath('/enhometerms-of-service/services')).toBe(
      '/en/home'
    )
    expect(redirectTargetForPath('/plhomeprivacy-policy/services')).toBe(
      '/pl/home'
    )
    expect(redirectTargetForPath('/homegdpr/services/custom-projects')).toBe(
      '/en/home'
    )
    expect(redirectTargetForPath('/filesentitiescontacts/calendar')).toBe(
      '/en/home'
    )
    expect(redirectTargetForPath('/en/services/services/custom-projects')).toBe(
      '/en/home'
    )
    expect(redirectTargetForPath('/pl/home/process/about-us')).toBe('/pl/home')
    expect(redirectTargetForPath('/modules/{module}/{file}')).toBe('/en/home')
  })

  it('leaves living marketing routes alone', () => {
    expect(redirectTargetForPath('/en/home')).toBeNull()
    expect(redirectTargetForPath('/pl/home')).toBeNull()
    expect(redirectTargetForPath('/en/investor')).toBeNull()
    expect(redirectTargetForPath('/pl/investor')).toBeNull()
    expect(redirectTargetForPath('/en/thank-you')).toBeNull()
    expect(redirectTargetForPath('/pl/thank-you')).toBeNull()
    expect(redirectTargetForPath('/_nuxt/entry.js')).toBeNull()
    expect(redirectTargetForPath('/api/test')).toBeNull()
  })

  it('leaves agent discovery assets alone', () => {
    expect(redirectTargetForPath('/.well-known/ard.json')).toBeNull()
    expect(redirectTargetForPath('/.well-known/anything')).toBeNull()
    expect(redirectTargetForPath('/llms.txt')).toBeNull()
  })

  it('leaves Nuxt payloadExtraction paths alone', () => {
    expect(redirectTargetForPath('/en/home/_payload.js')).toBeNull()
    expect(redirectTargetForPath('/en/home/_payload.json')).toBeNull()
    expect(redirectTargetForPath('/pl/investor/_payload.js')).toBeNull()
    expect(redirectTargetForPath('/en/thank-you/_payload.js')).toBeNull()
    expect(redirectTargetForPath('/en/custom-landing/_payload.js')).toBeNull()
  })

  it('leaves arbitrary CMS slugs alone for [lang]/[slug]', () => {
    expect(redirectTargetForPath('/en/afdhjzfhdsjshfdj')).toBeNull()
    expect(redirectTargetForPath('/pl/demo-page')).toBeNull()
    expect(redirectTargetForPath('/en/custom-landing')).toBeNull()
  })

  it('collapses unknown pseudo-locales onto home', () => {
    expect(redirectTargetForPath('/afdhjzfhdsjshfdj')).toBe('/en/home')
    expect(redirectTargetForPath('/afdhjzfhdsjshfdj/home')).toBe('/en/home')
    expect(redirectTargetForPath('/not-a-locale/investor')).toBe('/en/home')
  })

  it('still collapses known dead locale marketing roots', () => {
    expect(redirectTargetForPath('/en/services')).toBe('/en/home')
    expect(redirectTargetForPath('/pl/about-us')).toBe('/pl/home')
    expect(redirectTargetForPath('/en/gdpr')).toBe('/en/home')
  })

  it('collapses thank-you extras to the thank-you root', () => {
    expect(redirectTargetForPath('/en/thank-you/extra')).toBe('/en/thank-you')
  })

  it('sends legacy same-host docs paths to docs.nucleify.io', () => {
    expect(redirectTargetForPath('/en/docs/core-concepts/overriding')).toBe(
      'https://docs.nucleify.io/en/docs/core-concepts/overriding'
    )
    expect(redirectTargetForPath('/pl/docs/getting-started/introduction')).toBe(
      'https://docs.nucleify.io/pl/docs/getting-started/introduction'
    )
  })

  it('collapses investor extras to the investor root', () => {
    expect(redirectTargetForPath('/en/investor/deck')).toBe('/en/investor')
  })
})
