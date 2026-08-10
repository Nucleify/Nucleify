import Hello from '@/components/hello'
import NuiCta from '@/components/nui_cta'
import Counter from '@/components/counter'

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem', display: 'grid', gap: '1.5rem' }}>
      <h1>Next emit demo</h1>
      <Hello title="Hello from next/" />
      <NuiCta label="Launch with nucleify-ui" />
      <Counter label="Clicks" />
    </main>
  )
}
