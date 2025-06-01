export interface TerminalInterface {
  welcomeMessage?: string
  prompt?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

export interface ArtisanResponseInterface {
  output: string
}
