export {}

declare global {
  type ObjectNameType =
    | 'activity'
    | 'article'
    | 'card'
    | 'contact'
    | 'feature'
    | 'file'
    | 'link'
    | 'money'
    | 'question'
    | 'task'
    | 'technology'
    | 'user'

  type NuiTypeType = ObjectNameType | 'main' | 'secondary'

  type ActionType = 'delete' | 'show' | 'create' | 'edit'

  type ObjectType = Record<string, unknown> | undefined

  interface ActionInterface {
    icon: string
    click: (data: ObjectType) => void
  }

  type PositionType = 'top' | 'right' | 'left' | 'bottom'
}
