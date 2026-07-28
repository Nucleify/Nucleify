export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeContent: 'center',
        gap: '0.75rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <nui-heading tag="1" text="Nucleify" />
      <p>Frontend wiped — rebuild on nucleify-ui.</p>
    </main>
  )
}
