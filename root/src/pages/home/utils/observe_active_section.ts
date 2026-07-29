export function scrollHomeSection(root: HTMLElement, sectionId: string): void {
  const scroller = root.querySelector<HTMLElement>('.nuc-home-scroller')
  const target = root.querySelector<HTMLElement>(`#${sectionId}`)
  if (!target) return

  if (scroller) {
    const top =
      target.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop
    scroller.scrollTo({ top, behavior: 'smooth' })
    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function observeActiveSection(
  root: HTMLElement,
  sectionIds: readonly string[],
  onChange: (id: string) => void
): () => void {
  const scroller = root.querySelector<HTMLElement>('.nuc-home-scroller') ?? root

  const sections = sectionIds
    .map((id) => root.querySelector<HTMLElement>(`#${id}`))
    .filter((el): el is HTMLElement => Boolean(el))

  if (sections.length === 0) return () => undefined

  let activeId = sections[0]?.id ?? sectionIds[0] ?? ''
  onChange(activeId)

  const ratios = new Map<string, number>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target.id, entry.intersectionRatio)
      }

      let nextId = activeId
      let best = -1
      for (const section of sections) {
        const ratio = ratios.get(section.id) ?? 0
        if (ratio > best) {
          best = ratio
          nextId = section.id
        }
      }

      if (nextId && nextId !== activeId) {
        activeId = nextId
        onChange(activeId)
      }
    },
    {
      root: scroller,
      threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
    }
  )

  for (const section of sections) observer.observe(section)

  return () => observer.disconnect()
}
