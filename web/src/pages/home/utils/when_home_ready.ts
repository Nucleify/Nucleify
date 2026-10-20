/** Resolves when `.nuc-home-ready` is present (intro boot finished). */
export function whenHomeReady(root: HTMLElement): Promise<void> {
  if (root.classList.contains('nuc-home-ready')) return Promise.resolve()

  return new Promise((resolve) => {
    const done = () => {
      mo.disconnect()
      window.clearTimeout(safety)
      resolve()
    }

    const mo = new MutationObserver(() => {
      if (root.classList.contains('nuc-home-ready')) done()
    })
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })

    // Safety - match hero timeline upper bound.
    const safety = window.setTimeout(done, 4000)
  })
}
