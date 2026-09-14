type Props = { params: Promise<{ lang: string }> }

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  return (
    <main
      style={{
        fontFamily: 'system-ui',
        padding: '2rem',
        display: 'grid',
        gap: '1.5rem',
        maxWidth: '40rem',
      }}
    >
      <p style={{ margin: 0, opacity: 0.7, fontSize: '0.85rem' }}>
        next/web · lang={lang} · tryb B product shell
      </p>
      <h1 style={{ margin: 0 }}>Nucleify web (Next)</h1>
      <p style={{ margin: 0, lineHeight: 1.5 }}>
        Minimal product shell template. <code>convert web --target=next</code> replaces this with
        the migrated Vue home. Canonical Nuxt app stays at top-level <code>web/</code>.
      </p>
    </main>
  )
}
