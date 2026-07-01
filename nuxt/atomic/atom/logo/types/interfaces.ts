export interface LogoInterface extends PathsInterface {
  nuiType?: NuiTypeType
  useSymbol?: boolean
  dimensions?: string | number
}

export interface PathsInterface {
  lighterColorClass?: string
  darkerColorClass?: string
}
