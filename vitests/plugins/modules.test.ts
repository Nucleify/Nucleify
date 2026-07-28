import { beforeEach, expect, it, vi } from 'vitest'

import module from '../../nuxt/plugins/modules'

const registerMocks = vi.hoisted(() => ({
  registerNucGlobals: vi.fn(),
  registerNucColors: vi.fn(),
  registerNucPages: vi.fn(),
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

vi.mock('../../modules/nuc_languages/nuc_languages', () => ({
  registerNucLanguages: registerMocks.registerNucLanguages,
}))

vi.mock('../../modules/nuc_pagebuilder/nuc_pagebuilder', () => ({
  registerNucPageBuilder: registerMocks.registerNucPageBuilder,
}))

const stub = vi.hoisted(() => ({ register: vi.fn() }))

vi.mock('../../modules/nuc_dark_mode/nuc_dark_mode', () => ({
  registerNucDarkMode: stub.register,
}))

vi.mock('../../modules/nuc_activity/nuc_activity', () => ({
  registerNucActivity: stub.register,
}))
vi.mock('../../modules/nuc_calendar/nuc_calendar', () => ({
  registerNucCalendar: stub.register,
}))
vi.mock('../../modules/nuc_documents/nuc_documents', () => ({
  registerNucDocuments: stub.register,
}))
vi.mock('../../modules/nuc_documentation/nuc_documentation', () => ({
  registerNucDocumentation: stub.register,
}))
vi.mock('../../modules/nuc_entities/nuc_entities', () => ({
  registerNucEntities: stub.register,
}))
vi.mock('../../modules/nuc_modules/nuc_modules', () => ({
  registerNucModules: stub.register,
}))
vi.mock('../../modules/nuc_users/nuc_users', () => ({
  registerNucUsers: stub.register,
}))

const vueApp = {
  component: vi.fn().mockReturnThis(),
  directive: vi.fn().mockReturnThis(),
}
const nuxtApp = { vueApp }

beforeEach((): void => {
  vi.clearAllMocks()
})

it('registers critical modules', async (): Promise<void> => {
  // @ts-expect-error setup is a function on the plugin object
  await module.setup(nuxtApp)

  expect(registerMocks.registerNucGlobals).toHaveBeenCalledWith(vueApp)
  expect(registerMocks.registerNucColors).toHaveBeenCalledWith(vueApp)
  expect(registerMocks.registerNucPages).toHaveBeenCalledWith(vueApp)
})
