declare module 'vite' {
  export interface ViteDevServer {
    watcher: {
      add(path: string): void
      on(event: string, callback: (path: string) => void): void
    }
    moduleGraph: {
      getModuleById(id: string): { invalidate(): void } | null
      invalidateModule(module: { invalidate(): void }): void
    }
    ws: { send(payload: { type: string }): void }
  }

  export interface Plugin {
    name: string
    enforce?: 'pre' | 'post'
    configResolved?(): void
    configureServer?(server: ViteDevServer): void
    load?(id: string): string | null
  }
}
