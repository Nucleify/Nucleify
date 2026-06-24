'use client'

import { Terminal } from 'primereact/terminal'
import { TerminalService } from 'primereact/terminalservice'
import { type JSX, useEffect } from 'react'

import styles from './index.module.scss'
import type { TerminalInterface } from './types'
import { handleCommands } from './utils'

export function AdTerminal({
  className,
  ...props
}: TerminalInterface): JSX.Element {
  useEffect(() => {
    TerminalService.on('command', handleCommands)
    return () => {
      TerminalService.off('command', handleCommands)
    }
  }, [])

  const cx = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' ')

  const pt = {
    root: {
      className: cx(styles['ad-terminal'], className),
    },
    command: {
      className: styles['ad-terminal-command'],
    },
    response: {
      className: styles['ad-terminal-response'],
    },
  }

  return <Terminal {...props} pt={pt} />
}
