import { beforeEach, expect, it, vi } from 'vitest'

import * as modules from '../../modules'
import module from '../../nuxt/plugins/modules'

vi.mock('../../modules', () => ({
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
  registerNucColors: vi.fn(),
  registerNucDataTable: vi.fn(),
  registerNucDialog: vi.fn(),
  registerNucDock: vi.fn(),
  registerNucDocumentation: vi.fn(),
  registerNucEntities: vi.fn(),
  registerNucEntitiesStructural: vi.fn(),
  registerNucFiles: vi.fn(),
  registerNucFriendship: vi.fn(),
  registerNucGlobals: vi.fn(),
  registerNucModules: vi.fn(),
  registerNucNavigation: vi.fn(),
  registerNucPages: vi.fn(),
  registerNucPerformance: vi.fn(),
  registerNucScreenLights: vi.fn(),
  registerNucScreenLoader: vi.fn(),
  registerNucSections: vi.fn(),
}))

const vueApp = {}
const nuxtApp = { vueApp }

beforeEach((): void => {
  vi.clearAllMocks()
})

it('registers all modules with nuxtApp.vueApp', async (): Promise<void> => {
  // @ts-expect-error setup is a function on the plugin object
  await module.setup(nuxtApp)

  expect(modules.registerDMSettings).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMTemplates).toHaveBeenCalledWith(vueApp)
  expect(modules.registerDMTasks).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucActivity).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucAdmin).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucAnimations).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucAuth).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucCharts).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucColors).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucDataTable).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucDialog).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucDock).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucDocumentation).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucEntities).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucEntitiesStructural).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucFiles).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucFriendship).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucGlobals).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucModules).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucNavigation).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucPages).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucPerformance).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucScreenLights).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucScreenLoader).toHaveBeenCalledWith(vueApp)
  expect(modules.registerNucSections).toHaveBeenCalledWith(vueApp)
})
