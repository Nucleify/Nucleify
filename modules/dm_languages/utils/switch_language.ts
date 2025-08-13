import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export function useSwitchLanguage() {
  // @ts-ignore-next-line
  const { locale, setLocale } = useI18n()
  const router = useRouter()
  // @ts-ignore-next-line
  const switchLocalePath = useSwitchLocalePath()

  const switchLanguage = async (): Promise<void> => {
    const next = locale.value === 'en' ? 'pl' : 'en'
    await setLocale(next)
    router.replace(switchLocalePath(next))
  }

  return { locale, switchLanguage }
}
