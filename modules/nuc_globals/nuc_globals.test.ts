import { expect, it } from 'vitest'

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

it('registers all constants on app.config.globalProperties', (): void => {
  const app = { config: { globalProperties: {} } }

  registerNucGlobals(app)

  for (const [key, value] of Object.entries(constants)) {
    expect(app.config.globalProperties[key]).toBe(value)
  }
})
