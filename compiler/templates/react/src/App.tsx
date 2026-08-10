import Hello from './components/hello'
import NuiCta from './components/nui_cta'

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem', display: 'grid', gap: '1.5rem' }}>
      <h1>React emit demo</h1>
      <Hello title="Hello from react/" />
      <NuiCta label="Launch with nucleify-ui" />
    </main>
  )
}
