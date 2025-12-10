import { beforeEach, expect, it, vi } from 'vitest'

import * as modules from '../../modules'
import module from '../../nuxt/plugins/modules'

vi.mock('../../modules', () => ({
  registerDMColors: vi.fn(),
  registerDMDataTable: vi.fn(),
  registerDMDialog: vi.fn(),
  registerDMDock: vi.fn(),
  registerDMDocumentation: vi.fn(),
  registerDMEntities: vi.fn(),
  registerDMEntitiesStructural: vi.fn(),
  registerDMFiles: vi.fn(),
  registerDMFriendship: vi.fn(),
  registerDMModules: vi.fn(),
  registerDMNavigation: vi.fn(),
  registerDMGlobals: vi.fn(),
  registerDMPages: vi.fn(),
  registerDMPerformance: vi.fn(),
  registerDMScreenLights: vi.fn(),
  registerDMScreenLoader: vi.fn(),
  registerDMSections: vi.fn(),
  registerDMSettings: vi.fn(),
  registerDMTasks: vi.fn(),
  registerDMTemplates: vi.fn(),
  registerDMTime: vi.fn(),
  registerDMTooltip: vi.fn(),
  registerNucActivity: vi.fn(),
  registerNucAdmin: vi.fn(),
  registerNucAnimations: vi.fn(),
  registerNucAuth: vi.fn(),
  registerNucCharts: vi.fn(),
}))

const vueApp = {}
const nuxtApp = { vueApp }

beforeEach((): void => {
  vi.clearAllMocks()
})

it('registers all modules with nuxtApp.vueApp', async (): Promise<void> => {
  // @ts-expect-error setup is a function on the plugin object
  await module.setup(nuxtApp)

  expect(modules.registerDMColors).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMDataTable).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMDialog).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMDock).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMDocumentation).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMEntities).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMEntitiesStructural).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMFiles).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMGlobals).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMModules).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMNavigation).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMPages).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMPerformance).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMScreenLights).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMScreenLoader).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMSections).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMSettings).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMTemplates).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMTasks).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucActivity).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucAdmin).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucAnimations).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucAuth).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucCharts).toHaveBeenCalledWith(vueApp)
})
