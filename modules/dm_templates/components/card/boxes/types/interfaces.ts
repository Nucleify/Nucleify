export interface CardBoxesInterface {
  boxes?: BoxInterface[]
  srcPrefix?: string
}

export interface BoxInterface {
  src?: string
  href?: string
  label?: string
  description?: string
  prefix?: string
}
