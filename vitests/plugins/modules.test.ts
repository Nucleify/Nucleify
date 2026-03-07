import { beforeEach, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'
import * as modules from '../../modules'
import module from '../../nuxt/plugins/modules'

function mockRegisterFunctions(
  original: Record<string, unknown>
): Record<string, unknown> {
  const mocked: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(original)) {
    mocked[key] =
      typeof value === 'function' && key.startsWith('register')
        ? vi.fn()
        : value
  }

  return mocked
}

vi.mock('../../modules', async (importOriginal) => {
  return mockRegisterFunctions(
    (await importOriginal()) as Record<string, unknown>
  )
})

vi.mock('nucleify', async (importOriginal) => {
  return mockRegisterFunctions(
    (await importOriginal()) as Record<string, unknown>
  )
})

const vueApp = {}
const nuxtApp = { vueApp }

beforeEach((): void => {
  vi.clearAllMocks()
})

it('registers all modules from modules barrel', async (): Promise<void> => {
  // @ts-expect-error setup is a function on the plugin object
  await module.setup(nuxtApp)

  const atomicImports = new Set(['registerNucGlobals'])

  Object.entries(modules).forEach(([name, fn]) => {
    if (
      typeof fn === 'function' &&
      name.startsWith('register') &&
      !atomicImports.has(name)
    ) {
      expect(fn, `${name} should have been called`).toHaveBeenCalled()
    }
  })
})

it('registers globals from atomic', async (): Promise<void> => {
  // @ts-expect-error setup is a function on the plugin object
  await module.setup(nuxtApp)

  expect(
    nucleify.registerNucGlobals,
    'registerNucGlobals should have been called'
  ).toHaveBeenCalledWith(vueApp)
})
