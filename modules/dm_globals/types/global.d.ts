export {}

declare global {
  interface GlobalThis {
    __TEST_CLIENT__?: boolean
    ResizeObserver?: typeof ResizeObserver
  }

  function apiUrl(): string
  function appUrl(): string
  function appEnv(): string
}
