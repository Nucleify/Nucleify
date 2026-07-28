export {}

declare global {
  type ObjectNameType = string

  type NuiTypeType = ObjectNameType | 'main' | 'secondary'

  type ActionType = 'delete' | 'show' | 'create' | 'edit'

  type ObjectType = Record<string, unknown> | undefined

  interface ActionInterface {
    icon: string
    click: (data: ObjectType) => void
  }

  type PositionType = 'top' | 'right' | 'left' | 'bottom'
}

type NuiElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & Record<string, unknown>,
  HTMLElement
>

declare module 'react' {
  // biome-ignore lint/style/noNamespace: React IntrinsicElements augmentation requires JSX namespace
  namespace JSX {
    interface IntrinsicElements {
      'nui-button': NuiElementProps
      'nui-dialog': NuiElementProps
      'nui-heading': NuiElementProps
      'nui-icon': NuiElementProps
      'nui-input-text': NuiElementProps
      'nui-logo': NuiElementProps
      'nui-select': NuiElementProps
      'nui-toast': NuiElementProps
    }
  }
}
