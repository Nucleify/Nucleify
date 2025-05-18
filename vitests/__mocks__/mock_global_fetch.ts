export function mockGlobalFetch(vi: any, response: any) {
  ;(globalThis as any).$fetch = vi.fn().mockResolvedValue(response)
  return (globalThis as any).$fetch
}
