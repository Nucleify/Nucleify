import { Tooltip } from 'primereact/tooltip'
import React, { useId } from 'react'

import type { TooltipInterface } from 'nucleify'

export interface NucTooltipProps extends TooltipInterface {
  children: React.ReactNode
  value: string | React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const NucTooltip: React.FC<NucTooltipProps> = (props) => {
  const autoId = useId().replace(/:/g, '')
  const {
    children,
    value,
    disabled,
    id = autoId,
    className,
    style,
    ...rest
  } = props
  console.log(props)
  return (
    <>
      <Tooltip
        target={`#${id}`}
        content={value as string}
        disabled={disabled}
        {...rest}
      />
      <div
        id={id}
        className={`nuc-tooltip-target ${className || ''}`.trim()}
        style={{ display: 'inline-block', ...style }}
      >
        {' '}
        {children}
      </div>
    </>
  )
}
export default NucTooltip
