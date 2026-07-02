'use client'

import { Checkbox } from 'primereact/checkbox'
import type { JSX } from 'react'
import { useCallback, useEffect, useRef } from 'react'

import type { CheckboxInterface } from './types'

import { MinusIcon } from 'primereact/icons/minus'

export function AdCheckbox({
  nuiType,
  className = '',
  indeterminate,
  inputRef: userInputRef,
  pt: userPt,
  checked,
  ...rest
}: CheckboxInterface): JSX.Element {
  const innerInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!innerInputRef.current) return
    innerInputRef.current.indeterminate = Boolean(indeterminate && !checked)
  }, [checked, indeterminate])

  const setInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      innerInputRef.current = element
      if (typeof userInputRef === 'function') {
        userInputRef(element)
      } else if (userInputRef && typeof userInputRef === 'object') {
        userInputRef.current = element
      }
    },
    [userInputRef]
  )

  const userRoot = userPt?.root
  const isIndeterminate = Boolean(indeterminate && !checked)

  const pt = {
    ...userPt,
    root:
      typeof userRoot === 'function'
        ? userRoot
        : {
            ...(userRoot ?? {}),
            className: [
              className,
              userRoot?.className,
              isIndeterminate ? 'p-highlight' : undefined,
            ]
              .filter(Boolean)
              .join(' '),
            ...(nuiType ? { 'nui-type': nuiType } : {}),
            ...(isIndeterminate ? { 'data-indeterminate': 'true' } : {}),
            ...(isIndeterminate ? { 'data-p-indeterminate': 'true' } : {}),
          },
  }

  return (
    <span className="ad-checkbox-root">
      <Checkbox {...rest} checked={checked} inputRef={setInputRef} pt={pt} />
      {isIndeterminate ? (
        <MinusIcon className="p-checkbox-icon ad-checkbox-indeterminate-icon" />
      ) : null}
    </span>
  )
}
