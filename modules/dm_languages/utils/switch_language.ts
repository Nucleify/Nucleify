import { reloadNuxtApp } from '#app'

export const useSwitchLanguage = () => {
  const { locale, setLocale } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  const switchLanguage = async (): Promise<void> => {
    const next = locale.value === 'en' ? 'pl' : 'en'
    await setLocale(next)
    reloadNuxtApp({ path: switchLocalePath(next) })
  }

  return { locale, switchLanguage }
}
