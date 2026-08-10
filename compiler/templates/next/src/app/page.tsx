import Hello from '@/components/hello'

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem' }}>
      <h1>Next emit demo</h1>
      <Hello title="Hello from next/" />
    </main>
  )
}
