'use client'

import { type JSX } from 'react'

import { AdPopover, AdTerminal } from 'atomic'
import { isMobile } from 'modules'

import './_index.scss'

export interface NucTerminalProps {
  position: PositionType
}

export const NucTerminal = ({ position }: NucTerminalProps): JSX.Element => {
  return (
    <AdPopover
      dismissable
      icon="prime:code"
      position={position}
      popoverClass="terminal-popover"
      buttonText={isMobile() ? '' : 'Terminal'}
      buttonClass="terminal-popover-toggle"
    >
      <AdTerminal
        prompt="artisan >"
        welcomeMessage="The 'help' command displays help"
      />
    </AdPopover>
  )
}

export default NucTerminal
