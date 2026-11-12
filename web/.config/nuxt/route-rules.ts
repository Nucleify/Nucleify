import { smashedUrlRedirects } from './site'

function isPrerenderEnabled(): boolean {
	if (process.env.CI === 'true') return false
	if (process.env.PRERENDER === 'false') return false
	return true
}

export function getRouteRules(locales: readonly { code: string }[]) {
	const isLocal = process.env.APP_ENV === 'local'
	const prerender = isPrerenderEnabled()

	return {
		...smashedUrlRedirects,
		'/': { prerender: false, redirect: { to: '/en/home', statusCode: 302 } },
		'/en': { redirect: { to: '/en/home', statusCode: 302 } },
		'/en/': { redirect: { to: '/en/home', statusCode: 302 } },
		'/_nuxt/**': {
			headers: {
				'cache-control': 'public, max-age=31536000, immutable',
			},
		},
		'/.well-known/ard.json': {
			headers: {
				'content-type': 'application/ard+json; charset=utf-8',
				'access-control-allow-origin': '*',
				'cache-control': 'public, max-age=3600',
			},
		},
		'/llms.txt': {
			headers: {
				'content-type': 'text/plain; charset=utf-8',
				'cache-control': 'public, max-age=3600',
			},
		},

		...(isLocal
			? {}
			: Object.fromEntries(
					locales.map((locale) => [
						`/${locale.code}/*`,
						{ prerender },
					]),
				)),
	}
}
