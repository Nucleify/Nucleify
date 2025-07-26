// Global type declarations for Nuxt runtime config and other globals

declare global {
  // Nuxt runtime config globals
  function appEnv(): string
  function appUrl(): string
  function apiUrl(): string

  // Test client global
  var __TEST_CLIENT__: boolean | undefined
}

export {}
