export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem', display: 'grid', gap: '1.5rem' }}>
      <h1>Next emit demo</h1>
      <p style={{ margin: 0, opacity: 0.7 }}>
        Shell only — emit <code>*.nuc.tsx</code> into <code>src/components/</code> when authoring.
      </p>
    </main>
  )
}
