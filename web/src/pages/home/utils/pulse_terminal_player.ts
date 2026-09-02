import { NUC_HOME_PULSE_SHELLS } from '../constants/content'

export interface PulseScaleState {
  shellsActive: number
  showStatus: boolean
}

export interface PulseScalePlayer {
  start: () => void
  stop: () => void
}

type PulseScaleHost = {
  apply: (state: PulseScaleState) => void
  prefersReducedMotion: () => boolean
}

const SHELL_COUNT = NUC_HOME_PULSE_SHELLS.length

export function createPulseScalePlayer(host: PulseScaleHost): PulseScalePlayer {
  let timers: ReturnType<typeof setTimeout>[] = []
  let running = false

  const clear = () => {
    timers.forEach(clearTimeout)
    timers = []
  }

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      timers.push(setTimeout(resolve, ms))
    })

  const apply = (state: PulseScaleState) => {
    if (!running) return
    host.apply(state)
  }

  const finalState = (): PulseScaleState => ({
    shellsActive: SHELL_COUNT,
    showStatus: true,
  })

  const play = async () => {
    if (host.prefersReducedMotion()) {
      apply(finalState())
      return
    }

    while (running) {
      apply({ shellsActive: 0, showStatus: false })
      await wait(480)

      for (let i = 1; i <= SHELL_COUNT; i += 1) {
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
