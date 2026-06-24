import { beforeEach, expect, it, vi } from 'vitest'

import module from '../../nuxt/plugins/modules'

const registerMocks = vi.hoisted(() => ({
  registerNucGlobals: vi.fn(),
  registerNucColors: vi.fn(),
  registerNucPages: vi.fn(),
  registerNucSections: vi.fn(),
  registerNucLanguages: vi.fn(),
  registerNucPageBuilder: vi.fn(),
}))

vi.mock('../../modules/nuc_globals/nuc_globals', () => ({
  registerNucGlobals: registerMocks.registerNucGlobals,
}))

vi.mock('../../modules/nuc_colors/nuc_colors', () => ({
  registerNucColors: registerMocks.registerNucColors,
}))

vi.mock('../../modules/nuc_pages/nuc_pages', () => ({
  registerNucPages: registerMocks.registerNucPages,
}))

vi.mock('../../modules/nuc_sections/nuc_sections', () => ({
  registerNucSections: registerMocks.registerNucSections,
}))

vi.mock('../../modules/nuc_languages/nuc_languages', () => ({
  registerNucLanguages: registerMocks.registerNucLanguages,
}))

vi.mock('../../modules/nuc_pagebuilder/nuc_pagebuilder', () => ({
  registerNucPageBuilder: registerMocks.registerNucPageBuilder,
}))

const stub = vi.hoisted(() => ({ register: vi.fn() }))
const stubNuxt = { register: vi.fn() }

vi.mock('../../modules/nuc_dark_mode/nuc_dark_mode', () => ({
  registerNucDarkMode: stub.register,
}))
vi.mock('../../modules/nuc_navigation/nuc_navigation', () => ({
  registerNucNavigation: stub.register,
}))
vi.mock('../../modules/nuc_breadcrumb/nuc_breadcrumb', () => ({
  registerNucBreadcrumb: stub.register,
}))
vi.mock('../../modules/nuc_animations/nuc_animations', () => ({
  registerNucAnimations: stub.register,
}))
vi.mock('../../modules/nuc_pricings/nuc_pricings', () => ({
  registerNucPricings: stub.register,
}))

const vueApp = {
  component: vi.fn().mockReturnThis(),
  directive: vi.fn().mockReturnThis(),
}
const nuxtApp = { vueApp }

beforeEach((): void => {
  vi.clearAllMocks()
})

it('registers critical modules before deferred batch', async (): Promise<void> => {
  // @ts-expect-error setup is a function on the plugin object
  await module.setup(nuxtApp)

  expect(registerMocks.registerNucGlobals).toHaveBeenCalledWith(vueApp)
  expect(registerMocks.registerNucColors).toHaveBeenCalledWith(vueApp)
  expect(registerMocks.registerNucSections).toHaveBeenCalledWith(vueApp)
  expect(registerMocks.registerNucPages).toHaveBeenCalledWith(vueApp)
})
