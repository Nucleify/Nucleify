export interface NucCardBoxesInterface {
  boxes?: NucBoxInterface[]
  srcPrefix?: string
}

export interface NucBoxInterface {
  src?: string
  href?: string
  label?: string
  description?: string
  prefix?: string
}
