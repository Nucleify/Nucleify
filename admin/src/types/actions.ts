export type Action = {
  id: string
  label: string
  variant?: 'filled' | 'outlined'
  disabled?: boolean
  danger?: boolean
  onClick: () => void | Promise<void>
}

export type AdminAction = Action
