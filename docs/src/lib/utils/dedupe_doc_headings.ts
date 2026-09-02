export function normalizeDocHeadingText(raw: string): string {
  const plain = raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCharCode(Number.parseInt(h, 16))
    )
  return plain
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[\s:;.,!?_\-—–]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function stripHeadingInner(fragment: string): string {
  const m = fragment.match(/^<h([12])[^>]*>([\s\S]*)<\/h\1>/i)
  return (m?.[2] ?? '').trim()
}

function headingsDuplicate(a: string, b: string): boolean {
  const na = normalizeDocHeadingText(a)
  const nb = normalizeDocHeadingText(b)
  if (!na || !nb) return false
  if (na === nb) return true
  const short = na.length <= nb.length ? na : nb
  const long = na.length > nb.length ? na : nb
  if (short.length < 8) return false
  if (long.includes(short) && short.length / long.length >= 0.55) return true
  return false
}

export function dedupeLeadingDocumentationHeadings(html: string): string {
  let s = html
  const maxPasses = 24

  for (let pass = 0; pass < maxPasses; pass++) {
    const trimmed = s.trimStart()
    const wsPrefixLen = s.length - trimmed.length
    const leadBlock =
      /^(?:(?:<p>\s*<\/p>\s*)|(?:<p>\s*&nbsp;\s*<\/p>\s*)|\s+)*/i.exec(
        trimmed
      )?.[0] ?? ''
    const from = wsPrefixLen + leadBlock.length
    const tail = s.slice(from)
    const m = tail.match(
      /^(<h([12])[^>]*>[\s\S]*?<\/h\2>)(\s*)(<h([12])[^>]*>[\s\S]*?<\/h\5>)/i
    )
    if (!m) break

    const firstHeading = m[1]
    const between = m[3]
    const secondHeading = m[4]

    const inner1 = stripHeadingInner(firstHeading)
    const inner2 = stripHeadingInner(secondHeading)
    if (!headingsDuplicate(inner1, inner2)) break

    s =
      s.slice(0, from + firstHeading.length + between.length) +
      tail.slice(m[0].length)
  }

  return s
}
