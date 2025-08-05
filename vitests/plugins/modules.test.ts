import { beforeEach, expect, it, vi } from 'vitest'

import * as modules from '../../modules'
import module from '../../nuxt/plugins/modules'

vi.mock('../../modules', () => ({
  registerDMActivity: vi.fn(),
  registerDMAnimations: vi.fn(),
  registerDMAuth: vi.fn(),
  registerDMEntities: vi.fn(),
  registerDMEntitiesStructural: vi.fn(),
  registerDMMedia: vi.fn(),
  registerDMPages: vi.fn(),
  registerDMScreenLights: vi.fn(),
  registerDMScreenLoader: vi.fn(),
  registerDMTasks: vi.fn(),
}))

const vueApp = {}
const nuxtApp = { vueApp }

beforeEach((): void => {
  vi.clearAllMocks()
})

it('registers all modules with nuxtApp.vueApp', async (): Promise<void> => {
  // @ts-expect-error setup is a function on the plugin object
  await module.setup(nuxtApp)

  expect(modules.registerDMActivity).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMAnimations).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMAuth).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMEntities).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMEntitiesStructural).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMMedia).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMPages).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMScreenLights).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMScreenLoader).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMTasks).toHaveBeenCalledWith(vueApp)
})
