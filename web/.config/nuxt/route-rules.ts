function isPrerenderEnabled(): boolean {
	if (process.env.CI === "true") return false;
	if (process.env.PRERENDER === "false") return false;
	return true;
}

export function getRouteRules(locales: readonly { code: string }[]) {
	const isLocal = process.env.APP_ENV === "local";
	const prerender = isPrerenderEnabled();

	return {
		"/": { prerender: false, redirect: { to: "/en/home", statusCode: 302 } },
		"/en": { redirect: { to: "/en/home", statusCode: 302 } },
		"/en/": { redirect: { to: "/en/home", statusCode: 302 } },
		...(isLocal
			? {}
			: {
					"/**/_payload.js": {},
					"/**/_payload.json": {},
					...Object.fromEntries(
						locales.map((locale) => [
							`/${locale.code}/*`,
							{ swr: true, prerender },
						]),
					),
				}),
	};
}
