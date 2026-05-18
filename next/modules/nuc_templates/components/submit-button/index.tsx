import React from 'react'

import { AdButton } from 'nucleify'
import './_index.scss'

interface NucSubmitButtonProps {
  label: string
  icon?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const NucSubmitButton: React.FC<NucSubmitButtonProps> = ({
  label,
  icon,
  className,
  onClick,
  variant,
  type = 'button',
  disabled = false,
}) => {
  const rootClass = [
    'nuc-submit-button',
    variant && `nuc-submit-button-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <AdButton
      label={label}
      icon={icon}
      className={rootClass}
      adType="main"
      type={type}
      disabled={disabled}
      onClick={onClick}
      gap={icon ? '0.5rem' : undefined}
    />
  )
}
