import { NucleifyUiProvider } from '@/lib/nucleify-ui-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NucleifyUiProvider>{children}</NucleifyUiProvider>
      </body>
    </html>
  )
}
