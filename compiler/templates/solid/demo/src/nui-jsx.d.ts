import 'solid-js'

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'nui-button': JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>
      'nui-icon': JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>
    }
  }
}

export {}
