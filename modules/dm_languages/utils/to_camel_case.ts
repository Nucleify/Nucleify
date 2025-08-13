export const toCamelCase = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z])|\b\w/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
