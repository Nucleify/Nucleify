export {}

declare global {
  interface ActionInterface {
    icon: string
    click: (data: ObjectType) => void
  }

  type ActionType = 'delete' | 'show' | 'create' | 'edit'
}
