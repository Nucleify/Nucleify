import { useRuntimeConfig } from "nuxt/app"

export const appUrl = () => {
    return useRuntimeConfig().public.appUrl
}