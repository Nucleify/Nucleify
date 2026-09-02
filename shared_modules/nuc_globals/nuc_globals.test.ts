import { beforeEach, expect, it, vi } from 'vitest'

import { registerNucGlobals } from '.'

const constants = {
  imgUrl: '/img/',
  contributorsImgUrl: '/img/contributors/',
  storysetImgUrl: '/img/storyset/',
  storysetAboutImgUrl: '/img/storyset/about/',
  storysetServicesImgUrl: '/img/storyset/services/',
  storysetBlogImgUrl: '/img/storyset/blog/',
  technologiesImgUrl: '/img/technologies/',
}

beforeEach(() => {
  vi.stubGlobal('appEnv', () => 'production')
  vi.stubGlobal('appUrl', () => '')
})

it('registers all constants on app.config.globalProperties', (): void => {
  const app = { config: { globalProperties: {} } }

  registerNucGlobals(app as never)

  for (const [key, value] of Object.entries(constants)) {
    expect(app.config.globalProperties[key as keyof typeof constants]).toBe(
      value
    )
  }
})
