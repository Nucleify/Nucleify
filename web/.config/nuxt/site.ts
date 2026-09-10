import { LOCALES } from './locales'

const siteUrl =
	process.env.NUXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://nucleify.io'

/** Public marketing routes for sitemap / SEO. */
export const SITE_HOME_PATHS = LOCALES.map((locale) => `/${locale.code}/home`)

export const siteConfig = {
	url: siteUrl,
	name: 'Nucleify',
	description:
		'Create scalable web apps faster with Nucleify - a modular, core-driven framework with unique modules for Laravel & Nuxt developers.',
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
}
