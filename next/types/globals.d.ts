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

  type AdTypeType = ObjectNameType | 'main'

  type ActionType = 'delete' | 'show' | 'create' | 'edit'

  type ObjectType = Record<string, unknown> | undefined

  interface ActionInterface {
    icon: string
    click: (data: ObjectType) => void
  }

  type PositionType = 'top' | 'right' | 'left' | 'bottom'
}
