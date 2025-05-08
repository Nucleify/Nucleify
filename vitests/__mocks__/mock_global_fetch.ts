import { vi } from 'vitest'

export function mockGlobalFetch(response: any) {
  (globalThis as any).$fetch = vi.fn().mockResolvedValue(response)
  return (globalThis as any).$fetch
}

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    currentRoute: { value: { path: '/' } },
  }),
  useRoute: () => ({
    path: '/',
  }),
})) 