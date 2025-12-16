export interface LogoInterface extends PathsInterface {
  adType?: AdTypeType
  useSymbol?: boolean
  dimensions?: string | number
}

export interface PathsInterface {
  lighterColorClass?: string
  darkerColorClass?: string
}
