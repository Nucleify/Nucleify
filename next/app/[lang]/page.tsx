import { redirect } from 'next/navigation'

export default async function LangIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  redirect(`/${lang || 'en'}/home`)
}
