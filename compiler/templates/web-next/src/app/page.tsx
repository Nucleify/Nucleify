import { redirect } from 'next/navigation'

/** Root → English home (same convention as Nuxt web). */
export default function RootPage() {
  redirect('/en/home')
}
