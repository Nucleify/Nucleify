import { type JSX, useEffect, useRef } from 'react'

import type { NucShareCheckboxInterface } from './types'

export function NucShareCheckbox({
  adType,
  checked,
  indeterminate,
  isAll,
  onToggle,
}: NucShareCheckboxInterface): JSX.Element {
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isAll ? !!indeterminate : false
    }
  }, [indeterminate, isAll])

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      checked={checked ?? false}
      className={adType ? `ad-checkbox-${adType}` : undefined}
      onChange={onToggle}
    />
  )
}
