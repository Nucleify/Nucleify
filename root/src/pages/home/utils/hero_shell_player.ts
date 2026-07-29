import type { NucHomeHeroShell } from '../constants/content'

export type HeroShellPhase = 'typing' | 'running' | 'done'

export type HeroShellPlayerHandlers = {
  onIndex: (index: number) => void
  onTyped: (value: string) => void
  onPhase: (phase: HeroShellPhase) => void
  onProgress: (value: number) => void
}

export function createHeroShellPlayer(
  shells: readonly NucHomeHeroShell[],
  handlers: HeroShellPlayerHandlers
) {
  let runId = 0
  const timers = new Set<number>()
  const pending = new Set<() => void>()

  function clearWaits(): void {
    for (const id of timers) window.clearTimeout(id)
    timers.clear()
    const resolvers = [...pending]
    pending.clear()
    for (const done of resolvers) done()
  }

  function wait(ms: number, token: number): Promise<void> {
    return new Promise((resolve) => {
      if (token !== runId) {
        resolve()
        return
      }

      const done = () => {
        pending.delete(done)
        resolve()
      }
      pending.add(done)

      const id = window.setTimeout(() => {
        timers.delete(id)
        done()
      }, ms)
      timers.add(id)
    })
  }

  async function playShell(nextIndex: number): Promise<void> {
    if (shells.length === 0) return
    const token = ++runId
    clearWaits()

    const index = ((nextIndex % shells.length) + shells.length) % shells.length
    const shell = shells[index]
    if (!shell) return

    handlers.onIndex(index)
    handlers.onTyped('')
    handlers.onProgress(0)
    handlers.onPhase('typing')

    for (let i = 1; i <= shell.command.length; i += 1) {
      if (token !== runId) return
      handlers.onTyped(shell.command.slice(0, i))
      await wait(38 + (i % 3) * 10, token)
    }

    if (token !== runId) return
    handlers.onPhase('running')

    for (let step = 1; step <= 14; step += 1) {
      if (token !== runId) return
      handlers.onProgress(step / 14)
      await wait(65, token)
    }

    if (token !== runId) return
    handlers.onProgress(1)
    handlers.onPhase('done')

    await wait(1700, token)
    if (token !== runId) return
    void playShell(index + 1)
  }

  return {
    start() {
      void playShell(0)
    },
    select(nextIndex: number) {
      void playShell(nextIndex)
    },
    stop() {
      runId += 1
      clearWaits()
    },
  }
}
