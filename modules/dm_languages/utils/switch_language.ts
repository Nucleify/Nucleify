export const useSwitchLanguage = () => {
  const { locale, setLocale } = useI18n()
  const router = useRouter()
  const switchLocalePath = useSwitchLocalePath()

  const switchLanguage = async (): Promise<void> => {
    const next = locale.value === 'en' ? 'pl' : 'en'
    await setLocale(next)
    router.replace(switchLocalePath(next))
  }

  return { locale, switchLanguage }
}
