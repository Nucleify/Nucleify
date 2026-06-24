export function splitAdTypeProps<T extends { adType?: AdTypeType | string }>({
  adType,
  ...rest
}: T): { adType?: AdTypeType | string; rest: Omit<T, 'adType'> } {
  return { adType, rest }
}

export function adTypeDataAttribute(adType?: AdTypeType | string) {
  return adType ? ({ 'data-ad-type': adType } as const) : {}
}

export function adTypePt(adType?: AdTypeType | string) {
  return adType ? { root: { 'ad-type': adType } } : undefined
}
