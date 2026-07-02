export function splitNuiTypeProps<
  T extends { nuiType?: NuiTypeType | string },
>({
  nuiType,
  ...rest
}: T): { nuiType?: NuiTypeType | string; rest: Omit<T, 'nuiType'> } {
  return { nuiType, rest }
}

export function nuiTypeDataAttribute(nuiType?: NuiTypeType | string) {
  return nuiType ? ({ 'data-nui-type': nuiType } as const) : {}
}

export function nuiTypePt(nuiType?: NuiTypeType | string) {
  return nuiType ? { root: { 'nui-type': nuiType } } : undefined
}
