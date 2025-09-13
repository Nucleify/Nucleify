export const toCamelCase = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '')
    .replace(/_([a-zA-Z0-9])/g, (match, char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '')
