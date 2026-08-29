import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type NuiProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
  Record<string, unknown>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'nui-button': NuiProps
      'nui-dialog': NuiProps
      'nui-icon': NuiProps
      'nui-input-text': NuiProps
      'nui-select': NuiProps
      'nui-toast': NuiProps
    }
  }
}

export {}
