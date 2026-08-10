import Hello from './components/hello'

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem' }}>
      <h1>React emit demo</h1>
      <Hello title="Hello from react/" />
    </main>
  )
}
