import { camelToKebab } from './camel_to_kebab'

export const transformProps = <T extends Record<string, unknown>>(
  props: T,
  excludeProps: string[] = [],
  propMap: Record<string, string> = {}
): Partial<T> => {
  const transformed: Record<string, unknown> = {}

  for (const key in props) {
    if (!excludeProps.includes(key)) {
      const mappedKey = propMap[key] || camelToKebab(key)
      transformed[mappedKey] = props[key]
    }
  }

  return transformed as Partial<T>
}
