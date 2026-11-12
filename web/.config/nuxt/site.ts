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
		'Yes - migrate any existing Next, Nuxt, Vue, React, or other supported app as-is. Install @nucleify/cli, run nuc emit. No *.nuc.tsx rewrite. Vue · React · Nuxt · Next · Astro · Svelte · Solid.',
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
	'/thank-you': { redirect: { to: '/en/thank-you', statusCode: 301 } },
	'/thank-you/**': { redirect: { to: '/en/thank-you', statusCode: 301 } },
	'/docs': {
		redirect: {
			to: 'https://docs.nucleify.io/en/docs/getting-started/introduction',
			statusCode: 301,
		},
	},
	'/docs/**': {
		redirect: {
			to: 'https://docs.nucleify.io/en/docs/getting-started/introduction',
			statusCode: 301,
		},
	},
}
