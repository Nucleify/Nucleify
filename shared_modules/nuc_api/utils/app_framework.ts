export type AppFramework = 'nuxt' | 'next'

export function assertAppFramework(
  framework: AppFramework,
  expected: AppFramework
): void {
  if (framework !== expected) {
    throw new Error(
      `Invalid framework "${framework}" for this runtime (expected "${expected}")`
    )
  }
}
