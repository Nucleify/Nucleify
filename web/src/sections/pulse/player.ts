export type PulseScaleState = {
  shellsActive: number
  showStatus: boolean
}

type PulseScaleHost = {
  shellCount?: number
  apply: (state: PulseScaleState) => void
  prefersReducedMotion: () => boolean
}

export function createPulseScalePlayer(host: PulseScaleHost) {
  let timers: ReturnType<typeof setTimeout>[] = []
  let running = false

  const clear = () => {
    for (const id of timers) clearTimeout(id)
    timers = []
  }

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      timers.push(setTimeout(resolve, ms))
    })

  const apply = (state: PulseScaleState) => {
    if (running) host.apply(state)
  }

  const resolveCount = () =>
    Number.isFinite(host.shellCount) ? Math.max(host.shellCount!, 0) : 7

  const finalState = (): PulseScaleState => ({
    shellsActive: resolveCount(),
    showStatus: true,
  })

  const play = async () => {
    if (host.prefersReducedMotion()) {
      apply(finalState())
      return
    }

    const count = resolveCount()
    while (running) {
      apply({ shellsActive: 0, showStatus: false })
      await wait(480)
      for (let i = 1; i <= count; i += 1) {
        if (!running) return
        apply({ shellsActive: i, showStatus: false })
        await wait(340)
      }
      apply(finalState())
      await wait(3200)
    }
  }

  return {
    start: () => {
      if (running) return
      running = true
      void play()
    },
    stop: () => {
      running = false
      clear()
    },
  }
}
