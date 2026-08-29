import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type NuiProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
  Record<string, unknown>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'nui-button': NuiProps
      'nui-icon': NuiProps
    }
  }
}

export {}
