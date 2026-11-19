export type NucModuleLaneId = 'sdk' | 'data' | 'ui'

export interface NucModuleLane {
  id: NucModuleLaneId
  title: string
  path: string
  detail: string
}

export interface NucModule {
  id: string
  name: string
  icon: string
  note: string
  lanes: NucModuleLane[]
}

export interface NucPillar {
  icon: string
  index: string
  title: string
  description: string
  outcome: string
  proof: string
}

export interface NucStackItem {
  label: string
  detail: string
  icon: string
  color: string
  command: string
}

export interface NucCompilerNode {
  id: string
  label: string
  icon: string
  color: string
  command: string
  file: string
  snippet: string[]
  x: number
  y: number
}

export interface NucHeroShell {
  id: string
  label: string
  command: string
  result: string
  icon: string
  color: string
}

export type ContactOption = {
  label: string
  value: string
}
