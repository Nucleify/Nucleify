export {}

declare global {
  interface GlobalThis {
    __TEST_CLIENT__?: boolean
    ResizeObserver?: typeof ResizeObserver
  }
}
