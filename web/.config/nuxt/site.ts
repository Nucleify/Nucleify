import { LOCALES } from './locales'

const siteUrl =
	process.env.NUXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://nucleify.io'

/** Public marketing routes for sitemap / SEO. */
export const SITE_HOME_PATHS = LOCALES.map((locale) => `/${locale.code}/home`)
export const SITE_INVESTOR_PATHS = LOCALES.map(
	(locale) => `/${locale.code}/investor`,
)

export const siteConfig = {
	url: siteUrl,
	name: 'Nucleify',
	description:
		'Open-source nucleus for developers: shared_modules, typed APIs, and a portable UI compiler. Ship Vue, React, Nuxt, Next, and Supabase from one install.',
	defaultLocale: 'en',
	trailingSlash: false,
}

/**
 * Explicit routeRules for the most common smashed hosts.
 * Catch-all lives in `server/middleware/00_fix_smashed_urls.ts`.
 */
export const smashedUrlRedirects: Record<
	string,
	{ redirect: { to: string; statusCode: number } }
> = {
	'/home': { redirect: { to: '/en/home', statusCode: 301 } },
	'/home/**': { redirect: { to: '/en/home', statusCode: 301 } },
	'/investor': { redirect: { to: '/en/investor', statusCode: 301 } },
	'/investor/**': { redirect: { to: '/en/investor', statusCode: 301 } },
}
